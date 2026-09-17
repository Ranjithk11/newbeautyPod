import Box from "@mui/material/Box";
import SiteShell from "@/components/layout/SiteShell";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Locations from "@/components/home/Locations";
import Benefits from "@/components/home/Benefits";
import CaseStudy from "@/components/home/CaseStudy";
import BusinessModels from "@/components/home/BusinessModels";
import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <SiteShell>
      <Box component="main">
        <Hero />
        <HowItWorks />
        <Locations />
        <Benefits />
        <CaseStudy />
        <BusinessModels />
        <FaqSection />
        <FinalCta />
      </Box>
    </SiteShell>
  );
}
