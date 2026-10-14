import heroImage from '@/assets/hero-cover.jpg';
import editorialWool from '@/assets/editorial-wool.jpg';
import categoryMen from '@/assets/category-men.jpg';
import categoryWomen from '@/assets/category-women.jpg';
import categoryEssentials from '@/assets/category-essentials.jpg';
import atelierArchive from '@/assets/Sometimes Clothes Make the Presentation.jpg';

export const BRAND = {
  name: "GRAZEL",
  legalName: "Grazel Apparel Private Limited",
  tagline: "Timeless Elegance",
  claim: "Craftsmanship meets timeless design. Thoughtfully constructed from the world's finest natural materials.",
  since: "2021",
  origin: "Tiruppur, India",
  email: "support@grazel.com",
  phone: "+91 98765 43210",
  address: "Heritage Textile Corridor, Tiruppur, Tamil Nadu 641602, India",
  hours: "Monday – Saturday: 10:00 AM – 7:00 PM IST"
};

export const VIDEO_HERO = {
  eyebrow: "AUTUMN / WINTER EDITORIAL · TIRUPPUR ATELIER ARCHIVE · GPS: 11.1085° N, 77.3411° E",
  welcome: "AUTUMN / WINTER EDITORIAL",
  titleLines: ["THE ART OF", "TIMELESS", "ELEGANCE."],
  subtitle: "Discover our collections — crafted from the world's finest virgin wool, raw silks, and pure organic cotton. Designed to transcend seasons and outlive trends.",
  ctaPrimary: "Explore Collections",
  ctaSecondary: "Pre-Order Ahead of Season",
  ctaPrimaryHref: "/collections",
  ctaSecondaryHref: "/all?filter=preorder",
  poster: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2400&auto=format&fit=crop",
  sources: [
    { src: "/4361303-hd_1280_720_50fps.mp4", type: "video/mp4" },
    { src: "https://videos.pexels.com/video-files/4361303/4361303-hd_1280_720_50fps.mp4", type: "video/mp4" },
    { src: "https://videos.pexels.com/video-files/4361303/4361303-hd_1920_1080_25fps.mp4", type: "video/mp4" },
    { src: "/pexels-hero.mp4", type: "video/mp4" }
  ]
};

export const PHILOSOPHY_HEADER = {
  eyebrow: "01 / 07 ATELIER REPERTOIRE",
  title: "OUR CODE OF EXCELLENCE",
  subtitle: "The Pillars of Old Money Refinement"
};

export const PILLARS = [
  { 
    hashtag: "#01_CRAFTSMANSHIP", 
    title: "Master Tailoring & Heritage Seams", 
    description: "Generational tailoring methods, reinforced high-strain stitch profiles, and hand-finished internal seams.",
    href: "/collections" 
  },
  { 
    hashtag: "#02_PROVENANCE", 
    title: "100% Traceable Natural Fibres", 
    description: "From GOTS-certified combed cotton in Southern India to virgin Australian merino wool.",
    href: "/collections" 
  },
  { 
    hashtag: "#03_TIMELESSNESS", 
    title: "Silhouettes That Transcend Eras", 
    description: "Palettes, structural drape, and enduring proportions sovereign of fast-fashion cycles.",
    href: "/collections" 
  }
];

export const MARQUEE_TAPE = [
  "ARCHITECTURAL DRAPE",
  "UNCOMPROMISING FIBRE",
  "TIRUPPUR ATELIER ARCHIVE",
  "100% TRACEABLE NATURAL FIBRES",
  "HEIRLOOM GARMENTS SINCE 2021"
];

export const MARQUEE_ITEMS = MARQUEE_TAPE;

export const FACTS = {
  eyebrow: "VERIFIED STANDARDS",
  title: "Precision in Every Metric",
  description: "Rooted in Tiruppur's legendary textile basin, Grazel synthesizes artisanal precision with obsessive material fidelity.",
  stats: [
    { value: "100%", label: "Traceable Organic Fibres" },
    { value: "4.8★", label: "Customer Satisfaction Rating" },
    { value: "₹1,500", label: "Free Shipping Order Threshold" },
    { value: "7 Days", label: "Effortless Returns & Exchanges" }
  ],
  image: atelierArchive,
  caption: "The Grazel Atelier Archive — Artisanal Weaving & Raw Fiber Preparation, Tiruppur"
};

export const SUSTAINABILITY_PILLARS = [
  {
    number: "01",
    title: "Ethical Provenance & Traceability",
    description: "Zero synthetic fillers, virgin combed cotton, cruelty-free wool, botanical dyes."
  },
  {
    number: "02",
    title: "Closed-Loop Atelier Production",
    description: "98% water-recycling systems and solar-powered finishing facilities in Tiruppur."
  },
  {
    number: "03",
    title: "Generational Dignity & Fair Wages",
    description: "Living wages, medical coverage, and ergonomic work environments."
  }
];

export const MILESTONES = [
  {
    year: "2021",
    title: "Atelier Genesis",
    description: "Founded in Tiruppur with a singular ambition: restoring architectural tailoring and heirloom textile integrity."
  },
  {
    year: "2022",
    title: "The Loom Floor Expansion",
    description: "Partnering with master loom cooperatives."
  },
  {
    year: "2023",
    title: "Digital Atelier Platform",
    description: "Direct client bespoke portal launch."
  },
  {
    year: "2024",
    title: "Autumn Archive Capsule",
    description: "Uncompromising heavy-gauge wool and silk debut."
  },
  {
    year: "2025",
    title: "The Circular Standard",
    description: "100% closed-loop zero-waste certification."
  }
];

export const SERVICES = [
  {
    icon: "Truck",
    title: "Complimentary Insured Courier",
    description: "Free express shipping on domestic orders exceeding ₹1,500.",
    href: "/help"
  },
  {
    icon: "ShieldCheck",
    title: "7-Day Seamless Return Policy",
    description: "Complimentary home collection.",
    href: "/help"
  },
  {
    icon: "Gift",
    title: "Bespoke Gift Unboxing",
    description: "Hand-embossed linen boxes, custom calligraphy cards, cedar moth sachets.",
    href: "/help"
  },
  {
    icon: "User",
    title: "Interactive Fit Studio",
    description: "Proprietary sizing matrix for bespoke drape.",
    href: "/fit-profile"
  }
];

export const LEADERSHIP = [
  {
    name: "Aaditya Varma",
    role: "Founder & Creative Director",
    image: categoryMen,
    quote: "Luxury is not excess; it is the quiet confidence of immaculate cloth cut without compromise."
  },
  {
    name: "Elena Rostova",
    role: "Head of Textile Provenance",
    image: categoryWomen,
    quote: "True luxury begins at the soil level—in the health of the cotton plant and the purity of the wool fleece."
  },
  {
    name: "Karthik Subramanian",
    role: "Master Atelier Patternist",
    image: categoryEssentials,
    quote: "A well-cut seam speaks louder than any monogram ever could."
  }
];

export const EDITORIAL_NEWS = [
  {
    id: 1,
    category: "TEXTILE ARCHIVE",
    title: "The Architecture of Heavy Gauge Wool",
    readTime: "4 min read",
    date: "October 2024",
    excerpt: "Why the weight and twist density of virgin wool fibers determine how a silhouette falls over decades.",
    image: editorialWool,
    href: "/collections"
  },
  {
    id: 2,
    category: "OLD MONEY PHILOSOPHY",
    title: "Against the Ephemeral: Building a Generational Wardrobe",
    readTime: "6 min read",
    date: "September 2024",
    excerpt: "A manifesto for acquiring fewer, extraordinary garments that age into cherished heirlooms.",
    image: heroImage,
    href: "/collections"
  },
  {
    id: 3,
    category: "CRAFT & HERITAGE",
    title: "Tiruppur: The Cradle of World-Class Weaving",
    readTime: "5 min read",
    date: "August 2024",
    excerpt: "Exploring the generational master-weavers whose hands bring Grazel's tactile visions to reality.",
    image: "/tiruppur-weaving.jpg",
    href: "/collections"
  }
];

export const PARTNER_BENEFITS = [
  "Direct atelier pricing without retail markups",
  "Strict limit of 250 pieces per production run",
  "Complimentary lifetime button replacement & seam repairs",
  "Dedicated personal styling concierge",
  "Certified carbon-neutral delivery across all 28 Indian states"
];
