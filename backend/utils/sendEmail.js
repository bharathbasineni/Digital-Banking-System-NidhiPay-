const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 3000,
      greetingTimeout: 3000,
      socketTimeout: 3000
    });

    const mailOptions = {
      from: `NidhiPay <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.messageId}`);
    } catch (err) {
      console.error(`Nodemailer failed (Likely due to Render Free Tier SMTP blocking): ${err.message}`);
    }
  } catch (error) {
    console.error(`Error in sendEmail setup: ${error.message}`);
    // Don't throw error to prevent breaking the calling request
  }
};

module.exports = sendEmail;
