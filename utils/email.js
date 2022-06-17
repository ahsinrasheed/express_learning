const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) create a Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // 2) Define the email options
  const emailOptions = {
    from: 'Ahsin Rasheed <ahsinbhatti@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.message,
  };
  // 3) Send the email with nodemailer
  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;