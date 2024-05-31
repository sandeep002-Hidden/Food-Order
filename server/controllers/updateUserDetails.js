import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default async function updateUserDetails(req, res) {
  const { userName, userEmail, phoneNo, token } = req.body;
  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRETE);
    try {
      await User.updateMany(
        { _id: decodedToken.user },
        { $set: { userName: userName, userEmail: userEmail, phoneNo: phoneNo } }
      ).then((result) => {
        if (result.acknowledged === true) {
          return res.json({ message: "Updated Success fully" });
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
