import { toast } from "sonner";

// const upload_preset = process.env.VITE_CLOUDINARY_UPLOAD_PRESET;
// const api_key = process.env.VITE_CLOUDINARY_API_KEY;
// const cloud_name = process.env.VITE_CLOUDINARY_CLOUD_NAME;

export const uploadImageInCloudinary = async (
  file: any,
  toastId?: string | number
) => {
  const imageFile = file[0]?.originFileObj || file;
  const imageData = new FormData();
  imageData.append("file", imageFile);
  // imageData.append("upload_preset", upload_preset ?? "");
  // imageData.append("api_key", api_key ?? "");
  imageData.append("upload_preset", "labone_preset");
  imageData.append("api_key", "855284155988226");
  imageData.append("timestamp", String(Date.now() / 1000));

  try {
    const response = await fetch(
      // `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      `https://api.cloudinary.com/v1_1/dz4ckryd6/image/upload`,
      {
        method: "POST",
        body: imageData,
      }
    );
    const result = await response.json();

    return result.secure_url;
  } catch (error: any) {
    toastId && toast.error("Failed to upload image", { id: toastId });
    // console.log("Cloudinary upload error--=>:", error);
    return;
  }
};
