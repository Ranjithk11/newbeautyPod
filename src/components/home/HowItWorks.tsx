import { Fragment } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import { processSteps } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessStep from "./ProcessStep";

export default function HowItWorks() {
  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{
        py: { xs: 5.2, md: 6 },
        px: { xs: 2.2, md: 3 },
        maxWidth: 1240,
        mx: "auto",
      }}
    >
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
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        {processSteps.map((step, index) => (
          <Fragment key={step.no}>
            <ProcessStep {...step} />
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
  );
}
