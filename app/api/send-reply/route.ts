import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message, originalMessage, originalSubject } = await request.json()

    if (!to || !subject || !message || !originalMessage || !originalSubject) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Resend API key not configured' },
        { status: 500 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'Fatima School & College <noreply@fatimaschoolandcollege.com>',
      to: [to],
      subject: `Re: ${originalSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
          <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">Reply from Fatima School & College</h1>
              <p style="color: #7f8c8d; margin: 10px 0 0 0;">Thank you for contacting us</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #3498db; margin-bottom: 20px;">
              <h2 style="color: #2c3e50; margin-top: 0; font-size: 18px;">Your Original Message</h2>
              <p style="margin: 5px 0; color: #34495e;"><strong>Subject:</strong> ${originalSubject}</p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border: 1px solid #e1e8ed; white-space: pre-wrap; line-height: 1.6; color: #2c3e50; margin-top: 10px;">${originalMessage}</div>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 6px; border-left: 4px solid #27ae60;">
              <h2 style="color: #2c3e50; margin-top: 0; font-size: 18px;">Our Reply</h2>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border: 1px solid #d5f4e6; white-space: pre-wrap; line-height: 1.6; color: #2c3e50;">${message}</div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1e8ed; text-align: center;">
              <p style="color: #7f8c8d; font-size: 14px; margin: 0 0 10px 0;">
                For further inquiries, please contact us at:
              </p>
              <p style="color: #3498db; font-size: 14px; margin: 0;">
                Email: fatimaschool66@gmail.com<br>
                Phone: +92 313 8502766
              </p>
              <p style="color: #7f8c8d; font-size: 12px; margin: 20px 0 0 0;">
                This is an automated reply from Fatima School & College. Please do not reply to this email directly.
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Send reply error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
