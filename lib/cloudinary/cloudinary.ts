import { v2 as cloudinary } from "cloudinary";

// console.log(process.env.CLOUDINARY_CLOUD_NAME, 'cloud name env var...');
// console.log(process.env.CLOUDINARY_API_KEY, 'cloud api key env var...');
// console.log("Secret:", process.env.CLOUDINARY_API_SECRET?.slice(0,5))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
