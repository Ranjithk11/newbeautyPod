import Box from "@mui/material/Box";
import { benefits } from "@/lib/content";
import { colors } from "@/theme/colors";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import BenefitItem from "./BenefitItem";

export default function Benefits() {
  return (
    <Box
      component="section"
      id="retailers"
      sx={{
        bgcolor: colors.forest,
        color: "#fff",
        py: { xs: 4.2, md: 4.8 },
        px: { xs: 2.2, md: 3 },
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: "auto" }}>
        <SectionHeading title="Why Retailers Choose BeautyPod" light />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(6, 1fr)",
            },
          }}
        >
          {benefits.map((benefit, index) => (
            <FadeIn key={benefit.label} delay={index * 70}>
              <BenefitItem
                {...benefit}
                last={index === benefits.length - 1}
              />
            </FadeIn>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
