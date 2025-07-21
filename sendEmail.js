import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "",
        pass: "",
      },
    });

    const mailOptions = {
      from: `${email}`,
      to:'pratiknpawar4912@gmail.com',
      subject: "New Contact Form Submission",
      html: `
        <h3>New Message Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "Failed to send email. Try again later." });
  }
});

const PORT =5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
