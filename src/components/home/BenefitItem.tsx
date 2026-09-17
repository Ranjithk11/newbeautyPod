"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppIcon from "@/components/ui/AppIcon";
import type { IconName } from "@/components/ui/AppIcon";

type BenefitItemProps = {
  icon: string;
  label: string;
  last?: boolean;
};

export default function BenefitItem({ icon, label, last = false }: BenefitItemProps) {
  return (
    <Box
      component="article"
      sx={{
        textAlign: "center",
        px: { xs: 1, md: 2 },
        py: { xs: 1.8, md: 1.2 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
        borderRight: {
          xs: last ? 0 : "1px solid rgba(255,255,255,.2)",
          md: last ? 0 : "1px solid rgba(255,255,255,.28)",
        },
      }}
    >
      <AppIcon name={icon as IconName} sx={{ fontSize: 40 }} />
      <Typography
        component="span"
        sx={{ fontSize: { xs: 11, md: 13 }, fontWeight: 700, lineHeight: 1.25 }}
      >
        {label}
      </Typography>
    </Box>
  );
}
