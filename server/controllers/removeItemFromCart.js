import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export default async function removeItemFromCart(req,res){
    try {
        
    
    const token=req.body.token
    const removedItem=req.body.removeItem._id
    const userId = jwt.verify(token, process.env.JWTSECRETE).user;
    (await User.updateOne({_id:userId},{$pull:{Cart:removedItem}})).matchedCount(()=>{
        return res.json({message:"Removed Item Successfully"})
    });
} catch (error) {
    return res.json({message:"Error occur while Removing Item From your Cart"})
        
}
}