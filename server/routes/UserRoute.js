import express from "express"
import { checkAuth, logIn, signUp, updateProfile } from "../controllers/UserController.js"
import { protectedRoute } from "../middlewares/auth.js"

const userRouter = express.Router()

userRouter.post("/signup", signUp)
userRouter.post("/login", logIn)
userRouter.put("/update-profile", protectedRoute, updateProfile)
userRouter.get("/check-auth", protectedRoute, checkAuth)

export default userRouter
