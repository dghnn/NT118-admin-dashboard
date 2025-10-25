import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";

import usersData from "./data/usersData";

export default function UserLoyaltyManager() {
  const [users, setUsers] = useState(usersData);

  const handleView = (user) => {
    alert(
      `Chi tiết người dùng ${user.id}:\nTên: ${user.name}\nEmail: ${user.email}\nLoyalty Points: ${user.points}\nTrạng thái: ${user.status}`
    );
  };

  const columns = [
    { Header: "ID", accessor: "id", align: "center" },
    { Header: "Tên", accessor: "name", align: "left" },
    { Header: "Email", accessor: "email", align: "left" },
    { Header: "Loyalty Points", accessor: "points", align: "right" },
    { Header: "Trạng thái", accessor: "status", align: "center" },
    { Header: "Hành động", accessor: "action", align: "center" },
  ];

  const rows = users.map((u) => ({
    ...u,
    action: (
      <MDButton size="small" onClick={() => handleView(u)}>
        Xem
      </MDButton>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <MDTypography variant="h5" mb={2} fontWeight="medium">
            Quản lý Người dùng & Loyalty
          </MDTypography>
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={true}
            showTotalEntries={true}
            noEndBorder
          />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
