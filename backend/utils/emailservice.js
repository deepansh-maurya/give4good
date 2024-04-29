import { createTransport } from "nodemailer";

export const emailservice = async (email, subject, user) => {
  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_FOR_EMAIL_SERVICE,
        pass: process.env.PASSWORD_FOR_EMAIL_SERVICE,
      },
    });
    const info = await transporter.sendMail({
      from: ` Deepansh <${process.env.EMAIL_FOR_EMAIL_SERVICE}>`,
      to: email, // list of receivers
      subject: subject, // Subject line
      text: "", // plain text body
      html: `<p>Dear ${user},</p>

<p>Congratulations! You have successfully signed up for [Your Website/App Name]. We're thrilled to have you join our community.</p>

<p>Here are a few things you can do now that you're a member:</p>
<ul>
  <li>Explore our platform and discover exciting features.</li>
  <li>Customize your profile to make it your own.</li>
  <li>Engage with other users and participate in discussions.</li>
  <li>Start [creating campaigns/donating goods/etc., based on your platform's purpose].</li>
</ul>

<p>If you have any questions or need assistance, feel free to reach out to our support team at <a href="mailto:support@example.com">support@example.com</a>. We're here to help!</p>

<p>Thank you for choosing [Your Website/App Name]. We look forward to seeing you around!</p>

<p>Best regards<p>`,
    });
    console.log(info);
    if (!info) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
