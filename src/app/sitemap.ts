import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/privacy", "/terms", "/cookies"];
  return pages.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-09-16"),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.4,
  }));
}
