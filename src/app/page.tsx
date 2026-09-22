import Box from "@mui/material/Box";
import SiteShell from "@/components/layout/SiteShell";
import Hero from "@/components/home/Hero";
import ShopProductsBanner from "@/components/home/ShopProductsBanner";
import HowItWorks from "@/components/home/HowItWorks";
import BrandPartners from "@/components/home/BrandPartners";
import Locations from "@/components/home/Locations";
import Benefits from "@/components/home/Benefits";
import InstagramVideos from "@/components/home/InstagramVideos";
import CaseStudy from "@/components/home/CaseStudy";
import Reviews from "@/components/home/Reviews";
import BusinessModels from "@/components/home/BusinessModels";
import FaqSection from "@/components/home/FaqSection";
import FinalCta from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <SiteShell>
      <Box component="main">
        <Hero />
        <ShopProductsBanner />
        <HowItWorks />
        <BrandPartners />
        <Locations />
        <Benefits />
        <InstagramVideos />
        <CaseStudy />
        <Reviews />
        <BusinessModels />
        <FaqSection />
        <FinalCta />
      </Box>
    </SiteShell>
  );
}
