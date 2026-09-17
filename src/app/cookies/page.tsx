import type { Metadata } from "next";
import Typography from "@mui/material/Typography";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Cookies" };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies">
      <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
        This website uses essential cookies required to operate the site and
        remember form progress during a session. We do not use advertising
        cookies. You can control cookies in your browser settings.
      </Typography>
    </LegalPage>
  );
}
