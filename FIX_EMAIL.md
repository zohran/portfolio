# Fix Email Configuration

## Issues Found:

1. ❌ **SMTP_USER is set to placeholder** (`your-email@gmail.com`)
2. ⚠️ **Using SMTP_PASS instead of SMTP_PASSWORD** (code supports both, but SMTP_PASSWORD is preferred)

## Fix Your .env.local File:

Update your `.env.local` file with the following:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=zeerasheed97@gmail.com
SMTP_PASSWORD=tzzx nuba ljtq fqhh
CONTACT_EMAIL=zeerasheed97@gmail.com
```

**Important Changes:**
1. Change `SMTP_USER` from `your-email@gmail.com` to your actual Gmail address: `zeerasheed97@gmail.com`
2. Rename `SMTP_PASS` to `SMTP_PASSWORD` (or keep both - code supports both)
3. Add `CONTACT_EMAIL=zeerasheed97@gmail.com` (optional, will use socialLinks.json if not set)

## After Updating:

1. **Restart your Next.js dev server** (stop and start `npm run dev`)
2. **Test the contact form** - check the server console for any errors
3. **Check your email inbox** (including spam folder)

## Troubleshooting:

If emails still don't work:

1. **Verify Gmail App Password:**
   - Make sure 2-Step Verification is enabled
   - Generate a new App Password if needed: https://myaccount.google.com/apppasswords
   - Remove spaces from the password in .env.local

2. **Check Server Logs:**
   - Look for "Email sent successfully" or error messages in the terminal
   - Check for "SMTP connection failed" errors

3. **Test SMTP Connection:**
   - The code now verifies SMTP connection before sending
   - Check console logs for "SMTP server connection verified"

4. **Common Gmail Issues:**
   - "Less secure app access" is deprecated - use App Passwords instead
   - Make sure the App Password is correct (no spaces)
   - Check if Gmail account has any security restrictions

