export function createWelcomeEmailTemplate(name, clientURL) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Resumefy</title>
</head>

<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">

  <!-- Header -->
  <div style="background: linear-gradient(to right, #0f172a, #1e40af); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
    <img 
      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      alt="Resumefy Logo"
      style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; background-color: white; padding: 10px;"
    />
    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">
      Welcome to Resumify!
    </h1>
  </div>

  <!-- Body -->
  <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
    
    <p style="font-size: 18px; color: #1e40af;">
      <strong>Hello ${name},</strong>
    </p>

    <p>
      We’re excited to have you on <strong>Resumify</strong>!  
      Resumify helps you build professional, ATS-friendly resumes and showcase your skills effectively.
    </p>

    <!-- Steps -->
    <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #1e40af;">
      <p style="font-size: 16px; margin: 0 0 15px 0;">
        <strong>Get started in just a few steps:</strong>
      </p>
      <ul style="padding-left: 20px; margin: 0;">
        <li style="margin-bottom: 10px;">Create your professional profile</li>
        <li style="margin-bottom: 10px;">Build or import your resume</li>
        <li style="margin-bottom: 10px;">Customize with modern templates</li>
        <li style="margin-bottom: 0;">Download & share your resume instantly</li>
      </ul>
    </div>

    <!-- CTA -->
    <div style="text-align: center; margin: 30px 0;">
      <a
        href="${clientURL}"
        style="background: linear-gradient(to right, #0f172a, #1e40af); color: white; text-decoration: none; padding: 12px 32px; border-radius: 50px; font-weight: 500; display: inline-block;"
      >
        Open Resumify
      </a>
    </div>

    <p>If you have any questions or need help, our team is always here for you.</p>
    <p>Wishing you success in your career journey 🚀</p>

    <p style="margin-top: 25px; margin-bottom: 0;">
      Best regards,<br />
      <strong>The Resumify Team</strong>
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>© 2025 Resumify. All rights reserved.</p>
    <p>
      <a href="#" style="color: #1e40af; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
      <a href="#" style="color: #1e40af; text-decoration: none; margin: 0 10px;">Terms of Service</a>
      <a href="#" style="color: #1e40af; text-decoration: none; margin: 0 10px;">Contact Us</a>
    </p>
  </div>

</body>
</html>
`;
}
