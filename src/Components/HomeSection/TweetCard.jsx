import React, { useState } from 'react'
import RepeatIcon from '@mui/icons-material/Repeat';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteOutlined } from '@mui/icons-material';
import ReplyModal from './ReplyModal';
import { useDispatch } from 'react-redux';
import { createReTweet, likeTweet } from '../../Store/Twit/Action';

const TweetCard = ({ item }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();



    const [openReplyModal, setOpenReplyModal] = useState(false)
    const handleOpenReplyModal = () => setOpenReplyModal(true);
    const handleCloseReplyModal = () => setOpenReplyModal(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeleteTweet = () => {
        console.log("delete tweet");
        handleClose();
    }

    const handleEditTweet = () => {
        console.log("Edit tweet");
        handleClose();
    }



    const handleCreateRetweet = () => {

        dispatch(createReTweet(item?.id))
        console.log("handle create retweet ")
    }

    const handleLiketweet = () => {
        dispatch(likeTweet(item?.id))
        console.log("handle Like Tweet ")
    }

    return (
        <React.Fragment>

            {/* <div className="flex items-center font-semibold text-grey-700 py-2">
            <RepeatIcon/>
            <p>You Retweet</p>

        </div> */}

            <div className="flex space-x-5">
                <Avatar alt='username'
                    onClick={() => navigate(`/profile/${item?.user?.id}`)}
                    className='cursor-pointer'
                    src='data:image/png;base64,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' />


                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex cursor-pointer items-center space-x-2  ">

                            <span className='font-semibold'>{item?.user?.fullName}</span>
                            <span className='text-grey-600 '>
                                @{item?.user?.fullName.split(" ").join("_").toLowerCase()} . 2m</span>
                            <img className="ml-2 w-5 h-5" src="data:image/png;base64,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" alt="" />

                        </div>
                        <div>

                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MoreHorizIcon />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                                <MenuItem onClick={handleEditTweet}>Edit</MenuItem>

                            </Menu>

                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="cursor-pointer"
                            onClick={() => navigate(`/twit/${item?.id}`)}
                        >
                            <p className="mb-2 p-0">
                                {item?.content}
                            </p>
                            {item?.image && (
                                item.image.endsWith('.mp4') ? (
                                    <video controls className="w-full rounded-lg mt-2">
                                        <source src={item.image} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img src={item.image} alt="" className="w-full rounded-lg mt-2" />
                                )
                            )}
                        </div>
                        <div className='py-5 flex flex-warp justify-between items-center'>
                            <div className='space-x-3 flex items-center text-gray-600'>
                                <ChatBubbleOutlineIcon className='cursor-pointer' onClick={handleOpenReplyModal}></ChatBubbleOutlineIcon>
                                <p>
                                    {item?.totalReplies}
                                </p>
                            </div>

                            <div className={`${item?.retwit ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
                                <RepeatIcon onClick={handleCreateRetweet}
                                    className='cursor-pointer'></RepeatIcon>
                                <p>
                                    {item?.totalRetweets}
                                </p>

                            </div>

                            <div className={`${item?.liked ? "text-pink-600" : "text-gray-600"} space-x-3 flex items-center`}>
                                {item?.liked ?
                                    < FavoriteOutlined onClick={handleLiketweet}
                                        className='cursor-pointer' /> :

                                    <FavoriteIcon onClick={handleLiketweet}
                                        className='cursor-pointer' />}
                                <p>
                                    {item?.totalLikes}
                                </p>

                            </div>

                            <div className='space-x-3 flex items-center text-gray-600'>
                                <BarChartIcon className='cursor-pointer' onClick={handleOpenReplyModal}></BarChartIcon>
                                <p>430</p>
                            </div>

                            <div className='space-x-3 flex items-center text-gray-600'>
                                <FileUploadIcon className='cursor-pointer' onClick={handleOpenReplyModal} />
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <section>
                <ReplyModal item={item} open={openReplyModal} handleClose={handleCloseReplyModal} />
            </section>



        </React.Fragment>
    )
}

export default TweetCard