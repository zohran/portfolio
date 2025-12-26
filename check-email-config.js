// Quick script to check email configuration
const fs = require('fs');
const path = require('path');

console.log('Checking email configuration...\n');

// Check .env.local
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });

  console.log('Environment Variables:');
  console.log(`  SMTP_HOST: ${envVars.SMTP_HOST || 'NOT SET'}`);
  console.log(`  SMTP_PORT: ${envVars.SMTP_PORT || 'NOT SET'}`);
  console.log(`  SMTP_USER: ${envVars.SMTP_USER || 'NOT SET'} ${envVars.SMTP_USER && envVars.SMTP_USER.includes('your-email') ? '⚠️ (PLACEHOLDER)' : ''}`);
  console.log(`  SMTP_PASSWORD: ${envVars.SMTP_PASSWORD || 'NOT SET'}`);
  console.log(`  SMTP_PASS: ${envVars.SMTP_PASS || 'NOT SET'} ${envVars.SMTP_PASS ? '⚠️ (Use SMTP_PASSWORD instead)' : ''}`);
  console.log(`  CONTACT_EMAIL: ${envVars.CONTACT_EMAIL || 'NOT SET (will use socialLinks.json)'}`);
  
  console.log('\nIssues found:');
  let hasIssues = false;
  
  if (!envVars.SMTP_USER || envVars.SMTP_USER.includes('your-email')) {
    console.log('  ❌ SMTP_USER is not set or is a placeholder');
    hasIssues = true;
  }
  
  if (!envVars.SMTP_PASSWORD && !envVars.SMTP_PASS) {
    console.log('  ❌ SMTP_PASSWORD or SMTP_PASS is not set');
    hasIssues = true;
  }
  
  if (envVars.SMTP_PASS && !envVars.SMTP_PASSWORD) {
    console.log('  ⚠️  Using SMTP_PASS - consider renaming to SMTP_PASSWORD');
  }
  
  if (!hasIssues) {
    console.log('  ✅ All required variables are set');
  }
} else {
  console.log('❌ .env.local file not found!');
  console.log('   Create it with the following variables:');
  console.log('   SMTP_HOST=smtp.gmail.com');
  console.log('   SMTP_PORT=587');
  console.log('   SMTP_USER=your-email@gmail.com');
  console.log('   SMTP_PASSWORD=your-app-password');
  console.log('   CONTACT_EMAIL=your-email@gmail.com');
}

// Check socialLinks.json
const socialLinksPath = path.join(__dirname, 'data', 'socialLinks.json');
if (fs.existsSync(socialLinksPath)) {
  try {
    const socialLinks = JSON.parse(fs.readFileSync(socialLinksPath, 'utf8'));
    console.log(`\nSocial Links Email: ${socialLinks.email || 'NOT SET'}`);
  } catch (error) {
    console.log('\n❌ Error reading socialLinks.json');
  }
}

console.log('\nNote: Restart your Next.js dev server after updating .env.local');

