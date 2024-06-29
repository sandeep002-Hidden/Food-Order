import Item from "../models/items.model.js"
export default async function findItem(req,res){
    const item=req.body.Item
    try {
        await Item.find({ItemName:item}).then((items)=>{
            return res.json(items)
        })
    } catch (error) {
        return res.status(404).json({message:"Error occur while Finding Items"})
    }
}
