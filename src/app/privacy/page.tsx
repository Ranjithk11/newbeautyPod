import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <Typography sx={{ mb: 2, color: "text.secondary", lineHeight: 1.7 }}>
        BeautyPod by Leaf Water collects only the information you submit through
        demo requests and newsletter sign-up, such as name, company, phone and
        email. We use this information to respond to enquiries and share product
        updates you requested.
      </Typography>
      <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
        We do not sell personal data. Skin scans captured on BeautyPod machines
        are processed to generate product recommendations and are handled
        according to deployment-specific privacy controls agreed with each
        location partner.
      </Typography>
    </LegalPage>
  );
}
