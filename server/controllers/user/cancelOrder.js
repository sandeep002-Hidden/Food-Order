import Order from "../../models/order.model.js"
import Item from "../../models/items.model.js"
import User from "../../models/user.model.js"
import Seller from "../../models/seller.model.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
// to do



export default async function cancelOrder(req, res) {
    try {
        const token = req.cookies.orderNow;
        const id = req.body.id
        console.log("cancel order")
        if (!token) {
            return res.status(401).json({ message: "Un authorize user", success: false })
        }
        const userId = jwt.verify(token, process.env.JWTSECRETE).userId
        try {
            // Find the order by its ID
            const order = await Order.findOne({ _id: id });

            if (order) {
                // Loop through each item in the order
                for (const item of order.Items) {
                    // Decrease the number of order item count
                    await Item.findByIdAndUpdate(item.Item, {
                        $inc: { NumberOfOrder: -item.Quantity }
                    });

                    // Find the seller for the current item
                    const seller = await Item.findOne({ _id: item.Item }).select('SellerId');

                    if (seller) {
                        // Remove from seller's PendingDeliveries and add to CancelledDeliveries
                        await Seller.findByIdAndUpdate(
                            seller.SellerId,
                            {
                                $pull: { PendingDeliveries: { itemId: item.Item } },
                                $push: { CancelledDeliveries: { itemId: item.Item } }
                            }
                        );
                    }
                }
                // Remove the order from the user's pending orders and add it to cancelled orders
                console.log(id)
                const orderId = new mongoose.Types.ObjectId(id);
                await User.findByIdAndUpdate(userId, {
                    $pull: { PendingOrders: orderId },
                    $push: { CancelledOrders: orderId }
                });
                await Order.findByIdAndUpdate(id, { $set: { isCancelled: true } });
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
        }

        return res.status(200).json({ message: "success", success: true })
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}
