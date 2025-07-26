import express from "express"
import cors from "cors"
import http from "http"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"

dotenv.config()

// create express app and http server
const app = express()
const server = http.createServer(app)

// middleware setup 
app.use(express.json({ limit: "4mb" }))
app.use(cors())

// Test Route
app.use("/api/status", (req, res) => {
    res.send("Server is Live..")
})

// start server

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log("Server is Running on PORT", PORT)
    connectDB();
})