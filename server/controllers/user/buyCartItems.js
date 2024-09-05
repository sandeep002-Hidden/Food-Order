import jwt from "jsonwebtoken";
import Order from "../../models/order.model.js";
import User from "../../models/user.model.js";
import Item from "../../models/items.model.js";
import Seller from "../../models/seller.model.js";
import mongoose from "mongoose";

export default async function buyCartItems(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { myCart, quantity } = req.body;
        const token = req.cookies.orderNow;

        if (!token) {
            await session.abortTransaction();
            session.endSession();
            return res.status(401).json({ message: "No token provided. Please log in.", success: false });
        }

        let userId;
        try {
            userId = jwt.verify(token, process.env.JWTSECRETE).userId;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
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
                ).session(session);

                totalPrice += item.ItemPrice * quantity[index];
                pendingOrder.push({
                    Item: item._id,
                    Quantity: quantity[index],
                    Time: localTime,
                });

                await User.updateOne({ _id: userId }, { $pull: { Cart: item._id } }, { session });
                await Seller.updateOne(
                    { _id: item.SellerId },
                    { $push: { PendingDeliveries: { itemId: item._id, amount: quantity[index] } } },
                    { session }
                );
            } catch (error) {
                await session.abortTransaction();
                session.endSession();
                throw new Error(`Failed to process item ${item.ItemName}. Please try again.`);
            }
        });

        await Promise.all(updateCartPromises);

        const user = await User.findOne({ _id: userId });
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "User not found.", success: false });
        }

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
            OrderTime: localTime
        });

        await OrderUser.save({ session });

        await User.updateOne(
            { _id: userId },
            { $push: { PendingOrders: OrderUser._id } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: "Order placed successfully", success: true });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "An unexpected error occurred. Please try again.", success: false });
    }
}
