"use client";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { site } from "@/lib/content";
import { colors } from "@/theme/colors";

export default function WhatsAppFloat() {
  const href = `https://api.whatsapp.com/send?phone=${site.whatsappNumber}&text=${encodeURIComponent(
    "Hi Leaf Water, I would like to know more about BeautyPod.",
  )}`;

  return (
    <Tooltip title={`Chat on WhatsApp ${site.phoneDisplay}`} placement="left">
      <IconButton
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Leaf Water on WhatsApp"
        sx={{
          position: "fixed",
          right: { xs: 16, md: 22 },
          bottom: { xs: 16, md: 22 },
          zIndex: 1200,
          width: 58,
          height: 58,
          bgcolor: colors.whatsapp,
          color: "#fff",
          animation: "bpWhatsApp 2.4s ease-in-out infinite",
          "&:hover": { bgcolor: "#1ebe57" },
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 32 }} />
      </IconButton>
    </Tooltip>
  );
}
