import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Box,
  Badge,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LogoutIcon from "@mui/icons-material/Logout";
import { navigationMenu } from "./NavigationMenu";
import { logout } from "../../Store/Auth/Action";
import { markAllNotificationsAsRead } from "../../Store/Notification/Action";

const Navigation = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  // Count unread notifications
  const unreadCount = auth.user?.notifications
    ? auth.user.notifications.filter((n) => !n.read).length
    : 0;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        height: "100vh",
        position: "sticky",
        top: 0,
        width: 280,
        bgcolor: "background.paper",
        p: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <Box sx={{ py: 2, textAlign: "center" }}>
        <img src="/Logo.png" alt="Logo" width={80} height={80} />
      </Box>

      {/* Navigation Menu */}
      <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
        {navigationMenu.map((item) => {
          const isNotifications = item.title === "Notifications";

          return (
            <NavLink
              key={item.title}
              to={
                item.title === "Profile"
                  ? `/profile/${auth.user?.id}`
                  : item.title === "Wallet"
                  ? `/profile/${auth.user?.id}#wallet`
                  : item.path
              }
              onClick={() => {
                if (isNotifications && unreadCount > 0) {
                  dispatch(markAllNotificationsAsRead());
                }
              }}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#1976d2" : "inherit",
                backgroundColor: isActive
                  ? "rgba(25, 118, 210, 0.15)"
                  : "transparent",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "12px 16px",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                transition: "background-color 0.25s ease, color 0.25s ease",
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  transition: "transform 0.25s ease",
                  color: "inherit",
                }}
              >
                {isNotifications ? (
                  <Badge
                    badgeContent={unreadCount}
                    color="error"
                    max={99}
                    overlap="circular"
                  >
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </Box>

              <Typography
                variant="body1"
                sx={{ userSelect: "none", pointerEvents: "none" }}
              >
                {item.title}
              </Typography>
            </NavLink>
          );
        })}
      </Stack>

      {/* User Profile and Menu */}
      <Box sx={{ pt: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={auth.user?.image}
            alt={auth.user?.fullName}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/profile/${auth.user?.id}`)}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontWeight={700}>
              {auth.user?.fullName?.length > 8
                ? `${auth.user.fullName.slice(0, 8)}...`
                : auth.user?.fullName}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ userSelect: "none" }}
            >
              @{auth.user?.fullName?.split(" ").join("_").toLowerCase()}
            </Typography>
          </Box>
          <Button
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuOpen}
            sx={{ minWidth: "auto", p: 1 }}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogout} sx={{ gap: 1 }}>
              <LogoutIcon fontSize="small" /> Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Box>
    </Box>
  );
};

export default Navigation;
