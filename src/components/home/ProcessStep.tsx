"use client";

import { useId } from "react";
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
  popupTitle: string;
  popupBody: string;
  popupPoints: readonly string[];
  align?: "left" | "center" | "right";
};

function ScanPreview() {
  return (
    <Box className="bp-preview-stage" aria-hidden>
      <Box className="bp-scan-face">
        <Box className="bp-scan-line" />
        <Box className="bp-scan-eye bp-scan-eye-left" />
        <Box className="bp-scan-eye bp-scan-eye-right" />
      </Box>
    </Box>
  );
}

function AnalysePreview() {
  return (
    <Box className="bp-preview-stage" aria-hidden>
      <Box className="bp-analyse-bars">
        <span />
        <span />
        <span />
        <span />
      </Box>
    </Box>
  );
}

function RecommendPreview() {
  return (
    <Box className="bp-preview-stage" aria-hidden>
      <Box className="bp-recommend-row">
        <span />
        <span />
        <span />
      </Box>
    </Box>
  );
}

function PurchasePreview() {
  return (
    <Box className="bp-preview-stage" aria-hidden>
      <Box className="bp-purchase-bag">
        <Box className="bp-purchase-check" />
      </Box>
    </Box>
  );
}

const previews = {
  scan: ScanPreview,
  analyse: AnalysePreview,
  recommend: RecommendPreview,
  purchase: PurchasePreview,
} as const;

export default function ProcessStep({
  no,
  title,
  text,
  icon,
  popupTitle,
  popupBody,
  popupPoints,
  align = "center",
}: ProcessStepProps) {
  const popupId = useId();
  const Preview = previews[icon as keyof typeof previews] ?? ScanPreview;

  return (
    <Box
      component="article"
      tabIndex={0}
      aria-describedby={popupId}
      sx={{
        display: "flex",
        gap: 1.75,
        alignItems: "flex-start",
        flex: 1,
        position: "relative",
        outline: "none",
        cursor: "pointer",
        "&:hover, &:focus-within": { zIndex: 6 },
        "&:hover .bp-step-icon, &:focus-within .bp-step-icon": {
          transform: "scale(1.08)",
          bgcolor: "#d7eee4",
        },
        "&:hover .bp-step-popup, &:focus-within .bp-step-popup": {
          opacity: 1,
          visibility: "visible",
          pointerEvents: "auto",
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

      <Box
        id={popupId}
        className="bp-step-popup"
        role="tooltip"
        sx={{
          position: "absolute",
          top: "calc(100% + 14px)",
          width: { xs: "min(280px, 78vw)", md: 286 },
          left: align === "left" ? 0 : align === "right" ? "auto" : "50%",
          right: align === "right" ? 0 : "auto",
          transform: {
            xs: "none",
            md: align === "center" ? "translateX(-50%)" : "none",
          },
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
          bgcolor: colors.white,
          color: colors.text,
          borderRadius: 2,
          p: 1.7,
          boxShadow: "0 18px 40px rgba(13, 68, 54, 0.18)",
          border: `1px solid ${colors.border}`,
          zIndex: 8,
          transition: "opacity 0.2s ease, visibility 0.2s ease",
        }}
      >
        <Box className="bp-step-popup-inner" sx={{ animation: "bpPopupIn 0.28s ease" }}>
        <Preview />
        <Typography sx={{ fontWeight: 700, fontSize: 14, color: colors.dark, mt: 1.1 }}>
          {popupTitle}
        </Typography>
        <Typography sx={{ fontSize: 12.5, lineHeight: 1.5, color: colors.muted, mt: 0.6 }}>
          {popupBody}
        </Typography>
        <Box component="ul" sx={{ m: 0, mt: 1, pl: 2, color: colors.text }}>
          {popupPoints.map((point) => (
            <Typography
              key={point}
              component="li"
              sx={{ fontSize: 12, lineHeight: 1.45, color: colors.text, mb: 0.45 }}
            >
              {point}
            </Typography>
          ))}
        </Box>
        </Box>
      </Box>
    </Box>
  );
}
