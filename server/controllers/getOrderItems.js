import Order from "../models/order.model.js"
import Item from "../models/items.model.js"

const getItemDetails = async (id) => {
    return await Item.findOne({ _id: id }).select("-_id -TypeOfDish -NumberOfOrder -createdAt -updatedAt")
  };
  
  export default async function getOrderItems(req, res) {
    try {
      const token = req.cookies.orderNow;
      if (!token) {
        return res.status(401).json({ message: "Login to continue", success: false });
      }
      const id = req.body.id;
      const arr = [];
      const order = await Order.findOne({ _id: id });
  
      if (order && order.Items) {
        const itemDetailsPromises = order.Items.map(async (item2) => {
          const itemDetails = await getItemDetails(item2.Item);
          arr.push(itemDetails);
        });
  
        await Promise.all(itemDetailsPromises);
      }
      return res.status(200).json({ message: "Order items retrieved successfully", success: true, arr });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  }
  