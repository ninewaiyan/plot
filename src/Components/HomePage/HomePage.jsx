import { Button, Grid } from "@mui/material";
import Navigation from "../Navigation/Navigation"; // Ensure Navigation component is correctly imported
import RightPart from "../RightPart/RightPart";
import { Route, Routes } from "react-router-dom";
import { Home} from "@mui/icons-material";
import Profile from "../Profile/Profile";
import PlotDetails from "../PlotDetails/PlotDetails";
import HomeSection1 from "../HomeSection/HomeSection1";
import Wallet from "../Wallet/Wallet";
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
        sx={{ display: "block", width: "20%" }}
        item
        xs={12}
        lg={2} // Each column takes up 4 grid spaces for 3 equal columns
      >
        <Navigation></Navigation>
      </Grid>

      {/* Middle Column */}
      <Grid
        className="px-1 lg:px-2"
        sx={{ display: "block", width: "50%" }}
        item
        xs={12}
        lg={4} // Each column takes up 4 grid spaces for 3 equal columns
      >
        {/* <Routes>
          <Route path="/" element={<HomeSection></HomeSection>}></Route>
          <Route path="/home" element={<HomeSection></HomeSection>}></Route>
          <Route path="/profile/:id"element={<Profile></Profile>}></Route>
          <Route path="/twit/:id" element={<TwitDetails></TwitDetails>}></Route>

        </Routes> */}

        <Routes>
          <Route path="/" element={<HomeSection1></HomeSection1>}></Route>
          <Route path="/home" element={<HomeSection1></HomeSection1>}></Route>
          <Route path="/wallet" element={<Wallet></Wallet>}></Route>

          <Route path="/profile/:id" element={<Profile></Profile>}></Route>
          <Route path="/plot/:id" element={<PlotDetails></PlotDetails>}></Route>
        </Routes>
      </Grid>

      {/* Right Column */}
      <Grid
        sx={{ display: "block", width: "20%" }}
        item
        xs={12}
        lg={4} // Each column takes up 4 grid spaces for 3 equal columns
      >
        <RightPart></RightPart>
      </Grid>
    </Grid>
  );
};

export default HomePage;
