import { products } from "@/lib/products";
import { ActivityItem, PanelMetric, RoleKpi, TableColumn, TableRow } from "@/lib/role-dashboard-data";

const categories = Array.from(new Set(products.map((product) => product.category).filter(Boolean)));
const liveProducts = products.filter((product) => product.inStock);
const imageReadyProducts = products.filter((product) => product.image);

export const cmsKpis: RoleKpi[] = [
  { label: "Active Banners", value: "18", helper: "Homepage, category and offer banners live", status: "healthy" },
  { label: "Homepage Sections", value: "11", helper: "Hero, categories, products, suppliers and trust blocks", status: "healthy" },
  { label: "Scheduled Campaigns", value: "7", helper: "Future promos queued by date and audience", status: "watch" },
  { label: "Popup Campaigns", value: "5", helper: "Exit intent, offer, vet and newsletter popups", status: "healthy" },
  { label: "Category Banners", value: categories.length.toLocaleString("en-IN"), helper: "Mapped from real AnimKart catalog categories", status: "healthy" },
  { label: "Published Blogs", value: "24", helper: "Knowledge center articles and disease guides", status: "healthy" }
];

export const cmsQuickActions = [
  { label: "Create Banner", href: "#homepage" },
  { label: "Upload Media", href: "#media" },
  { label: "Create Homepage Section", href: "#homepage-sections" },
  { label: "Create Offer", href: "#offers" },
  { label: "Create Popup", href: "#popups" },
  { label: "Create Blog", href: "#blogs" }
];

export const cmsTabs = [
  { label: "Homepage", href: "#homepage" },
  { label: "Category Pages", href: "#category-pages" },
  { label: "Product Pages", href: "#product-pages" },
  { label: "Offers", href: "#offers" },
  { label: "Popups", href: "#popups" },
  { label: "Blogs", href: "#blogs" },
  { label: "Media Library", href: "#media" },
  { label: "SEO Pages", href: "#seo" }
];

export const homepageSections: PanelMetric[] = [
  { label: "Hero Banner", value: "Live", detail: "Desktop and mobile creative assigned", status: "healthy" },
  { label: "Categories Grid", value: categories.length.toString(), detail: "Real catalog categories available", status: "healthy" },
  { label: "Featured Products", value: liveProducts.length.toLocaleString("en-IN"), detail: "In-stock product pool", status: "healthy" },
  { label: "Top Suppliers", value: "12", detail: "Verified supplier carousel", status: "healthy" },
  { label: "Vet Consultation Banner", value: "Live", detail: "Routes to vet consultation", status: "healthy" },
  { label: "Bulk Inquiry Section", value: "Draft", detail: "B2B quote form copy pending", status: "watch" },
  { label: "Brands", value: "32", detail: "Trusted manufacturer strip", status: "healthy" },
  { label: "Knowledge Center", value: "24", detail: "Articles and disease guides", status: "healthy" },
  { label: "Testimonials", value: "9", detail: "Farmer and supplier proof blocks", status: "healthy" },
  { label: "Footer", value: "Published", detail: "Company, support and legal links", status: "healthy" }
];

export const bannerFields: PanelMetric[] = [
  { label: "Banner Title", value: "Required", detail: "Large hero or section heading", status: "healthy" },
  { label: "Subtitle", value: "Optional", detail: "Supporting message below title", status: "healthy" },
  { label: "CTA Button", value: "Required", detail: "Shop, consult, quote or learn more", status: "healthy" },
  { label: "CTA Link", value: "Required", detail: "Internal route or campaign URL", status: "healthy" },
  { label: "Upload Image", value: "Required", detail: "Desktop creative asset", status: "critical" },
  { label: "Mobile Banner Image", value: "Required", detail: "Mobile-first creative crop", status: "critical" },
  { label: "Start Date", value: "Set", detail: "Campaign launch schedule", status: "healthy" },
  { label: "End Date", value: "Set", detail: "Auto-expiry control", status: "healthy" },
  { label: "Status", value: "Draft", detail: "Draft, scheduled, published, expired or archived", status: "watch" }
];

export const categoryBannerRows: TableRow[] = [
  { category: "Veterinary Medicines", title: "Verified Animal Medicines", desktop: "Ready", mobile: "Ready", order: 1, status: "Published" },
  { category: "Feed & Supplements", title: "Nutrition for Faster Recovery", desktop: "Ready", mobile: "Ready", order: 2, status: "Published" },
  { category: "Poultry", title: "Poultry Health Essentials", desktop: "Ready", mobile: "Missing", order: 3, status: "Draft" },
  { category: "Dairy", title: "Dairy Farm Care", desktop: "Ready", mobile: "Ready", order: 4, status: "Scheduled" },
  { category: "Goat", title: "Goat and Sheep Care", desktop: "Missing", mobile: "Missing", order: 5, status: "Draft" },
  { category: "Pet", title: "Pet Care Products", desktop: "Ready", mobile: "Ready", order: 6, status: "Published" },
  { category: "Aquaculture", title: "Fish Health and Nutrition", desktop: "Ready", mobile: "Ready", order: 7, status: "Published" },
  { category: "Equipment", title: "Farm Equipment and Tools", desktop: "Ready", mobile: "Ready", order: 8, status: "Archived" }
];

export const offerRows: TableRow[] = [
  { title: "Dairy Feed Bulk Offer", type: "Category Discount", coupon: "DAIRY10", discount: "10%", dates: "18 Jun - 30 Jun", status: "Scheduled" },
  { title: "Vet Consultation Bundle", type: "Service Promo", coupon: "VETCARE", discount: "15%", dates: "Live", status: "Published" },
  { title: "Poultry Immunity Week", type: "Coupon", coupon: "POULTRY12", discount: "12%", dates: "Live", status: "Published" },
  { title: "Free Shipping Feed Trial", type: "Shipping", coupon: "FREIGHT0", discount: "Freight waiver", dates: "01 Jul - 07 Jul", status: "Draft" }
];

export const popupRows: TableRow[] = [
  { popup: "Exit Intent Popup", headline: "Need help choosing products?", frequency: "Once per day", schedule: "Live", status: "Published" },
  { popup: "Homepage Popup", headline: "Book a certified vet", frequency: "Once per session", schedule: "Live", status: "Published" },
  { popup: "Offer Popup", headline: "Bulk feed savings", frequency: "Twice per week", schedule: "Scheduled", status: "Scheduled" },
  { popup: "Newsletter Popup", headline: "Get farm health updates", frequency: "Once per user", schedule: "Draft", status: "Draft" },
  { popup: "Vet Consultation Popup", headline: "Emergency vet support", frequency: "Always on emergency pages", schedule: "Live", status: "Published" }
];

export const blogRows: TableRow[] = [
  { title: "Poultry Vaccination Guide", category: "Poultry", slug: "poultry-vaccination-guide", publishDate: "20 Jun 2026", status: "Scheduled" },
  { title: "Mineral Deficiency in Dairy Cattle", category: "Dairy", slug: "dairy-mineral-deficiency", publishDate: "Live", status: "Published" },
  { title: "Goat Deworming Calendar", category: "Goat", slug: "goat-deworming-calendar", publishDate: "Draft", status: "Draft" },
  { title: "Aquaculture Water Quality Basics", category: "Aquaculture", slug: "aquaculture-water-quality", publishDate: "Live", status: "Published" }
];

export const mediaRows: TableRow[] = [
  { name: "homepage-cattle-hero.jpg", type: "Image", size: "420 KB", usedIn: "Hero Banner", status: "Published" },
  { name: "mobile-feed-offer.webp", type: "Image", size: "180 KB", usedIn: "Offer Popup", status: "Published" },
  { name: "vet-prescription-guide.pdf", type: "PDF", size: "1.2 MB", usedIn: "Knowledge Center", status: "Published" },
  { name: "supplier-verification-icon.svg", type: "Icon", size: "18 KB", usedIn: "Trust Badges", status: "Published" },
  { name: "farm-care-video.mp4", type: "Video", size: "8.4 MB", usedIn: "Homepage Section", status: "Draft" }
];

export const seoRows: TableRow[] = [
  { page: "Homepage SEO", title: "India's Animal Health Marketplace", meta: "Ready", schema: "Organization", status: "Published" },
  { page: "Category SEO", title: "Category templates", meta: "Needs review", schema: "CollectionPage", status: "Draft" },
  { page: "Product SEO", title: "Product templates", meta: "Ready", schema: "Product", status: "Published" },
  { page: "Blog SEO", title: "Knowledge center templates", meta: "Ready", schema: "Article", status: "Published" }
];

export const cmsAnalytics: PanelMetric[] = [
  { label: "Banner CTR", value: "4.8%", detail: "Hero and category banner clicks", status: "healthy" },
  { label: "Offer Conversion", value: "8.6%", detail: "Coupons converting to checkout", status: "healthy" },
  { label: "Popup Views", value: "18.2K", detail: "Last 30 days", status: "healthy" },
  { label: "Blog Views", value: "42.7K", detail: "Knowledge center sessions", status: "healthy" },
  { label: "Homepage Engagement", value: "68%", detail: "Scroll depth and CTA interaction", status: "healthy" },
  { label: "Most Clicked CTA", value: "Book Vet", detail: "Top action this week", status: "healthy" }
];

export const previewMetrics: PanelMetric[] = [
  { label: "Desktop Preview", value: "1440px", detail: "Founder desktop layout", status: "healthy" },
  { label: "Tablet Preview", value: "768px", detail: "Responsive tablet review", status: "healthy" },
  { label: "Mobile Preview", value: "390px", detail: "Mobile banner crop required", status: "watch" }
];

export const cmsActivityFeed: ActivityItem[] = [
  { title: "Hero banner updated", detail: "Homepage cattle-health campaign moved to published", time: "3m", status: "success" },
  { title: "Mobile image missing", detail: "Poultry category banner needs mobile creative", time: "9m", status: "warning" },
  { title: "Offer scheduled", detail: "Dairy Feed Bulk Offer scheduled for 18 Jun 2026", time: "18m", status: "success" },
  { title: "Blog draft created", detail: "Goat Deworming Calendar added to knowledge center", time: "34m", status: "info" },
  { title: "SEO review needed", detail: "Category SEO meta descriptions need final approval", time: "1h", status: "warning" }
];

export const cmsTableColumns: Record<string, TableColumn[]> = {
  categoryBanners: [
    { key: "category", label: "Category" },
    { key: "title", label: "Title" },
    { key: "desktop", label: "Desktop Image" },
    { key: "mobile", label: "Mobile Image" },
    { key: "order", label: "Display Order" },
    { key: "status", label: "Status" }
  ],
  offers: [
    { key: "title", label: "Offer Title" },
    { key: "type", label: "Offer Type" },
    { key: "coupon", label: "Coupon Code" },
    { key: "discount", label: "Discount" },
    { key: "dates", label: "Start / End Date" },
    { key: "status", label: "Status" }
  ],
  popups: [
    { key: "popup", label: "Popup Type" },
    { key: "headline", label: "Headline" },
    { key: "frequency", label: "Frequency" },
    { key: "schedule", label: "Schedule" },
    { key: "status", label: "Status" }
  ],
  blogs: [
    { key: "title", label: "Blog Title" },
    { key: "category", label: "Category" },
    { key: "slug", label: "Slug" },
    { key: "publishDate", label: "Publish Date" },
    { key: "status", label: "Status" }
  ],
  media: [
    { key: "name", label: "Media" },
    { key: "type", label: "Type" },
    { key: "size", label: "Size" },
    { key: "usedIn", label: "Used In" },
    { key: "status", label: "Status" }
  ],
  seo: [
    { key: "page", label: "Page" },
    { key: "title", label: "Meta Title" },
    { key: "meta", label: "Meta Description" },
    { key: "schema", label: "Schema Markup" },
    { key: "status", label: "Status" }
  ]
};

export const cmsRealCatalogSummary = {
  products: products.length.toLocaleString("en-IN"),
  liveProducts: liveProducts.length.toLocaleString("en-IN"),
  mediaReadyProducts: imageReadyProducts.length.toLocaleString("en-IN"),
  categories: categories.length.toLocaleString("en-IN")
};
