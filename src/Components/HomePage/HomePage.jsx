// import { Grid } from "@mui/material";
// const HomePage=()=>{
//     return (
//         <Grid container xs={12} className='px-5 lg:px-36 justify-between'>

//           <Grid item xs={0} lg={2.5} className='hidden lg:block w-full relative'>
//             <p className=''>Left Part</p>
//           </Grid>

//           <Grid item xs={12} lg={6} className='hidden lg:block w-full relative'>
//             <p className=''>Middle Part</p>
//           </Grid>

//           <Grid item xs={0} lg={6} className='hidden lg:block w-full relative'>
//             <p className=''>Middle Part</p>
//           </Grid>
          
//         </Grid>
       
//     );
// }
// export default HomePage


import { Button, Grid } from "@mui/material";
import Navigation from '../Navigation/Navigation'; // Ensure Navigation component is correctly imported
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import { Route, Routes } from "react-router-dom";
import { Home } from "@mui/icons-material";
import Profile from "../Profile/Profile";
import TwitDetails from "../TwitDetails/TwitDetails"

const HomePage = () => {
  return (
    <Grid 
      container 
      spacing={2} 
      sx={{ px: 5, lg: { px: 36 } }} 
      justifyContent="space-between"
    >
      {/* Left Column */}
      <Grid 
        sx={{ display: 'block', width: '20%' }}
        item
        xs={12} 
        lg={4}  // Each column takes up 4 grid spaces for 3 equal columns
      >
        
        <Navigation></Navigation>
      </Grid>

      {/* Middle Column */}
      <Grid 
          className="px-5 lg:px-5"
        sx={{ display: 'block', width: '40%' }}
        item
        xs={12} 
        lg={4}  // Each column takes up 4 grid spaces for 3 equal columns
      >

        <Routes>
          <Route path="/" element={<HomeSection></HomeSection>}></Route>
          <Route path="/home" element={<HomeSection></HomeSection>}></Route>
          <Route path="/profile/:id"element={<Profile></Profile>}></Route>
          <Route path="/twit/:id" element={<TwitDetails></TwitDetails>}></Route>

        </Routes>
      </Grid>

      {/* Right Column */}
      <Grid 
        sx={{ display: 'block', width: '20%' }}
        item
        xs={12} 
        lg={4}  // Each column takes up 4 grid spaces for 3 equal columns
      >
        <RightPart></RightPart>
      </Grid>
    </Grid>
  );
};

export default HomePage;

