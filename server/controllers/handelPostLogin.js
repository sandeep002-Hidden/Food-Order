import User from "../models/user.model.js";

import jwt from "jsonwebtoken";

export default async function handlePostLogin(req, res) {
  const { userEmail } = req.body;

  try {
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(400).json({
        message:
          "No account exists with this email. Please sign up to continue.",
      });
    }

    const payload = { user: user._id };
    jwt.sign(
      payload,
      process.env.JWTSECRETE,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        else{
        return res.json({ token,isAdmin:user.isAdmin }).redirect("/");
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
}
