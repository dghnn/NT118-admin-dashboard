const contained = {
  base: {
    textTransform: "none",
    borderRadius: 8,
  },
  small: {
    padding: "4px 10px",
    fontSize: "0.75rem",
  },
  large: {
    padding: "8px 22px",
    fontSize: "0.875rem",
  },
  primary: {
    backgroundColor: "#990011", // đỏ
    color: "#fff", // chữ trắng
    "&:hover": {
      backgroundColor: "#d63e3eff", // đỏ đậm khi hover
    },
  },
  secondary: {
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#115293",
    },
  },
};

export default contained;
