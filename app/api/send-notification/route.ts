import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const feedback = await request.json()

    if (!feedback.full_name || !feedback.email || !feedback.subject || !feedback.message) {
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
      to: ['fatimaschool66@gmail.com'],
      subject: `New Contact Form Submission - ${feedback.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
          <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              <p style="color: #7f8c8d; margin: 10px 0 0 0;">Fatima School & College</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #3498db;">
              <h2 style="color: #2c3e50; margin-top: 0; font-size: 18px;">Contact Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #34495e; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #2c3e50;">${feedback.full_name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #34495e;">Email:</td>
                  <td style="padding: 8px 0; color: #2c3e50;">${feedback.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #34495e;">Subject:</td>
                  <td style="padding: 8px 0; color: #2c3e50;">${feedback.subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #34495e;">Date:</td>
                  <td style="padding: 8px 0; color: #2c3e50;">${new Date(feedback.created_at).toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <div style="margin-top: 20px;">
              <h3 style="color: #2c3e50; margin-bottom: 10px;">Message:</h3>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border: 1px solid #e1e8ed; white-space: pre-wrap; line-height: 1.6; color: #2c3e50;">${feedback.message}</div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1e8ed; text-align: center;">
              <p style="color: #7f8c8d; font-size: 14px; margin: 0;">
                This is an automated notification from Fatima School & College website.
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Send notification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
