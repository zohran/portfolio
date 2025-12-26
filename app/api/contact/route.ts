import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import nodemailer from 'nodemailer';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

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

    // Store in file
    const submissionsPath = join(process.cwd(), 'data', 'submissions.json');
    let submissions: ContactSubmission[] = [];

    if (existsSync(submissionsPath)) {
      try {
        const fileContents = readFileSync(submissionsPath, 'utf8');
        submissions = JSON.parse(fileContents);
      } catch (error) {
        console.error('Error reading submissions file:', error);
        submissions = [];
      }
    }

    submissions.push(submission);
    writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2));

    // Send email notification
    let emailError = null;
    let emailSent = false;
    try {
      await sendEmailNotification(submission);
      emailSent = true;
      console.log('Email notification sent successfully');
    } catch (error) {
      emailError = error instanceof Error ? error.message : 'Unknown error';
      console.error('Email sending failed:', emailError);
      // Continue even if email fails - submission is already saved
    }

    return NextResponse.json(
      { 
        message: emailSent 
          ? 'Message sent successfully! Email notification sent.' 
          : 'Message saved, but email notification failed. Please check server logs.',
        success: true,
        emailSent,
        emailError: emailError || undefined
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}

async function sendEmailNotification(submission: ContactSubmission) {
  // Support both SMTP_PASS and SMTP_PASSWORD for compatibility
  const smtpPassword = (process.env.SMTP_PASSWORD || process.env.SMTP_PASS)?.trim();
  
  // Check if email is configured
  if (!process.env.SMTP_USER || !smtpPassword) {
    const missingVars = [];
    if (!process.env.SMTP_USER) missingVars.push('SMTP_USER');
    if (!smtpPassword) missingVars.push('SMTP_PASSWORD or SMTP_PASS');
    console.warn(`Email not configured. Missing: ${missingVars.join(', ')}. Skipping email notification.`);
    throw new Error(`Email configuration incomplete. Missing: ${missingVars.join(', ')}`);
  }

  // Check if SMTP_USER is still a placeholder
  if (process.env.SMTP_USER.includes('your-email') || process.env.SMTP_USER.includes('example.com')) {
    throw new Error('SMTP_USER is set to a placeholder. Please update it with your actual email address.');
  }

  // Get recipient email from environment or social links
  let recipientEmail = process.env.CONTACT_EMAIL;
  
  if (!recipientEmail) {
    try {
      const socialLinksPath = join(process.cwd(), 'data', 'socialLinks.json');
      if (existsSync(socialLinksPath)) {
        const socialLinks = JSON.parse(readFileSync(socialLinksPath, 'utf8'));
        recipientEmail = socialLinks.email;
      }
    } catch (error) {
      console.error('Error reading social links:', error);
    }
  }

  if (!recipientEmail) {
    console.warn('No recipient email found. Skipping email notification.');
    throw new Error('No recipient email configured');
  }

  // Configure email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: smtpPassword,
    },
  });

  // Verify transporter configuration
  try {
    await transporter.verify();
    console.log('SMTP server connection verified');
  } catch (error) {
    console.error('SMTP verification failed:', error);
    throw new Error(`SMTP connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: recipientEmail,
    replyTo: submission.email,
    subject: `New Contact Form Submission: ${submission.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <div style="margin: 20px 0;">
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${submission.email}">${submission.email}</a></p>
          <p><strong>Subject:</strong> ${submission.subject}</p>
        </div>
        <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #000;">
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${submission.message.replace(/\n/g, '<br>')}</p>
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

  const result = await transporter.sendMail(mailOptions);
  console.log('Email sent successfully:', result.messageId);
  return result;
}

