import User from "../models/user.model.js";
import Seller from "../models/seller.model.js";
import jwt from "jsonwebtoken";

export default async function handlePostLogin(req, res) {
  const { userEmail } = req.body;
  console.log("login");
  try {
    const user = await User.findOne({ userEmail: userEmail });
    if (!user) {
      await Seller.findOne({ SellerEmail: userEmail })
        .then((seller) => {
          if (!seller) {
            return res.status(401).json({
              message:
                "No account exists with this email. Please sign up to continue.",
            });
          } else {
            console.log("Admin");
            console.log(seller);
            const payload = { user: seller._id };
            jwt.sign(
              payload,
              process.env.JWTSECRETE,
              { expiresIn: 360000 },
              (err, token) => {
                if (err) {
                  console.log("Error here")
                  throw err;
                } else {

                  return res.json({ token, isAdmin: seller.isAdmin });
                }
              }
            );
          }
        })
        .catch((error) => {
          console.log(error);
          return res.json({ message: "Error while verifying User as admin" });
        });
    } else {
      console.log("User");
      console.log(user);
      const payload = { user: user._id };
      jwt.sign(
        payload,
        process.env.JWTSECRETE,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          else {
            return res.json({ token, isAdmin: user.isAdmin });
          }
        }
      );
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
}
