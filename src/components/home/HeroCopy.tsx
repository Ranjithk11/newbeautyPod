"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDemoDialog } from "@/components/providers/DemoDialogProvider";
import HeroFeatures from "./HeroFeatures";

export default function HeroCopy() {
  const { openDemo } = useDemoDialog();

  return (
    <Box
      sx={{
        px: { xs: 2.5, sm: 4, md: 7, xl: 10 },
        pt: { xs: 2, md: 3 },
        pb: { xs: 2.5, md: 4 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Typography
        variant="overline"
        sx={{ mb: 2.2, display: "block", animation: "bpFadeUp 0.7s ease both" }}
      >
        AI MEETS SKINCARE. EVERYWHERE.
      </Typography>
      <Typography
        variant="h1"
        component="h1"
        sx={{
          mb: 2.2,
          fontSize: { xs: "2.15rem", sm: "2.7rem", md: "3.2rem", lg: "4rem" },
          animation: "bpFadeUp 0.8s ease 0.08s both",
        }}
      >
        The Future of
        <br />
        Skincare Retail
        <br />
        Is Here
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 15, md: 18 },
          lineHeight: 1.55,
          color: "#29443d",
          maxWidth: 620,
          mb: 3,
          animation: "bpFadeUp 0.8s ease 0.16s both",
        }}
      >
        BeautyPod by Leaf Water combines AI skin analysis, personalised
        recommendations and automated retail into one intelligent experience.
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          flexWrap: "wrap",
          gap: 1.5,
          alignItems: { xs: "stretch", sm: "center" },
          animation: "bpFadeUp 0.8s ease 0.24s both",
        }}
      >
        <Button variant="contained" onClick={openDemo} endIcon={<ArrowForwardIcon />}>
          Book a Live Demo
        </Button>
        <Button variant="outlined" href="/#how-it-works">
          Explore BeautyPod
        </Button>
      </Stack>
      <HeroFeatures />
      <Button
        variant="contained"
        href="/products?page=1&brandId=all&catId=All"
        sx={{
          mt: 2.8,
          py: 1.55,
          width: "100%",
          maxWidth: 520,
          letterSpacing: "0.14em",
          fontSize: 15,
          fontWeight: 800,
        }}
      >
        SHOP PRODUCTS
      </Button>
    </Box>
  );
}
