import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {

    const hashedToken = await bcryptjs.hash(userId.toString(),10)
    
    if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000})
    }
    else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,{fogotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now() + 3600000})
    }

    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
    from: 'Dev Sharma <devsharma706733@gmail.com>',// sender address
    to: email,
    subject: emailType === 'verify'? 'verify your email address' : 'reset your password',
    // text: "Hello world?", // plain‑text body
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, // HTML body
  }

    const mailResponse =await transporter.sendMail(mailOptions)
  } catch (error:any) {
    throw new Error(`Error sending email: ${error.message}`)
  }
};
