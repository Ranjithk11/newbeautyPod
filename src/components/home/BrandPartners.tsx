import Box from "@mui/material/Box";
import { brandPartners } from "@/lib/content";
import { colors } from "@/theme/colors";
import SectionHeading from "@/components/ui/SectionHeading";

export default function BrandPartners() {
  const logos = [...brandPartners, ...brandPartners];

  return (
    <Box
      component="section"
      id="brand-partners"
      sx={{
        py: { xs: 5.2, md: 6.5 },
        px: { xs: 2.2, md: 3 },
        background: `linear-gradient(180deg, ${colors.cream} 0%, ${colors.mist} 100%)`,
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: "auto" }}>
        <SectionHeading
          title="Brands"
          subtitle="Trusted names already in the Leaf Water ecosystem"
        />
        <Box
          sx={{
            overflow: "hidden",
            maskImage:
              "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "max-content",
              animation: "bpMarquee 28s linear infinite",
              "&:hover": { animationPlayState: "paused" },
            }}
          >
            {logos.map((brand, index) => (
              <Box
                key={`${brand.name}-${index}`}
                sx={{
                  width: { xs: 176, md: 210 },
                  height: 112,
                  mr: 2,
                  px: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#fff",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 3,
                  boxShadow: "0 10px 24px rgba(13,68,54,0.06)",
                  "& img": {
                    width: "100%",
                    maxWidth: 150,
                    height: 64,
                    objectFit: "contain",
                    transition: "transform 0.25s ease",
                  },
                  "&:hover img": {
                    transform: "scale(1.04)",
                  },
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={brand.logo} alt={`${brand.name} logo`} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
