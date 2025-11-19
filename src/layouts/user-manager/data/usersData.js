/*import React, { useState, useEffect } from "react";

const [users, setUsers] = useState([]);

useEffect(() => {
  fetch("https://cine-backend-app.azurewebsites.net/api/users")
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((err) => console.error("Fetch users failed:", err));
}, []);
*/

// src/layouts/user-loyalty-manager/data/usersData.js

// Dữ liệu mẫu

import avatar1 from "./test.jpg";

const usersData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "vana@example.com",
    points: 120,
    status: "Member",
    avatar: avatar1,
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "thib@example.com",
    points: 90,
    status: "Non",
    avatar: avatar1,
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "vanc@example.com",
    points: 200,
    status: "Member",
    avatar: avatar1,
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "thid@example.com",
    points: 50,
    status: "Non",
    avatar: avatar1,
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "vane@example.com",
    points: 300,
    status: "Member",
    avatar: avatar1,
  },
];

export default usersData;
