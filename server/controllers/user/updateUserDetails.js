import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import mongoose from "mongoose";

export default async function updateUserDetails(req, res) {

  const token =req.cookies.orderNow;
  const userName=req.body.userName

  try {
    const session = await mongoose.startSession();
  session.startTransaction();
    const decodedToken = jwt.verify(token, process.env.JWTSECRETE);
    try {

      await User.updateOne(
        { _id: decodedToken.userId },
        { $set: { userName: userName } }
      )
      .then((result) => {
        
        if (result.acknowledged === true) {
          return res.json({ message: "Updated Success fully",success:true });
        }
      });
    } catch (error) {
      console.log("Error while fetching The information");
      console.log(error);
    }
  } catch (error) {
    return res.json({ message: "error occur while verifying token" });
  }
}
