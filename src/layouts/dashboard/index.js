import React from "react";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Dữ liệu giả
const lineChartData = {
  labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
  datasets: [
    {
      label: "Doanh thu (₫)",
      data: [5000, 7000, 6000, 9000, 8000, 10000, 9500],
      borderColor: "#990011", // đỏ nhạt
      backgroundColor: "#99001133", // fill nhạt
      pointBackgroundColor: "#990011",
      pointBorderColor: "#990011",
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.3,
      fill: true,
      borderWidth: 3,
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { drawBorder: false }, ticks: { beginAtZero: true } },
  },
};

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Hàng thống kê nhanh */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon={<Icon sx={{ color: "#4caf4fff" }}>attach_money</Icon>}
              title="Doanh thu hôm nay"
              count="5.200.000₫"
              percentage={{ color: "success", amount: "+12%", label: "so với hôm qua" }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="info"
              icon={<Icon sx={{ color: "#1a73e8ff" }}>bar_chart</Icon>}
              title="Doanh thu tuần này"
              count="37.800.000₫"
              percentage={{ color: "success", amount: "+8%", label: "so với tuần trước" }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="warning"
              icon={<Icon sx={{ color: "#ffa826ff" }}>sell</Icon>}
              title="Số vé bán ra"
              count="1.245"
              percentage={{ color: "success", amount: "+5%", label: "so với hôm qua" }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="primary"
              icon={<Icon sx={{ color: "#990012ff" }}>person_add</Icon>}
              title="Người dùng mới"
              count="+34"
              percentage={{ color: "success", amount: "", label: "trong 24 giờ qua" }}
            />
          </Grid>
        </Grid>

        {/* Biểu đồ line chart full-width */}
        <MDBox mt={4} width="100%">
          <MDTypography variant="h6" mb={2}>
            Doanh thu tuần
          </MDTypography>
          <Line data={lineChartData} options={lineChartOptions} height={150} />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
