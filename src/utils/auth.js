// src/utils/auth.js
// Lấy token backend từ localStorage
export const getToken = () => {
  const token = localStorage.getItem("firebaseIdToken");
  if (!token) throw new Error("No token found, please login.");
  return token;
};
