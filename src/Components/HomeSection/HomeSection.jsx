import { Avatar, Button } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { createPlot, getAllPlots } from '../../Store/Plot/Action';
import { uploadToCloudinary } from '../../Utils/uploadToCloudnary';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import PlotCard from './PlotCard';

const validationSchema = Yup.object()
  .shape({
    content: Yup.string(),
    media: Yup.string(),
  })
  .test(
    'at-least-one',
    'Enter content or upload media',
    function (value) {
      return value.content?.trim() || value.media?.trim();
    }
  );

const HomeSection1 = () => {
  const dispatch = useDispatch();
  const { auth, plot } = useSelector((s) => s);

  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [mediaError, setMediaError] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const formik = useFormik({
    initialValues: {
      content: '',
      media: '',
    },
    validationSchema,
    onSubmit: (values, actions) => {
      dispatch(createPlot(values));
      console.log("Create Plot Values =>", values);
      actions.resetForm();
      setSelectedMedia('');
      setMediaType('');
      setMediaError('');
      setShowEmojiPicker(false);
    },
  });

  useEffect(() => {
    dispatch(getAllPlots());
  }, [dispatch, plot.like, plot.collect]);

  const handleSelectMedia = async (e) => {
    const file = e.target.files[0];
    formik.setFieldTouched('media', true);
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setMediaError('Only image or video files are allowed');
      return;
    }

    setMediaError('');
    setUploadingMedia(true);

    try {
      const url = await uploadToCloudinary(file);
      formik.setFieldValue('media', url);
      setSelectedMedia(url);
      setMediaType(file.type.startsWith('video/') ? 'video' : 'image');
    } catch (error) {
      console.error("Upload error:", error);
      setMediaError('Upload failed—please try again');
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    formik.setFieldValue('content', formik.values.content + emoji.native);
  };

  const handleCancelMedia = () => {
    setSelectedMedia('');
    setMediaType('');
    formik.setFieldValue('media', '');
    formik.setFieldTouched('media', false);
  };

  return (
    <div className="space-y-5 max-w-xl mx-auto ">
      <h1 className="py-2 text-2xl font-bold text-gray-800">Home</h1>

      <section className="bg-white rounded-xl  p-5 relative"
       style={{ boxShadow: "0 0 8px 3px rgba(69, 172, 220, 0.2)" }}
      >
        <div className="flex space-x-4">
          <Avatar alt="user" src={auth.user.image} />

          <form className="w-full space-y-4" onSubmit={formik.handleSubmit}>
            <textarea
              rows="3"
              name="content"
              placeholder="What's on your mind?"
              className="w-full resize-none outline-none border-b text-lg px-2 py-2 focus:ring-0"
              {...formik.getFieldProps('content')}
            />
            {formik.touched.content && formik.errors.content && (
              <p className="text-red-500 text-sm">{formik.errors.content}</p>
            )}

            <div className="flex justify-between items-center relative">
              <div className="flex space-x-4 items-center">
                <label className="cursor-pointer flex items-center space-x-1">
                  <ImageIcon className="text-blue-500" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={handleSelectMedia}
                  />
                </label>

                <FmdGoodIcon className="text-blue-500" />

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                  >
                    <TagFacesIcon className="text-blue-500" />
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute z-10 top-12 right-30">
                      <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        theme="light"
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button
                variant="contained"
                type="submit"
                disabled={
                  uploadingMedia ||
                  (!formik.values.content.trim() &&
                    !formik.values.media.trim())
                }
                sx={{
                  borderRadius: '20px',
                  paddingX: '24px',
                  paddingY: '8px',
                  backgroundColor: '#1d9bf0',
                }}
              >
                {uploadingMedia ? 'Uploading...' : 'Plot'}
              </Button>
            </div>

            {/* Errors */}
            {formik.errors.media && formik.touched.media && (
              <p className="text-red-500 text-sm">{formik.errors.media}</p>
            )}
            {mediaError && !formik.errors.media && (
              <p className="text-red-500 text-sm">{mediaError}</p>
            )}

            {/* Media Preview with Cancel Button */}
            {selectedMedia && (
              <div className="relative mt-3 w-full rounded-md overflow-hidden">
                <button
                  type="button"
                  onClick={handleCancelMedia}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-600 shadow hover:text-red-500 z-20"
                >
                  <CloseIcon fontSize="small" />
                </button>

                {mediaType === 'image' ? (
                  <img
                    src={selectedMedia}
                    alt="preview"
                    className="w-full rounded-md"
                  />
                ) : (
                  <video controls className="w-full rounded-md">
                    <source src={selectedMedia} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
          </form>
        </div>
      </section>

      <section>
        {plot.plots?.map((item, i) => (
          <PlotCard key={i} item={item} />
        ))}
      </section>
    </div>
  );
};

export default HomeSection1;
