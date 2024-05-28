import express from "express";
import handelGetUserDetails from "../controllers/handelGetUserDetail.js";
const userRouter = express.Router();

userRouter.route("/profile").get(handelGetUserDetails);

export default userRouter;
