import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
import Item from "../models/items.model.js"

export default async function pendingOrderHistory(req, res) {

    let userHistory = [];

    try {
      const token = req.cookies.orderNow;
      const userId = jwt.verify(token, process.env.JWTSECRETE).userId;
      const user = await User.findOne({ _id: userId }).select("PendingOrders -_id");
      const PendingOrders = user.PendingOrders;
    
      if (PendingOrders.length === 0) {
        return res.status(404).json({ message: "No pending orders found", success: true });
      }
    
      const itemPromises = PendingOrders.map(async (item) => {
        const itemId = item[0].Item;
        try {
          const itemData = await Item.findOne({ _id: itemId }).select("ItemName ItemPrice ImageLink ItemDescription -_id");
          return {
            itemId,
            ...itemData,
          };
        } catch (error) {
          console.error(`Error fetching item with ID ${itemId}:`, error);
          return null;
        }
      });
    
      const itemData = await Promise.all(itemPromises);
      userHistory = itemData.filter(Boolean);
    
      return res.status(200).json({ userHistory, message: "Pending Order History", success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message, success: false });
    }
}