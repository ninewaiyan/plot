import React, { useState, useEffect, useRef } from "react";
import { Box, Drawer, IconButton, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { Route, Routes, useLocation, matchPath } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import Navigation from "../Navigation/Navigation";
import RightPart from "../RightPart/RightPart";
import Profile from "../Profile/Profile";
import PlotDetails from "../PlotDetails/PlotDetails";
import HomeSection1 from "../HomeSection/HomeSection1";
import Wallet from "../Wallet/Wallet";
import ShowNotification from "../RightPart/ShowNotification";
import { Public } from "@mui/icons-material";
import ShowPublic from "../RightPart/ShowPublic";
import ShowFollower from "../RightPart/ShowFollower";
import ShowFollowing from "../RightPart/ShowFollowing";

const DraggableButton = ({ side = "left", icon, onClick, visible }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [posY, setPosY] = useState(100);
  const dragging = useRef(false);
  const startY = useRef(0);
  const buttonRef = useRef(null);

  useEffect(() => {
    const updatePosYLimit = () => {
      const vh = window.innerHeight;
      const btnHeight = buttonRef.current?.offsetHeight || 48;
      if (posY > vh - btnHeight - 10) {
        setPosY(vh - btnHeight - 10);
      }
    };
    updatePosYLimit();
    window.addEventListener("resize", updatePosYLimit);
    return () => window.removeEventListener("resize", updatePosYLimit);
  }, [posY]);

  if (!isMobile || !visible) return null;

  const onPointerDown = (e) => {
    dragging.current = true;
    startY.current = e.clientY;
    document.body.style.userSelect = "none";
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    e.preventDefault();
    const delta = e.clientY - startY.current;
    setPosY((prev) => {
      const vh = window.innerHeight;
      const btnHeight = buttonRef.current?.offsetHeight || 48;
      let next = prev + delta;
      if (next < 10) next = 10;
      if (next > vh - btnHeight - 10) next = vh - btnHeight - 10;
      startY.current = e.clientY;
      return next;
    });
  };
  const onPointerUp = () => {
    dragging.current = false;
    document.body.style.userSelect = "auto";
  };

  return (
    <IconButton
      ref={buttonRef}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      sx={{
        position: "fixed",
        top: posY,
        [side]: 8,
        zIndex: 1300,
        backgroundColor: "white",
        border: "1px solid #ccc",
        "&:hover": { backgroundColor: "#f0f0f0" },
        boxShadow: 1,
        touchAction: "none",
      }}
    >
      {icon}
    </IconButton>
  );
};

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const location = useLocation();

  // Mobile Right drawer control
  useEffect(() => {
    if (!isMobile) return;
    const rightRoutes = [
      "/notifications",
      "/followers",
      "/followings",
      "/public",
    ];
    setOpenRight(rightRoutes.includes(location.pathname));
    setOpenLeft(false);
  }, [location.pathname, isMobile]);

 const showRightSidebar =
  location.pathname === "/" ||
  location.pathname === "/home" ||
  matchPath("/profile/:id", location.pathname) ||
  matchPath("/plot/:id", location.pathname) ||
  ["/notifications", "/followers", "/followings", "/public"].includes(location.pathname)

  return (
    <>
      {/* Mobile Drawers */}
      <Drawer
        anchor="left"
        open={openLeft}
        onClose={() => setOpenLeft(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Navigation />
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={openRight}
        onClose={() => setOpenRight(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Routes>
            <Route path="/notifications" element={<ShowNotification/>} />
            <Route path="/followers" element={<ShowFollower/>} />
            <Route path="/home" element={<RightPart/>} />
            <Route path="/" element={<RightPart/>} />
            <Route path="/followings" element={<ShowFollowing/>} />
            <Route path="/public" element={<ShowPublic/>} />
            <Route path="/plot/:id" element={<RightPart/>} />
          </Routes>
        </Box>
      </Drawer>

      {/* Draggable Buttons */}
      <DraggableButton
        side="left"
        icon={<MenuIcon />}
        onClick={() => setOpenLeft(true)}
        visible={!openLeft && isMobile}
      />
      <DraggableButton
        side="right"
        icon={<KeyboardDoubleArrowLeftIcon />}
        onClick={() => setOpenRight(true)}
        visible={!openRight && isMobile}
      />

      {/* Actual Content (Always visible) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Left - Desktop only */}
        {!isMobile && (
          <Box
            sx={{
              width: "25%",
              borderRight: "1px solid #e0e0e0",
              overflowY: "auto",
              px: 3,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Navigation />
          </Box>
        )}

        {/* Middle Content - Always */}
        <Box
          sx={{
            width: isMobile ? "100%" : showRightSidebar ? "50%" : "75%",
            overflowY: "auto",
            px: { xs: 1, md: 2 },
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Routes>
            <Route path="/" element={<HomeSection1 />} />
            <Route path="/home" element={<HomeSection1 />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/plot/:id" element={<PlotDetails />} />

            {/* Routes that show HomeSection1 in middle and RightPart in side */}
            <Route path="/notifications" element={<HomeSection1 />} />
            <Route path="/followers" element={<HomeSection1 />} />
            <Route path="/followings" element={<HomeSection1 />} />
            <Route path="/public" element={<HomeSection1 />} />
          </Routes>
        </Box>

        {/* Right - Desktop only */}
        {!isMobile && showRightSidebar && (
          <Box
            sx={{
              width: "25%",
              borderLeft: "1px solid #e0e0e0",
              overflowY: "auto",
              px: 2,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >

            <Routes>
            <Route path="/" element={ <RightPart />} />
            <Route path="/home" element={ <RightPart />} />
            <Route path="/wallet" element={ <RightPart />} />
            <Route path="/profile/:id" element={ <RightPart />} />
            <Route path="/plot/:id" element={<RightPart/>} />


            {/* Routes that show HomeSection1 in middle and RightPart in side */}
            <Route path="/notifications" element={<ShowNotification/>} />
            <Route path="/followers" element={<ShowFollower/>} />
            <Route path="/followings" element={<ShowFollowing/>} />
            <Route path="/public" element={<ShowPublic/>} />
          </Routes>
            
           
          </Box>
        )}
      </Box>
    </>
  );
};

export default HomePage;
