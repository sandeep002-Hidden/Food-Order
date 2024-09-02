import Item from "../models/items.model.js"
import jwt from "jsonwebtoken"
export default async function addItems(req,res){
    try {
        const token =req.cookies.orderNow;
        const userId=jwt.verify(token,process.env.JWTSECRETE).userId
        const {ItemName,ItemPrice, ItemDescription, ImageLink,TypeOfDish2}=req.body
        const NewItem=new Item({
            ItemName,ItemPrice, ItemDescription, ImageLink,TypeOfDish:TypeOfDish2,NumberOfOrder:0,
            SellerId:userId})
        await NewItem.save();
        return res.json({message:"Added Successfully"})
    } 
    catch (error) {
        return res.json({message:"Error occur while adding items "})
    }
}