import type { Metadata } from "next";
import { Suspense } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SiteShell from "@/components/layout/SiteShell";
import ProductsCatalog from "@/components/products/ProductsCatalog";
import ProductsOffersHero from "@/components/products/ProductsOffersHero";

export const metadata: Metadata = {
  title: "Shop Products",
  description:
    "Browse BeautyPod skincare products with exclusive offers, then buy instantly on the Leaf Water shop.",
};

function CatalogFallback() {
  return (
    <Box sx={{ display: "grid", placeItems: "center", minHeight: 320 }}>
      <CircularProgress />
    </Box>
  );
}

export default function ProductsPage() {
  return (
    <SiteShell>
      <Box component="main">
        <ProductsOffersHero />
        <Suspense fallback={<CatalogFallback />}>
          <ProductsCatalog />
        </Suspense>
      </Box>
    </SiteShell>
  );
}
