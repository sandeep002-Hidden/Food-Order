import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Item from "../models/items.model.js";

export default async function cartItems(req, res) {
  try {
    const token = req.header("x-item-token002");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided!" });
    }

    const decodedToken = jwt.verify(token, process.env.JWTSECRETE);
    const userId = decodedToken.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItemIds = user.Cart;
    const cartItems = await Item.find({ _id: { $in: cartItemIds } });

    return res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching cart items" });
  }
}
