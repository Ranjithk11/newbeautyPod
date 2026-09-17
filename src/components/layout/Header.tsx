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
          bgcolor: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${colors.border}`,
          color: colors.text,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 66, md: 76 },
            px: { xs: 2.2, md: 3 },
            maxWidth: 1240,
            width: "100%",
            mx: "auto",
            justifyContent: "space-between",
          }}
        >
          <Link href="/#home" aria-label="BeautyPod home" sx={{ display: "flex" }}>
            <Box sx={{ width: { xs: 150, md: 178 } }}>
              <Logo width={178} priority />
            </Box>
          </Link>
          <DesktopNav />
          <IconButton
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "inline-flex", md: "none" }, color: colors.dark }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
