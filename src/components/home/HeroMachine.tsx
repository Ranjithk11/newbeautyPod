"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "@/theme/colors";

const bottles = [
  ["#d9eadc", "#6f8f7a"],
  ["#f4e4d6", "#c08b6c"],
  ["#e6f3ee", "#4f8a72"],
  ["#efe7f6", "#8a6fa0"],
  ["#f8eee3", "#b78963"],
  ["#e3f0e8", "#5d9a7d"],
  ["#fde8e4", "#d0897d"],
  ["#e8eef6", "#6a7fa3"],
  ["#f1f6e8", "#7b9458"],
];

export default function HeroMachine() {
  return (
    <Box
      sx={{
        width: { xs: 210, sm: 250, md: 290 },
        bgcolor: "#fbfcfb",
        borderRadius: "28px",
        boxShadow: "0 22px 50px rgba(16,44,39,0.22)",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.8)",
      }}
    >
      <Box sx={{ px: 2, pt: 1.6, pb: 1, textAlign: "center" }}>
        <Typography sx={{ fontWeight: 800, fontSize: 18, color: colors.dark, lineHeight: 1 }}>
          BeautyPod
        </Typography>
        <Typography sx={{ fontSize: 9, color: colors.muted }}>by Leaf Water</Typography>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", minHeight: { xs: 260, md: 340 } }}>
        <Box
          sx={{
            position: "relative",
            m: 1,
            borderRadius: 2,
            overflow: "hidden",
            backgroundImage: "url(/images/kiosk-model.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(8,127,91,0.12) 0%, rgba(13,68,54,0.55) 100%)",
            }}
          />
          <Box sx={{ position: "absolute", left: 10, right: 10, bottom: 12, color: "#fff" }}>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: 13, md: 16 }, lineHeight: 1.15 }}>
              Discover
              <br />
              Your Best Skin
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: "inline-block",
                bgcolor: colors.green,
                px: 1.1,
                py: 0.4,
                borderRadius: 10,
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              Scan to Begin
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            bgcolor: "rgba(232,244,238,0.55)",
            borderLeft: "1px solid #e4eee8",
            px: 0.8,
            py: 1.2,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0.6,
            alignContent: "start",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: 18,
              right: -4,
              transform: "rotate(18deg)",
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontStyle: "italic",
              fontWeight: 700,
              color: "#7aa394",
              fontSize: { xs: 11, md: 13 },
              lineHeight: 1.15,
              textAlign: "right",
              width: 90,
            }}
          >
            Scan
            <br />
            Analyse
            <br />
            Discover
            <br />
            Glow
          </Typography>
          {bottles.map(([fill, cap], index) => (
            <Box key={`${fill}-${index}`} sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: 18,
                  height: 42,
                  borderRadius: "8px 8px 4px 4px",
                  bgcolor: fill,
                  border: "1px solid rgba(16,44,39,0.08)",
                  position: "relative",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 10,
                    height: 8,
                    borderRadius: "3px 3px 0 0",
                    bgcolor: cap,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Typography sx={{ textAlign: "center", fontSize: 10, color: colors.muted, py: 1 }}>
        by Leaf Water
      </Typography>
    </Box>
  );
}
