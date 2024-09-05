import User from "../../models/user.model.js"
import jwt from "jsonwebtoken"

export default async function removeItemFromCart(req,res){
    try {
    const token =req.cookies.orderNow;
    const removedItem=req.body._id
    const userId = jwt.verify(token, process.env.JWTSECRETE).userId
    await (await User.updateOne({_id:userId},{$pull:{Cart:removedItem}})).then(()=>{
        return res.json({message:"Removed Item Successfully",success:true})
    });
} catch (error) {
    return res.json({message:"Error occur while Removing Item From your Cart",success:false})
        
}
}