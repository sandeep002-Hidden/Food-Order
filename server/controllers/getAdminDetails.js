import Seller from "../models/seller.model.js";
import jwt from "jsonwebtoken"
export default async function getAdminDetails(req,res){
    const token = req.header("x-auth-token");
  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRETE);
    try{
        const user = await Seller.findOne({ _id:decodedToken.user })
        return res.json({user})
    }
    catch(error){
        console.log("Error while fetching The information")
        console.log(error)
    }
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
}