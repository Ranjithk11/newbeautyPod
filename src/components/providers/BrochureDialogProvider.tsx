"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type BrochureDialogContextValue = {
  open: boolean;
  openBrochure: () => void;
  closeBrochure: () => void;
};

const BrochureDialogContext = createContext<BrochureDialogContextValue | null>(null);

export function BrochureDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(
    () => ({
      open,
      openBrochure: () => setOpen(true),
      closeBrochure: () => setOpen(false),
    }),
    [open],
  );

  return (
    <BrochureDialogContext.Provider value={value}>
      {children}
    </BrochureDialogContext.Provider>
  );
}

export function useBrochureDialog() {
  const context = useContext(BrochureDialogContext);
  if (!context) {
    throw new Error("useBrochureDialog must be used within BrochureDialogProvider");
  }
  return context;
}
