import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import { configDotenv } from "dotenv"
// middleware for user authentication

export const protectedRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.json({ success: false, message: "No token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.json({ success: false, message: "Invalid token" })
        }

        const user = await User.findById({ _id: decoded.id }).select("-password")
        if (!user) {
            return res.status(404).json({ error: "No User Found" });
        }
        req.user = user
        next()

    } catch (error) {
        console.log(`Error in auth Controller ${error}`);
        res.status(500).json({ error: "Internal Server Error" })
    }

}