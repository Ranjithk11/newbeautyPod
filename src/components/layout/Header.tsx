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
          bgcolor: "rgba(246,244,233,0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${colors.border}`,
          color: colors.text,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 76, md: 96 },
            width: "100%",
            maxWidth: "none",
            px: { xs: 1.5, md: 3 },
            gap: { md: 3, lg: 5 },
            justifyContent: "space-between",
          }}
        >
          <Link href="/#home" aria-label="BeautyPod home" sx={{ display: "flex", ml: 0, flexShrink: 0 }}>
            <Box
              sx={{
                width: { xs: 188, md: 248 },
                height: { xs: 58, md: 72 },
                flexShrink: 0,
                lineHeight: 0,
                overflow: "hidden",
              }}
            >
              <Logo width={248} priority />
            </Box>
          </Link>
          <DesktopNav />
          <IconButton
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "inline-flex", md: "none" }, color: colors.dark, mr: 0.5 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
