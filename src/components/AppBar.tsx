import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

function ResponsiveAppBar() {

  return (
    <AppBar elevation={2} position="static">
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight="bold">
            CampusGo
          </Typography>

          <IconButton sx={{p: 0}}>
            <Avatar alt="Remy Sharp" />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}


export default ResponsiveAppBar;
