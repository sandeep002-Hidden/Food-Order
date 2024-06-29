import User from "../models/user.model.js";
import nodemailer from "nodemailer";
export default async function sendEmail(req, res) {
  const max = 999999;
  const min = 100000;
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`otp is ${otp}`);
  const myMail = process.env.EMAIL;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: myMail,
      pass: process.env.EMAILPASS,
    },
  });
  const sendEmail = (email, token) => {
    const mailOptions = {
      from: myMail,
      to: email,
      subject: "Email verification",
      text: `your otp is ${otp}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error in sending email  " + error);
        return true;
      } else {
        return false;
      }
    });
  };
  const email = req.body.userEmail;
  try {
    await User.find({ userEmail: email }).then((result) => {
      if (result[0] === undefined) {
        return res.json({message:"Provided Email is not a Authenticated User"})
      } else {
      sendEmail(email);
      return res.json({ Otp: otp });
      }
    });
  } catch (error) {
    return res.status(404).json({ message: "Email Not found" });
  }
}
