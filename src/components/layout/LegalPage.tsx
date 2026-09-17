import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import SiteShell from "@/components/layout/SiteShell";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <SiteShell>
      <Box
        component="main"
        sx={{ maxWidth: 800, mx: "auto", px: 3, py: { xs: 6, md: 8 } }}
      >
        <Typography variant="h2" component="h1" sx={{ mb: 3 }}>
          {title}
        </Typography>
        {children}
      </Box>
    </SiteShell>
  );
}
