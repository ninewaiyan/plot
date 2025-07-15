
import React, { useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteOutlined, LibraryAdd } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import ReplotModal from "./ReplotModal";
import TransferModal from "../Wallet/TransferModal";
import { likePlot, collect, findPlotsById, findPlotsByLikeContainUser } from "./../../Store/Plot/Action";
import { formatTimeAgo } from "../../Utils/formatTimeAgo";
import { formatNumber } from "../../Utils/formatNumber";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import VolunteerActivismTwoToneIcon from "@mui/icons-material/VolunteerActivismTwoTone";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const PlotCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const plotId = item?.id;
  const [openReplotModal, setOpenReplotModal] = useState(false);
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [showFullText, setShowFullText] = useState(false);

  const handleOpenReplotModal = () => setOpenReplotModal(true);
  const handleCloseReplotModal = () => setOpenReplotModal(false);
  const { user } = useSelector((store) => store.auth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePlot = () => {
    console.log("delete plot");
    handleClose();
  };

  const handleEditPlot = () => {
    console.log("Edit plot");
    handleClose();
  };

  const handleCollect = () => {
    dispatch(
      collect(plotId, () => {
        if (location.pathname.includes("/plot/")) {
          dispatch(findPlotsById(plotId));
        }
      })
    );
  };

  const handleLikeplot = () => {
    dispatch(
      likePlot(plotId, () => {
        if (location.pathname.includes("/plot/")) {
          dispatch(findPlotsById(plotId));
        }
      })
    );
  };

  const handleTransfer = (receiverId) => {
    console.log("Transfer to:", receiverId);
    setSelectedUserId(receiverId);
    setOpenTransferModal(true);
    handleClose();
  };

  return (
    <React.Fragment>
      <div className="flex mt-3">
        <Avatar
          alt="username"
          onClick={() => navigate(`/profile/${item?.user?.id}`)}
          className="cursor-pointer mr-2"
          src={item?.user?.image}
        />

        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{item?.user?.fullName}</span>
              <img className="ml-2 w-5 h-5" src="/verfied_logo.png" alt="" />
              <span className="text-grey-600">
                . <small>{formatTimeAgo(item?.createdAt)}</small>
              </span>
            </div>
            <div>
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
                MenuListProps={{ "aria-labelledby": "basic-button" }}
              >
                {user?.email === item?.user?.email ? (
                  <>
                    <MenuItem onClick={handleDeletePlot}>Delete</MenuItem>
                    <MenuItem onClick={handleEditPlot}>Edit</MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={() => handleTransfer(item.user.id)}>
                    Transfer
                  </MenuItem>
                )}
              </Menu>
            </div>
          </div>

          <div className="mt-1">
            <div
              className="cursor-pointer"
              onClick={() => navigate(`/plot/${item?.id}`)}
            >
              <p
                className={`mb-2 p-0 text-justify whitespace-pre-wrap ${
                  showFullText ? "" : "line-clamp-3"
                } ${item?.content?.length < 100 ? "text-2xl" : "text-base"}`}
              >
                {item?.content}
              </p>

              {item?.content?.length > 200 && (
                <button
                  onClick={() => setShowFullText((prev) => !prev)}
                  className="text-sm text-blue-500 hover:underline mb-2"
                >
                  {showFullText ? "See less" : "See more"}
                </button>
              )}

              {item?.media &&
                (item.media.endsWith(".mp4") ? (
                  <video controls className="w-full rounded-lg mt-2">
                    <source src={item.media} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={item.media}
                    alt="plot-media"
                    className="w-full rounded-lg mt-2"
                  />
                ))}
            </div>

            <div className="py-2 px-1 flex flex-wrap justify-between items-center border rounded-xl shadow-sm border-blue-500 mt-2">
              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon />
                <p>{formatNumber(item?.views)}</p>
              </div>

              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplotModal}
                />
                <p>{formatNumber(item?.totalReplot)}</p>
              </div>

              <div
                className={`${
                  item?.liked ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                {item?.liked ? (
                  <FavoriteOutlined
                    onClick={handleLikeplot}
                    className="cursor-pointer"
                  />
                ) : (
                  <FavoriteIcon
                    onClick={handleLikeplot}
                    className="cursor-pointer"
                  />
                )}
                <p>{formatNumber(item?.totalLikes)}</p>
              </div>

              <div
                className={`${
                  item?.collected ? "text-pink-600" : "text-gray-600"
                } space-x-3 flex items-center`}
              >
                <LibraryAdd
                  onClick={handleCollect}
                  className="cursor-pointer"
                />
                <p>{formatNumber(item?.totalCollects)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReplotModal
        item={item}
        open={openReplotModal}
        handleClose={handleCloseReplotModal}
      />

      <TransferModal
        open={openTransferModal}
        handleClose={() => setOpenTransferModal(false)}
        initialUserId={selectedUserId || null} 
      />
    </React.Fragment>
  );
};

export default PlotCard;
