import Box from "@mui/material/Box";
import HeroCopy from "./HeroCopy";
import HeroVisual from "./HeroVisual";

function LeafMark({ flip = false }: { flip?: boolean }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 220 260"
      aria-hidden
      sx={{
        width: "100%",
        height: "100%",
        transform: flip ? "scaleX(-1)" : "none",
      }}
    >
      <path
        d="M118 18c38 28 78 86 78 148-42-8-78 6-118 38C46 148 58 78 118 18z"
        fill="#2b5f4c"
        opacity="0.22"
      />
      <path
        d="M96 46c34 24 62 70 58 122-32-14-62-4-96 22 4-54 12-98 38-144z"
        fill="#3d7a62"
        opacity="0.28"
      />
      <path
        d="M132 8c18 36 22 78 10 128 22 8 40 28 52 54-8-86-18-142-62-182z"
        fill="#1f4d3d"
        opacity="0.18"
      />
    </Box>
  );
}

export default function Hero() {
  return (
    <Box
      component="section"
      id="home"
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: `
          radial-gradient(ellipse at 82% 48%, rgba(255, 236, 160, 0.7) 0%, transparent 42%),
          linear-gradient(115deg, #f4f8f2 0%, #eef6f0 48%, #fff4c4 100%)
        `,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: { xs: 180, md: 320 },
          height: { xs: 220, md: 380 },
          right: { xs: -70, md: -90 },
          bottom: { xs: -80, md: -110 },
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <LeafMark />
      </Box>
      <Box
        sx={{
          position: "absolute",
          width: { xs: 140, md: 240 },
          height: { xs: 180, md: 300 },
          right: { xs: -40, md: -30 },
          top: { xs: 20, md: 40 },
          pointerEvents: "none",
          opacity: 0.7,
          zIndex: 1,
        }}
      >
        <LeafMark />
      </Box>
      <Box
        sx={{
          width: "100%",
          minHeight: { md: "calc(100svh - 88px)" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1.15fr)" },
          alignItems: "center",
        }}
      >
        <HeroCopy />
        <HeroVisual />
      </Box>
    </Box>
  );
}
