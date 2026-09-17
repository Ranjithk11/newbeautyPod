import { site } from "@/lib/content";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Leaf Water",
        alternateName: "BeautyPod",
        url: site.url,
        logo: `${site.url}/images/logo.jpg`,
        description: site.description,
      },
      {
        "@type": "Product",
        name: "BeautyPod",
        brand: { "@type": "Brand", name: "Leaf Water" },
        description:
          "AI-powered smart skincare retail solution combining skin analysis, personalised recommendations and automated product retail.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
