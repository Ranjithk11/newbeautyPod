"use client";

import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.green,
      dark: colors.dark,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.forest,
      contrastText: colors.white,
    },
    text: {
      primary: colors.text,
      secondary: colors.muted,
    },
    background: {
      default: colors.page,
      paper: colors.white,
    },
    divider: colors.border,
  },
  typography: {
    fontFamily:
      'var(--font-plus-jakarta), "Plus Jakarta Sans", Arial, sans-serif',
    h1: {
      fontFamily:
        'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontWeight: 700,
      fontSize: "3.625rem",
      lineHeight: 1.02,
      color: colors.dark,
    },
    h2: {
      fontFamily:
        'var(--font-playfair), "Playfair Display", Georgia, serif',
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.15,
      color: colors.heading,
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.125rem",
      lineHeight: 1.25,
    },
    h4: {
      fontWeight: 700,
      fontSize: "0.8125rem",
      letterSpacing: "0.01em",
    },
    overline: {
      fontSize: "0.6875rem",
      fontWeight: 700,
      letterSpacing: "0.28em",
      lineHeight: 1.4,
      color: colors.eyebrow,
    },
    body1: {
      fontSize: "1.0625rem",
      lineHeight: 1.55,
    },
    body2: {
      fontSize: "0.8125rem",
      lineHeight: 1.45,
      color: colors.muted,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
      fontSize: "0.875rem",
    },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          backgroundColor: colors.page,
          color: colors.text,
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "12px 19px",
          position: "relative",
          overflow: "hidden",
          transition:
            "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.2s ease, border-color 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        contained: {
          backgroundColor: colors.green,
          color: colors.white,
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.28) 48%, transparent 70%)",
            transform: "translateX(-130%)",
            pointerEvents: "none",
          },
          "&:hover": {
            backgroundColor: colors.greenHover,
            boxShadow: "0 10px 22px rgba(8, 127, 91, 0.26)",
          },
          "&:hover::after": {
            animation: "bpShimmer 0.75s ease",
          },
        },
        outlined: {
          borderColor: colors.green,
          color: colors.green,
          backgroundColor: "transparent",
          "&:hover": {
            borderColor: colors.greenHover,
            backgroundColor: "rgba(8, 127, 91, 0.06)",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
    MuiLink: {
      defaultProps: { underline: "none" },
    },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 760, lg: 1050, xl: 1440 },
  },
});

export default theme;
