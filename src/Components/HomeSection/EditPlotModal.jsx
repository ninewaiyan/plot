import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadToCloudinary } from "../../Utils/uploadToCloudnary";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const isValidMedia = (file) => {
  const type = file.type;
  return type.startsWith("image/") || type === "video/mp4";
};

const EditPlotModal = ({ open, onClose, plot, onSubmit }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mediaError, setMediaError] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (plot?.media) {
      setMedia(plot.media);
      setMediaPreview(plot.media);
    } else {
      setMedia(null);
      setMediaPreview(null);
    }
    setMediaError("");
  }, [plot]);

  const formik = useFormik({
    initialValues: {
      content: plot?.content || "",
      newMediaFile: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: async (values) => {
      let mediaUrl = media;

      if (values.newMediaFile) {
        setUploading(true);
        try {
          mediaUrl = await uploadToCloudinary(values.newMediaFile);
          setMedia(mediaUrl);
          setMediaPreview(mediaUrl);
        } catch {
          setMediaError("Upload failed. Please try again.");
          setUploading(false);
          return;
        }
        setUploading(false);
      }

      onSubmit({ content: values.content, media: mediaUrl });
    },
  });

  const handleMediaChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidMedia(file)) {
      setMediaError("Only .jpg/.png/.mp4 files are allowed.");
      return;
    }

    setMediaError("");
    setMedia(file);
    setMediaPreview(URL.createObjectURL(file));
    formik.setFieldValue("newMediaFile", file);
  };

  const clearMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    setMediaError("");
    formik.setFieldValue("newMediaFile", null);
  };

  const isVideo = () => {
    if (formik.values.newMediaFile) {
      return formik.values.newMediaFile.type === "video/mp4";
    }
    return typeof mediaPreview === "string" && mediaPreview.endsWith(".mp4");
  };

  // Disable update button if uploading, content empty, or no changes
  const isContentChanged = formik.values.content.trim() !== (plot?.content || "").trim();
  const isMediaChanged = (() => {
    if (formik.values.newMediaFile) return true;
    if (media !== plot?.media) return true;
    return false;
  })();

  const isSubmitDisabled =
    uploading ||
    formik.values.content.trim() === "" ||
    (!isContentChanged && !isMediaChanged);

  const handleEmojiSelect = (emoji) => {
    formik.setFieldValue("content", formik.values.content + emoji.native);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 3,
          p: 4,
          width: isMobile ? "90%" : 520,
          mx: "auto",
          mt: "12vh",
          boxShadow: 24,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Edit Plot
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content Field */}
        <Box position="relative">
          <TextField
            fullWidth
            multiline
            minRows={3}
            name="content"
            placeholder="Edit your plot content..."
            value={formik.values.content}
            onChange={formik.handleChange}
            onClick={() => setShowEmojiPicker(false)}
          />
          <IconButton
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            sx={{ position: "absolute", bottom: 8, right: 8 }}
          >
            <EmojiEmotionsIcon color="primary" />
          </IconButton>
        </Box>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <Box mt={1} zIndex={1000}>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </Box>
        )}

        {/* Media Preview */}
        {mediaPreview && (
          <Box
            sx={{
              position: "relative",
              mt: 2,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 1,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            {uploading && (
              <CircularProgress
                size={48}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: 1,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}

            {isVideo() ? (
              <video
                controls
                style={{
                  width: "100%",
                  borderRadius: 8,
                  filter: uploading ? "blur(3px)" : "none",
                }}
              >
                <source src={mediaPreview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={mediaPreview}
                alt="Media Preview"
                style={{
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "cover",
                  borderRadius: 8,
                  filter: uploading ? "blur(3px)" : "none",
                }}
              />
            )}

            {/* Remove Media Button */}
            <Tooltip title="Remove media" arrow>
              <IconButton
                size="small"
                onClick={clearMedia}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                }}
                disabled={uploading}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Upload Media */}
        {!mediaPreview && (
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
            disabled={uploading}
            startIcon={<ImageIcon />}
          >
            Upload 
            <input
              type="file"
              hidden
              accept="image/jpeg,image/png,video/mp4"
              onChange={handleMediaChange}
            />
          </Button>
        )}

        {/* Error */}
        {mediaError && (
          <Typography variant="caption" color="error" sx={{ display: "block", mt: 1 }}>
            {mediaError}
          </Typography>
        )}

        {/* Action Buttons */}
        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={formik.handleSubmit}
            variant="contained"
            disabled={isSubmitDisabled}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditPlotModal;
