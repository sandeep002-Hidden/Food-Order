import jwt from "jsonwebtoken";
import User from "../../models/user.model.js"
export default async function getOrderHisory(req,res){
    try {
        const token =req.cookies.orderNow;
        if(!token){
            return res.status(403).json({message:"no token!",success:false})
        }
        const userId=jwt.verify(token,process.env.JWTSECRETE).userId
        await User.findOne({_id:userId}).select("OrderHistory -_id").then((OrderHistory)=>{
            console.log(OrderHistory)
            return res.status(200).json({OrderHistory,message:"Test",success:true})
        })
    } catch (error) {
        return res.status(500).json({message:error.message,success:false})
    }
}