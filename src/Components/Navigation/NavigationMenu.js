import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import PublicIcon from "@mui/icons-material/Public";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";

export const navigationMenu = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/home",
  },
  {
    title: "Notifications",
    icon: <NotificationsIcon />,
    path: "/notifications",
  },

  {
    title: "Followings",
    icon: <Diversity1Icon />,
    path: "/followings",
  },
    {
    title: "Followers",
    icon: <Diversity2Icon />,
    path: "/followers",
  },
  {
    title: "Public",
    icon: <PublicIcon />,
    path: "/public",
  },
  {
    title: "Wallet",
    icon: <AssuredWorkloadIcon />,
    path: "/wallet",
  },
];
