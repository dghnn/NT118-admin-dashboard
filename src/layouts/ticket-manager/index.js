import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";

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

  const columns = [
    { Header: "Mã vé", accessor: "id", align: "center" },
    { Header: "Phim", accessor: "movie", align: "left" },
    { Header: "Rạp", accessor: "cinema", align: "left" },
    { Header: "Phòng", accessor: "room", align: "center" },
    { Header: "Suất chiếu", accessor: "showtime", align: "center" },
    { Header: "Ghế", accessor: "seat", align: "center" },
    { Header: "Giá vé", accessor: "price", align: "right" },
    { Header: "Trạng thái", accessor: "status", align: "center" },
    { Header: "Khách hàng", accessor: "customer", align: "left" },
    { Header: "Hành động", accessor: "action", align: "center" },
  ];

  const rows = tickets.map((t) => ({
    ...t,
    price: t.price.toLocaleString("vi-VN") + "₫",
    action: (
      <>
        <MDButton size="small" onClick={() => handleView(t)} sx={{ mr: 1 }}>
          Xem
        </MDButton>
        {t.status !== "Đã hủy" && (
          <MDButton size="small" color="error" onClick={() => handleCancel(t.id)}>
            Hủy
          </MDButton>
        )}
      </>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox mb={3}>
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
