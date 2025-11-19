// src/layouts/movie-manager/index.js

import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, Card, TextField, Button, CardMedia } from "@mui/material";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import GridViewTab from "./GridViewTab";
import RowViewTab from "./RowViewTab";
import { useMovies } from "./data";

import MDPagination from "components/MDPagination";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import GridViewIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";

function MovieManager() {
  const { movies, setMovies, loading } = useMovies();

  // Tabs
  const [tab, setTab] = useState(0);

  // Add/Edit Movie
  const [newMovie, setNewMovie] = useState({
    id: null,
    title: "",
    genre: "",
    rating: "",
    release: "",
    image: null,
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const paginatedMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChange = (_event, newValue) => setTab(newValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((old) => ({ ...old, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewMovie((old) => ({ ...old, image: URL.createObjectURL(file) }));
  };

  const handleAddMovie = () => {
    if (!newMovie.title) return;

    // Edit movie
    if (newMovie.id) {
      setMovies(movies.map((m) => (m.id === newMovie.id ? newMovie : m)));
    } else {
      // Add movie
      const id = movies.length + 1;
      setMovies([...movies, { id, ...newMovie }]);
    }

    // Reset
    setNewMovie({
      id: null,
      title: "",
      genre: "",
      rating: "",
      release: "",
      image: null,
    });
  };

  const handleEdit = (movie) => {
    setNewMovie(movie);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

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
        {/* LEFT SIDE */}
        <Box flex={1}>
          <Typography variant="h5" mb={2} fontWeight="medium">
            Movies
          </Typography>

          <Tabs value={tab} onChange={handleChange} textColor="primary" indicatorColor="primary">
            <Tab icon={<GridViewIcon />} aria-label="grid" />
            <Tab icon={<ListIcon />} aria-label="list" />
          </Tabs>

          <Box mt={3}>
            {tab === 0 && (
              <GridViewTab movies={paginatedMovies} onEdit={handleEdit} onDelete={handleDelete} />
            )}

            {tab === 1 && (
              <RowViewTab movies={paginatedMovies} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <MDBox display="flex" justifyContent="center" mt={4}>
              <MDPagination>
                <MDPagination
                  item
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  sx={{
                    width: 38,
                    height: 38,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    bgcolor: "primary",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#ffffffff" },
                  }}
                >
                  &laquo;
                </MDPagination>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;

                  return (
                    <MDPagination
                      key={page}
                      item
                      onClick={() => setCurrentPage(page)}
                      sx={{
                        width: 38,
                        height: 38,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: 600,
                        // màu nền bình thường
                        bgcolor: currentPage === page ? "primary.main" : "#f0f0f0",
                        color: currentPage === page ? "#fff" : "#333",
                        boxShadow: currentPage === page ? "0 0 8px rgba(0,0,0,0.25)" : "none",
                        transition: "all 0.2s",
                        "&:hover": {
                          bgcolor: currentPage != page ? "#d26363ff" : "primary.main",
                        },
                        "&:focus": {
                          outline: "none",
                          bgcolor: currentPage === page ? "primary.main" : "#f0f0f0",
                        },
                      }}
                    >
                      {page}
                    </MDPagination>
                  );
                })}

                <MDPagination
                  item
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  sx={{
                    width: 38,
                    height: 38,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    bgcolor: "primary",
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#ffffff" },
                  }}
                >
                  &raquo;
                </MDPagination>
              </MDPagination>
            </MDBox>
          )}
        </Box>

        {/* RIGHT SIDE: ADD / EDIT MOVIE FORM */}
        <MDBox
          sx={{
            width: 300,
            position: "sticky",
            top: 200,
            alignSelf: "flex-start",
          }}
        >
          <Card sx={{ p: 2 }}>
            <MDTypography
              variant="h6"
              mb={2}
              sx={{
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "primary.main",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Add / Edit Movie
            </MDTypography>

            {/* Title */}
            <MDBox mb={2}>
              <TextField
                label="Title"
                name="title"
                value={newMovie.title}
                onChange={handleInputChange}
                fullWidth
                size="big"
                sx={{
                  backgroundColor: "#f0f0f0", // nền xám nhạt
                  borderRadius: 1, // bo góc
                  "& .MuiInputLabel-root": {
                    fontWeight: "bold",
                    color: "grey.600",
                  },
                }}
              />
            </MDBox>

            {/* Genre */}
            <MDBox mb={2}>
              <TextField
                label="Genre"
                name="genre"
                value={newMovie.genre}
                onChange={handleInputChange}
                fullWidth
                size="big"
                sx={{
                  backgroundColor: "#f0f0f0", // nền xám nhạt
                  borderRadius: 1, // bo góc
                  "& .MuiInputLabel-root": {
                    fontWeight: "bold",
                    color: "grey.600",
                  },
                }}
              />
            </MDBox>

            {/* Age Rating */}
            <MDBox mb={2}>
              <TextField
                label="AR"
                name="rating"
                value={newMovie.rating}
                onChange={handleInputChange}
                fullWidth
                size="big"
                sx={{
                  backgroundColor: "#f0f0f0", // nền xám nhạt
                  borderRadius: 1, // bo góc
                  "& .MuiInputLabel-root": {
                    fontWeight: "bold",
                    color: "grey.600",
                  },
                }}
              />
            </MDBox>

            {/* Release Year */}
            <MDBox mb={2}>
              <TextField
                label="Time"
                name="time"
                value={newMovie.release}
                onChange={handleInputChange}
                fullWidth
                size="big"
                sx={{
                  backgroundColor: "#f0f0f0", // nền xám nhạt
                  borderRadius: 1, // bo góc
                  "& .MuiInputLabel-root": {
                    fontWeight: "bold",
                    color: "grey.600",
                  },
                }}
              />
            </MDBox>

            {/* Upload Image */}
            <MDButton variant="gradient" color="darkred" fullWidth sx={{ mb: 1 }}>
              Upload Image
              <input type="file" hidden onChange={handleImageChange} />
            </MDButton>

            {/* Preview Image */}
            {newMovie.image && (
              <CardMedia
                component="img"
                image={newMovie.image}
                sx={{ height: 140, mb: 2, borderRadius: 1 }}
              />
            )}

            {/* Submit Button */}
            <MDButton variant="gradient" color="darkred" fullWidth onClick={handleAddMovie}>
              {newMovie.id ? "Save Changes" : "Add Movie"}
            </MDButton>
          </Card>
        </MDBox>
      </Box>

      <Footer />
    </DashboardLayout>
  );
}

export default MovieManager;
