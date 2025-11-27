// src/layouts/movie-manager/GridViewTab.js
import React from "react";
import PropTypes from "prop-types";

// MUI
import Grid from "@mui/material/Grid";

// Material Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const formatDuration = (minutes) => {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h > 0 ? h + "h " : ""}${m}m`;
};

function GridViewTab({ movies, onEdit, onDelete }) {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid key={movie.id} item xs={12} sm={6} md={4} lg={6} xl={3} sx={{ display: "flex" }}>
          <MDBox
            display="flex"
            flexDirection="row"
            width="100%"
            //bgcolor="white"
            borderRadius="lg"
            shadow="sm"
            p={1.5}
            sx={{
              height: 180,
              backgroundColor: "#ffffff",
              overflow: "hidden",
            }}
          >
            {/* Poster trái */}
            <MDBox
              component="img"
              src={movie.posterUrl}
              alt={movie.title}
              sx={{
                width: 90,
                height: "100%",
                objectFit: "cover",
                borderRadius: "md",
                flexShrink: 0,
              }}
            />

            {/* Nội dung */}
            <MDBox
              flex={1}
              ml={1.5}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              overflow="hidden"
            >
              {/* Tựa đề */}
              <MDTypography
                fontWeight="bold"
                fontSize={14}
                sx={{
                  mb: 0.5,
                  lineHeight: "16px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  borderBottom: "3px solid #cececeff",
                  pb: 0.5,
                }}
              >
                {movie.title}
              </MDTypography>

              {/* Thông tin phụ xuống dòng */}
              <MDBox display="flex" alignItems="center" flexWrap="wrap" gap={0.5} mt={0.5}>
                <MDTypography fontSize={10} fontWeight="bold" color="text">
                  Genre:
                </MDTypography>
                <MDTypography fontSize={10} color="text">
                  {movie.genres?.join(", ")}
                </MDTypography>
              </MDBox>

              <MDBox display="flex" alignItems="center" gap={0.5} mt={0.3}>
                <MDTypography fontSize={10} fontWeight="bold" color="text">
                  Duration:
                </MDTypography>
                <MDTypography fontSize={10} color="text">
                  {formatDuration(movie.duration)}
                </MDTypography>
              </MDBox>

              <MDBox display="flex" alignItems="center" gap={0.5} mt={0.3}>
                <MDTypography fontSize={10} fontWeight="bold" color="text">
                  Age:
                </MDTypography>
                <MDBox
                  px={0.7}
                  py="2px"
                  fontWeight="bold"
                  sx={{
                    backgroundColor: "#990012ff",
                    color: "#ffffff",
                    borderRadius: "4px",
                    minWidth: "24px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    lineHeight: 1.2,
                  }}
                >
                  {movie.ageRating}
                </MDBox>
              </MDBox>

              {/* Nút */}
              <MDBox display="flex" gap={1} mt={0.5}>
                <MDButton
                  variant="gradient"
                  color="warning"
                  size="small"
                  sx={{ minHeight: 24, px: 1.2 }}
                  onClick={() => onEdit(movie)}
                >
                  <EditIcon sx={{ fontSize: 14 }} />
                </MDButton>

                <MDButton
                  variant="gradient"
                  color="error"
                  size="small"
                  sx={{ minHeight: 24, px: 1.2 }}
                  onClick={() => onDelete(movie.id)}
                >
                  <DeleteIcon sx={{ fontSize: 14 }} />
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Grid>
      ))}
    </Grid>
  );
}

GridViewTab.propTypes = {
  movies: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GridViewTab;
