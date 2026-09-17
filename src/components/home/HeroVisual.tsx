"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "@/theme/colors";
import HeroMachine from "./HeroMachine";

export default function HeroVisual() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: 330, md: 570 },
        overflow: "hidden",
        backgroundColor: "#d8e3dc",
        backgroundImage: "url(/images/hero-mall.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(246,244,233,0.18) 0%, rgba(255,255,255,0.05) 28%, rgba(0,0,0,0.08) 100%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: { xs: "48%", md: "42%" },
          height: "100%",
          backgroundImage: "url(/images/hero-woman.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          maskImage: "linear-gradient(90deg, transparent 0%, black 18%)",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          minHeight: { xs: 330, md: 570 },
          display: "flex",
          alignItems: "center",
          pl: { xs: 2, md: 4 },
        }}
      >
        <HeroMachine />
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 3,
          bgcolor: colors.cream,
          borderTopLeftRadius: 90,
          px: { xs: 2.2, md: 3.8 },
          pt: { xs: 2.8, md: 4.2 },
          pb: { xs: 2.2, md: 3 },
        }}
      >
        <Typography
          sx={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontWeight: 800,
            fontSize: { xs: 18, md: 24 },
            lineHeight: 1.05,
            color: colors.dark,
          }}
        >
          Skincare.
          <br />
          Smarter.
          <br />
          Everywhere.
        </Typography>
      </Box>
    </Box>
  );
}
