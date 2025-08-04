interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Check for Resend API key first (easiest option)
    if (process.env.RESEND_API_KEY) {
      return await sendWithResend(options);
    }
    
    // Fallback to Mailgun if available
    if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
      return await sendWithMailgun(options);
    }

    // If no API keys are provided, just log the message
    console.log('📧 Email would be sent to:', options.to);
    console.log('📧 Subject:', options.subject);
    console.log('📧 Message:', options.text);
    console.log('💡 To enable actual email sending:');
    console.log('   - For Resend: Set RESEND_API_KEY (easiest - get free key at resend.com)');
    console.log('   - For Mailgun: Set MAILGUN_API_KEY and MAILGUN_DOMAIN');
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
}

async function sendWithResend(options: EmailOptions): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's default from address
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html || options.text
      })
    });

    if (response.ok) {
      console.log('✅ Email sent successfully via Resend to:', options.to);
      return true;
    } else {
      const error = await response.text();
      console.error('❌ Resend API error:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ Resend sending failed:', error);
    return false;
  }
}

async function sendWithMailgun(options: EmailOptions): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('from', `Portfolio Contact <mailgun@${process.env.MAILGUN_DOMAIN}>`);
    formData.append('to', options.to);
    formData.append('subject', options.subject);
    formData.append('text', options.text);
    if (options.html) {
      formData.append('html', options.html);
    }

    const response = await fetch(`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')}`
      },
      body: formData
    });

    if (response.ok) {
      console.log('✅ Email sent successfully via Mailgun to:', options.to);
      return true;
    } else {
      const error = await response.text();
      console.error('❌ Mailgun API error:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ Mailgun sending failed:', error);
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