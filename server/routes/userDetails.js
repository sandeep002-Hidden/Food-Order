import express from "express";
import handelGetUserDetails from "../controllers/handelGetUserDetail.js";
import updateUserDetails from "../controllers/updateUserDetails.js";
import deleteAccount from "../controllers/deleteAccount.js";
import getItems from "../controllers/getItems.js";
import addToCart from "../controllers/addToCart.js";
import cartItems from "../controllers/cartItems.js";
import removeItemFromCart from "../controllers/removeItemFromCart.js";
import findItem from "../controllers/findItem.js";
import logout from "../controllers/logout.js"
import buyCartItems from "../controllers/buyCartItems.js"
import getOrderHisory from "../controllers/getOrderHisory.js"
import pendingOrderHistory from "../controllers/pendingOrderHistory.js"


const userRouter = express.Router();

userRouter.route("/profile").get(handelGetUserDetails);
userRouter.route("/updateProfile").post(updateUserDetails);
userRouter.route("/deleteAccount").post(deleteAccount);
userRouter.route("/getItems").get(getItems);
userRouter.route("/addToCart").post(addToCart);
userRouter.route("/getCartItems").get(cartItems);
userRouter.route("/removeItemFromCart").delete(removeItemFromCart);
userRouter.route("/findItem").post(findItem);
userRouter.route("/logout").get(logout)
userRouter.route("/buyCartItem").post(buyCartItems)
userRouter.route("/getOrderHisory").get(getOrderHisory)
userRouter.route("/pendingOrderHistory").get(pendingOrderHistory)

export default userRouter;
