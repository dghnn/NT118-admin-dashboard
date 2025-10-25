import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import MDButton from "../../../components/MDButton";
import cinemasDataInitial from "../data/cinemasData";

function CinemasTab() {
  const [cinemas, setCinemas] = useState(cinemasDataInitial);

  const handleAdd = () => {
    const newId = cinemas.length + 1;
    const newCinema = {
      id: newId,
      name: `New Cinema ${newId}`,
      location: "Unknown",
      rooms: [],
    };
    setCinemas([...cinemas, newCinema]);
  };

  const handleEdit = (id) => {
    const name = prompt("Enter new cinema name:");
    if (name) {
      setCinemas(cinemas.map((c) => (c.id === id ? { ...c, name } : c)));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this cinema?")) {
      setCinemas(cinemas.filter((c) => c.id !== id));
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Cinemas</Typography>
        <MDButton variant="contained" color="primary" onClick={handleAdd}>
          Add Cinema
        </MDButton>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Rooms</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cinemas.map((cinema) => (
            <TableRow key={cinema.id}>
              <TableCell>{cinema.id}</TableCell>
              <TableCell>{cinema.name}</TableCell>
              <TableCell>{cinema.location}</TableCell>
              <TableCell>{cinema.rooms.length}</TableCell>
              <TableCell align="right">
                <MDButton size="small" onClick={() => handleEdit(cinema.id)} sx={{ mr: 1 }}>
                  Edit
                </MDButton>
                <MDButton size="small" color="error" onClick={() => handleDelete(cinema.id)}>
                  Delete
                </MDButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default CinemasTab;
