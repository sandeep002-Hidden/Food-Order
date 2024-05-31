import express from "express";
import handelGetUserDetails from "../controllers/handelGetUserDetail.js";
import updateUserDetails from "../controllers/updateUserDetails.js";
import deleteAccount from "../controllers/deleteAccount.js";


const userRouter = express.Router();

userRouter.route("/profile").get(handelGetUserDetails);
userRouter.route("/updateProfile").post(updateUserDetails);
userRouter.route("/deleteAccount").post(deleteAccount);
export default userRouter;
