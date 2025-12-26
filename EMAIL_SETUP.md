# Email Setup Instructions

To enable email notifications for contact form submissions, you need to configure SMTP settings.

## Setup Steps:

1. **Create `.env.local` file** in the root directory with the following variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

2. **For Gmail users:**
   - Go to your Google Account settings
   - Enable 2-Step Verification
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use this App Password as `SMTP_PASSWORD`

3. **For other email providers:**
   - Update `SMTP_HOST` and `SMTP_PORT` accordingly
   - Common providers:
     - Outlook: `smtp-mail.outlook.com`, port `587`
     - Yahoo: `smtp.mail.yahoo.com`, port `587`
     - Custom SMTP: Check your provider's documentation

## How it works:

- Form submissions are stored in `data/submissions.json`
- Email notifications are sent to the email specified in `CONTACT_EMAIL` or your email from `data/socialLinks.json`
- If email fails, the submission is still saved to the file

## Testing:

After setting up, test the contact form. Check:
1. `data/submissions.json` - should contain the submission
2. Your email inbox - should receive the notification

