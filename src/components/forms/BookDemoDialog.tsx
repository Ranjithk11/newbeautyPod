"use client";

import { forwardRef, type ReactElement, type Ref } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import type { TransitionProps } from "@mui/material/transitions";
import { useDemoDialog } from "@/components/providers/DemoDialogProvider";
import { useToast } from "@/components/providers/ToastProvider";
import LeadCaptureForm from "./LeadCaptureForm";

const SlideUp = forwardRef(function SlideUp(
  props: TransitionProps & { children: ReactElement },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BookDemoDialog() {
  const { open, closeDemo } = useDemoDialog();
  const { showToast } = useToast();

  return (
    <Dialog
      open={open}
      onClose={closeDemo}
      fullWidth
      maxWidth="sm"
      slots={{ transition: SlideUp }}
      slotProps={{
        paper: {
          sx: { overflow: "hidden" },
        },
      }}
      aria-labelledby="book-demo-title"
    >
      <DialogTitle id="book-demo-title" sx={{ pr: 6 }}>
        Book a BeautyPod Demo
        <IconButton
          aria-label="Close demo form"
          onClick={closeDemo}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            transition: "transform 0.2s ease",
            "&:hover": { transform: "rotate(90deg)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography sx={{ mb: 2, color: "text.secondary" }}>
          Share a few details and we will schedule a live walkthrough of BeautyPod.
        </Typography>
        <LeadCaptureForm
          onSuccess={() => {
            closeDemo();
            showToast("Enquiry submitted. Our team will contact you shortly.");
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
