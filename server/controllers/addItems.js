import Item from "../models/items.model.js"
export default async function addItems(req,res){
    try {
        
        const {ItemName,ItemPrice, ItemDescription, ImageLink,TypeOfDish2}=req.body
        const NewItem=new Item({
            ItemName,ItemPrice, ItemDescription, ImageLink,TypeOfDish:TypeOfDish2
        })
        await NewItem.save();
        return res.json({message:"Added Successfully"})
    } 
    catch (error) {
        return res.json({message:"Error occur while adding items "})
    }
}