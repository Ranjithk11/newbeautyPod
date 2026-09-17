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
      sx={{ display: "flex", gap: 1.75, alignItems: "flex-start", flex: 1 }}
    >
      <Box
        sx={{
          width: 58,
          height: 58,
          minWidth: 58,
          borderRadius: "50%",
          bgcolor: colors.soft,
          color: colors.green,
          display: "grid",
          placeItems: "center",
        }}
      >
        <AppIcon name={icon as IconName} sx={{ fontSize: 29 }} />
      </Box>
      <Box>
        <Typography component="small" sx={{ color: "#60706c", fontSize: 12 }}>
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
