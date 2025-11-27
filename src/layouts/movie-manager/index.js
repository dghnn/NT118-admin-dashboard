// src/layouts/movie-manager/index.js
import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

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
import MovieDialog from "./MovieDialog";

function MovieManager() {
  const { movies, setMovies, loading, fetchMovies, addMovie, updateMovie, deleteMovie } =
    useMovies();

  // Tabs
  const [tab, setTab] = useState(0);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const paginatedMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Tab change
  const handleChange = (_event, newValue) => setTab(newValue);

  // Open add/edit dialog
  const handleOpenDialog = (movie = null) => {
    setEditingMovie(movie);
    setDialogOpen(true);
  };

  // Save movie callback
  const handleSaveMovie = async (savedMovie) => {
    try {
      if (editingMovie) {
        await updateMovie(savedMovie.id, savedMovie);
      } else {
        await addMovie(savedMovie);
      }

      // Đồng bộ danh sách với server
      await fetchMovies();

      setDialogOpen(false);
      setEditingMovie(null);
    } catch (err) {
      console.error("Save movie failed:", err);
      alert("Failed to save movie. See console for details.");
    }
  };

  // Delete movie
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await deleteMovie(id);
    } catch (err) {
      console.error("Delete movie failed:", err);
      alert("Failed to delete movie. See console for details.");
    }
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
      <Box p={1} display="flex" flexDirection="column" gap={1}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <MDTypography variant="h5" fontWeight="medium">
            Movies
          </MDTypography>
          <MDButton variant="gradient" color="darkred" onClick={() => handleOpenDialog()}>
            Add Movie
          </MDButton>
        </Box>

        {/* Tabs */}
        <Tabs value={tab} onChange={handleChange} textColor="primary" indicatorColor="primary">
          <Tab icon={<GridViewIcon />} aria-label="grid" />
          <Tab icon={<ListIcon />} aria-label="list" />
        </Tabs>

        {/* Tab content */}
        <Box mt={1}>
          {tab === 0 && (
            <GridViewTab
              movies={paginatedMovies}
              onEdit={handleOpenDialog}
              onDelete={handleDelete}
            />
          )}
          {tab === 1 && (
            <RowViewTab
              movies={paginatedMovies}
              onEdit={handleOpenDialog}
              onDelete={handleDelete}
            />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <MDBox display="flex" justifyContent="center" mt={4} gap={1}>
              <MDButton
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                &laquo;
              </MDButton>

              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                return (
                  <MDButton
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={currentPage === page ? "contained" : "outlined"}
                  >
                    {page}
                  </MDButton>
                );
              })}

              <MDButton
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                &raquo;
              </MDButton>
            </MDBox>
          )}
        </Box>

        {/* Movie Dialog */}
        <MovieDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          movie={editingMovie}
          onSave={handleSaveMovie}
        />
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default MovieManager;
