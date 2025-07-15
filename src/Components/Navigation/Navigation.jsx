import { useNavigate } from "react-router-dom";
import { navigationMenu } from "./NavigationMenu";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";
const Navigation = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
    handleClose();
  };
  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-2">
          <img height="80" width="80" src="/Logo.png" alt="" />
        </div>

        {/* <div className="space-y-6">
                    {navigationMenu.map((item) =>
                        <div className="cursor-pointer flex space-x-3 items-center hover:bg-gray-200" onClick={() => item.title === "Profile" ? navigate(`/profile/${auth.user?.id}`) : navigate(item.path)}>

                            {item.icon} <p className="text-xl">{item.title}</p>

                        </div>

                    )}

                </div> */}

        <div className="space-y-6">
          {navigationMenu.map((item) => (
            <div
              key={item.title}
              className="cursor-pointer flex space-x-3 items-center hover:bg-gray-200"
              onClick={() => {
                if (item.title === "Profile") {
                  navigate(`/profile/${auth.user?.id}`);
                } else if (item.title === "Wallet") {
                  navigate(`/profile/${auth.user?.id}#wallet`);
                } else {
                  navigate(item.path);
                }
              }}
            >
              {item.icon} <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>

        {/* <div className='py-5'>
                    <Button
                        sx={{ width: "80%", borderRadius: "29px", py: "15px", bgcolor: "#1d9bf0" }}
                        variant="contained"
                    >
                        Tweet
                    </Button>
                </div> */}

        <div className="py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3 ">
            <Avatar
              alt="username"
              src={auth.user.image}
              className="cursor-pointer  hover:bg-gray-200"
              onClick={() => navigate(`/profile/${auth.user?.id}`)}
            />
            <div>
              <p>{auth.user?.fullName}</p>
              <span className="opacity-70">
                @{auth.user?.fullName.split(" ").join("_").toLowerCase()}
              </span>
            </div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
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
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
