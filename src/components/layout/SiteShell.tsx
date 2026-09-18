import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import BookDemoDialog from "@/components/forms/BookDemoDialog";
import BrochureDialog from "@/components/forms/BrochureDialog";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <BookDemoDialog />
      <BrochureDialog />
      <WhatsAppFloat />
    </>
  );
}
