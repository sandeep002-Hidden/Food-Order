import jwt from "jsonwebtoken"
import DeliveryAgent from "../../models/deliveryAgent.model.js"
import User from "../../models/user.model.js"

export default async function makeAgent(   req,res){
    console.log(req.body)

    try {
        const token =req.cookies.orderNow;
        if(!token){
            return res.status(403).json({message:"No Token",success:false})
        }
        const userId=jwt.verify(token,process.env.JWTSECRETE).userId

        await User.findOne({_id:userId}).then((user)=>{
            if(!user){
                return res.status(401).json({message:"Un authorized user",success:false})
            }
        })
    } catch (error) {
        return res.status(500).json({message:error.message,success:false})
    }
}