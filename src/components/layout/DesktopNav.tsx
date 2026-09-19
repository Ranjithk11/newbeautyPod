"use client";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { navLinks } from "@/lib/content";
import { colors } from "@/theme/colors";
import { useDemoDialog } from "@/components/providers/DemoDialogProvider";

const navItemSx = {
  fontSize: { md: 13, lg: 15 },
  fontWeight: 500,
  color: colors.white,
  whiteSpace: "nowrap",
  letterSpacing: "0.01em",
  textDecoration: "none",
  position: "relative",
  transition: "color 0.2s ease",
  "&:hover": { color: colors.gold },
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -4,
    height: 2,
    bgcolor: colors.gold,
    transform: "scaleX(0)",
    transformOrigin: "left",
    transition: "transform 0.2s ease",
  },
  "&:hover::after": {
    transform: "scaleX(1)",
  },
} as const;

export default function DesktopNav() {
  const { openDemo } = useDemoDialog();

  return (
    <Stack
      component="nav"
      direction="row"
      aria-label="Primary"
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "flex-end",
        gap: { md: 1.4, lg: 2.8 },
        pr: { md: 0.5, lg: 1 },
      }}
    >
      {navLinks.map((item) => (
        <Link key={item.label} href={item.href} sx={navItemSx}>
          {item.label}
        </Link>
      ))}
      <Button
        onClick={openDemo}
        sx={{
          ml: { md: 0.5, lg: 1 },
          px: { md: 2, lg: 2.4 },
          py: 0.7,
          minWidth: 0,
          flexShrink: 0,
          borderRadius: 999,
          border: "1.5px solid #fff",
          color: "#fff",
          bgcolor: "transparent",
          fontWeight: 600,
          fontSize: { md: 13, lg: 14 },
          textTransform: "none",
          "&:hover": {
            bgcolor: "#fff",
            color: colors.header,
            borderColor: "#fff",
            boxShadow: "none",
            transform: "none",
          },
        }}
      >
        Book a Demo
      </Button>
    </Stack>
  );
}
