import Item from "../models/items.model.js"
export default async function addItems(req,res){
    try {
        
        const {ItemName,ImageLink,ItemDescription}=req.body
        const NewItem=new Item({
            ItemName,ImageLink,ItemDescription
        })
        await NewItem.save();
        return res.json({message:"Added Successfully"})
    } 
    catch (error) {
        return res.json({message:"Error occur while adding items "})
    }
}