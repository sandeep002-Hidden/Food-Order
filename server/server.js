import User from "./models/user.model.js";
import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import signUpRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import jwt from "jsonwebtoken";
import userRouter from "./routes/userDetails.js";
import dotenv from "dotenv";
import adminRouter from "./routes/adminRoute.js";
import sendEmail from "./middleware/nodeMailer.js";
import Seller from "./models/seller.model.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

try {
  connectDB();
  console.log("Connected success fully");
} catch (error) {
  console.log("error while connecting with Database");
}
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));app.use(express.json());

app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/sendEmail", sendEmail);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/verify", async (req, res) => {
  const token =req.cookies.orderNow;
  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRETE);
    const user = decoded.userId;
    await User.findOne({ _id: user })
      .then(async (userData) => {
        if (!userData) {
          await Seller.findOne({ _id: user })
            .then((admin) => {
              return res.json({_id:user, role:"seller" ,success:true});
            })
            .catch((error) => {
              return res.json({ message: error.message,success:false })
            })
        } else {
          return res.json({_id:user,role:"user",success:true });
        }
      })
      .catch((error) => {
        console.log(error.message);
        return res.json({message:error.message,success:false})
      });
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" ,success:false });
  }
});

app.listen(8000, () => {
  console.log("Server is running 8000 ");
});
