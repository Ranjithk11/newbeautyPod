"use client";

import Button from "@mui/material/Button";
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
      spacing={{ md: 1.5, lg: 3 }}
      aria-label="Primary"
      sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
    >
      {navLinks.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          sx={{
            fontSize: { md: 11, lg: 13 },
            fontWeight: 600,
            color: colors.text,
            whiteSpace: "nowrap",
            position: "relative",
            transition: "color 0.2s ease",
            "&:hover": { color: colors.green },
            "&::after": {
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -4,
              height: 2,
              bgcolor: colors.green,
              transform: "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.2s ease",
            },
            "&:hover::after": {
              transform: "scaleX(1)",
            },
          }}
        >
          {item.label}
        </Link>
      ))}
      <Button variant="contained" color="primary" onClick={openDemo}>
        Book a Demo
      </Button>
    </Stack>
  );
}
