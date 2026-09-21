"use client";

import { forwardRef, type ReactElement, type Ref } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import type { TransitionProps } from "@mui/material/transitions";
import { useBrochureDialog } from "@/components/providers/BrochureDialogProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { colors } from "@/theme/colors";
import BrochureForm from "./BrochureForm";

const SlideUp = forwardRef(function SlideUp(
  props: TransitionProps & { children: ReactElement },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BrochureDialog() {
  const { open, closeBrochure } = useBrochureDialog();
  const { showToast } = useToast();

  return (
    <Dialog
      open={open}
      onClose={closeBrochure}
      fullWidth
      maxWidth="sm"
      slots={{ transition: SlideUp }}
      slotProps={{
        paper: {
          sx: {
            overflow: "hidden",
            borderRadius: 3,
            border: `1px solid ${colors.goldSoft}`,
          },
        },
      }}
      aria-labelledby="brochure-title"
    >
      <Box
        sx={{
          px: 3,
          pt: 3,
          pb: 2,
          background: `linear-gradient(135deg, ${colors.forest} 0%, ${colors.green} 100%)`,
          color: "#fff",
          position: "relative",
        }}
      >
        <Typography id="brochure-title" sx={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 26, fontWeight: 700 }}>
          Download the BeautyPod brochure
        </Typography>
        <Typography sx={{ mt: 0.75, color: "rgba(255,255,255,0.86)", fontSize: 14 }}>
          Share your email and phone number to download the BeautyPod brochure.
        </Typography>
        <IconButton
          aria-label="Close brochure form"
          onClick={closeBrochure}
          sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ pt: 2.5, pb: 3, bgcolor: colors.cream }}>
        <BrochureForm
          onSuccess={() => {
            closeBrochure();
            showToast("Details received. Your brochure is downloading.");
            window.setTimeout(() => {
              const link = document.createElement("a");
              link.href = "/beautypod-brochure.jpg";
              link.download = "BeautyPod-Brochure.jpg";
              document.body.appendChild(link);
              link.click();
              link.remove();
            }, 400);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
