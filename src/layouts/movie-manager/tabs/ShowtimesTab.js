import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import showtimesDataInitial from "../data/showtimesData";
import MDButton from "../../../components/MDButton";

function ShowtimesTab() {
  const [showtimes, setShowtimes] = useState(showtimesDataInitial);

  const handleAdd = () => {
    const newId = showtimes.length + 1;
    setShowtimes([
      ...showtimes,
      { id: newId, movie: "New Movie", time: "00:00", cinema: "New Cinema", status: "Active" },
    ]);
  };

  const handleDuplicate = () => {
    const duplicated = showtimes.map((s) => ({ ...s, id: showtimes.length + 1 + s.id }));
    setShowtimes([...showtimes, ...duplicated]);
    alert("Schedule duplicated successfully!");
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Showtimes</Typography>
        <Box>
          <MDButton variant="contained" color="primary" sx={{ mr: 1 }} onClick={handleAdd}>
            Add Showtime
          </MDButton>
          <MDButton variant="outlined" color="secondary" onClick={handleDuplicate}>
            Duplicate Schedule
          </MDButton>
        </Box>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Movie</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Cinema</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showtimes.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.id}</TableCell>
              <TableCell>{s.movie}</TableCell>
              <TableCell>{s.time}</TableCell>
              <TableCell>{s.cinema}</TableCell>
              <TableCell>{s.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default ShowtimesTab;
