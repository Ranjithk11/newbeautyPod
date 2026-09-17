import Box from "@mui/material/Box";
import { businessModels } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import ModelCard from "./ModelCard";

export default function BusinessModels() {
  return (
    <Box
      component="section"
      id="brands"
      sx={{
        py: { xs: 5.2, md: 6 },
        px: { xs: 2.2, md: 3 },
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ maxWidth: 1240, mx: "auto" }}>
        <SectionHeading
          title="Business Models"
          subtitle="Flexible partnership options for every business"
        />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
            gap: 1.5,
          }}
        >
          {businessModels.map((model) => (
            <ModelCard key={model.title} {...model} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
