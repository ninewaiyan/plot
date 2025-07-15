import HomeIcon from "@mui/icons-material/Home"
import ExporeIcon from "@mui/icons-material/Explore"
import NotificationIcon from "@mui/icons-material/Notifications"
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PublicIcon from '@mui/icons-material/Public';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';


export const navigationMenu=[

    {
        title:"Home",
        icon: <HomeIcon/>,
        path:"/home"
    },

    // {
    //     title:"Explore",
    //     icon:<ExporeIcon/>,
    //     path:"/explore"
    // },
    {
        title:"Notifications",
        icon:<NotificationIcon/>,
        path:"/notification"
    },
    // {
    //     title:"Messages",
    //     icon:<MessageIcon/>,
    //     path:"/messages"
    // },

    {
        title:"Followers",
         icon:<Diversity2Icon/>,
        path:"/follower"
    },
    {
        title:"Followings",
         icon:<Diversity1Icon/>,
        path:"/following"
    },

    {
        title:"Public",
        icon:<PublicIcon/>,
        path:"/communities"
    },
    {
        title:"Wallet",
        icon:<AssuredWorkloadIcon/>,
        path:""
    },

    // {
    //     title:"Verified",
    //     icon:<VerifiedIcon/>,
    //     path:"/verified"
    // },

    // {
    //     title:"Profile",
    //     icon:<AccountCircleIcon/>,
    //     path:"/verified"
    // },

    // {
    //     title:"More",
    //     icon:<PendingIcon/>,
    //     path:"/more"
    // }
    
    ]