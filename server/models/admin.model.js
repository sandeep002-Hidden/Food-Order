import mongoose from "mongoose";
const AdminSchema=new mongoose.Schema({
    AdminName:{
        type:String,
        required:true,
    },
    AdminEmail:{
        type:String,
        unique:true,
        required:true
    },

    AdminPassword:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:String,
        required:true,
        unique:true
    },
    country:{
        type:String,
        required:true
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
    OrderHistory:{
        type:Array,
    },
    
},{timestamps:true})


const Admin=mongoose.model("admin",AdminSchema);
export default Admin;