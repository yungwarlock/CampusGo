import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AppRouter from "./router";


function App() {

  return (
    <>
      <CssBaseline />
      <AppRouter />
    </>
  );
}

export default App;
