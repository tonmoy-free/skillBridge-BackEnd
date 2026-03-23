import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { oAuthProxy } from "better-auth/plugins";


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    baseURL: process.env.APP_URL,
    trustedOrigins: [process.env.APP_URL!],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "STUDENT",
                required: false
            },
            phone: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false
            }
        },
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            try {
                const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
                const info = await transporter.sendMail({
                    from: '"SkilBridge" <team@skillBridge.email>',
                    to: user.email,
                    subject: "Verify your email ✔",
                    text: "Hello world?", // Plain-text version of the message
                    html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td align="center" style="background:#2563eb; padding:24px;">
                <h1 style="margin:0; color:#ffffff; font-size:26px;">
                  SkillBridge
                </h1>
                <p style="margin:8px 0 0; color:#e0e7ff; font-size:14px;">
                  Find the right tutor. Learn with confidence.
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px; color:#333333;">
                <h2 style="margin-top:0;">${user.name}Verify your email address</h2>

                <p style="font-size:15px; line-height:1.6;">
                  Welcome to <strong>SkillBridge</strong> 🎓 <br />
                  You're just one step away from connecting with expert tutors and starting your learning journey.
                </p>

                <p style="font-size:15px; line-height:1.6;">
                  Please confirm your email address by clicking the button below:
                </p>

                <!-- Button -->
                <table cellpadding="0" cellspacing="0" style="margin:24px 0;">
                  <tr>
                    <td align="center">
                      <a href="${verificationUrl}"
                         style="
                           background:#2563eb;
                           color:#ffffff;
                           text-decoration:none;
                           padding:14px 28px;
                           border-radius:6px;
                           font-size:16px;
                           font-weight:bold;
                           display:inline-block;
                         ">
                        Verify Email
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:14px; color:#555;">
                  If the button doesn’t work, copy and paste this link into your browser:
                </p>

                <p style="font-size:13px; word-break:break-all; color:#2563eb;">
                  ${verificationUrl}
                </p>

                <p style="font-size:14px; color:#777; margin-top:32px;">
                  If you did not create an account on SkillBridge, you can safely ignore this email.
                </p>

                <p style="font-size:14px; margin-top:24px;">
                  Happy learning! 📘<br />
                  <strong>— The SkillBridge Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#f1f5f9; padding:16px; font-size:12px; color:#777;">
                © ${new Date().getFullYear()} SkillBridge. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
                });

                console.log("Message sent:", info.messageId);
            } catch (err) {
                console.error("Error sending verification email:", err);
                throw err;
            }
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },

    // account: { skipStateCookieCheck: true }, // solved redirect issue
  advanced: {
    cookies: {
      session_token: {
        name: "session_token", // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
        },
      },
      state: {
        name: "session_token", // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true,
        },
      },
    },
  },

  plugins: [oAuthProxy()],

});