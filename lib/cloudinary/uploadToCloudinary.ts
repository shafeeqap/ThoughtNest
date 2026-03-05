import cloudinary from "./cloudinary";
import { UploadApiResponse } from "cloudinary";

const uploadToCloudinary = (
  buffer: Buffer,
  folder: string
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);
        }
      }
    );
    
    stream.end(buffer);
  });
};

export default uploadToCloudinary;
