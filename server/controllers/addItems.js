import Item from "../models/items.model.js"
export default async function addItems(req,res){
    try {
        console.log(req.body)
        
        const {ItemName,ItemPrice, ItemDescription, ImageLink,TypeOfDish1}=req.body
        const NewItem=new Item({
            ItemName,ItemPrice, ItemDescription, ImageLink,TypeOfDish:TypeOfDish1
        })
        await NewItem.save();
        return res.json({message:"Added Successfully"})
    } 
    catch (error) {
        return res.json({message:"Error occur while adding items "})
    }
}