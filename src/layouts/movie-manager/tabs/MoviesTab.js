import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import MDButton from "../../../components/MDButton";
import moviesData from "../data/moviesData";

function MoviesTab() {
  const [movies, setMovies] = useState(moviesData);

  // Add dialog state
  const [addOpen, setAddOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({ title: "", genre: "", release: "" });

  // Edit dialog state
  const [editOpen, setEditOpen] = useState(false);
  const [editMovie, setEditMovie] = useState({ id: null, title: "", genre: "", release: "" });

  // Add dialog handlers
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => {
    setAddOpen(false);
    setNewMovie({ title: "", genre: "", release: "" });
  };
  const handleAddSave = () => {
    const newId = movies.length + 1;
    setMovies([...movies, { id: newId, ...newMovie }]);
    handleAddClose();
  };

  // Edit dialog handlers
  const handleEditOpen = (movie) => {
    setEditMovie(movie);
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setEditMovie({ id: null, title: "", genre: "", release: "" });
  };
  const handleEditSave = () => {
    setMovies(movies.map((m) => (m.id === editMovie.id ? editMovie : m)));
    handleEditClose();
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      setMovies(movies.filter((m) => m.id !== id));
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Movies List</Typography>
        <MDButton variant="contained" color="primary" onClick={handleAddOpen}>
          Add Movie
        </MDButton>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Genre</TableCell>
            <TableCell align="left">Release Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell align="left">{movie.title}</TableCell>
              <TableCell align="left">{movie.genre}</TableCell>
              <TableCell align="left">{movie.release}</TableCell>
              <TableCell align="right">
                <MDButton size="small" onClick={() => handleEditOpen(movie)} sx={{ mr: 1 }}>
                  Edit
                </MDButton>
                <MDButton size="small" color="error" onClick={() => handleDelete(movie.id)}>
                  Delete
                </MDButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Movie Dialog */}
      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle>Add New Movie</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          />
          <TextField
            label="Genre"
            value={newMovie.genre}
            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
          />
          <TextField
            label="Release Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newMovie.release}
            onChange={(e) => setNewMovie({ ...newMovie, release: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <MDButton color="secondary" onClick={handleAddClose}>
            Cancel
          </MDButton>
          <MDButton color="primary" onClick={handleAddSave}>
            Add
          </MDButton>
        </DialogActions>
      </Dialog>

      {/* Edit Movie Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={editMovie.title}
            onChange={(e) => setEditMovie({ ...editMovie, title: e.target.value })}
          />
          <TextField
            label="Genre"
            value={editMovie.genre}
            onChange={(e) => setEditMovie({ ...editMovie, genre: e.target.value })}
          />
          <TextField
            label="Release Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={editMovie.release}
            onChange={(e) => setEditMovie({ ...editMovie, release: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <MDButton color="secondary" onClick={handleEditClose}>
            Cancel
          </MDButton>
          <MDButton color="primary" onClick={handleEditSave}>
            Save
          </MDButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MoviesTab;
