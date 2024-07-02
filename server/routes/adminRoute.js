import express from "express";
import addItems from "../controllers/addItems.js";
import makeAdmin from "../controllers/makeAdmin.js";
import getAdminDetails from "../controllers/getAdminDetails.js";
import deleteAdminAccount from "../controllers/deleteAdmin.js";
import updateAdminProfile from "../controllers/updateAdminProfile.js";


const adminRouter = express.Router();

adminRouter.route("/addItems").post(addItems);
adminRouter.route("/makeAdmin").post(makeAdmin);
adminRouter.route("/getDetails").get(getAdminDetails);
adminRouter.route("/updateProfile").post(updateAdminProfile);
adminRouter.route("/deleteAccount").post(deleteAdminAccount);

export default adminRouter;