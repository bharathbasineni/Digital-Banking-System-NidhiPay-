require('dotenv').config();
const sendEmail = require('./utils/sendEmail');

async function testEmail() {
  console.log("Testing email sending...");
  try {
    const transporter = require('nodemailer').createTransport({
      host: "smtp.mailersend.net",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER || 'MS_4AtDC5@test-r6ke4n16o83gon12.mlsender.net',
        pass: process.env.EMAIL_PASS || 'mssp.sM3p8XT.pq3enl6my8rg2vwr.x2A3UtG'
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000
    });

    console.log("Attempting to send...");
    let info = await transporter.sendMail({
      from: `NidhiPay <${process.env.EMAIL_SENDER || 'test@test-r6ke4n16o83gon12.mlsender.net'}>`,
      to: 'test@example.com', // Replace with the user's email if possible
      subject: "Test Email from backend",
      html: "<h1>This is a test OTP email.</h1>"
    });
    console.log("Sent successfully! Info:", info);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

testEmail();
