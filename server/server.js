import express from "express"
import cors from "cors"
import http from "http"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"
import userRouter from "./routes/UserRoute.js"
import messageRouter from "./routes/MesssageRoute.js"
import { Server } from "socket.io"

dotenv.config()

// create express app and http server
const app = express()
const server = http.createServer(app)

// middleware setup 
app.use(express.json({ limit: "20mb" }))
app.use(cors({ origin: true, credentials: true }))

// initialise socket.io server

export const io = new Server(server, {
    cors: { origin: "*" }
})

// store online users
export const userSocketMap = {} //{userId : socketId}

// socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId
    console.log("User / socket connected", userId);

    if (userId) {
        userSocketMap[userId] = socket.id
    }
    // emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("User / socket disconnected", userId);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})

// Test Route
app.use("/api/status", (req, res) => {
    res.send("Server is Live..")
})

// start server


// system Routes

app.use("/api/auth", userRouter)
app.use("/api/message", messageRouter)

// connect to database
await connectDB()

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000
    server.listen(PORT, () => { console.log("Server is Running on PORT", PORT) })
}

// export server for vercel
export default server
