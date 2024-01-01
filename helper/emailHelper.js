const nodemailer = require('nodemailer');

exports.sendEmail = async (mailOptions) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    }
  });

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info; // Optionally, you can return the response
  } catch (err) {
    console.log('Error sending email: ' + err.message);
    throw err;
  }
};

