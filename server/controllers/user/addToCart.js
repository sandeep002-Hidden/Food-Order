import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";

export default async function addToCart(req, res) {
    const token =req.cookies.orderNow;
    const decodedToken = jwt.verify(token, process.env.JWTSECRETE);
    await User.updateOne(
      { _id: decodedToken.userId },
      { $push: { Cart: req.body.id } }
    ).then(()=>{
        return res.json({ message: "Items Added to the Cart",success:true });
    }).catch((error)=>{
        return res.json({ message: error.message,success:false });
    })
}
