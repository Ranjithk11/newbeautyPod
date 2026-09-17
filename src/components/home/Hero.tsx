import Box from "@mui/material/Box";
import HeroCopy from "./HeroCopy";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <Box
      component="section"
      id="home"
      sx={{
        maxWidth: 1240,
        mx: "auto",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "44% 56%" },
        bgcolor: "#f6f4e9",
        overflow: "hidden",
      }}
    >
      <HeroCopy />
      <HeroVisual />
    </Box>
  );
}
