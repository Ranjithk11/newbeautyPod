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
      direction="row"
      aria-label="Primary"
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        flex: 1,
        minWidth: 0,
        pl: { md: 2, lg: 4 },
        gap: { md: 2, lg: 3 },
      }}
    >
      <Stack
        component="nav"
        direction="row"
        sx={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: 0,
        }}
      >
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            sx={{
              fontSize: { md: 13, lg: 15 },
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
      </Stack>
      <Button
        variant="contained"
        color="primary"
        onClick={openDemo}
        sx={{ px: { md: 2.4, lg: 3 }, py: 1.2, flexShrink: 0 }}
      >
        Book a Demo
      </Button>
    </Stack>
  );
}
