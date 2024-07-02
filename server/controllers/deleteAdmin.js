import Seller from "../models/seller.model.js";
import jwt from "jsonwebtoken";
export default async function deleteAdminAccount(req, res) {
  const token = req.header("x-auth-token");
  const decodedToken = jwt.verify(token, process.env.JWTSECRETE);

  await Seller.deleteOne({ _id: decodedToken.user })
    .then((result) => {
      return res.json({ message: "Account deleted Successfully" });
    })
    .catch((error) => {
      return res.json({ message: "Error occur while deleting the account" });
    });
}
