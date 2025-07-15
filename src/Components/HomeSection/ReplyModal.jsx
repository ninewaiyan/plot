import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Avatar, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createTweetReply } from '../../Store/Twit/Action';
import { uploadToCloudinary } from '../../Utils/uploadToCloudnary';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function ReplyModal({ open, handleClose, item }) {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewType, setPreviewType] = useState(''); // 'image' or 'video'
  const [mediaError, setMediaError] = useState('');

  const formik = useFormik({
    initialValues: {
      content: '',
      image: '',
      twitId: item?.id || '',
    },
    validationSchema: Yup.object({
      content: Yup.string().required('Reply text is required'),
      image: Yup.string().nullable(),
    }),
    onSubmit: (values) => {
      dispatch(createTweetReply(values));
      handleClose();
    },
  });

  
  const handleSelectMedia = async (e) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    formik.setFieldTouched('image', true);
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setMediaError('Only image or video files are allowed');
      return;
    }
    setMediaError('');

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      formik.setFieldValue('image', url);
      setPreviewUrl(url);
      setPreviewType(file.type.startsWith('video/') ? 'video' : 'image');
    } catch {
      setMediaError('Upload failed—please try again');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Reply to @{item?.user?.fullName}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box display="flex" mb={2} alignItems="flex-start" gap={2}>
          <Avatar src={item?.user?.image} />
          <Box flexGrow={1}>
            <form onSubmit={formik.handleSubmit} noValidate>
              <TextField
                fullWidth
                multiline
                minRows={2}
                name="content"
                placeholder="Write your reply..."
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
              />

              {/* media input & preview */}
              <Box display="flex" alignItems="center" mt={1} gap={1}>
                <label>
                  <ImageIcon color="primary" style={{ cursor: 'pointer' }} />
                  <input
                    type="file"
                    accept="image/*,video/*"
                    style={{ display: 'none' }}
                    onChange={handleSelectMedia}
                  />
                </label>
                {uploading && <Typography>Uploading…</Typography>}
                {formik.touched.image && formik.errors.image && (
                  <Typography color="error" variant="caption">
                    {formik.errors.image}
                  </Typography>
                )}
                {mediaError && !formik.errors.image && (
                  <Typography color="error" variant="caption">
                    {mediaError}
                  </Typography>
                )}
              </Box>

              {previewUrl && previewType === 'image' && (
                <Box mt={2}>
                  <img
                    src={previewUrl}
                    alt="preview"
                    style={{ maxWidth: '100%', borderRadius: 8 }}
                  />
                </Box>
              )}
              {previewUrl && previewType === 'video' && (
                <Box mt={2}>
                  <video controls style={{ maxWidth: '100%', borderRadius: 8 }}>
                    <source src={previewUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
              )}

              <Box mt={2} textAlign="right">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={uploading || !formik.values.content}
                >
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