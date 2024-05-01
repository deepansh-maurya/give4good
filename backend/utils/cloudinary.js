import { v2 as cloudinary } from "cloudinary";

export const upoadFile = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
  const response = await cloudinary.uploader.upload(file, {
    public_id: "olympic_flag",
  });

  return response.url;
};
