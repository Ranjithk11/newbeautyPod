import Box from "@mui/material/Box";
import { colors } from "@/theme/colors";
import HeroCopy from "./HeroCopy";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <Box
      component="section"
      id="home"
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background:
          `linear-gradient(120deg, ${colors.cream} 0%, #eef7f1 42%, ${colors.goldSoft} 100%)`,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: { xs: 220, md: 420 },
          height: { xs: 220, md: 420 },
          right: { xs: -80, md: -60 },
          top: { xs: 40, md: -40 },
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,127,91,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 280,
          height: 280,
          left: -90,
          bottom: -90,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,163,90,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          width: "100%",
          minHeight: { md: "calc(100svh - 96px)" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1.15fr)" },
          alignItems: "stretch",
        }}
      >
        <HeroCopy />
        <HeroVisual />
      </Box>
    </Box>
  );
}
