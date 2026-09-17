"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DemoDialogContextValue = {
  open: boolean;
  openDemo: () => void;
  closeDemo: () => void;
};

const DemoDialogContext = createContext<DemoDialogContextValue | null>(null);

export function DemoDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(
    () => ({
      open,
      openDemo: () => setOpen(true),
      closeDemo: () => setOpen(false),
    }),
    [open],
  );

  return (
    <DemoDialogContext.Provider value={value}>
      {children}
    </DemoDialogContext.Provider>
  );
}

export function useDemoDialog() {
  const context = useContext(DemoDialogContext);
  if (!context) {
    throw new Error("useDemoDialog must be used within DemoDialogProvider");
  }
  return context;
}
