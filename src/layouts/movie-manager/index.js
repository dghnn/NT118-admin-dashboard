// src/layouts/movie-manager/index.js
import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, Card, TextField, Button, CardMedia } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import GridViewTab from "./GridViewTab";
import RowViewTab from "./RowViewTab";
import { useMovies } from "./data";

function MovieManager() {
  const { movies, setMovies, loading } = useMovies();
  const [tab, setTab] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    rating: "",
    release: "",
    image: null,
  });

  const handleChange = (_event, newValue) => setTab(newValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewMovie({ ...newMovie, image: URL.createObjectURL(file) });
  };

  const handleAddMovie = () => {
    if (!newMovie.title) return;
    const id = movies.length + 1;
    setMovies([...movies, { id, ...newMovie }]);
    setNewMovie({ title: "", genre: "", rating: "", release: "", image: null });
  };

  const handleEdit = (movie) => setNewMovie({ ...movie });
  const handleDelete = (id) => setMovies(movies.filter((m) => m.id !== id));

  if (loading)
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <Box p={3}>Loading...</Box>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box p={3} display="flex" gap={3}>
        {/* Left side: tabs */}
        <Box flex={1}>
          <Typography variant="h5" mb={2} fontWeight="medium">
            Movies
          </Typography>
          <Tabs value={tab} onChange={handleChange} textColor="primary" indicatorColor="primary">
            <Tab label="Grid View" />
            <Tab label="Row View" />
          </Tabs>

          <Box mt={3}>
            {tab === 0 && (
              <GridViewTab movies={movies} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            {tab === 1 && (
              <RowViewTab movies={movies} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </Box>
        </Box>

        {/* Right side: Add Movie */}
        <Box sx={{ width: 300, position: "sticky", top: 80 }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" mb={1}>
              Add / Edit Movie
            </Typography>
            <TextField
              label="Title"
              name="title"
              value={newMovie.title}
              onChange={handleInputChange}
              fullWidth
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              label="Genre"
              name="genre"
              value={newMovie.genre}
              onChange={handleInputChange}
              fullWidth
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              label="AR"
              name="rating"
              value={newMovie.rating}
              onChange={handleInputChange}
              fullWidth
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              label="Release Year"
              name="release"
              value={newMovie.release}
              onChange={handleInputChange}
              fullWidth
              size="small"
              sx={{ mb: 1 }}
            />
            <Button variant="contained" component="label" fullWidth sx={{ mb: 1 }}>
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
            {newMovie.image && (
              <CardMedia component="img" image={newMovie.image} sx={{ height: 140, mb: 1 }} />
            )}
            <Button variant="contained" color="primary" fullWidth onClick={handleAddMovie}>
              {newMovie.id ? "Save Changes" : "Add Movie"}
            </Button>
          </Card>
        </Box>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default MovieManager;
