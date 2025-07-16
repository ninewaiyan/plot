import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatTimeAgo } from "../../Utils/formatTimeAgo";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import { deleteNotification } from "../../Store/Notification/Action";

const ShowNotification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const notifications = auth.user?.notifications || [];
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Menu state for each notification
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuOpenId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpenId(null);
  };

  const handleDelete = (id) => {
    // TODO: Dispatch delete action or call API to remove notification
    dispatch(deleteNotification(id)); // Call redux action
    console.log("Delete notification id:", id);
    handleMenuClose();
  };

  return (
    <Box sx={{ p: 1 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
        textAlign="left"
        color="primary"
      >
        Notifications
      </Typography>

      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {sortedNotifications.length === 0 ? (
          <Typography
            variant="body2"
            align="left"
            color="text.secondary"
            sx={{ p: 1 }}
          >
            No notifications yet.
          </Typography>
        ) : (
          sortedNotifications.map((notif) => {
            const sender = notif.senderUser;
            const isUnread = !notif.read;
            const isResent =
              notif.createdAt &&
              (new Date().getTime() - new Date(notif.createdAt).getTime()) /
                1000 <
                180; // within 3 minutes

            const timeAgo = notif.createdAt
              ? formatTimeAgo(new Date(notif.createdAt), {
                  addSuffix: true,
                })
              : "";

            return (
              <ListItem
                key={notif.id}
                sx={{
                  bgcolor:
                    isUnread || isResent
                      ? "rgba(60, 187, 216, 0.1)"
                      : "rgba(45, 49, 57, 0.1)",
                  borderRadius: 2,
                  mb: 1,
                  position: "relative",
                  boxShadow:
                    isUnread || isResent
                      ? "0 0 8px 3px rgba(51, 164, 216, 0.2)"
                      : "none",
                }}
                alignItems="flex-start"
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="more"
                      aria-controls={
                        menuOpenId === notif.id ? "notif-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={
                        menuOpenId === notif.id ? "true" : undefined
                      }
                      onClick={(e) => handleMenuOpen(e, notif.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="notif-menu"
                      anchorEl={anchorEl}
                      open={menuOpenId === notif.id}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem onClick={() => handleDelete(notif.id)}>
                        <DeleteForeverIcon color="error"></DeleteForeverIcon>
                        Delete
                      </MenuItem>
                    </Menu>
                  </>
                }
              >
                <ListItemAvatar>
                  {sender ? (
                    <Avatar
                      alt={sender.fullName}
                      src={sender.image}
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`/profile/${sender.id}`)}
                    />
                  ) : (
                    <Avatar src="/Logo.png" className="bx-border-circle" />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        {sender
                          ? sender.fullName?.length > 10
                            ? sender.fullName.slice(0, 10) + "..."
                            : sender.fullName
                          : "Plot"}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 2, whiteSpace: "nowrap" }}
                      >
                        {timeAgo}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ whiteSpace: "normal" }}
                    >
                      {notif.message}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })
        )}
      </List>
    </Box>
  );
};

export default ShowNotification;
