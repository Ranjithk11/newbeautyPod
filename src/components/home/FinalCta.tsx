"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { colors } from "@/theme/colors";
import { useDemoDialog } from "@/components/providers/DemoDialogProvider";

export default function FinalCta() {
  const { openDemo } = useDemoDialog();

  return (
    <Box
      component="section"
      id="demo"
      sx={{
        maxWidth: 1240,
        mx: "auto",
        minHeight: { xs: 330, md: 280 },
        px: { xs: 2.75, md: 7 },
        py: { xs: 6, md: 7.5 },
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        backgroundColor: colors.dark,
        backgroundImage: "url(/images/cta-woman.jpg), url(/images/leaves.jpg)",
        backgroundPosition: "18% center, right center",
        backgroundSize: "cover, cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(5,52,41,0.82) 0%, rgba(5,52,41,0.72) 48%, rgba(5,52,41,0.55) 100%)",
        }}
      />
      <Box sx={{ position: "relative", maxWidth: 720, animation: "bpFadeUp 0.8s ease both" }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: { xs: 22, md: 28 },
            lineHeight: 1.15,
            mb: 2,
            color: "#e8f4ee",
          }}
        >
          Real People.
          <br />
          Real Skin.
          <br />
          Real Confidence.
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{ color: "#fff", fontSize: { xs: 31, md: 38 }, mb: 1 }}
        >
          Let’s Bring BeautyPod to Your Location
        </Typography>
        <Typography sx={{ mb: 2.75, color: "#e2eee9" }}>
          Join the future of personalised skincare retail.
        </Typography>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.5 }}>
          <Button variant="contained" onClick={openDemo} endIcon={<ArrowForwardIcon />}>
            Book a Demo
          </Button>
          <Button
            variant="outlined"
            href="/beautypod-brochure.pdf"
            download
            startIcon={<DownloadIcon />}
            sx={{
              color: "#fff",
              borderColor: "#fff",
              "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
            }}
          >
            Download Brochure
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
