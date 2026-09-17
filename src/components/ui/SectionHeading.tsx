import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  light?: boolean;
  children?: ReactNode;
};

export default function SectionHeading({
  title,
  subtitle,
  light = false,
}: SectionHeadingProps) {
  return (
    <Box sx={{ textAlign: "center", mb: { xs: 3.5, md: 4 } }}>
      <Typography
        variant="h2"
        component="h2"
        sx={{ color: light ? "#fff" : undefined, mb: subtitle ? 0.6 : 0 }}
      >
        {title}
      </Typography>
      {subtitle ? (
        <Typography sx={{ m: 0, color: light ? "rgba(255,255,255,0.82)" : "text.secondary" }}>
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  );
}
