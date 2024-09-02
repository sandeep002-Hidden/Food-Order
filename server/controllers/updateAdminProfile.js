import jwt from "jsonwebtoken";
import Seller from "../models/seller.model.js"
export default async function updateAdminProfile(req,res){
    const SellerName=req.body.SellerName
    const token =req.cookies.orderNow;
    try {
      const decodedToken = jwt.verify(token, process.env.JWTSECRETE);
      try {
        await Seller.updateMany(
          { _id: decodedToken.userId },
          { $set: { SellerName} }
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