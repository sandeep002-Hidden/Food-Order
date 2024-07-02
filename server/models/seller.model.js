import mongoose from "mongoose";
const SellerSchema=new mongoose.Schema({
    SellerName:{
        type:String,
        required:true,
    },
    SellerEmail:{
        type:String,
        unique:true,
        required:true
    },

    SellerPassword:{
        type:String,
        required:true,
    },
    PhoneNo:{
        type:String,
        required:true,
        unique:true
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
    pin:{
        type:String,
        required:true
    },
    Location:{
        type:String,
    },
    DeliveryHistory:{
        type:Array,
    },
    PendingDeliveries:{
        type:Array,
    },
    isAdmin:{
        type:Boolean,
        default:true
    }
    
},{timestamps:true})


const Seller=mongoose.model("seller",SellerSchema);
export default Seller;