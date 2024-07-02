import express from "express";
import addItems from "../controllers/addItems.js";
import makeAdmin from "../controllers/makeAdmin.js";
const adminRouter = express.Router();

adminRouter.route("/addItems").post(addItems);
adminRouter.route("/makeAdmin").post(makeAdmin);

export default adminRouter;

