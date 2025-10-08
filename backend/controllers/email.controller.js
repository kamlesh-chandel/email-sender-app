import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: { user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const info = await transporter.sendMail({
      from: `${process.env.MAIL_FROM_NAME || "Support"} <${process.env.MAIL_FROM_ADDRESS || process.env.SMTP_USER}>`,
      to: email,
      subject: "Hello ✔",
      text: "This is the 12 Factor App Showcase email",
      html: "<b>This is the 12 Factor App Showcase email</b>",
    });

    console.log("Email sent:", info.messageId);
    return res.status(200).json({ success: true, message: "Email Sent Successfully" });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ message: "Failed to send Email", success: false });
  }
};
