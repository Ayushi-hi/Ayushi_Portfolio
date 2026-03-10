const nodemailer = require('nodemailer');

const sendContactEmail = async ({ name, email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to:   process.env.EMAIL_RECEIVER,
    subject: '[Portfolio] ' + subject,
    html: `<h2>New message from ${name}</h2><p>Email: ${email}</p><p>${message}</p>`,
  });
};

module.exports = { sendContactEmail };