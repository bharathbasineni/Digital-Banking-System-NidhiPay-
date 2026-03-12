const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
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

  try {
    await transporter.sendMail({
      from: `NidhiPay <${process.env.EMAIL_SENDER || 'test@test-r6ke4n16o83gon12.mlsender.net'}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    });
    console.log(`[EMAIL] Successfully sent OTP to ${options.email}`);
  } catch (err) {
    console.error(`[EMAIL ERROR] Nodemailer failed: ${err.message}`);
    // Swallowing error so the OTP verification flow can gracefully continue
  }
};

module.exports = sendEmail;
