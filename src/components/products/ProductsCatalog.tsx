"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Pagination from "@mui/material/Pagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { colors } from "@/theme/colors";
import {
  PRODUCTS_PAGE_SIZE,
  findCategoryId,
  shopifyProducts,
  type ProductBrand,
  type ProductCategory,
  type ProductsApiResponse,
} from "@/lib/leafwater";
import ProductCard from "./ProductCard";

export default function ProductsCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [payload, setPayload] = useState<ProductsApiResponse | null>(null);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [brands, setBrands] = useState<ProductBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );

  const page = Number(searchParams.get("page") || 1);
  const brandId = searchParams.get("brandId") || "all";
  const catTitle = searchParams.get("catId") || "All";

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        params.set(key, value);
      });
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/products/categories").then((res) => res.json()),
      fetch("/api/products/brands").then((res) => res.json()),
    ])
      .then(([categoryRes, brandRes]) => {
        if (cancelled) return;
        setCategories(categoryRes.data ?? []);
        setBrands(brandRes.data ?? []);
      })
      .catch(() => {
        if (!cancelled) {
          setCategories([{ _id: "all", title: "All" }]);
          setBrands([{ _id: "all", name: "All" }]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!searchParams.get("catId")) {
      router.replace(
        `${pathname}?${createQueryString({ page: "1", brandId: "all", catId: "All" })}`,
      );
    }
  }, [createQueryString, pathname, router, searchParams]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const current = searchParams.get("searchTerm") || "";
      if (searchTerm === current) return;
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) params.set("searchTerm", searchTerm);
      else params.delete("searchTerm");
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    }, 500);
    return () => window.clearTimeout(timer);
  }, [pathname, router, searchParams, searchTerm]);

  useEffect(() => {
    if (!categories.length) return;
    let cancelled = false;
    const catId = findCategoryId(catTitle, categories);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PRODUCTS_PAGE_SIZE),
    });
    if (searchParams.get("searchTerm")) {
      params.set("search", searchParams.get("searchTerm") || "");
    }
    if (catId) params.set("catId", catId);
    if (brandId) params.set("brandId", brandId);

    setLoading(true);
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data: ProductsApiResponse) => {
        if (!cancelled) setPayload(data);
      })
      .catch(() => {
        if (!cancelled) {
          setPayload({
            status: "error",
            statusCode: 500,
            totalCounts: 0,
            data: [{ products: [] }],
          });
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [brandId, catTitle, categories, page, searchParams]);

  const products = useMemo(() => shopifyProducts(payload ?? undefined), [payload]);
  const totalCounts = payload?.totalCounts ?? 0;
  const pageCount = Math.max(1, Math.ceil(totalCounts / PRODUCTS_PAGE_SIZE));
  const categoryTitle =
    catTitle && catTitle !== "All" ? catTitle : payload?.data?.[0]?.category?.title;

  return (
    <Box
      id="products-listing"
      sx={{ maxWidth: 1240, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 3, md: 5 } }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, color: colors.heading }}>
            <Box component="span" sx={{ color: colors.green }}>
              {catTitle}
            </Box>{" "}
            Products
          </Typography>
          {totalCounts > 0 ? (
            <Typography variant="body2">
              Showing <b>{products.length}</b> results in <b>{totalCounts}</b> items
            </Typography>
          ) : null}
        </Box>
        <FormControl fullWidth>
          <OutlinedInput
            size="small"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search for products..."
            startAdornment={
              <Box sx={{ mr: 1, display: "flex" }}>
                <SearchIcon />
              </Box>
            }
          />
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
          gap: { xs: 2.5, md: 4 },
          alignItems: "start",
        }}
      >
        <Box
          sx={{
            bgcolor: colors.white,
            borderRadius: 1.25,
            p: { xs: 2, md: 3.5 },
            boxShadow: "0 0 4px #02020224",
            position: { md: "sticky" },
            top: { md: 108 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography sx={{ fontWeight: 600, flex: 1 }} variant="subtitle1">
              Filters
            </Typography>
            <Button href="/products?page=1&brandId=all&catId=All" variant="outlined" size="medium">
              Clear
            </Button>
          </Box>
          <Accordion defaultExpanded disableGutters elevation={0} sx={{ "&:before": { display: "none" } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, fontWeight: 600, fontSize: 18 }}>
              Brands
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0 }}>
              <RadioGroup
                value={brandId}
                onChange={(event) =>
                  router.push(
                    `${pathname}?${createQueryString({ brandId: event.target.value, page: "1" })}`,
                  )
                }
              >
                {brands.map((brand) => (
                  <FormControlLabel
                    key={brand._id}
                    value={brand._id}
                    control={<Radio size="small" />}
                    label={brand.name}
                    sx={{ color: colors.green, "& .MuiFormControlLabel-label": { fontSize: 14 } }}
                  />
                ))}
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded disableGutters elevation={0} sx={{ "&:before": { display: "none" } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, fontWeight: 600, fontSize: 18 }}>
              Categories
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0 }}>
              <RadioGroup
                value={catTitle}
                onChange={(event) =>
                  router.push(
                    `${pathname}?${createQueryString({ catId: event.target.value, page: "1" })}`,
                  )
                }
              >
                {categories.map((category) => (
                  <FormControlLabel
                    key={category._id}
                    value={category.title}
                    control={<Radio size="small" />}
                    label={category.title}
                    sx={{ color: colors.green, "& .MuiFormControlLabel-label": { fontSize: 14 } }}
                  />
                ))}
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box>
          {loading ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} variant="rounded" height={320} />
              ))}
            </Box>
          ) : totalCounts === 0 ? (
            <Box sx={{ py: 8, textAlign: "center", color: colors.muted }}>
              No products found.
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  md: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  categoryTitle={categoryTitle}
                />
              ))}
            </Box>
          )}

          {totalCounts > 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                page={page}
                count={pageCount}
                showFirstButton
                showLastButton
                variant="outlined"
                shape="rounded"
                onChange={(_, nextPage) =>
                  router.push(`${pathname}?${createQueryString({ page: String(nextPage) })}`)
                }
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
