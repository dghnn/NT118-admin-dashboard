import React, { useState } from "react";
import PropTypes from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";

import ticketsData from "./data/ticketsData";

export default function TicketManager() {
  const [tickets, setTickets] = useState(ticketsData);

  const handleView = (ticket) => {
    alert(
      `Chi tiết vé ${ticket.id}:\nPhim: ${ticket.movie}\nRạp: ${ticket.cinema}\nPhòng: ${ticket.room}\nSuất: ${ticket.showtime}\nGhế: ${ticket.seat}\nKhách hàng: ${ticket.customer}\nTrạng thái: ${ticket.status}`
    );
  };

  const handleCancel = (id) => {
    if (window.confirm("Bạn có chắc muốn hủy vé này?")) {
      setTickets(tickets.map((t) => (t.id === id ? { ...t, status: "Đã hủy" } : t)));
    }
  };

  const StatusCell = ({ row }) => {
    const status = row.original.status;
    let color;
    switch (status) {
      case "Paid":
        color = "success";
        break;
      case "Unpaid":
        color = "warning";
        break;
      case "Refund":
        color = "info";
        break;
      case "Refunded":
        color = "secondary";
        break;
      case "Expired":
        color = "error";
        break;
      default:
        color = "dark";
    }
    return (
      <MDTypography variant="button" fontWeight="medium" color={color}>
        {status}
      </MDTypography>
    );
  };

  StatusCell.propTypes = {
    row: PropTypes.shape({
      original: PropTypes.shape({
        status: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  const columns = [
    {
      Header: (
        <MDTypography variant="caption" color="primary" fontWeight="bold">
          Ticket ID
        </MDTypography>
      ),
      accessor: "id",
      align: "center",
    },
    {
      Header: (
        <MDTypography variant="caption" color="primary" fontWeight="bold">
          Movie
        </MDTypography>
      ),
      accessor: "movie",
      align: "left",
    },
    {
      Header: (
        <MDTypography variant="caption" color="primary" fontWeight="bold">
          Cinema
        </MDTypography>
      ),
      accessor: "cinema",
      align: "left",
    },
    {
      Header: (
        <MDTypography variant="caption" color="primary" fontWeight="bold">
          Time
        </MDTypography>
      ),
      accessor: "showtime",
      align: "center",
    },
    {
      Header: (
        <MDTypography variant="caption" color="primary" fontWeight="bold">
          Seat
        </MDTypography>
      ),
      accessor: "seat",
      align: "center",
    },
    {
      Header: (
        <MDTypography variant="caption" color="primary" fontWeight="bold">
          Price
        </MDTypography>
      ),
      accessor: "price",
      align: "right",
    },
    {
      Header: (
        <MDTypography variant="caption" color="primary" fontWeight="bold">
          Customer
        </MDTypography>
      ),
      accessor: "customer",
      align: "left",
    },
    {
      Header: (
        <MDTypography variant="caption" color="primary" fontWeight="bold">
          Status
        </MDTypography>
      ),
      accessor: "status",
      align: "center",
      Cell: StatusCell,
    },
    {
      Header: (
        <MDTypography variant="caption" color="primary" fontWeight="bold">
          Action
        </MDTypography>
      ),
      accessor: "action",
      align: "center",
    },
  ];

  const rows = tickets.map((ticket) => ({
    ...ticket,
    price: ticket.price.toLocaleString("vi-VN") + "₫",
    action: (
      <MDBox display="flex" justifyContent="center" gap={1}>
        {ticket.status !== "Đã hủy" && (
          <MDButton
            variant="gradient"
            color="error"
            size="small"
            onClick={() => handleCancel(ticket.id)}
          >
            Delete
          </MDButton>
        )}
      </MDBox>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="bold" mb={2}>
            Tickets
          </MDTypography>

          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false} // bỏ show entries
            showTotalEntries={false}
            noEndBorder
          />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
