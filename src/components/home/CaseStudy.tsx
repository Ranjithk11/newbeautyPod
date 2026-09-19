"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { colors } from "@/theme/colors";
import CaseStudyQuote from "./CaseStudyQuote";

const metrics = [
  { value: "Thousands", label: "of scans" },
  { value: "High", label: "engagement" },
  { value: "Real", label: "sales conversion" },
];

export default function CaseStudy() {
  return (
    <Box
      component="section"
      id="case-studies"
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1.15fr 1fr .8fr" },
        minHeight: { md: 360 },
        bgcolor: colors.caseBg,
      }}
    >
      <Box sx={{ position: "relative", minHeight: { xs: 250, md: "100%" }, animation: "bpFadeIn 0.8s ease both" }}>
        <Image
          src="/images/beautypod-machine.jpg"
          alt="BeautyPOD machine at Hyderabad Airport"
          fill
          sizes="(max-width: 760px) 100vw, 40vw"
          style={{ objectFit: "contain", objectPosition: "center", backgroundColor: "#fff" }}
        />
      </Box>
      <Box sx={{ px: { xs: 2.75, md: 4.5 }, py: { xs: 4, md: 6.2 } }}>
        <Typography variant="overline" sx={{ display: "block" }}>
          CASE STUDY
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          sx={{ fontSize: { xs: 28, md: 32 }, lineHeight: 1.1, mt: 1, mb: 1.75 }}
        >
          BeautyPod at Hyderabad Airport
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.55, mb: 2.5 }}>
          Bringing personalised skincare to millions of travellers.
        </Typography>
        <Button variant="contained" href="#case-studies" endIcon={<ArrowForwardIcon />}>
          View Case Study
        </Button>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1.5,
            mt: 3.5,
          }}
        >
          {metrics.map((metric) => (
            <Box key={metric.label} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography component="strong" sx={{ fontSize: 18, fontWeight: 800 }}>
                {metric.value}
              </Typography>
              <Typography component="span" sx={{ color: "text.secondary", fontSize: 12 }}>
                {metric.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ gridColumn: { xs: "1", md: "1 / -1", lg: "auto" } }}>
        <CaseStudyQuote />
      </Box>
    </Box>
  );
}
