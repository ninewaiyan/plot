import { Avatar, Button } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TweetCard from './TweetCard';
import { useDispatch, useSelector } from 'react-redux';
import { createTweet, getAllTweets } from '../../Store/Twit/Action';
import { uploadToCloudinary } from '../../Utils/uploadToCloudnary';

const validationSchema = Yup.object().shape({
  content: Yup.string().required('Plot text is required'),
  image: Yup.string().required('Please upload an image or video')
});

const HomeSection = () => {
  const dispatch = useDispatch();
  const {auth, twit } = useSelector(s => s);
 

  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState('');
  const [mediaType, setMediaType] = useState(''); // "image" or "video"
  const [mediaError, setMediaError] = useState('');

  const formik = useFormik({
    initialValues: {
      content: '',
        image: ''      // will hold the uploaded URL
    },
    validationSchema,
    onSubmit: (values, actions) => {
      dispatch(createTweet(values));
      actions.resetForm();
      setSelectedMedia('');
      setMediaType('');
      setMediaError('');
    },
  });

  useEffect(() => {
    dispatch(getAllTweets());
  }, [dispatch, twit.like, twit.retwit]);

  const handleSelectMedia = async e => {
    const file = e.target.files[0];
   formik.setFieldTouched('image', true);
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setMediaError('Only image or video files are allowed');
      return;
    }
    setMediaError('');

    setUploadingMedia(true);
    try {
      const url = await uploadToCloudinary(file);
      const isVideo = file.type.startsWith('video/');
      formik.setFieldValue('image', url);
      setSelectedMedia(url);
      setMediaType(isVideo ? 'video' : 'image');
    } catch {
      setMediaError('Upload failed—please try again');
    } finally {
      setUploadingMedia(false);
    }
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>

      <section className="pb-10">
        <div className="flex space-x-5">
          <Avatar alt="username" src={auth.user.image} />

          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening"
                  className="border-none outline-none text-xl bg-transparent"
                  {...formik.getFieldProps('content')}
                />
                {formik.touched.content && formik.errors.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
                )}
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="mediaFile"
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={handleSelectMedia}
                    />
                  </label>
                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <TagFacesIcon className="text-[#1d9bf0]" />
                </div>

                <Button
                  sx={{
                    width: '100%',
                    borderRadius: '20px',
                    paddingY: '8px',
                    paddingX: '20px',
                    bgcolor: '#1d9bf0',
                  }}
                  variant="contained"
                  type="submit"
                  disabled={uploadingMedia}
                >
                  {uploadingMedia ? 'Uploading...' : 'Tweet'}
                </Button>
              </div>

              {/* Media errors */}
              {formik.touched.media && formik.errors.media && (
                <span className="text-red-500 block mt-1">
                  {formik.errors.media}
                </span>
              )}
              {mediaError && !formik.errors.media && (
                <span className="text-red-500 block mt-1">{mediaError}</span>
              )}
            </form>

            {/* Preview */}
            <div className="mt-3">
              {selectedMedia && mediaType === 'image' && (
                <img
                  src={selectedMedia}
                  alt="uploaded"
                  className="w-[300px] rounded-md"
                />
              )}
              {selectedMedia && mediaType === 'video' && (
                <video
                  controls
                  width="300"
                  className="rounded-md"
                >
                  <source src={selectedMedia} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        {twit.twits.map((item, i) => (
          <TweetCard key={i} item={item} />
        ))}
      </section>
    </div>
  );
};

export default HomeSection; 