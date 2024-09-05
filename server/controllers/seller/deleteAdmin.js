import Seller from "../../models/seller.model.js";
import jwt from "jsonwebtoken";
export default async function deleteAdminAccount(req, res) {
  const token =req.cookies.orderNow;
  const decodedToken = jwt.verify(token, process.env.JWTSECRETE);
  await Seller.deleteOne({ _id: decodedToken.userId })
    .then(() => {
      return res.json({ message: "Account deleted Successfully",success:true });
    })
    .catch((error) => {
      return res.json({ message: error.message,success:false });
    });
}
