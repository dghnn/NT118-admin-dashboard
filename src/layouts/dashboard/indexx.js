/**
=========================================================
* Cinema Admin Dashboard
=========================================================
* Trang tổng quan hiển thị tình hình hoạt động của hệ thống rạp phim
*/

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data (bạn có thể thay bằng dữ liệu thật sau)
// import dữ liệu test
import {
  revenueByTheaterData,
  revenueByMovieData,
  revenueOverTimeData,
} from "layouts/dashboard/data/revenueTestData";

import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Hàng thống kê nhanh */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="attach_money"
                title="Doanh thu hôm nay"
                count="5.200.000₫"
                percentage={{
                  color: "success",
                  amount: "+12%",
                  label: "so với hôm qua",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="bar_chart"
                title="Doanh thu tuần này"
                count="37.800.000₫"
                percentage={{
                  color: "success",
                  amount: "+8%",
                  label: "so với tuần trước",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="sell"
                title="Số vé bán ra"
                count="1.245"
                percentage={{
                  color: "success",
                  amount: "+5%",
                  label: "so với hôm qua",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Người dùng mới"
                count="+34"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "trong 24 giờ qua",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        {/* Biểu đồ thống kê */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Doanh thu theo rạp"
                  description="So sánh doanh thu giữa các cụm rạp"
                  date="Cập nhật hôm nay"
                  chart={revenueByTheaterData}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Doanh thu theo phim"
                  description="Top phim doanh thu cao nhất"
                  date="Cập nhật 2 giờ trước"
                  chart={revenueByMovieData}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Doanh thu theo thời gian"
                  description="Biểu đồ tăng trưởng doanh thu"
                  date="Cập nhật mới nhất"
                  chart={revenueOverTimeData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        {/* Phim nổi bật & Tổng quan suất chiếu */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects title="Phim nổi bật" />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview title="Tổng quan suất chiếu" />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
