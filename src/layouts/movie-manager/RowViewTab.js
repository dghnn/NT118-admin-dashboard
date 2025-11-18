// src/layouts/movie-manager/RowViewTab.js
import React from "react";
import PropTypes from "prop-types";

// Material Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function RowViewTab({ movies, onEdit, onDelete }) {
  return (
    <MDBox display="flex" flexDirection="column" gap={2}>
      {movies.map((movie) => (
        <MDBox
          key={movie.id}
          display="flex"
          justifyContent="space-between"
          bgcolor="white"
          borderRadius="lg"
          shadow="sm"
          p={2}
          sx={{ backgroundColor: "#ffffff" }}
        >
          {/* Nội dung bên trái */}
          <MDBox flex={1} display="flex" flexDirection="column" overflow="hidden">
            {/* Tựa đề */}
            <MDTypography
              fontWeight="bold"
              fontSize={15}
              sx={{
                mb: 0.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                borderBottom: "3px solid #cececeff",
                pb: 0.5,
              }}
            >
              {movie.title}
            </MDTypography>

            {/* Thông tin phụ */}
            <MDBox display="flex" alignItems="center" flexWrap="wrap" gap={0.5} mt={0.5}>
              <MDTypography fontSize={11} fontWeight="bold" color="text">
                Genre:
              </MDTypography>
              <MDTypography fontSize={11} color="text">
                {movie.genres?.join(", ")}
              </MDTypography>

              <MDTypography fontSize={11} fontWeight="bold" color="text" ml={1}>
                Duration:
              </MDTypography>
              <MDTypography fontSize={11} color="text">
                {movie.duration}
              </MDTypography>

              <MDTypography fontSize={11} fontWeight="bold" color="text" ml={1}>
                Age:
              </MDTypography>
              <MDBox
                px={0.7}
                py="2px"
                fontWeight="bold"
                sx={{
                  backgroundColor: "#b20015ff",
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
          </MDBox>

          {/* Nút bên phải */}
          <MDBox display="flex" flexDirection="column" justifyContent="flex-start" gap={1} ml={2}>
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
      ))}
    </MDBox>
  );
}

RowViewTab.propTypes = {
  movies: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RowViewTab;
