import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
})

export default cloudinary