import Seller from "../models/seller.model.js";
import jwt from "jsonwebtoken"
export default async function getAdminDetails(req,res){
  const token =req.cookies.orderNow;
  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRETE);
    try{
        const seller = await Seller.findOne({ _id:decodedToken.userId }).select("-SellerPassword -_id -createdAt -updatedAt")
        return res.json({seller,success:true})
    }
    catch(error){
      return res.status(401).json({ message: error.message,sucess:flase });
    }
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid",sucess:flase });
  }
}