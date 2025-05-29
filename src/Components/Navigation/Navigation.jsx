import { useNavigate } from "react-router-dom";
import { navigationMenu } from "./NavigationMenu"
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";
const Navigation = () => {

    const dispatch = useDispatch()
    const {auth}=useSelector(store=>store)
    const [anchorEl, setAnchorEl] = React.useState  (null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const handleLogout=()=>{
        console.log("logout");
        dispatch(logout());
        handleClose()
    }
    return (

        <div className='h-screen sticky top-0'>
            <div>
                <div className='py-5' >
                    <img height="30" width="30" src="data:image/jpeg;base64,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" alt="" />

                </div>

                <div className="space-y-6">
                    {navigationMenu.map((item) =>
                        <div className="cursor-pointer flex space-x-3 items-center hover:bg-gray-200" onClick={() => item.title === "Profile" ? navigate(`/profile/${auth.user?.id}`) : navigate(item.path)}>

                            {item.icon} <p className="text-xl">{item.title}</p>

                        </div>

                    )}

                </div>

                {/* <div className='py-5'>
                    <Button
                        sx={{ width: "80%", borderRadius: "29px", py: "15px", bgcolor: "#1d9bf0" }}
                        variant="contained"
                    >
                        Tweet
                    </Button>
                </div> */}

                <div className='py-5 flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        <Avatar
                            alt="username"
                            src={auth.user.image}
                        />
                        <div>
                            <p>{auth.user?.fullName}</p>
                            <span className='opacity-70'>
                                @{auth.user?.fullName.split(" ").join("_").toLowerCase()}</span>
                        </div>
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
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>

                    </div>

                </div>



            </div>
        </div>



    )
}
export default Navigation