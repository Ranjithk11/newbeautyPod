"use client";

import LocalMallIcon from "@mui/icons-material/LocalMall";
import VerifiedIcon from "@mui/icons-material/Verified";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { colors } from "@/theme/colors";
import { discountedPrice, type Product } from "@/lib/leafwater";

function openShopify(url?: string) {
  if (!url) return;
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function ProductCard({
  product,
  categoryTitle,
}: {
  product: Product;
  categoryTitle?: string | null;
}) {
  const imageUrl = product.images?.[0]?.url;
  const salePrice = discountedPrice(
    product.retailPrice,
    product.discount?.value,
  );
  const hasDiscount =
    Boolean(product.discount?.value) && salePrice !== product.retailPrice;

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Card
        elevation={0}
        onClick={() => openShopify(product.shopifyUrl)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: product.shopifyUrl ? "pointer" : "default",
          border: `1px solid ${colors.border}`,
          borderRadius: 1.5,
          boxShadow: "0 0 4px #02020224",
          overflow: "hidden",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 10px 22px rgba(13, 68, 54, 0.12)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 160, md: 200 },
            bgcolor: "#f7f4ee",
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 760px) 50vw, 25vw"
              style={{ objectFit: "contain" }}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "grid",
                placeItems: "center",
                color: colors.muted,
                fontSize: 13,
              }}
            >
              No image
            </Box>
          )}
        </Box>
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", flex: 1 }}>
          {categoryTitle ? (
            <Box
              sx={{
                display: "inline-flex",
                alignSelf: "flex-start",
                mb: 1.5,
                px: 1,
                py: 0.4,
                borderRadius: 1,
                bgcolor: "#fefce8",
                color: "#854d0e",
                fontSize: 12,
                fontWeight: 600,
                border: "1px solid rgba(202, 138, 4, 0.28)",
              }}
            >
              {categoryTitle}
            </Box>
          ) : null}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: 13, md: 14 },
              lineHeight: 1.35,
              minHeight: 40,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              color: colors.text,
            }}
          >
            {product.name}
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.4,
              mt: 0.8,
              mb: 1.2,
              px: 0.7,
              py: 0.25,
              borderRadius: 3,
              bgcolor: "rgba(43, 97, 79, 0.08)",
              border: "1px solid rgba(43, 97, 79, 0.22)",
              width: "fit-content",
            }}
          >
            <VerifiedIcon sx={{ fontSize: 16, color: "#2B614F" }} />
            <Box sx={{ lineHeight: 1.1 }}>
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 0.1,
                  color: "#2B614F",
                  textTransform: "uppercase",
                }}
              >
                100% Genuine
              </Typography>
              <Typography
                component="span"
                sx={{ display: "block", fontSize: 10, color: "#5A7A6E" }}
              >
                Verified by BeautyPod
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              mt: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Box>
              {hasDiscount ? (
                <>
                  <Typography
                    sx={{
                      textDecoration: "line-through",
                      color: colors.muted,
                      fontSize: 14,
                    }}
                  >
                    Rs.{product.retailPrice}/-
                  </Typography>
                  <Typography sx={{ fontWeight: 700, color: "#15803d", fontSize: 18 }}>
                    Rs.{salePrice}/-
                  </Typography>
                </>
              ) : (
                <Typography sx={{ fontWeight: 700, color: "#15803d", fontSize: 20 }}>
                  Rs.{product.retailPrice}/-
                </Typography>
              )}
            </Box>
            {product.shopifyUrl ? (
              <IconButton
                aria-label={`Buy ${product.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  openShopify(product.shopifyUrl);
                }}
                sx={{
                  bgcolor: colors.forest,
                  color: colors.white,
                  borderRadius: 1,
                  "&:hover": { bgcolor: colors.dark },
                }}
              >
                <LocalMallIcon />
              </IconButton>
            ) : null}
          </Box>
        </Box>
      </Card>
      {hasDiscount ? (
        <Box className="ribbon">{product.discount?.value}% Flat Discount</Box>
      ) : null}
    </Box>
  );
}
