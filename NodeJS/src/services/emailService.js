import nodemailer from "nodemailer";
require("dotenv").config();

const sendEmailService = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const message = {
    from: "hminhhoangdev@gmail.com",
    to: email,
    subject: subject,
    html,
  };

  const result = await transporter.sendMail(message);
  return result;
};

module.exports = {
  sendEmailService: sendEmailService,
};
