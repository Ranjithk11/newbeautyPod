import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import NextLink from "next/link";
import { colors } from "@/theme/colors";

const PRODUCTS_HREF = "/products?page=1&brandId=all&catId=All";

export default function ProductsOffersHero() {
  return (
    <NextLink
      href={PRODUCTS_HREF}
      aria-label="Browse exclusive product offers"
      style={{ display: "block", textDecoration: "none" }}
    >
    <Box
      id="products-page-top"
      sx={{
        display: "block",
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: 220, md: 280 },
        background:
          "linear-gradient(100deg, #0d4436 0%, #1f6a54 46%, #e8d48a 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: { xs: -40, md: 40 },
          bottom: { xs: -30, md: -50 },
          width: { xs: 220, md: 320 },
          height: { xs: 280, md: 400 },
          opacity: 0.92,
        }}
      >
        <Image
          src="/images/beautypod-machine-soft.png"
          alt=""
          fill
          sizes="320px"
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1240,
          mx: "auto",
          px: { xs: 2.5, md: 4 },
          py: { xs: 5, md: 7 },
        }}
      >
        <Typography
          sx={{
            color: colors.goldSoft,
            letterSpacing: "0.22em",
            fontWeight: 700,
            fontSize: 12,
            mb: 1.2,
          }}
        >
          BEAUTYPOD SHOP
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            color: colors.white,
            fontWeight: 700,
            fontSize: { xs: 32, md: 48 },
            lineHeight: 1.08,
            maxWidth: 640,
          }}
        >
          Every day exclusive offers on the products
        </Typography>
        <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,0.86)", maxWidth: 520 }}>
          Genuine branded skincare, available to buy online from the BeautyPod
          catalogue.
        </Typography>
      </Box>
    </Box>
    </NextLink>
  );
}
