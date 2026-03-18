import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function tutorVerificationEmail(email: string, name: string){
    try {
    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: email,
      subject: 'Your Tutor Account Has Been Verified',
      html: `
        <h2>Congratulations, ${name}!</h2>
        <p>Your tutor account has been verified by our admin team.</p>
        <p>You can now:</p>
        <ul>
          <li>Create and manage courses</li>
          <li>Interact with students</li>
          <li>Access tutor-specific features</li>
        </ul>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Go to Dashboard</a></p>
      `
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }

}