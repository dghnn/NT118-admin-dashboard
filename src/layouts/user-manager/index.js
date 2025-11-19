import React, { useState } from "react";
import PropTypes from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";

import usersData from "./data/usersData";

// Component hiển thị tên kèm avatar
function UserNameCell({ row }) {
  const user = row.original;
  return (
    <MDBox display="flex" alignItems="center" gap={1}>
      <img
        src={user.avatar}
        alt={user.name}
        style={{ width: 40, height: 40, borderRadius: "50%" }}
      />
      <MDTypography variant="button" fontWeight="medium">
        {user.name}
      </MDTypography>
    </MDBox>
  );
}

UserNameCell.propTypes = {
  row: PropTypes.shape({
    original: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default function UserLoyaltyManager() {
  const [users] = useState(usersData);

  const handleView = (user) => {
    alert(
      `Chi tiết người dùng ${user.id}:\n` +
        `Tên: ${user.name}\n` +
        `Email: ${user.email}\n` +
        `Loyalty Points: ${user.points}\n` +
        `Trạng thái: ${user.status}`
    );
  };

  const columns = [
    {
      Header: (
        <MDTypography variant="h6" color="primary" fontWeight="bold">
          ID
        </MDTypography>
      ),
      accessor: "id",
      align: "center",
    },
    {
      Header: (
        <MDTypography variant="h6" color="primary" fontWeight="bold">
          Name
        </MDTypography>
      ),
      accessor: "name",
      align: "left",
      Cell: (props) => <UserNameCell {...props} />,
    },
    {
      Header: (
        <MDTypography variant="h6" color="primary" fontWeight="bold">
          Email
        </MDTypography>
      ),
      accessor: "email",
      align: "left",
    },
    {
      Header: (
        <MDTypography variant="h6" color="primary" fontWeight="bold">
          Loyalty Points
        </MDTypography>
      ),
      accessor: "points",
      align: "center",
    },
    {
      Header: (
        <MDTypography variant="h6" color="primary" fontWeight="bold">
          Status
        </MDTypography>
      ),
      accessor: "status",
      align: "center",
    },
    {
      Header: (
        <MDTypography variant="h6" color="primary" fontWeight="bold">
          Action
        </MDTypography>
      ),
      accessor: "action",
      align: "center",
    },
  ];

  const rows = users.map((user) => ({
    ...user,
    action: (
      <MDButton variant="gradient" color="error" size="small" onClick={() => handleView(user)}>
        View
      </MDButton>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="bold" mb={2}>
            Users
          </MDTypography>

          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
