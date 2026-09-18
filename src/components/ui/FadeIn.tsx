"use client";

import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  sx?: SxProps<Theme>;
};

export default function FadeIn({ children, delay = 0, sx }: FadeInProps) {
  return (
    <Box
      sx={{
        animation: `bpFadeUp 0.7s ease both`,
        animationDelay: `${delay}ms`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
