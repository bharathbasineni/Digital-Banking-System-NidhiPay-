require('dotenv').config();
const sendEmail = require('./utils/sendEmail');

async function testEmail() {
  console.log("Testing email sending...");
  try {
    const transporter = require('nodemailer').createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000
    });

    console.log("Attempting to send...");
    let info = await transporter.sendMail({
      from: `NidhiPay <${process.env.EMAIL_SENDER || 'bharathbasineni09@gmail.com'}>`,
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
