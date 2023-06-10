import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import {useNavigate} from "react-router-dom";
import ResponsiveAppBar from "../components/AppBar";


function Home() {
  const navigate = useNavigate();

  return (
    <Grid container flexDirection="column" alignItems="center">
      <ResponsiveAppBar />

      <Grid width={{xs: "100%", md: "50%"}} gap={3} px="1rem" container py={1.5} flexDirection="column" alignItems="center">

        <Box width="100%" borderRadius="6px" height="15rem" border="2px solid lightgrey" />

        <Box width="100%" display="grid" gap="1rem" gridTemplateColumns="repeat(2, 1fr)">
          <NavigationTile label="Create account" onClick={() => navigate("/create-account")} />
          <NavigationTile label="Fund wallet" onClick={() => navigate("/fund-wallet")} />
          <NavigationTile label="Pay for trip" onClick={() => navigate("/pay-for-trip")} />
        </Box>
      </Grid>
    </Grid>
  );
}


interface NavigationTileProps {
  label: string;
  onClick?: () => void;
}
const NavigationTile = ({label, onClick}: NavigationTileProps): JSX.Element => {
  return (
    <Grid container justifyContent="center" onClick={onClick} alignItems="center" height="7rem" borderRadius="6px" border="2px solid lightgrey">
      {label}
    </Grid>
  );
};


export default Home;
