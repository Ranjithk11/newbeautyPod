"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { heroFeatures } from "@/lib/content";
import { colors } from "@/theme/colors";
import AppIcon from "@/components/ui/AppIcon";
import type { IconName } from "@/components/ui/AppIcon";

export default function HeroFeatures() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
        mt: 3.2,
      }}
    >
      {heroFeatures.map((feature, index) => (
        <Box
          key={feature.line1}
          sx={{
            textAlign: "center",
            px: { xs: 0.5, md: 1.2 },
            py: 0.5,
            color: colors.green,
            borderRight: {
              xs: index % 2 === 0 ? "1px solid #d5ddd8" : "0",
              sm: index < heroFeatures.length - 1 ? "1px solid #d5ddd8" : "0",
            },
            borderBottom: { xs: index < 2 ? "1px solid #d5ddd8" : 0, sm: 0 },
          }}
        >
          <AppIcon name={feature.icon as IconName} sx={{ fontSize: 29 }} />
          <Typography
            component="span"
            sx={{
              display: "block",
              mt: 1,
              fontSize: { xs: 10, md: 12 },
              color: colors.text,
              lineHeight: 1.25,
              fontWeight: 600,
            }}
          >
            {feature.line1}
            <br />
            {feature.line2}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
