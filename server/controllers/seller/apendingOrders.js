import Item from "../../models/items.model.js"
import Seller from "../../models/seller.model.js"
import jwt from "jsonwebtoken"

async function getItemDetails(item) {
    return await Item.findOne({ _id: item.itemId }).select("ItemName ItemPrice ImageLink ItemDescription _id");
}

export default async function apendingOrders(req, res) {
    try {
        const token = req.cookies.orderNow;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized User", success: false });
        }

        const userId = jwt.verify(token, process.env.JWTSECRETE).userId;
        const Items = [];
        
        const order = await Seller.findOne({ _id: userId }).select("PendingDeliveries -_id");
        
        if (order && order.PendingDeliveries.length > 0) {
            for (const item of order.PendingDeliveries) {
                const product = await getItemDetails(item);
                Items.push({product,amount:item.amount});
            }
        }
        return res.status(200).json({Items, message: "test", success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}
