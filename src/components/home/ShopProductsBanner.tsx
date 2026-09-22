import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { colors } from "@/theme/colors";
import { fetchBrandShowcaseImages } from "@/lib/leafwater";
import ShopShowcaseSlider from "./ShopShowcaseSlider";

const PRODUCTS_HREF = "/products?page=1&brandId=all&catId=All";

export default async function ShopProductsBanner() {
  let images: Awaited<ReturnType<typeof fetchBrandShowcaseImages>> = [];
  try {
    images = await fetchBrandShowcaseImages();
  } catch {
    images = [];
  }

  return (
    <Box component="section" id="shop-products" sx={{ bgcolor: colors.white }}>
      <NextLink
        href={PRODUCTS_HREF}
        aria-label="Shop all BeautyPod products"
        style={{ display: "block", textDecoration: "none" }}
      >
      <Box
        sx={{
          display: "block",
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: 280, md: 340 },
          background:
            "linear-gradient(110deg, #0d4c3c 0%, #1b6a52 42%, #c9a227 100%)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #fff 0, transparent 28%), radial-gradient(circle at 80% 80%, #ffe9a8 0, transparent 36%)",
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1240,
            mx: "auto",
            px: { xs: 2.2, md: 3 },
            py: { xs: 3.5, md: 4.5 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            gap: { xs: 2.5, md: 4 },
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: colors.goldSoft,
                fontWeight: 700,
                letterSpacing: "0.22em",
                fontSize: 12,
                mb: 1,
              }}
            >
              SHOP THE MACHINE
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                color: colors.white,
                fontWeight: 700,
                fontSize: { xs: 28, md: 42 },
                lineHeight: 1.1,
                mb: 1.2,
              }}
            >
              Every day exclusive offers on the products
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.84)", maxWidth: 520, mb: 2.4 }}>
              Browse every BeautyPod skincare product, then buy instantly on the
              Leaf Water shop.
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                bgcolor: colors.white,
                color: colors.forest,
                px: 2.4,
                py: 1.15,
                borderRadius: 1,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              Shop products
              <ArrowForwardIcon fontSize="small" />
            </Box>
          </Box>
          <ShopShowcaseSlider images={images} />
        </Box>
      </Box>
      </NextLink>
    </Box>
  );
}
