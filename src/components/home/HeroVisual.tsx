"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { colors } from "@/theme/colors";

export default function HeroVisual() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: 340, sm: 420, md: "100%" },
        height: { xs: "min(68vw, 460px)", md: "auto" },
        overflow: "hidden",
        animation: "bpFadeIn 0.9s ease both",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: { xs: "78%", md: "62%" },
          height: { xs: "62%", md: "54%" },
          left: "50%",
          top: "46%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(8,127,91,0.26) 0%, rgba(246,244,233,0) 72%)",
          animation: "bpGlow 4.8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: { xs: "8% 4% 18% 4%", md: "4% 6% 10% 4%" },
          animation: "bpFloat 5.4s ease-in-out infinite",
        }}
      >
        <Image
          src="/images/beautypod-machine.jpg"
          alt="BeautyPOD AI skincare vending machine by Leaf Water"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 58vw"
          style={{ objectFit: "contain", objectPosition: "center bottom" }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 3,
          bgcolor: "rgba(246,244,233,0.94)",
          backdropFilter: "blur(10px)",
          borderTopLeftRadius: { xs: 48, md: 90 },
          px: { xs: 2.2, md: 3.8 },
          pt: { xs: 2.2, md: 4.2 },
          pb: { xs: 1.8, md: 3 },
          animation: "bpFadeUp 0.9s ease 0.2s both",
        }}
      >
        <Typography
          sx={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontWeight: 800,
            fontSize: { xs: 16, md: 24 },
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
