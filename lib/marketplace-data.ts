import {
  Beef,
  Bird,
  Bone,
  Cat,
  Dog,
  Droplets,
  HeartPulse,
  Milk,
  PackageCheck,
  ShieldCheck,
  Truck,
  Wheat
} from "lucide-react";

export type Product = {
  name: string;
  category: string;
  badge: string;
  price: string;
  mrp?: string;
  rating: string;
  image: string;
  supplier: string;
  shipping: string;
};

export const navLinks = [
  { label: "Marketplace", href: "#marketplace" },
  { label: "Suppliers", href: "#supplier-os" },
  { label: "Vet Consult", href: "#vet-consult" },
  { label: "Admin OS", href: "#admin-os" }
];

export const animalCategories = [
  { name: "Cow & Buffalo", icon: Milk, count: "280+ products" },
  { name: "Goat & Sheep", icon: Beef, count: "95+ products" },
  { name: "Poultry", icon: Bird, count: "130+ products" },
  { name: "Horse", icon: HeartPulse, count: "70+ products" },
  { name: "Dog Care", icon: Dog, count: "110+ products" },
  { name: "Cat Care", icon: Cat, count: "60+ products" }
];

export const concernCategories = [
  { name: "Milk Yield", icon: Milk },
  { name: "Digestion", icon: Wheat },
  { name: "Fertility", icon: HeartPulse },
  { name: "Immunity", icon: ShieldCheck },
  { name: "Growth", icon: Bone },
  { name: "Hydration", icon: Droplets }
];

export const featuredProducts: Product[] = [
  {
    name: "Holstein Milk Buff 50kg",
    category: "Dairy Nutrition",
    badge: "Vet choice",
    price: "₹1,964",
    mrp: "₹3,119",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=900&q=80",
    supplier: "Verified feed partner",
    shipping: "Freight quote required"
  },
  {
    name: "BSK All In One Powder 5kg",
    category: "Livestock Supplement",
    badge: "Fast selling",
    price: "₹1,350",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=900&q=80",
    supplier: "AnimKart assured",
    shipping: "Pan-India delivery"
  },
  {
    name: "Electro Pet Acid Ease",
    category: "Pet Wellness",
    badge: "Pet care",
    price: "₹283",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80",
    supplier: "Pet health supplier",
    shipping: "Ships in 24 hours"
  }
];

export const operations = [
  {
    title: "Shipping Rules",
    description: "Zone, weight, MOQ and freight-on-actual controls before products go live.",
    icon: Truck
  },
  {
    title: "Inventory Health",
    description: "Freshness score, low stock reminders and visibility controls for stale products.",
    icon: PackageCheck
  },
  {
    title: "Supplier Verification",
    description: "GST, PAN, bank details, categories and admin approval in one onboarding flow.",
    icon: ShieldCheck
  }
];

export const supplierTasks = [
  "Complete GST/PAN and bank verification",
  "Upload catalog with CSV/XLSX validation",
  "Set mandatory shipping zones and MOQ",
  "Accept, reject, pack and dispatch orders",
  "Track earnings, commission and payouts"
];

export const adminMetrics = [
  { label: "GMV Today", value: "₹2.8L" },
  { label: "Active Suppliers", value: "86" },
  { label: "Inventory Alerts", value: "42" },
  { label: "Pending Consults", value: "18" }
];
