import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <Typography sx={{ mb: 2, color: "text.secondary", lineHeight: 1.7 }}>
        By using this website you agree to use the content for informational
        purposes related to BeautyPod deployments, partnerships and product
        enquiries.
      </Typography>
      <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
        Product availability, commercial terms and deployment timelines are
        confirmed only after a discussion with the Leaf Water team. Brochure
        downloads and demo requests do not create a binding contract.
      </Typography>
    </LegalPage>
  );
}
