// Test script to verify Resend integration
const { Resend } = require('resend')

// Load environment variables
require('dotenv').config()

const resend = new Resend(process.env.RESEND_API_KEY)

async function testResend() {
  try {
    console.log('Testing Resend integration...')
    console.log('API Key present:', !!process.env.RESEND_API_KEY)
    
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment variables')
      return
    }

    // Test sending a simple email
    const { data, error } = await resend.emails.send({
      from: 'Fatima School & College <noreply@fatimaschoolandcollege.com>',
      to: ['fatimaschool66@gmail.com'],
      subject: 'Test Email from Resend Integration',
      html: '<h1>Test Email</h1><p>This is a test email to verify Resend integration is working.</p>',
    })

    if (error) {
      console.error('Error sending email:', error)
    } else {
      console.log('Email sent successfully:', data)
    }
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testResend()
