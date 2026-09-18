"use client";

import { forwardRef, useState, type ReactElement, type Ref } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import type { TransitionProps } from "@mui/material/transitions";
import { useDemoDialog } from "@/components/providers/DemoDialogProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { colors } from "@/theme/colors";
import CalendlyEmbed from "./CalendlyEmbed";
import LeadCaptureForm, { type LeadSuccessDetails } from "./LeadCaptureForm";

const SlideUp = forwardRef(function SlideUp(
  props: TransitionProps & { children: ReactElement },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BookDemoDialog() {
  const { open, closeDemo } = useDemoDialog();
  const { showToast } = useToast();
  const [step, setStep] = useState<"form" | "calendly">("form");
  const [details, setDetails] = useState<LeadSuccessDetails>({
    name: "",
    email: "",
    phone: "",
  });

  const handleClose = () => {
    closeDemo();
    window.setTimeout(() => setStep("form"), 280);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={step === "calendly" ? "md" : "sm"}
      slots={{ transition: SlideUp }}
      slotProps={{
        paper: {
          sx: {
            overflow: "hidden",
            borderRadius: 3,
            border: `1px solid ${colors.goldSoft}`,
            background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.cream} 100%)`,
          },
        },
      }}
      aria-labelledby="book-demo-title"
    >
      <Box
        sx={{
          px: { xs: 2.5, md: 3.5 },
          pt: 3,
          pb: 2,
          background: `linear-gradient(135deg, ${colors.forest} 0%, ${colors.green} 72%, ${colors.gold} 160%)`,
          color: "#fff",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            letterSpacing: "0.22em",
            fontWeight: 700,
            color: colors.goldSoft,
            mb: 0.75,
          }}
        >
          {step === "form" ? "PRIVATE WALKTHROUGH" : "CHOOSE A TIME"}
        </Typography>
        <Typography
          id="book-demo-title"
          sx={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: { xs: 24, md: 30 },
            fontWeight: 700,
            pr: 5,
          }}
        >
          {step === "form" ? "Book a BeautyPod Demo" : "Schedule with Calendly"}
        </Typography>
        <Typography sx={{ mt: 0.8, color: "rgba(255,255,255,0.86)", fontSize: 14, maxWidth: 460 }}>
          {step === "form"
            ? "Share a few details and pick a live walkthrough slot. Your enquiry is sent to our team instantly."
            : "Select a convenient time. Your details have already been shared with Leaf Water."}
        </Typography>
        <IconButton
          aria-label="Close demo form"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#fff",
            transition: "transform 0.2s ease",
            "&:hover": { transform: "rotate(90deg)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={{ px: { xs: 2.2, md: 3.2 }, py: 2.5 }}>
        {step === "form" ? (
          <LeadCaptureForm
            onSuccess={(next) => {
              setDetails(next);
              setStep("calendly");
              showToast("Enquiry submitted. Choose a Calendly slot to confirm.");
            }}
          />
        ) : (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, color: colors.green }}>
              <EventAvailableIcon fontSize="small" />
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                Almost done — lock your demo time
              </Typography>
            </Box>
            <CalendlyEmbed
              {...details}
              onScheduled={() => {
                showToast("Demo booked. We will see you on Calendly.");
                handleClose();
              }}
            />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
