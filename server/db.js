import mongoose from "mongoose";
export default function connectDB(){
  return mongoose.connect("mongodb+srv://mohapatrasandeep499:Sandeep499@cluster0.5yjpalm.mongodb.net/order")
}
