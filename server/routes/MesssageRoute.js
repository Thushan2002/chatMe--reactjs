import express from "express";
import { protectedRoute } from "../middlewares/auth.js";
import { fetchAllMessagesOfSelectedUser, getUserForSidebar, markMessageAsSeen } from "../controllers/MessageController.js";

const messageRouter = express.Router()

messageRouter.get("/get-users", protectedRoute, getUserForSidebar)
messageRouter.get("/:id", protectedRoute, fetchAllMessagesOfSelectedUser)
messageRouter.put("/mark/:id", protectedRoute, markMessageAsSeen)

export default messageRouter