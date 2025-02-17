import 'dotenv/config'
import sgMail from '@sendgrid/mail';

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendResetEmail = async (email, resetLink) => {
    console.log(resetLink)
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER_EMAIL,  // Use the sender email from .env
    subject: 'Password Reset Request',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
