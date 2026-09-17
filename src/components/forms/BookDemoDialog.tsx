"use client";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDemoDialog } from "@/components/providers/DemoDialogProvider";
import LeadCaptureForm from "./LeadCaptureForm";

export default function BookDemoDialog() {
  const { open, closeDemo } = useDemoDialog();

  return (
    <Dialog
      open={open}
      onClose={closeDemo}
      fullWidth
      maxWidth="sm"
      aria-labelledby="book-demo-title"
    >
      <DialogTitle id="book-demo-title" sx={{ pr: 6 }}>
        Book a BeautyPod Demo
        <IconButton
          aria-label="Close demo form"
          onClick={closeDemo}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography sx={{ mb: 2, color: "text.secondary" }}>
          Share a few details and we will schedule a live walkthrough of BeautyPod.
        </Typography>
        <LeadCaptureForm />
      </DialogContent>
    </Dialog>
  );
}
