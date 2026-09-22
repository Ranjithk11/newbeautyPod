import { Fragment } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import { processSteps } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import ProcessStep from "./ProcessStep";

export default function HowItWorks() {
  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{
        py: { xs: 5.2, md: 6.5 },
        px: { xs: 2.2, md: 3 },
        position: "relative",
        zIndex: 3,
        overflow: "visible",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(238,246,241,0.9) 100%)",
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: "auto" }}>
      <Box id="products">
        <SectionHeading
          title="How BeautyPod Works"
          subtitle="A simple, seamless and engaging experience"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "flex-start" },
          justifyContent: "space-between",
          gap: 1.5,
          overflow: "visible",
          pb: { xs: 1, md: 2 },
        }}
      >
        {processSteps.map((step, index) => (
          <Fragment key={step.no}>
            <FadeIn delay={index * 90} sx={{ flex: 1, overflow: "visible", position: "relative" }}>
              <ProcessStep
                {...step}
                align={index === 0 ? "left" : index === processSteps.length - 1 ? "right" : "center"}
              />
            </FadeIn>
            {index < processSteps.length - 1 ? (
              <ArrowForwardIcon
                sx={{
                  display: { xs: "none", md: "block" },
                  color: "#687873",
                  mx: 1.5,
                }}
              />
            ) : null}
          </Fragment>
        ))}
      </Box>
      </Box>
    </Box>
  );
}
