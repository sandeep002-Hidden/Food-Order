import jwt from "jsonwebtoken";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Item from "../models/items.model.js";
import Seller from "../models/seller.model.js"
export default async function buyCartItems(req, res) {
    try {
        const { myCart, quantity } = req.body;
        const token = req.cookies.orderNow;
        let userId;
        try {
            userId = jwt.verify(token, process.env.JWTSECRETE).userId;
        } catch (error) {
            return res.status(401).json({ message: "Invalid or expired token. Please log in again.", success: false });
        }

        const pendingOrder = [];
        let totalPrice = 0;

        const now = new Date();
        const localTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const updateCartPromises = myCart.map(async (item, index) => {
            try {
                await Item.updateOne(
                    { _id: item._id },
                    { $inc: { NumberOfOrder: quantity[index] } }
                );
                totalPrice += item.ItemPrice * quantity[index];
                pendingOrder.push({
                    Item: item._id,
                    Quantity: quantity[index],
                    Time: localTime,
                });
                await User.updateOne({ _id: userId }, { $pull: { Cart: item._id } });
                await Seller.updateOne({ _id: item.SellerId }, { $push: { PendingDeliveries: { itemId: item._id, amount: quantity[index] } } })
            } catch (error) {
                console.error(`Error processing item ${item._id}: ${error.message}`);
                throw new Error(`Failed to process item ${item.ItemName}. Please try again.`);
            }
        });
        await Promise.all(updateCartPromises);
        try {
            await User.updateOne(
                { _id: userId },
                { $push: { PendingOrders: pendingOrder } }
            );
        } catch (error) {
            console.error(`Failed to update user pending orders: ${error.message}`);
            return res.status(500).json({ message: "Failed to process your order. Please try again.", success: false });
        }
        try {

        } catch (error) {
            return res.status(500).json({ message: error.message, success: false })
        }
        try {
            const user = await User.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({ message: "User not found.", success: false });
            }
            // await Order.collection.dropIndex('clientPhoneNo_1');
            const OrderUser = new Order({
                clientName: user.userName,
                clientEmail: user.userEmail,
                clientPhoneNo: user.phoneNo,
                Country: user.country,
                State: user.State,
                District: user.District,
                Pin: user.Pin,
                Location: user.Location,
                Items: pendingOrder,
                TotalPrice: totalPrice,
                OrderTime:localTime
            });

            await OrderUser.save()
        } catch (error) {
            console.error(`Failed to save order: ${error.message}`);
            return res.status(500).json({ message: "Failed to place your order. Please try again.", success: false });
        }

        return res.status(200).json({ message: "Order placed successfully", success: true });
    } catch (error) {
        console.error(`[Error]: ${error.message}`, {
            stack: error.stack,
            additionalInfo: {
                requestBody: req.body,
            },
        });

        return res.status(500).json({ message: "An unexpected error occurred. Please try again.", success: false });
    }
}
