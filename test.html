import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudinary } from "../../Utils/uploadToCloudnary";
import { replot } from "../../Store/Plot/Action";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function ReplotModal({ open, handleClose, item }) {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewType, setPreviewType] = useState("");
  const [mediaError, setMediaError] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const formik = useFormik({
    initialValues: {
      content: "",
      media: "", // renamed from image to media
      plotId: item?.id || "",
    },
    validationSchema: Yup.object({
      content: Yup.string().max(280),
      media: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      console.log("Replot Values =>", values);
      dispatch(replot(values));
      setShowEmojiPicker(false);
      handleClose();
    },
  });

  const handleEmojiSelect = (emoji) => {
    formik.setFieldValue("content", formik.values.content + emoji.native);
  };

  const handleSelectMedia = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      setMediaError("Only image or video files are allowed");
      return;
    }

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      formik.setFieldValue("media", url);
      setPreviewUrl(url);
      setPreviewType(file.type.startsWith("video/") ? "video" : "image");
      setMediaError("");
    } catch {
      setMediaError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Disable Replot if no text and no media
  const isSubmitDisabled =
    uploading || (formik.values.content.trim() === "" && !formik.values.media);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">
            Replot To{" "}
            {user?.email === item?.user?.email
              ? "Yourself"
              : item?.user?.fullName}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box display="flex" gap={2}>
          <Avatar src={item?.user?.image} />
          <Box flexGrow={1}>
            {/* Original plot preview */}
            <Box className="bg-gray-100 text-sm p-3 rounded mb-3">
              {item?.content?.length > 100
                ? item.content.slice(0, 100) + "..."
                : item.content}

              {item?.media && (
                <>
                  {item.media.endsWith(".mp4") ? (
                    <video
                      controls
                      className="mt-2 rounded"
                      style={{ maxHeight: 200, width: "100%", borderRadius: 8 }}
                    >
                      <source src={item.media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={item.media}
                      alt="media"
                      className="mt-2 rounded"
                      style={{
                        maxHeight: 200,
                        maxWidth: "100%",
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  )}
                </>
              )}
            </Box>

            <form onSubmit={formik.handleSubmit}>
              {/* Caption field with emoji and image buttons */}
              <Box position="relative">
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  name="content"
                  placeholder="Add a comment (optional)"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onClick={() => setShowEmojiPicker(false)}
                />

                {/* Emoji & Image Icon */}
                <Box
                  position="absolute"
                  bottom={8}
                  right={8}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <IconButton
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    size="small"
                    aria-label="Insert emoji"
                  >
                    <EmojiEmotionsIcon color="primary"  />
                  </IconButton>

                  <label>
                    <IconButton component="span" size="small" aria-label="Attach media">
                      <ImageIcon color="primary" />
                    </IconButton>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      hidden
                      onChange={handleSelectMedia}
                    />
                  </label>
                </Box>
              </Box>

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <Box mt={1} position="relative" zIndex={1000}>
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </Box>
              )}

              {/* Media preview */}
              {previewUrl && (
                <Box mt={2} position="relative">
                  {previewType === "image" ? (
                    <img
                      src={previewUrl}
                      alt="preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 200,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <video
                      controls
                      style={{
                        maxWidth: "100%",
                        maxHeight: 200,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    >
                      <source src={previewUrl} type="video/mp4" />
                    </video>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => {
                      setPreviewUrl("");
                      setPreviewType("");
                      formik.setFieldValue("media", "");
                    }}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: "rgba(255,255,255,0.7)",
                    }}
                    aria-label="Remove media"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}

              {/* Upload error */}
              {mediaError && (
                <Typography color="error" variant="caption">
                  {mediaError}
                </Typography>
              )}

              {/* Submit */}
              <Box mt={2} textAlign="right">
                <Button type="submit" variant="contained" disabled={isSubmitDisabled}>
                  Replot
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
