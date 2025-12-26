# Email Setup for Vercel Deployment

## Important Notes for Vercel

When deploying to Vercel, you need to configure environment variables in the Vercel dashboard. File system writes don't work on Vercel (serverless functions have read-only filesystem), so submissions are only sent via email.

## Step 1: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

### Required Variables:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-actual-email@gmail.com
SMTP_PASSWORD=your-app-password-here
CONTACT_EMAIL=your-actual-email@gmail.com
```

### Important:

- **SMTP_USER**: Your Gmail address (e.g., `zeerasheed97@gmail.com`)
- **SMTP_PASSWORD**: Your Gmail App Password (NOT your regular password)
  - Generate one at: https://myaccount.google.com/apppasswords
  - Remove spaces from the password when pasting
- **CONTACT_EMAIL**: Where you want to receive contact form submissions
  - Can be the same as SMTP_USER or different
  - If not set, will use email from `data/socialLinks.json`

## Step 2: Generate Gmail App Password

1. Go to https://myaccount.google.com/
2. Enable **2-Step Verification** (required for App Passwords)
3. Go to **Security** → **2-Step Verification** → **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password (no spaces)

## Step 3: Redeploy

After setting environment variables:
1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger a new deployment

## Step 4: Test

1. Submit the contact form on your live site
2. Check Vercel function logs:
   - Go to **Deployments** → Click on latest deployment → **Functions** tab
   - Look for `/api/contact` function logs
3. Check your email inbox (and spam folder)

## Troubleshooting

### Email not sending?

1. **Check Vercel logs:**
   - Look for error messages in function logs
   - Common errors:
     - "Email configuration incomplete" → Missing env vars
     - "SMTP authentication failed" → Wrong password
     - "Cannot connect to SMTP server" → Wrong host/port

2. **Verify environment variables:**
   - Make sure they're set for **Production** environment
   - Check for typos (case-sensitive)
   - Ensure no extra spaces

3. **Gmail-specific issues:**
   - Make sure you're using an **App Password**, not your regular password
   - App Password should be 16 characters with no spaces
   - 2-Step Verification must be enabled

4. **Test SMTP connection:**
   - The code will log connection attempts
   - Check Vercel function logs for detailed error messages

### Common Error Messages:

- **"Email configuration incomplete"**
  → Set SMTP_USER and SMTP_PASSWORD in Vercel

- **"SMTP authentication failed"**
  → Wrong password or not using App Password

- **"Cannot connect to SMTP server"**
  → Check SMTP_HOST and SMTP_PORT

- **"No recipient email configured"**
  → Set CONTACT_EMAIL or ensure socialLinks.json has email

## Alternative: Use Email Service

If Gmail doesn't work, consider using:
- **Resend** (recommended for Vercel)
- **SendGrid**
- **Mailgun**
- **AWS SES**

These services have better serverless support and higher reliability.

