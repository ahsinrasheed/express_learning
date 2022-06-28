const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Ahsin Rasheed <${process.env.EMAIL_FROM}>`;
  }
  
  // 1) create a Transporter
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendrid
      return 1;
    }
    
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send The actual email
  async send(template, subject) {
    // 1) Render HTML Base on a pug Template
    const html = pug.renderFile(
      `${__dirname}/../views/email/${template}.pug`, {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    // 2) Define the email Options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    // Create a Transport and send email
    
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
   await this.send('welcome', 'Welcome to the Natours family!');
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your Password reset token (Valid for only 10 minutes!');
   }
};


