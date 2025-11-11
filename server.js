
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "miguelitomascarini@gmail.com",
    pass: "lebenencfiyrxbrq"
  }
});

transporter.sendMail({
  from: 'miguelitomascarini@gmail.com',
  to: 'mascarinibm@gmail.com',
  subject: 'teste',
  text: 'funcionou!'
}, function(error, info){
  if (error) {
    return console.log(error);
  }
  console.log('Sent: ' + info.response);
});
