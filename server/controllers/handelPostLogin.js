import User from "../models/user.model.js";
import Seller from "../models/seller.model.js";
import jwt from "jsonwebtoken";

export default async function handlePostLogin(req, res) {
  const { userEmail } = req.body;

  try {
    const user = await User.findOne({ userEmail: userEmail });

    if (!user) {
      const seller = await Seller.findOne({ SellerEmail: userEmail });

      if (!seller) {
        return res.status(401).json({
          message: "No account exists with this email. Please sign up to continue.",
          success: false,
        });
      } else {
        const payload = {
          userId: seller._id,
          isAdmin: seller.isAdmin,
        };

        const cookie = jwt.sign(payload, process.env.JWTSECRETE, { expiresIn: "1d" });

        return res.cookie("orderNow", cookie, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'None',
        }).json({
          message: "Login successful",
          success: true,
        });
      }
    } else {
      const payload = {
        userId: user._id,
        isAdmin: user.isAdmin,
      };

      const cookie = jwt.sign(payload, process.env.JWTSECRETE, { expiresIn: "1d" });
      return res.cookie("orderNow", cookie, {
        httpOnly: true,
      }).json({
        message: "Login successful",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later.", success: false });
  }
}
