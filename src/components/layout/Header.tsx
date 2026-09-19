"use client";

import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import { colors } from "@/theme/colors";
import Logo from "@/components/ui/Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          width: "100%",
          left: 0,
          right: 0,
          bgcolor: colors.header,
          color: colors.gold,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 76, md: 88 },
            width: "100%",
            px: { xs: 2, md: 3.5, lg: 5 },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/#home" aria-label="BeautyPod home" sx={{ display: "flex", lineHeight: 0 }}>
            <Box
              sx={{
                width: { xs: 196, md: 220, lg: 268 },
                height: { xs: 58, md: 64, lg: 74 },
                flexShrink: 0,
                lineHeight: 0,
                overflow: "hidden",
                "& img": {
                  transform: "scale(1.18)",
                  transformOrigin: "left center",
                },
              }}
            >
              <Logo width={268} priority />
            </Box>
          </Link>
          <DesktopNav />
          <IconButton
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "inline-flex", md: "none" }, color: colors.gold }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
