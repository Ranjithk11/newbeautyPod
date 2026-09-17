import type { Metadata } from "next";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <LegalPage title="Page not found">
      <Typography sx={{ mb: 3, color: "text.secondary" }}>
        The page you are looking for is unavailable. Return to the BeautyPod
        homepage to continue.
      </Typography>
      <Button variant="contained" href="/">
        Back to Home
      </Button>
    </LegalPage>
  );
}
