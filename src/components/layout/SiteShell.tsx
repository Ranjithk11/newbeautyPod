import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BookDemoDialog from "@/components/forms/BookDemoDialog";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <BookDemoDialog />
    </>
  );
}
