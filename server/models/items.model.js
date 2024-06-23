import mongoose from "mongoose";
const ItemSchema=new mongoose.Schema({
    ItemName:{
        type:String,
        required:true,
    },
    ItemPrice:{
        type:Number,
        required:true,
    },
    ImageLink:{
        type:String,
        required:true
    },
    ItemDescription:{
        type:String
    }
},{timestamps:true})

const Item=mongoose.model("item",ItemSchema);
export default Item;