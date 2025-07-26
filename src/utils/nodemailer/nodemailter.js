


import nodemailer from"nodemailer";


// Wrap in an async IIFE so we can use await.
export const sendEmail = async ({to=[],subject='',text='',html=''}={}) => {

    
const transporter = nodemailer.createTransport({
    service:'gmail',
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});

  const info = await transporter.sendMail({
    from: `<${process.env.email}>`,
    to,
    subject,
    text,
    html
  });
  return info
  console.log("Message sent:", info.messageId);
};