const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.EMAIL_USER || 'a4d970001@smtp-brevo.com',
      pass: process.env.EMAIL_PASS || '3YTxZXbMprvAWhj8'
    },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000
  });

  await transporter.sendMail({
    from: `NidhiPay <${process.env.EMAIL_SENDER || 'test@test-r6ke4n16o83gon12.mlsender.net'}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  });
  console.log(`[EMAIL] Successfully sent email to ${options.email}`);
};

module.exports = sendEmail;
