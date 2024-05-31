import User from "../models/user.model.js"
import jwt from "jsonwebtoken"



export default async function deleteAccount(req,res){
    const token = req.header("x-auth-token")
    const decodedToken = jwt.verify(token, process.env.JWTSECRETE);

    await User.deleteOne({_id:decodedToken.user}).then((result)=>{
        return res.json({message:"Account deleted Successfully"})
    }).catch((error)=>{
        return res.json({message:"Error occur while deleting the account"})
    })


}