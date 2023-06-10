import React from "react";

import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/Home";
import PayForTrip from "./pages/PayForTrip";
import FundWallet from "./pages/FundWallet";
import CreateAccount from "./pages/CreateAccount";


const AppRouter = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fund-wallet" element={<FundWallet />} />
        <Route path="/pay-for-trip" element={<PayForTrip />} />
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
};


export default AppRouter;
