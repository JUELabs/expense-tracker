"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#10B981",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#64748B",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;