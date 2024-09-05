import express from "express";
import makeAgent from "../controllers/agent/makeAgent.js"
const deliverAgentRouter = express.Router();


deliverAgentRouter.route("/makeAgent").post(makeAgent)



export default deliverAgentRouter;