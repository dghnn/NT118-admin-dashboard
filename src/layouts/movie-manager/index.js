/**
=========================================================
* Movie Manager - Manage Movies & Showtimes
=========================================================
*/

import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Tabs
import MoviesTab from "./tabs/MoviesTab";
import CinemasTab from "./tabs/CinemasTab";
import ShowtimesTab from "./tabs/ShowtimesTab";

function MovieManager() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => setTab(newValue);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box p={3}>
        <Typography variant="h5" mb={2} fontWeight="medium">
          Movie & Showtime Management
        </Typography>

        <Tabs value={tab} onChange={handleChange} textColor="primary" indicatorColor="primary">
          <Tab label="Movies" />
          <Tab label="Cinemas" />
          <Tab label="Showtimes" />
        </Tabs>

        <Box mt={3}>
          {tab === 0 && <MoviesTab />}
          {tab === 1 && <CinemasTab />}
          {tab === 2 && <ShowtimesTab />}
        </Box>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default MovieManager;
