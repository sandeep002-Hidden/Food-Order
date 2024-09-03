import mongoose from "mongoose";
const OrderSchema=new mongoose.Schema({
    clientName:{
        type:String,
        required:true,
    },
    clientEmail: {
        type: String,
        required:true
    },
    clientPhoneNo:{
        type:String,
        required:true,
    },
    Country:{
        type:String,
        required:true,
        default:"India",
    },
    State:{
        type:String,
        required:true
    },
    District:{
        type:String,
        required:true
    },
    Pin:{
        type:String,
        required:true
    },
    Location:{
        type:String,
    },
    Items:{
        type:Array,
    },
    TotalPrice:{
        type:Number,
    },
    isDelivered:{
        type:Boolean,
        default:false
    },
    isCancelled:{
        type:Boolean,
        default:false
    },
    orderStatus:{
        type:String,
        default:"waitting for pickup"
    },
    OrderTime:{
        type:String
    }
},{timestamps:true})
const Order=mongoose.model("order",OrderSchema);
export default Order;