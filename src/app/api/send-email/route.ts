import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
 
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'fulldeveloper786@gmail.com',
    pass: 'npnm hjdm pims beic'
  }
});
 
export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
 
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Joining Our Waitlist!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome, ${name}!</h2>
          <p>Thank you for joining our sports community waitlist. We're thrilled to have you on board!</p>
          <p>We'll keep you updated about our launch and exclusive early access opportunities.</p>
          <p>Best regards,<br>The Team</p>
        </div>
      `
    });
 
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Error sending email' },
      { status: 500 }
    );
  }
}