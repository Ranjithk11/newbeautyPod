import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import AppProviders from "@/components/providers/AppProviders";
import JsonLd from "@/components/seo/JsonLd";
import { seoKeywords, site } from "@/lib/content";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BeautyPod by Leaf Water | AI-Powered Smart Skincare Retail",
    template: "%s | BeautyPod by Leaf Water",
  },
  description: site.description,
  keywords: [...seoKeywords],
  openGraph: {
    title: "BeautyPod by Leaf Water | AI-Powered Smart Skincare Retail",
    description: site.description,
    url: site.url,
    siteName: site.brand,
    type: "website",
    images: [
      {
        url: "/images/beautypod-machine.png",
        alt: "BeautyPOD AI skincare vending machine",
      },
      {
        url: "/images/logo.jpg",
        alt: "BeautyPOD logo powered by Leafwater",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${playfair.variable}`}
    >
      <body>
        <JsonLd />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
