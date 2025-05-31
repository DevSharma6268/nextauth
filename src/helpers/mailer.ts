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
        await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now() + 3600000})
    }

    // Create a test account or replace with real credentials.
    var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "47a9ee6527d985",
    pass: "****b6d0"
  }
});

    const mailOptions = {
    from: 'Dev Sharma <devsharma706733@gmail.com>',// sender address
    to: email,
    subject: emailType === 'verify'? 'verify your email address' : 'reset your password',
    // text: "Hello world?", // plain‑text body
html: emailType === "VERIFY"
        ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        : `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`  }

    const mailResponse =await transport.sendMail(mailOptions)
  } catch (error:any) {
    throw new Error(`Error sending email: ${error.message}`)
  }
};
