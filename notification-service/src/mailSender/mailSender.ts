import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testmail@gmail.com',
    pass: 'Pass12345@'
  }
});

export function sendMail(toAddress: string, topic: string, message: string) {
  const mailOptions = {
    from: 'testmail@gmail.com',
    to: toAddress,
    subject: topic,
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
