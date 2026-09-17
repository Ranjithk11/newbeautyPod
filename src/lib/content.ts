export const site = {
  name: "BeautyPod",
  brand: "BeautyPod by Leaf Water",
  tagline: "AI Skincare. Smarter Retail. Brighter Futures.",
  url: "https://beautypod.shop",
  email: "hello@beautypod.in",
  description:
    "BeautyPod by Leaf Water is an AI-powered smart skincare retail solution that combines AI skin analysis, personalised recommendations and automated product retail. Designed for high-footfall environments such as airports, malls, hotels and retail stores, BeautyPod enables customers to discover and purchase skincare through an interactive technology-driven experience.",
};

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "For Retailers", href: "/#retailers" },
  { label: "For Brands", href: "/#brands" },
  { label: "Locations", href: "/#locations" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Products", href: "/#products" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const heroFeatures = [
  { icon: "eco", line1: "AI Skin", line2: "Analysis" },
  { icon: "sparkle", line1: "Personalised", line2: "Recommendations" },
  { icon: "bag", line1: "Instant", line2: "Purchase" },
  { icon: "chart", line1: "Retail", line2: "Analytics" },
] as const;

export const processSteps = [
  {
    no: "01",
    title: "Scan",
    text: "Take a quick facial scan using our AI technology.",
    icon: "scan",
  },
  {
    no: "02",
    title: "Analyse",
    text: "Our AI analyses key skin indicators.",
    icon: "analyse",
  },
  {
    no: "03",
    title: "Recommend",
    text: "Get personalised skincare recommendations.",
    icon: "recommend",
  },
  {
    no: "04",
    title: "Purchase",
    text: "Buy your recommended products instantly.",
    icon: "purchase",
  },
] as const;

export const locations = [
  { image: "/images/airport.jpg", name: "Airports", icon: "plane" },
  { image: "/images/mall.jpg", name: "Malls", icon: "mall" },
  { image: "/images/hotel.jpg", name: "Hotels", icon: "hotel" },
  { image: "/images/retail-store.jpg", name: "Retail Stores", icon: "store" },
  { image: "/images/pharmacy.jpg", name: "Pharmacies", icon: "pharmacy" },
  {
    image: "/images/corporate.jpg",
    name: "Corporate Campuses",
    icon: "corporate",
  },
  {
    image: "/images/gym.jpg",
    name: "Gyms & Wellness Centres",
    icon: "gym",
  },
  { image: "/images/university.jpg", name: "Universities", icon: "university" },
] as const;

export const benefits = [
  { icon: "users", label: "Increases Customer Engagement" },
  { icon: "target", label: "Drives Additional Revenue" },
  { icon: "insights", label: "Data-Driven Insights" },
  { icon: "clock", label: "24/7 Availability" },
  { icon: "support", label: "Easy Deployment & Support" },
  { icon: "gem", label: "Premium Brand Experience" },
] as const;

export const businessModels = [
  {
    icon: "cart",
    title: "Retail Purchase",
    text: "Buy the machine outright.",
    bg: "#eaf7f1",
  },
  {
    icon: "rupee",
    title: "Revenue Share",
    text: "Shared revenue model.",
    bg: "#eef3fb",
  },
  {
    icon: "managed",
    title: "Managed Service",
    text: "Machine + software + maintenance + products.",
    bg: "#fff0e6",
  },
  {
    icon: "handshake",
    title: "Brand Partnership",
    text: "Co-branded deployment.",
    bg: "#f0eafa",
  },
] as const;

export const faqs = [
  {
    q: "What is BeautyPod?",
    a: "BeautyPod by Leaf Water is an AI-powered smart skincare retail kiosk that scans skin, recommends personalised products and enables instant purchase.",
  },
  {
    q: "How does it work?",
    a: "Customers scan, our AI analyses key skin indicators, BeautyPod recommends the right products, and they can purchase instantly from the kiosk.",
  },
  {
    q: "What does it analyse?",
    a: "The AI analyses visible skin indicators to generate personalised skincare recommendations suited to each customer.",
  },
  {
    q: "Can customers buy products?",
    a: "Yes. Recommended products can be purchased instantly from the BeautyPod machine.",
  },
  {
    q: "Where is it available?",
    a: "BeautyPod is designed for high-footfall locations including airports, malls, hotels, retail stores, pharmacies, campuses, gyms and universities.",
  },
  {
    q: "Can retailers purchase it?",
    a: "Yes. Retailers and location partners can buy the machine outright or choose revenue share, managed service or brand partnership models.",
  },
  {
    q: "Can brands partner?",
    a: "Yes. BeautyPod supports co-branded deployments and brand partnerships for high-visibility retail environments.",
  },
  {
    q: "How much space is required?",
    a: "BeautyPod is built for compact, high-traffic placements. Our team will confirm the exact footprint during a site assessment.",
  },
  {
    q: "Does it require staff?",
    a: "The experience is self-serve. Optional on-site support can be included under the managed service model.",
  },
  {
    q: "How is payment handled?",
    a: "Customers can pay by card, UPI or wallet at the kiosk.",
  },
] as const;

export const interestOptions = [
  "Deploy BeautyPod",
  "Retail partnership",
  "Brand partnership",
  "Airport deployment",
  "Hotel deployment",
  "Mall deployment",
  "Franchise",
  "Investment",
  "Technology partnership",
] as const;

export const locationCountOptions = ["1", "2-10", "10-50", "50+"] as const;

export const timelineOptions = [
  "Immediately",
  "1-3 months",
  "3-6 months",
  "Exploring",
] as const;

export const seoKeywords = [
  "BeautyPod",
  "BeautyPod India",
  "BeautyPod Leaf Water",
  "AI skincare vending machine",
  "AI skin analysis vending machine",
  "smart skincare retail",
  "skincare vending machine for malls",
  "AI beauty vending machine",
  "personalised skincare retail",
  "BeautyPod for airports",
  "BeautyPod for retailers",
  "smart retail technology beauty",
];
