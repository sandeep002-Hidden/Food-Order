import express from "express";
import addItems from "../controllers/addItems.js";

const adminRouter = express.Router();

adminRouter.route("/addItems").post(addItems);

export default adminRouter;

