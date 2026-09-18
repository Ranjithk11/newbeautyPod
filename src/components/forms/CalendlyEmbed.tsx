"use client";

import { useCalendlyEventListener, InlineWidget } from "react-calendly";
import Box from "@mui/material/Box";
import { site } from "@/lib/content";
import { submitEnquiry } from "@/lib/submitEnquiry";

type CalendlyEmbedProps = {
  name: string;
  email: string;
  phone: string;
  onScheduled?: () => void;
};

export default function CalendlyEmbed({ name, email, phone, onScheduled }: CalendlyEmbedProps) {
  useCalendlyEventListener({
    onEventScheduled: (event) => {
      void submitEnquiry({
        formType: "calendly",
        name,
        email,
        phone,
        calendlyEventUri: event.data.payload.event.uri,
        calendlyInviteeUri: event.data.payload.invitee.uri,
      }).finally(() => onScheduled?.());
    },
  });

  return (
    <Box sx={{ minHeight: { xs: 560, md: 640 } }}>
      <InlineWidget
        url={site.calendlyUrl}
        prefill={{ name, email }}
        utm={{ utmContent: phone, utmSource: "beautypod-website" }}
        pageSettings={{
          backgroundColor: "f6f4e9",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "087f5b",
          textColor: "102c27",
        }}
        styles={{ height: "640px", minWidth: "100%" }}
      />
    </Box>
  );
}
