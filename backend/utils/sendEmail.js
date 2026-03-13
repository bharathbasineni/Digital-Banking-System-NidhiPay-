const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp-relay.brevo.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false, // TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000
  });

  await transporter.sendMail({
    from: `NidhiPay <${process.env.EMAIL_SENDER || 'bharathbasineni09@gmail.com'}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  });
  console.log(`[EMAIL] Successfully sent email to ${options.email}`);
};

module.exports = sendEmail;
