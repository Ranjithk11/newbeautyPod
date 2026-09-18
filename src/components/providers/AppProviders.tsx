"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import theme from "@/theme/theme";
import { BrochureDialogProvider } from "./BrochureDialogProvider";
import { DemoDialogProvider } from "./DemoDialogProvider";
import { ToastProvider } from "./ToastProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastProvider>
          <DemoDialogProvider>
            <BrochureDialogProvider>{children}</BrochureDialogProvider>
          </DemoDialogProvider>
        </ToastProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
