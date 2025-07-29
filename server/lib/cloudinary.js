// cloudinary.js
import dotenv from "dotenv"
dotenv.config()

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME?.trim(),
    api_key: process.env.CLOUDINARY_API_KEY?.trim(),
    api_secret: process.env.CLOUDINARY_SECRET?.trim()
})

export default cloudinary
