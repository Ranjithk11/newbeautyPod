import Box from "@mui/material/Box";
import { locations } from "@/lib/content";
import { colors } from "@/theme/colors";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import LocationCard from "./LocationCard";

export default function Locations() {
  return (
    <Box
      component="section"
      id="locations"
      sx={{
        bgcolor: colors.locationBg,
        py: { xs: 5.2, md: 6 },
        px: { xs: 2.2, md: 3 },
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: "auto" }}>
        <SectionHeading
          title="Where Can BeautyPod Be Deployed?"
          subtitle="Perfect for high-footfall environments"
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(8, 1fr)",
            },
            gap: { xs: 1.25, md: 1.5 },
          }}
        >
          {locations.map((location, index) => (
            <FadeIn key={location.name} delay={index * 50}>
              <LocationCard {...location} />
            </FadeIn>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
