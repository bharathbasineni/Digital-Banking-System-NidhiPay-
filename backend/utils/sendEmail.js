const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
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

  try {
    await transporter.sendMail({
      from: `NidhiPay <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    });
    console.log(`[EMAIL] Successfully sent OTP to ${options.email}`);
  } catch (err) {
    console.error(`[EMAIL ERROR] Nodemailer failed (Render blocking SMTP port 587): ${err.message}`);
    // DO NOT throw error, allow the OTP verification flow to continue via Render Server Logs
  }
};

module.exports = sendEmail;
