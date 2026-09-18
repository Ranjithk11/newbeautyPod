"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { colors } from "@/theme/colors";
import { useDemoDialog } from "@/components/providers/DemoDialogProvider";
import HeroFeatures from "./HeroFeatures";

export default function HeroCopy() {
  const { openDemo } = useDemoDialog();

  return (
    <Box
      sx={{
        bgcolor: colors.cream,
        px: { xs: 2.75, md: 5.2 },
        pt: { xs: 5.8, md: 9 },
        pb: { xs: 3.5, md: 5.2 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
          fontSize: { xs: "2.2rem", sm: "2.5rem", md: "3rem", lg: "3.625rem" },
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
          fontSize: { xs: 15, md: 17 },
          lineHeight: 1.55,
          color: "#29443d",
          maxWidth: 600,
          mb: 3,
          animation: "bpFadeUp 0.8s ease 0.16s both",
        }}
      >
        BeautyPod by Leaf Water combines AI skin analysis, personalised
        recommendations and automated retail into one intelligent experience.
      </Typography>
      <Stack
        direction="row"
        sx={{
          flexWrap: "wrap",
          gap: 1.5,
          alignItems: "center",
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
    </Box>
  );
}
