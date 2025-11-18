/**
=========================================================
* Custom SidenavCollapse Style – White + Red Accent
=========================================================
*/

function collapseItem(theme, ownerState) {
  const { transitions, borders, functions } = theme;
  const { active } = ownerState;

  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${pxToRem(8)} ${pxToRem(10)}`,
    margin: `${pxToRem(4)} ${pxToRem(16)}`,
    borderRadius: borderRadius.md,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",

    // Màu chữ & background
    color: active ? "#990011" : "#333",
    backgroundColor: active ? "rgba(153,0,17,0.1)" : "transparent",

    "&:hover, &:focus": {
      backgroundColor: "rgba(153,0,17,0.1)",
      color: "#990011",
    },
  };
}

function collapseIconBox(theme, ownerState) {
  const { transitions, borders, functions } = theme;
  const { active } = ownerState;

  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    minWidth: pxToRem(32),
    minHeight: pxToRem(32),
    borderRadius: borderRadius.md,
    display: "grid",
    placeItems: "center",
    transition: transitions.create("margin", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    color: active ? "#990011" : "#333",

    "& svg": {
      fontSize: "20px",
      color: active ? "#990011" : "#333",
      transition: "0.2s ease",
    },
  };
}

const collapseIcon = (theme, { active }) => ({
  color: active ? "#990011" : "#333",
});

function collapseText(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { miniSidenav, active } = ownerState;

  const { size } = typography;
  const { pxToRem } = functions;

  return {
    marginLeft: pxToRem(8),
    color: active ? "#990011" : "#333",

    [breakpoints.up("xl")]: {
      opacity: miniSidenav ? 0 : 1,
      maxWidth: miniSidenav ? 0 : "100%",
      marginLeft: miniSidenav ? 0 : pxToRem(8),
      transition: transitions.create(["opacity", "margin"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "& span": {
      fontSize: size.sm,
      fontWeight: active ? 600 : 400,
    },
  };
}

export { collapseItem, collapseIconBox, collapseIcon, collapseText };
