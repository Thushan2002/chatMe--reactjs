
import jwt from "jsonwebtoken"
import User from "../models/UserModel"
// middleware for user authentication

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.headers.token
        if (!token) {
            res.json({ success: false, message: "No token provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            res.json({ success: false, message: "Invalid token" })
        }
        const user = await User.findById({ _id: decoded.userId }).select("-password")
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