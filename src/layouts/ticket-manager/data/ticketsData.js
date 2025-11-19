const tickets = [
  {
    id: "V001",
    movie: "Inception",
    cinema: "CGV Vincom",
    room: "Room 1",
    showtime: "2025-11-01 19:30",
    seat: "A5",
    price: 120000,
    status: "Paid", // Chưa sử dụng -> Paid
    customer: "Nguyen Van A",
  },
  {
    id: "V002",
    movie: "Interstellar",
    cinema: "Galaxy Nguyễn Du",
    room: "Room 2",
    showtime: "2025-11-01 20:00",
    seat: "B3",
    price: 150000,
    status: "Refunded", // Đã sử dụng -> Refunded
    customer: "Tran Thi B",
  },
  {
    id: "V003",
    movie: "Avatar 2",
    cinema: "Lotte Đà Nẵng",
    room: "Room 1",
    showtime: "2025-11-02 18:00",
    seat: "C7",
    price: 180000,
    status: "Unpaid", // Chưa sử dụng nhưng chưa thanh toán
    customer: "Le Van C",
  },
  {
    id: "V004",
    movie: "The Batman",
    cinema: "CGV Vincom",
    room: "Room 3",
    showtime: "2025-11-03 21:00",
    seat: "D10",
    price: 200000,
    status: "Expired", // Quá hạn
    customer: "Pham Thi D",
  },
  {
    id: "V005",
    movie: "Top Gun: Maverick",
    cinema: "Galaxy Nguyễn Du",
    room: "Room 1",
    showtime: "2025-11-04 19:30",
    seat: "E2",
    price: 170000,
    status: "Refund", // Vé đang được hoàn tiền
    customer: "Nguyen Van E",
  },
];

export default tickets;
