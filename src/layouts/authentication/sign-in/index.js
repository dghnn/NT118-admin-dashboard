import { useState } from "react";
import { Card, Box, Typography, TextField, Button, Divider } from "@mui/material";
import AppLogo from "./logo.jpg"; // import bình thường JPG/PNG

function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("Email:", email, "Password:", password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5e9e9ff",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Logo + App Name bên ngoài box */}
      <Box sx={{ textAlign: "center" }}>
        <img src={AppLogo} alt="App Logo" style={{ width: 60, height: 60, marginBottom: 8 }} />
        <Typography variant="h5" fontWeight="bold">
          CINE POPLE
        </Typography>
      </Box>

      {/* Card chứa form */}
      <Card sx={{ p: 3, width: 360 }}>
        {/* Tiêu đề Admin Login */}
        <Typography variant="h6" fontWeight="bold" textAlign="center" mb={1}>
          Admin Login
        </Typography>

        {/* Gạch ngăn cách */}
        <Divider
          sx={{
            borderColor: "#990012ff", // màu đỏ
            //opacity: 0.3, // độ mờ
            mb: 2,
          }}
        />

        {/* Form */}
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default Basic;
