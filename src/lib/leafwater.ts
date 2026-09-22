export const LEAFWATER_API_URL =
  process.env.LEAFWATER_API_URL || "https://backend.leafwater.in:8001";

export const PRODUCTS_PAGE_SIZE = 50;

export type ProductImage = {
  url: string;
  tag?: string;
};

export type ProductDiscount = {
  discountType?: string;
  value?: number;
};

export type ProductBrand = {
  _id: string;
  _key?: string;
  name: string;
  label?: string;
};

export type ProductCategory = {
  _id: string;
  title: string;
  sortOrder?: number;
};

export type Product = {
  _id: string;
  _key?: string;
  name: string;
  retailPrice: number;
  shopifyUrl?: string;
  isShopifyAvailable?: boolean;
  images?: ProductImage[];
  discount?: ProductDiscount;
  brand?: ProductBrand;
  brandId?: string;
  productType?: string;
};

export type ProductsApiResponse = {
  status: string;
  statusCode: number;
  message?: string;
  totalCounts: number;
  data: Array<{
    category?: ProductCategory | null;
    products?: Product[];
  }>;
};

function withParams(
  path: string,
  params: Record<string, string | number | boolean | undefined>,
) {
  const url = new URL(path, LEAFWATER_API_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "") return;
    url.searchParams.set(key, String(value));
  });
  return url;
}

export async function fetchLeafwaterJson<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {},
  init?: RequestInit,
): Promise<T> {
  const url = withParams(path, params);
  const response = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
    ...init,
  });
  if (!response.ok) {
    throw new Error(`Leaf Water API ${response.status} for ${path}`);
  }
  return (await response.json()) as T;
}

export async function fetchFilteredProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  catId?: string;
  brandId?: string;
  hasBrand?: boolean;
}) {
  const catId =
    params.catId && params.catId !== "all" ? params.catId : undefined;
  const brandId =
    params.brandId && params.brandId !== "all" ? params.brandId : undefined;

  return fetchLeafwaterJson<ProductsApiResponse>("/product/fetch-by-filter", {
    page: params.page ?? 1,
    limit: params.limit ?? PRODUCTS_PAGE_SIZE,
    search: params.search,
    catId,
    brandId,
    hasBrand: Boolean(brandId),
    isShopifyAvailable: true,
  });
}

export async function fetchProductCategories() {
  const response = await fetchLeafwaterJson<{ data?: ProductCategory[] }>(
    "/product/get-product-categories",
  );
  const categories = response.data ?? [];
  return [{ _id: "all", title: "All" }, ...categories] as ProductCategory[];
}

export async function fetchProductBrands() {
  const response = await fetchLeafwaterJson<{ data?: ProductBrand[] }>(
    "/brand/fetch",
    { page: 1, limit: 50 },
  );
  const brands = response.data ?? [];
  return [{ _id: "all", name: "All" }, ...brands] as ProductBrand[];
}

export function findCategoryId(
  catName: string | null,
  categories: ProductCategory[],
) {
  if (!catName) return undefined;
  const match = categories.find((category) => category.title === catName);
  return match?._id;
}

export function discountedPrice(retailPrice: number, discountValue?: number) {
  if (!retailPrice || !discountValue || Number.isNaN(discountValue)) {
    return retailPrice;
  }
  return Math.round(retailPrice - (discountValue / 100) * retailPrice);
}

export function shopifyProducts(payload?: ProductsApiResponse) {
  return (payload?.data?.[0]?.products ?? []).filter(
    (product) => product?.isShopifyAvailable,
  );
}

const SHOWCASE_BRAND_ORDER = [
  "Cetaphil",
  "Cetaphill",
  "Foxtale",
  "Minimalist",
  "Plix",
  "Aqualogica",
  "Sebamed",
  "Pilgrim",
  "The Derma Co",
  "CeraVe",
  "Cera Ve",
  "Neutrogena",
];

export type BrandShowcaseImage = {
  url: string;
  name: string;
  brand: string;
  brandId: string;
};

export async function fetchBrandShowcaseImages() {
  const cached: RequestInit = {
    cache: "force-cache",
    next: { revalidate: 600 },
  };
  const response = await fetchLeafwaterJson<{ data?: ProductBrand[] }>(
    "/brand/fetch",
    { page: 1, limit: 50 },
    cached,
  );
  const brands = (response.data ?? []).filter((brand) => brand._id !== "all");
  const ranked = [...brands].sort((a, b) => {
    const aIndex = SHOWCASE_BRAND_ORDER.findIndex(
      (name) => name.toLowerCase() === a.name.toLowerCase(),
    );
    const bIndex = SHOWCASE_BRAND_ORDER.findIndex(
      (name) => name.toLowerCase() === b.name.toLowerCase(),
    );
    return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
  });

  const images = await Promise.all(
    ranked.map(async (brand) => {
      const payload = await fetchLeafwaterJson<ProductsApiResponse>(
        "/product/fetch-by-filter",
        {
          page: 1,
          limit: 1,
          brandId: brand._id,
          hasBrand: true,
          isShopifyAvailable: true,
        },
        cached,
      );
      const product = shopifyProducts(payload)[0];
      const url = product?.images?.[0]?.url;
      if (!url) return null;
      return {
        url,
        name: product.name,
        brand: brand.name,
        brandId: brand._id,
      } satisfies BrandShowcaseImage;
    }),
  );

  return images.filter((item): item is BrandShowcaseImage => Boolean(item));
}
