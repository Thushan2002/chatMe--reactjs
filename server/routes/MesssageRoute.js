import express from "express";
import { protectedRoute } from "../middlewares/auth.js";
import { fetchAllMessagesOfSelectedUser, getUserForSidebar, markMessageAsSeen, sendMessages } from "../controllers/MessageController.js";

const messageRouter = express.Router()

messageRouter.get("/get-users", protectedRoute, getUserForSidebar)
messageRouter.get("/:id", protectedRoute, fetchAllMessagesOfSelectedUser)
messageRouter.put("/mark/:id", protectedRoute, markMessageAsSeen)
messageRouter.put("/send/:id", protectedRoute, sendMessages)

export default messageRouter