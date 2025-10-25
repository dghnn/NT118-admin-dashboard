/**
=========================================================
* Test Data cho Dashboard Rạp Phim
=========================================================
* Giả lập dữ liệu doanh thu, phim hot, và thống kê
*/

const revenueByTheaterData = {
  labels: ["CGV", "Lotte", "Galaxy", "Beta", "BHD"],
  datasets: {
    label: "Doanh thu (triệu VND)",
    data: [125, 98, 76, 54, 43],
  },
};

const revenueByMovieData = {
  labels: ["Venom 3", "Inside Out 2", "Dune 2", "Avatar 2", "Spider-Man"],
  datasets: [
    {
      label: "Doanh thu (triệu VND)",
      color: "success",
      data: [42, 37, 33, 28, 25],
    },
  ],
};

const revenueOverTimeData = {
  labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
  datasets: {
    label: "Doanh thu (triệu VND)",
    data: [15, 19, 17, 22, 28, 35, 31],
  },
};

export { revenueByTheaterData, revenueByMovieData, revenueOverTimeData };
