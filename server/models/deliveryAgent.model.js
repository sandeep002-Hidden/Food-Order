import mongoose from "mongoose";
const DeliveryAgentSchema=new mongoose.Schema({
    DeliveryAgentName:{
        type:String,
        required:true,
    },
    DeliveryAgentEmail: {
        type: String,
        required:true
    },
    DeliveryAgentPhoneNo:{
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
    DeliveryCharge:{
        type:Number,
        default:40
    },
    OrderDelivered:{
        type:Array,
    }
},{timestamps:true})
const DeliveryAgent=mongoose.model("deliveryAgent",DeliveryAgentSchema);
export default DeliveryAgent;