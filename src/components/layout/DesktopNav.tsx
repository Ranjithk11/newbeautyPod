"use client";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { navLinks } from "@/lib/content";
import { colors } from "@/theme/colors";
import { useDemoDialog } from "@/components/providers/DemoDialogProvider";

const navItemSx = {
  fontSize: { md: 13, lg: 15.5 },
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
        gap: { md: 1.5, lg: 3.25 },
        pr: { md: 0.5, lg: 1 },
      }}
    >
      {navLinks.map((item) => (
        <Link key={item.label} href={item.href} sx={navItemSx}>
          {item.label}
        </Link>
      ))}
      <Link
        component="button"
        type="button"
        onClick={openDemo}
        sx={{
          ...navItemSx,
          background: "none",
          border: 0,
          p: 0,
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Book a Demo
      </Link>
    </Stack>
  );
}
