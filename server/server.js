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

dotenv.config();

const app = express();

try {
  connectDB();
  console.log("Connected success fully");
} catch (error) {
  console.log("error while connecting with Database");
}

app.use(cors());
app.use(express.json());

app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/sendEmail", sendEmail);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/verify", async (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRETE);
    const user = decoded.user;
    await User.findOne({ _id: user })
      .then(async (userData) => {
        if (!userData) {
          await Seller.findOne({ _id: user })
            .then((admin) => {
              return res.json({ decoded, isAdmin: admin.isAdmin });
            })
            .catch((error) => {
              return res.json({ message: "Error in server/verify" });
            });
        } else {
          return res.json({ decoded, isAdmin: userData.isAdmin });
        }
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      });
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
});

app.listen(8000,"192.168.2.182", () => {
  console.log("Server is running 8000 ");
});
