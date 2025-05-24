import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, Button, Tab } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import TweetCard from '../HomeSection/TweetCard';
import ProfileModal from './ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById, followUserAction } from '../../Store/Auth/Action';
import { getUsersTweet } from '../../Store/Twit/Action';

const Profile = () => {

    const [tabValue, setTabValue] = useState("1")
    const navigate = useNavigate();
    const [openProfileModal, setOpenProfileModal] = useState(false)
    const handleOpenProfileModal = () => setOpenProfileModal(true);
    const handleClose = () => setOpenProfileModal(false)
    const handleBack = () => navigate(-1)
    const { auth,twit } = useSelector(store => store);
    const dispatch = useDispatch();
    const { id } = useParams()


    const handleFollowUser = () => {
        dispatch(followUserAction(id))
        console.log("open profile model")
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)

        if (newValue === 4) {
            console.log("likes twit")
        } else if (newValue == 1) {
            console.log("user Twits")
        }
    }

    useEffect(() => {
        dispatch(findUserById(id))
        dispatch(getUsersTweet(id))
    }, [id])

    return (
        <div>
            <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>

                <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack}></KeyboardBackspaceIcon>
                <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>
                    {auth.findUser?.fullName}
                </h1>

            </section>

            <section>
                <img
                    src={auth.findUser?.backgroundImage}
                    alt="" className='w-[100%] h-[15rem] object-cover' />
            </section>

            <section className='pl-6'>
                <div className="flex justify-between items-start mt-5 h-[5rem]">
                    <Avatar alt=''
                        className='tranform -translate-y-24'
                        src={auth.findUser?.image}
                        sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
                    />

                    {auth.findUser?.req_user ? (
                        <Button
                            onClick={handleOpenProfileModal}
                            variant='contained' sx={{ borderRadius: "20px" }}
                        >
                            Edit Profile
                        </Button>

                    ) : (

                        <Button
                            onClick={handleFollowUser}
                            variant='contained' sx={{ borderRadius: "20px" }}
                        >
                            {auth.findUser?.followed? "unfollow" : "follow"}
                        </Button>
                    )}

                </div>
                <div>
                    <div className="flex items-center">
                        <h1 className='font-bold text-lg'>
                            {auth.findUser?.fullName}
                        </h1>
                        {true && (
                            <img className="ml-2 w-5 h-5" src="data:image/png;base64,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" alt="" />

                        )}
                    </div>
                    <h1 className='text-gray-500'>@{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}</h1>
                </div>
                <div className='mt-2 space-y-3'>
                    <p>{auth.findUser?.bio}</p>

                    <div className='py-1 flex space-x-5'>
                        <div className="flex items-center text-gray-500">
                            <BusinessCenterIcon></BusinessCenterIcon>
                            <p className="ml-2">Education</p>
                        </div>

                        <div className="flex items-center text-gray-500">
                            <LocationOnIcon></LocationOnIcon>
                            <p className="ml-2">{auth.findUser?.location}</p>
                        </div>

                        <div className="flex items-center text-gray-500">
                            <CalendarMonthIcon></CalendarMonthIcon>
                            <p className="ml-2">Joined Jun 2022</p>
                        </div>

                    </div>

                    <div className="flex items-center space-x-5">

                        <div className="flex items-center space-x-1 font-semibold">
                            <span>{auth.findUser?.following?.length}</span>
                            <span className="text-gray-500">Following</span>

                        </div>
                        <div className="flex items-center space-x-1 font-semibold">
                            <span>{auth.findUser?.followers?.length}</span>
                            <span className="text-gray-500">Followers</span>

                        </div>
                    </div>
                </div>
            </section>
            <section className='py-5'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                <Tab label="Tweets" value="1" />
                                <Tab label="Replies" value="2" />
                                <Tab label="Media" value="3" />
                                <Tab label="Likes" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {twit.twits.map((item)=>(
                                <TweetCard item={item}/>
                            ))}
                        </TabPanel>
                        <TabPanel value="2">Users Replies</TabPanel>
                        <TabPanel value="3">Media</TabPanel>
                        <TabPanel value="4">Likes</TabPanel>

                    </TabContext>
                </Box>
            </section>
            <section>
                <ProfileModal handleClose={handleClose} open={openProfileModal} />
            </section>
        </div>
    )
}

export default Profile