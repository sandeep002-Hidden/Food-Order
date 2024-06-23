import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export default async function addToCart(req, res) {
    const itemId = req.body.id;
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.JWTSECRETE);
    await User.updateOne(
      { _id: decodedToken.user },
      { $push: { Cart: itemId } }
    ).then(()=>{
        return res.json({ message: "Items Added to the Cart" });
    }).catch((error)=>{
        return res.json({ message: "Failed to add Items to cart" });
    })
}
