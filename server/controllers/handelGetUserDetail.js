import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { json } from "react-router-dom";


export default async function handelGetUserDetails(req, res) {
  const token = req.header("x-auth-token");
  try {
    const decodedToken = jwt.verify(token, "jwtSecret");
    try{
        const user = await User.findOne({ _id:decodedToken.user })
        return res.json({user})

    }
    catch(error){
        console.log("Error while fetching The information")
        console.log(error)
    }
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
}
