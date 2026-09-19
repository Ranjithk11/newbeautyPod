"use client";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { navLinks } from "@/lib/content";
import { colors } from "@/theme/colors";
import { useDemoDialog } from "@/components/providers/DemoDialogProvider";

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
        <Link
          key={item.label}
          href={item.href}
          sx={{
            fontSize: { md: 13, lg: 15.5 },
            fontWeight: 500,
            color: colors.gold,
            whiteSpace: "nowrap",
            letterSpacing: "0.01em",
            transition: "color 0.2s ease",
            "&:hover": { color: colors.goldSoft },
          }}
        >
          {item.label}
        </Link>
      ))}
      <Link
        component="button"
        type="button"
        onClick={openDemo}
        sx={{
          fontSize: { md: 13, lg: 15.5 },
          fontWeight: 500,
          color: colors.gold,
          whiteSpace: "nowrap",
          letterSpacing: "0.01em",
          background: "none",
          border: 0,
          p: 0,
          cursor: "pointer",
          fontFamily: "inherit",
          "&:hover": { color: colors.goldSoft },
        }}
      >
        Book a Demo
      </Link>
    </Stack>
  );
}
