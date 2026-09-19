"use client";

import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { colors } from "@/theme/colors";

export default function HeroVisual() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: 380, sm: 460, md: 640 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 1, md: 2, lg: 3 },
        overflow: "visible",
        animation: "bpFadeIn 0.9s ease both",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: { xs: "72%", md: "68%" },
          height: { xs: "58%", md: "52%" },
          left: "50%",
          top: "46%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,236,160,0.68) 0%, rgba(238,246,240,0) 72%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: { xs: 420, md: 520, lg: 560 },
          aspectRatio: "3 / 4",
          animation: "bpFloat 5.4s ease-in-out infinite",
        }}
      >
        <Image
          src="/images/beautypod-machine-soft.png"
          alt="BeautyPOD AI skincare vending machine by Leaf Water"
          fill
          priority
          sizes="(max-width: 760px) 92vw, 560px"
          style={{ objectFit: "contain", objectPosition: "center center" }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 3,
          bgcolor: "rgba(247,250,244,0.92)",
          borderTopLeftRadius: { xs: 56, md: 92 },
          px: { xs: 2.4, md: 3.6 },
          pt: { xs: 2.4, md: 3.6 },
          pb: { xs: 1.6, md: 2.4 },
          animation: "bpFadeUp 0.9s ease 0.2s both",
        }}
      >
        <Stack direction="row" spacing={1.2} sx={{ alignItems: "flex-end" }}>
          <Typography
            sx={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 800,
              fontSize: { xs: 16, md: 22 },
              lineHeight: 1.08,
              color: colors.dark,
            }}
          >
            Skincare.
            <br />
            Smarter.
            <br />
            Everywhere.
          </Typography>
          <SpaOutlinedIcon sx={{ color: colors.green, fontSize: { xs: 22, md: 28 }, mb: 0.3 }} />
        </Stack>
      </Box>
    </Box>
  );
}
