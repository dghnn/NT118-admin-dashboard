// src/layouts/authentication/sign-in/Basic.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import AppLogo from "./logo.jpg";

export default function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // --- Helper: lấy token hợp lệ, refresh nếu cần --- XOÁ
  const getIdToken = async () => {
    const idToken = localStorage.getItem("firebaseIdToken");
    const refreshToken = localStorage.getItem("firebaseRefreshToken");
    const expiry = parseInt(localStorage.getItem("firebaseTokenExpiry"), 10);

    if (idToken && Date.now() < expiry) return idToken;

    if (!refreshToken) throw new Error("No refresh token available");

    const res = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Failed to refresh token");

    // Lưu token mới
    localStorage.setItem("firebaseIdToken", data.id_token);
    localStorage.setItem("firebaseTokenExpiry", Date.now() + data.expires_in * 1000);
    localStorage.setItem("firebaseRefreshToken", data.refresh_token);

    return data.id_token;
  };

  const handleSignIn = async () => {
    setError("");

    try {
      // --- Step 1: Firebase Auth ---
      const firebaseRes = await fetch(
        `${process.env.REACT_APP_FIREBASE_AUTH}?key=${process.env.REACT_APP_FIREBASE_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
      );

      const firebaseData = await firebaseRes.json();

      if (!firebaseRes.ok) {
        setError(firebaseData.error?.message || "Sai email hoặc mật khẩu!");
        return;
      }

      const { idToken, refreshToken, expiresIn } = firebaseData;

      // Lưu token & refresh token
      localStorage.setItem("firebaseIdToken", idToken);
      localStorage.setItem("firebaseRefreshToken", refreshToken);
      localStorage.setItem("firebaseTokenExpiry", Date.now() + parseInt(expiresIn) * 1000);

      // --- Step 3: Lưu token backend & trạng thái đăng nhập ---
      localStorage.setItem("isLoggedIn", "true");
      //DEBUG - XOÁ SAU
      console.log("[DEBUG] Firebase idToken:", idToken);

      navigate("/dashboard");
    } catch (err) {
      console.error("Sign-in exception:", err);
      setError("Không thể kết nối server!");
    }
  };

  return (
    <MDBox
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      sx={{ backgroundColor: "#ebcacaff" }}
    >
      <MDBox textAlign="center">
        <MDBox component="img" src={AppLogo} alt="App Logo" width={60} height={60} mb={1} />
        <MDTypography variant="h4" fontWeight="bold">
          CINE PEOPLE
        </MDTypography>
      </MDBox>

      <Card sx={{ p: 3, width: 360 }}>
        <MDTypography variant="h6" fontWeight="bold" textAlign="center" mb={0.5}>
          Admin Login
        </MDTypography>

        <Divider sx={{ borderTop: "3px solid #7d7d7dff", mb: 3 }} />

        <MDBox component="form" noValidate autoComplete="off">
          <MDInput
            label="Email"
            type="email"
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <MDInput
            label="Password"
            type="password"
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          {error && (
            <MDTypography
              variant="caption"
              color="error"
              fontWeight="medium"
              mb={1}
              display="block"
            >
              {error}
            </MDTypography>
          )}
          <MDButton variant="gradient" color="darkred" fullWidth onClick={handleSignIn}>
            Sign In
          </MDButton>
        </MDBox>
      </Card>
    </MDBox>
  );
}
