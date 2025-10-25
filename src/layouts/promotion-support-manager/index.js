import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import PromotionsTab from "./tabs/PromotionsTab";
import SupportTab from "./tabs/SupportTab";

export default function PromotionSupportManager() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <Tabs value={tab} onChange={handleChange} textColor="primary" indicatorColor="primary">
        <Tab label="Khuyến mãi" />
        <Tab label="Hỗ trợ" />
      </Tabs>

      <Box mt={2}>
        {tab === 0 && <PromotionsTab />}
        {tab === 1 && <SupportTab />}
      </Box>
    </Box>
  );
}
