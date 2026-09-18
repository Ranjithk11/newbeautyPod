"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppIcon from "@/components/ui/AppIcon";
import type { IconName } from "@/components/ui/AppIcon";

type ModelCardProps = {
  icon: string;
  title: string;
  text: string;
  bg: string;
};

export default function ModelCard({ icon, title, text, bg }: ModelCardProps) {
  return (
    <Box
      component="article"
      sx={{
        borderRadius: "8px",
        p: "26px 18px",
        textAlign: "center",
        bgcolor: bg,
        minHeight: 150,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 14px 28px rgba(16, 44, 39, 0.12)",
        },
      }}
    >
      <AppIcon name={icon as IconName} sx={{ fontSize: 34, color: "#087f5b" }} />
      <Typography variant="h3" component="h3" sx={{ mt: 1.2, mb: 0.6, fontSize: 17 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ m: 0 }}>
        {text}
      </Typography>
    </Box>
  );
}
