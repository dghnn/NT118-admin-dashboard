import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import AppLogo from "./logo.jpg";
import loginData from "./data/loginData";

export default function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    const user = loginData.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      setError("");
      navigate("/dashboard");
    } else {
      setError("Email hoặc mật khẩu không đúng!");
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
