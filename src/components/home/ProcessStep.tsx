"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "@/theme/colors";
import AppIcon from "@/components/ui/AppIcon";
import type { IconName } from "@/components/ui/AppIcon";

type ProcessStepProps = {
  no: string;
  title: string;
  text: string;
  icon: string;
};

export default function ProcessStep({ no, title, text, icon }: ProcessStepProps) {
  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        gap: 1.75,
        alignItems: "flex-start",
        flex: 1,
        "&:hover .bp-step-icon": {
          transform: "scale(1.08)",
        },
      }}
    >
      <Box
        className="bp-step-icon"
        sx={{
          width: 58,
          height: 58,
          minWidth: 58,
          borderRadius: "50%",
          bgcolor: colors.soft,
          color: colors.green,
          display: "grid",
          placeItems: "center",
          transition: "transform 0.25s ease, background-color 0.25s ease",
        }}
      >
        <AppIcon name={icon as IconName} sx={{ fontSize: 29 }} />
      </Box>
      <Box>
        <Typography component="span" sx={{ color: "#60706c", fontSize: 12, display: "block" }}>
          {no}
        </Typography>
        <Typography variant="h3" component="h3" sx={{ mt: 0.25, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ m: 0 }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
