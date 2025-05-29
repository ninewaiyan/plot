import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../Store/Auth/Action';
import { uploadToCloudinary } from '../../Utils/uploadToCloudnary';
import "./ProfileModal.css";

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
  outline: 'none',
  borderRadius: 4,
};

export default function ProfileModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const [uploading, setUploading] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(auth.user?.image || '');
  const [selectedBg, setSelectedBg] = React.useState(auth.user?.backgroundImage || '');

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    // website: Yup.string().url('Enter a valid URL').nullable(),
    location: Yup.string().nullable(),
    bio: Yup.string().max(160, 'Bio must be at most 160 characters').nullable(),
    // we’ll handle file validation manually in the change handler
    backgroundImage: Yup.string().nullable(),
    image: Yup.string().nullable(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: auth.user?.fullName || '',
      website: auth.user?.website || '',
      location: auth.user?.location || '',
      bio: auth.user?.bio || '',
      backgroundImage: auth.user?.backgroundImage || '',
      image: auth.user?.image || '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateUserProfile(values));
      handleClose();
    },
  });

  const handleImageChange = async (event) => {
    const { name, files } = event.target;
    if (!files?.length) return;

    const file = files[0];
    // Only images allowed
    if (!file.type.startsWith('image/')) {
      formik.setFieldError(name, 'Only image files are allowed');
      return;
    }
    formik.setFieldError(name, '');

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      formik.setFieldValue(name, url);
      if (name === 'image') setSelectedImage(url);
      else setSelectedBg(url);
    } catch {
      formik.setFieldError(name, 'Upload failed—please try again');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">Edit Profile</Typography>
            </div>
            <Button type="submit">Save</Button>
          </div>

          <div className="hideScrollBar overflow-y-scroll h-[80vh] mt-4 pr-2">
            {/* Background */}
            <div className="relative mb-6">
              <img
                src={selectedBg}
                alt="Background"
                className="w-full h-[12rem] object-cover rounded"
              />
              <input
                type="file"
                name="backgroundImage"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
                disabled={uploading}
              />
              {formik.errors.backgroundImage && (
                <Typography color="error" variant="caption">
                  {formik.errors.backgroundImage}
                </Typography>
              )}
            </div>

            {/* Avatar */}
            <div className="relative ml-4 mb-6">
              <Avatar
                sx={{ width: '10rem', height: '10rem', border: '4px solid white' }}
                src={selectedImage}
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                className="absolute top-0 left-0 w-[10rem] h-[10rem] opacity-0 cursor-pointer"
                onChange={handleImageChange}
                disabled={uploading}
              />
              {formik.errors.image && (
                <Typography color="error" variant="caption">
                  {formik.errors.image}
                </Typography>
              )}
            </div>

            {/* Text fields */}
            <div className="space-y-3 px-4">
              <TextField
                fullWidth
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                id="bio"
                name="bio"
                label="Bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
              />

              <TextField
                fullWidth
                id="website"
                name="website"
                label="Website"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
              />

              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />
            </div>

            {/* Static birthday */}
            <div className="my-3 px-4">
              <Typography variant="subtitle1">Birthday</Typography>
              <Typography variant="body1">October 26, 1999</Typography>
            </div>

            <Typography className="px-4 py-2" variant="body1">
              Edit Professional Profile
            </Typography>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
