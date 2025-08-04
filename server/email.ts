import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Create transporter using environment variables or default SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASS || 'your-app-password'
      }
    });

    // If no SMTP credentials are provided, just log the message and return true
    // This allows the form to work even without email setup
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('📧 Email would be sent to:', options.to);
      console.log('📧 Subject:', options.subject);
      console.log('📧 Message:', options.text);
      console.log('💡 To enable actual email sending, set SMTP_USER and SMTP_PASS environment variables');
      return true;
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html || options.text
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully to:', options.to);
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
}

export function formatContactEmail(name: string, email: string, message: string): EmailOptions {
  const subject = `New Contact Form Message from ${name}`;
  const text = `
New message from your portfolio contact form:

Name: ${name}
Email: ${email}
Message: ${message}

---
Sent from your portfolio website
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6;">New Contact Form Message</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      </div>
      <p style="color: #64748b; font-size: 14px;">Sent from your portfolio website</p>
    </div>
  `;

  return {
    to: 'msnyd87@gmail.com',
    subject,
    text,
    html
  };
}