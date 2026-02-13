export const EmailTemplates = {
  VERIFY_EMAIL: (name: string, otp: string) => ({
    subject: "Verify your email - AiAdoGen",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verify Email</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f6fb;font-family:Inter,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0"
              style="background:#ffffff;border-radius:16px;padding:40px 30px;
              box-shadow:0 10px 30px rgba(0,0,0,0.05);">
              
              <tr>
                <td align="center" style="font-size:28px;font-weight:700;color:#111827;">
                  🚀 AiAdoGen
                </td>
              </tr>

              <tr>
                <td style="padding-top:20px;font-size:18px;color:#374151;">
                  Hi <strong>${name}</strong>,
                </td>
              </tr>

              <tr>
                <td style="padding-top:10px;color:#6b7280;font-size:15px;line-height:24px;">
                  Enter the verification code below to activate your account.
                </td>
              </tr>

              <tr>
                <td align="center" style="padding:30px 0;">
                  <div style="
                    display:inline-block;
                    font-size:28px;
                    letter-spacing:8px;
                    font-weight:700;
                    color:#4F46E5;
                    background:#eef2ff;
                    padding:15px 25px;
                    border-radius:12px;">
                    ${otp}
                  </div>
                </td>
              </tr>

              <tr>
                <td style="font-size:14px;color:#9ca3af;text-align:center;">
                  This code expires in 15 minutes.
                </td>
              </tr>

              <tr>
                <td style="padding-top:30px;font-size:13px;color:#9ca3af;text-align:center;">
                  © ${new Date().getFullYear()} AiAdoGen. All rights reserved.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
  }),

  PASSWORD_RESET: (name: string, resetLink: string) => ({
    subject: "Reset your password - AiAdoGen",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0;padding:0;background:#f4f6fb;font-family:Inter,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0"
              style="background:#ffffff;border-radius:16px;padding:40px 30px;
              box-shadow:0 10px 30px rgba(0,0,0,0.05);">

              <tr>
                <td align="center" style="font-size:26px;font-weight:700;color:#111827;">
                  🔐 Password Reset
                </td>
              </tr>

              <tr>
                <td style="padding-top:20px;font-size:16px;color:#374151;">
                  Hi <strong>${name}</strong>,
                </td>
              </tr>

              <tr>
                <td style="padding-top:10px;color:#6b7280;font-size:15px;line-height:24px;">
                  Click the button below to securely reset your password.
                </td>
              </tr>

              <tr>
                <td align="center" style="padding:30px 0;">
                  <a href="${resetLink}" 
                    style="background:linear-gradient(90deg,#4F46E5,#7C3AED);
                    color:#ffffff;
                    padding:14px 28px;
                    text-decoration:none;
                    border-radius:10px;
                    font-weight:600;
                    font-size:15px;
                    display:inline-block;">
                    Reset Password
                  </a>
                </td>
              </tr>

              <tr>
                <td style="font-size:13px;color:#9ca3af;text-align:center;">
                  If you didn’t request this, you can safely ignore this email.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
  }),

  WELCOME_EMAIL: (name: string) => ({
    subject: "Welcome to AiAdoGen 🚀 Create AI Ads in 60 Seconds",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0;padding:0;background:#f4f6fb;font-family:Inter,Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;">
        <tr>
          <td align="center">
            <table width="100%" max-width="600" cellpadding="0" cellspacing="0"
              style="background:#ffffff;border-radius:16px;padding:40px 30px;
              box-shadow:0 10px 30px rgba(0,0,0,0.05);">

              <tr>
                <td align="center" style="font-size:28px;font-weight:700;color:#111827;">
                  🎉 Welcome to AiAdoGen
                </td>
              </tr>

              <tr>
                <td style="padding-top:20px;font-size:16px;color:#374151;">
                  Hi <strong>${name}</strong>,
                </td>
              </tr>

              <tr>
                <td style="padding-top:15px;color:#6b7280;font-size:15px;line-height:24px;">
                  You can now create AI-powered video ads or image ads in under 
                  <strong>60 seconds</strong> and publish them directly to:
                </td>
              </tr>

              <tr>
                <td style="padding-top:15px;color:#374151;font-size:15px;">
                  ✅ Google Ads <br/>
                  ✅ Facebook Ads <br/>
                  ✅ Instagram <br/>
                  ✅ And more platforms
                </td>
              </tr>

              <tr>
                <td align="center" style="padding:30px 0;">
                  <a href="https://aiadogen.com/dashboard"
                    style="background:linear-gradient(90deg,#4F46E5,#7C3AED);
                    color:#ffffff;
                    padding:16px 32px;
                    text-decoration:none;
                    border-radius:12px;
                    font-weight:600;
                    font-size:16px;
                    display:inline-block;">
                    Create Your First AI Ad
                  </a>
                </td>
              </tr>

              <tr>
                <td style="font-size:14px;color:#9ca3af;text-align:center;">
                  Built for small businesses, creators & marketers.
                </td>
              </tr>

              <tr>
                <td style="padding-top:25px;font-size:13px;color:#9ca3af;text-align:center;">
                  © ${new Date().getFullYear()} AiAdoGen. All rights reserved.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `,
  }),
};
