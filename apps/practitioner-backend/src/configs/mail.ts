import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.NX_MAIL_TRAP_USER,
    pass: process.env.NX_MAIL_TRAP_PASSWORD,
  },
});
