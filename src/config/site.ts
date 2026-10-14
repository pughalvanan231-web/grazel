/**
 * Centralized Site Configuration
 * Handles production URL, base metadata, and social previews
 */

export const SITE_CONFIG = {
  name: 'GRAZEL',
  title: 'GRAZEL | Timeless Elegance',
  description: "Discover refined luxury fashion crafted from the world's finest materials. Shop our curated collection of timeless clothing and accessories.",
  url: import.meta.env?.VITE_SITE_URL || 'https://grazelapparel.com',
  ogImage: '/og-image.jpg',
  twitterHandle: '@grazel',
};
