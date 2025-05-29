export const uploadToCloudinary = async (file) => {
  if (!file) {
    console.log("No file selected");
    return;
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "plotApp");
  data.append("cloud_name", "dzsh1sn9w");

  // Detect file type (image or video)
  const isVideo = file.type.startsWith("video/");
  const uploadType = isVideo ? "video" : "image";

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/dzsh1sn9w/${uploadType}/upload`, {
      method: "POST",
      body: data
    });

    const fileData = await res.json();
    return fileData.url;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
