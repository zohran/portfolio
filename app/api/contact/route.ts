import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import nodemailer from 'nodemailer';

// Helper to check if we're in a serverless environment
function isServerlessEnvironment(): boolean {
  // Vercel sets VERCEL=1
  // AWS Lambda sets AWS_LAMBDA_FUNCTION_NAME
  // Netlify sets NETLIFY
  return !!(
    process.env.VERCEL === '1' ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.NETLIFY
  );
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

// Runtime configuration for Vercel
export const runtime = 'nodejs';
export const maxDuration = 10; // 10 seconds max for Vercel free tier

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create submission object
    const submission: ContactSubmission = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    // Skip file storage on serverless environments (Vercel, etc.)
    // File system is read-only in serverless functions, so we only send emails
    // Submissions are stored via email notifications only
    if (!isServerlessEnvironment()) {
      try {
        const submissionsPath = join(process.cwd(), 'data', 'submissions.json');
        if (existsSync(submissionsPath)) {
          const fileContents = readFileSync(submissionsPath, 'utf8');
          const submissions = JSON.parse(fileContents);
          submissions.push(submission);
          // Use synchronous import to avoid issues
          const fs = await import('fs');
          fs.writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2));
          console.log('Submission saved to file');
        }
      } catch (fileError: unknown) {
        // File operations don't work on serverless - this is expected
        const errorMsg = fileError instanceof Error ? fileError.message : 'Unknown error';
        console.log('File storage skipped:', errorMsg);
        // Don't throw - this is not a critical error
      }
    } else {
      console.log('File storage skipped (serverless environment detected - Vercel/Netlify/AWS Lambda)');
    }

    // Send email notification (this is the critical part)
    let emailError = null;
    let emailSent = false;
    try {
      await sendEmailNotification(submission);
      emailSent = true;
      console.log('Email notification sent successfully');
    } catch (error) {
      emailError = error instanceof Error ? error.message : 'Unknown error';
      console.error('Email sending failed:', emailError);
      console.error('Full error:', error);
      
      // Return error details for debugging
      return NextResponse.json(
        { 
          error: 'Failed to send email notification',
          details: emailError,
          success: false,
          emailSent: false
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Message sent successfully! Email notification sent.',
        success: true,
        emailSent: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function sendEmailNotification(submission: ContactSubmission) {
  // Support both SMTP_PASS and SMTP_PASSWORD for compatibility
  const smtpPassword = (process.env.SMTP_PASSWORD || process.env.SMTP_PASS)?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpHost = process.env.SMTP_HOST?.trim() || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT?.trim() || '587');
  
  // Debug logging (remove sensitive data)
  console.log('Email config check:', {
    hasUser: !!smtpUser,
    hasPassword: !!smtpPassword,
    host: smtpHost,
    port: smtpPort,
    userPreview: smtpUser ? `${smtpUser.substring(0, 3)}...` : 'not set'
  });
  
  // Check if email is configured
  if (!smtpUser || !smtpPassword) {
    const missingVars = [];
    if (!smtpUser) missingVars.push('SMTP_USER');
    if (!smtpPassword) missingVars.push('SMTP_PASSWORD or SMTP_PASS');
    const errorMsg = `Email configuration incomplete. Missing: ${missingVars.join(', ')}. Please set these in Vercel environment variables.`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Check if SMTP_USER is still a placeholder
  if (smtpUser.includes('your-email') || smtpUser.includes('example.com')) {
    throw new Error('SMTP_USER is set to a placeholder. Please update it with your actual email address in Vercel environment variables.');
  }

  // Get recipient email from environment or social links
  let recipientEmail = process.env.CONTACT_EMAIL?.trim();
  
  if (!recipientEmail) {
    try {
      const socialLinksPath = join(process.cwd(), 'data', 'socialLinks.json');
      if (existsSync(socialLinksPath)) {
        const socialLinks = JSON.parse(readFileSync(socialLinksPath, 'utf8'));
        recipientEmail = socialLinks.email?.trim();
      }
    } catch (error) {
      console.error('Error reading social links:', error);
    }
  }

  if (!recipientEmail) {
    const errorMsg = 'No recipient email configured. Set CONTACT_EMAIL in Vercel environment variables or ensure socialLinks.json has an email field.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  console.log(`Sending email to: ${recipientEmail}`);

  // Configure email transporter with timeout
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
    connectionTimeout: 5000, // 5 seconds
    greetingTimeout: 5000,
    socketTimeout: 5000,
  });

  // Skip verification on Vercel to avoid timeout issues - just send directly
  // Verification can cause timeouts in serverless environments

  const mailOptions = {
    from: `"Portfolio Contact" <${smtpUser}>`,
    to: recipientEmail,
    replyTo: submission.email,
    subject: `New Contact Form Submission: ${submission.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="margin: 20px 0;">
          <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a></p>
          <p><strong>Subject:</strong> ${escapeHtml(submission.subject)}</p>
        </div>
        <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #000;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(submission.message).replace(/\n/g, '<br>')}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Submitted at: ${new Date(submission.timestamp).toLocaleString()}
        </p>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${submission.name}
Email: ${submission.email}
Subject: ${submission.subject}

Message:
${submission.message}

Submitted at: ${new Date(submission.timestamp).toLocaleString()}
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    console.log('Email response:', result.response);
    return result;
  } catch (error) {
    console.error('Nodemailer error:', error);
    if (error instanceof Error) {
      // Provide more specific error messages
      if (error.message.includes('Invalid login')) {
        throw new Error('SMTP authentication failed. Check your SMTP_USER and SMTP_PASSWORD in Vercel environment variables.');
      } else if (error.message.includes('timeout')) {
        throw new Error('SMTP connection timeout. Check your SMTP_HOST and SMTP_PORT settings.');
      } else if (error.message.includes('ECONNREFUSED')) {
        throw new Error('Cannot connect to SMTP server. Check your SMTP_HOST and SMTP_PORT settings.');
      }
    }
    throw error;
  }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

