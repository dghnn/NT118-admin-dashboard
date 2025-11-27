// src/layouts/movie-manager/MovieDialog.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CardMedia,
  MenuItem,
} from "@mui/material";
import MDButton from "components/MDButton";

const defaultFormData = {
  id: null, // để phân biệt add/edit
  title: "",
  description: "",
  genres: [],
  duration: "",
  director: "",
  releaseDate: "",
  posterUrl: "",
  trailerUrl: "",
  status: "",
};

export default function MovieDialog({ open, onClose, movie, onSave }) {
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (movie) {
      setFormData({
        ...movie,
        genres: Array.isArray(movie.genres) ? movie.genres : [],
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenresChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, genres: value.split(",").map((g) => g.trim()) }));
  };

  const requiredFields = [
    "title",
    "description",
    "genres",
    "duration",
    "director",
    "releaseDate",
    "posterUrl",
    "trailerUrl",
    "status",
  ];

  const handleJSONUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target.result);
        const missingFields = requiredFields.filter((f) => !(f in json));
        if (missingFields.length > 0) {
          alert(`Missing required fields: ${missingFields.join(", ")}`);
          return;
        }
        setFormData((prev) => ({
          ...prev,
          ...json,
          genres: Array.isArray(json.genres) ? json.genres : [],
        }));
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    const missingFields = requiredFields.filter(
      (f) => !formData[f] || (Array.isArray(formData[f]) && formData[f].length === 0)
    );
    if (missingFields.length > 0) {
      alert(`Please fill all required fields: ${missingFields.join(", ")}`);
      return;
    }
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    if (!movie) {
      // Nếu đang add mới thì reset form
      setFormData(defaultFormData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{formData.id ? "Edit Movie" : "Add Movie"}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" gap={2}>
          {/* Poster bên trái */}
          <Box minWidth={180} display="flex" flexDirection="column" alignItems="center">
            <MDButton variant="gradient" color="darkred" component="label" sx={{ mt: 1 }}>
              Upload JSON
              <input type="file" accept=".json" hidden onChange={handleJSONUpload} />
            </MDButton>
          </Box>

          {/* Fields bên phải */}
          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Genres (comma separated)"
              value={formData.genres.join(", ")}
              onChange={handleGenresChange}
              fullWidth
            />
            <TextField
              label="Duration (min)"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Release Date"
              name="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Poster URL"
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Trailer URL"
              name="trailerUrl"
              value={formData.trailerUrl}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              select
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              sx={{ minHeight: 60 }}
              SelectProps={{ sx: { height: 50 } }}
            >
              <MenuItem value="now_showing">Now Showing</MenuItem>
              <MenuItem value="coming_soon">Coming Soon</MenuItem>
            </TextField>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          {formData.id ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MovieDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    director: PropTypes.string,
    releaseDate: PropTypes.string,
    posterUrl: PropTypes.string,
    trailerUrl: PropTypes.string,
    status: PropTypes.string,
    imageFile: PropTypes.object,
  }),
  onSave: PropTypes.func.isRequired,
};

MovieDialog.defaultProps = {
  movie: null,
};
