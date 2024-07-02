import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Seller from "../models/seller.model.js";
import bcrypt from "bcryptjs";

export default async function makeAdmin(req, res) {
  const {
    SellerName,
    SellerEmail,
    SellerPassword,
    PhoneNo,
    Country,
    State,
    District,
    pin,
    Location,
    token,
  } = req.body;
  console.log(req.body)
  const sellerData = new Seller({
    SellerName,
    SellerEmail,
    PhoneNo,
    Country,
    State,
    District,
    pin,
    Location,
  });
  const decodedToken = jwt.verify(token, process.env.JWTSECRETE);
  console.log(decodedToken)
  const salt = await bcrypt.genSalt(10);
  sellerData.isAdmin=true
  sellerData.SellerPassword = await bcrypt.hash(SellerPassword, salt);
  try {
    await User.deleteOne({ _id: decodedToken.user }).then(async (result) => {
      await sellerData
        .save()
        .then((result) => {
          return res.json({ message: "Account Created Successfully" });
        })
        .catch((error) => {
            console.log(error)
          return res
            .status(404)
            .json({ message: "Error Occur while making Seller" });
        });
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error Occur while making You seller" });
  }
}
