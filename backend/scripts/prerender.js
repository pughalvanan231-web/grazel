import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('Starting static site pre-rendering (SSG)...');
  
  // 1. Resolve compiled entry points
  const templatePath = path.resolve(__dirname, '../dist/index.html');
  const serverEntryPath = path.resolve(__dirname, '../dist/server/entry-server.js');
  
  if (!fs.existsSync(templatePath)) {
    console.error('Error: dist/index.html not found. Please run vite build first.');
    process.exit(1);
  }
  
  if (!fs.existsSync(serverEntryPath)) {
    console.error('Error: dist/server/entry-server.js not found. Please build the SSR bundle first.');
    process.exit(1);
  }
  
  const template = fs.readFileSync(templatePath, 'utf8');
  const { render, products } = await import(pathToFileURL(serverEntryPath).href);
  
  // 2. Define routes to pre-render
  const routes = [
    { url: '/', title: 'GRAZEL | Timeless Elegance', description: 'Discover refined luxury fashion crafted from the world\'s finest materials. Shop our curated collection of timeless clothing and accessories.' },
    { url: '/men', title: 'Men\'s Collection | GRAZEL', description: 'Explore refined men\'s luxury fashion. Shop blazers, shirts, knitwear, and trousers crafted from wool, cashmere, and linen.' },
    { url: '/women', title: 'Women\'s Collection | GRAZEL', description: 'Discover women\'s luxury apparel by GRAZEL. Shop silk midi dresses, merino wool cardigans, and trousers designed for timeless elegance.' },
    { url: '/essentials', title: 'Essentials | GRAZEL', description: 'Curate your wardrobe with GRAZEL essentials. Shop premium leather belts, cashmere scarves, and luxury accessories.' },
    { url: '/collections', title: 'Collections | GRAZEL', description: 'Explore the curated luxury collections from GRAZEL, showcasing premium craftsmanship and timeless design.' },
    { url: '/new', title: 'New Arrivals | GRAZEL', description: 'Shop the newest additions to the GRAZEL catalog. Discover modern luxury garments in wool, cashmere, and silk.' },
    { url: '/all', title: 'All Pieces | GRAZEL', description: 'Browse the complete collection of GRAZEL clothing and accessories. Timeless elegance crafted for the discerning wardrobe.' },
    { url: '/help', title: 'Help Center | GRAZEL', description: 'Find answers, shipping policy, returns information, and sizing assistance at the GRAZEL Help Center.' },
    { url: '/help-center', title: 'Help Center | GRAZEL', description: 'Find answers, shipping policy, returns information, and sizing assistance at the GRAZEL Help Center.' },
    { url: '/contact', title: 'Contact Us | GRAZEL', description: 'Get in touch with the GRAZEL client services team. We are here to assist you with inquiries, sizing, and orders.' },
    { url: '/contact-us', title: 'Contact Us | GRAZEL', description: 'Get in touch with the GRAZEL client services team. We are here to assist you with inquiries, sizing, and orders.' },
    { url: '/cookies', title: 'Cookie Policy | GRAZEL', description: 'Read the GRAZEL cookie policy to learn how we use cookies to improve your luxury shopping experience.' },
    { url: '/cookie-policy', title: 'Cookie Policy | GRAZEL', description: 'Read the GRAZEL cookie policy to learn how we use cookies to improve your luxury shopping experience.' },
    { url: '/privacy', title: 'Privacy Policy | GRAZEL', description: 'Read the GRAZEL privacy policy. We are committed to safeguarding your personal information and privacy.' },
  ];
  
  // Add dynamic product routes
  if (Array.isArray(products)) {
    products.forEach((p) => {
      routes.push({
        url: `/product/${p.id}`,
        title: `${p.name} | GRAZEL`,
        description: p.description || `Shop the ${p.name} at GRAZEL. Crafted from ${p.composition || p.fabric || 'premium materials'} with a ${p.fit} silhouette.`,
        product: p,
      });
    });
  }
  
  console.log(`Pre-rendering ${routes.length} routes...`);
  
  // Canonical URL config base
  const SITE_URL = process.env.VITE_SITE_URL || 'https://grazelapparel.com';
  
  // 3. Render each route
  for (const route of routes) {
    try {
      const appHtml = render(route.url);
      
      // Inject rendered HTML into div#root
      let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
      
      // Replace metadata dynamically
      const canonicalUrl = `${SITE_URL}${route.url === '/' ? '' : route.url}`;
      const title = route.title;
      const desc = route.description;
      
      // Replace or insert Title
      if (html.includes('<title>')) {
        html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
      } else {
        html = html.replace('</head>', `  <title>${title}</title>\n</head>`);
      }
      
      // Replace or insert description
      const descMeta = `<meta name="description" content="${desc.replace(/"/g, '&quot;')}" />`;
      if (html.includes('<meta name="description"')) {
        html = html.replace(/<meta name="description".*?\/>/, descMeta);
      } else {
        html = html.replace('</head>', `  ${descMeta}\n</head>`);
      }
      
      // Inject Canonical Link
      const canonicalLink = `<link rel="canonical" href="${canonicalUrl}" />`;
      if (html.includes('<link rel="canonical"')) {
        html = html.replace(/<link rel="canonical".*?\/>/, canonicalLink);
      } else {
        html = html.replace('</head>', `  ${canonicalLink}\n</head>`);
      }
      
      // Inject Open Graph tags
      const ogMeta = `
  <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
  <meta property="og:description" content="${desc.replace(/"/g, '&quot;')}" />
  <meta property="og:type" content="${route.product ? 'product' : 'website'}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${SITE_URL}/og-image.jpg" />
  <meta property="og:site_name" content="GRAZEL" />
      `.trim();
      
      // Inject Twitter card tags
      const twitterMeta = `
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />
  <meta name="twitter:description" content="${desc.replace(/"/g, '&quot;')}" />
  <meta name="twitter:image" content="${SITE_URL}/og-image.jpg" />
      `.trim();
      
      // Replace existing tags if any, or just insert
      html = html.replace('</head>', `  ${ogMeta}\n  ${twitterMeta}\n</head>`);
      
      // Inject JSON-LD Structured Data
      let schemas = [];
      
      // A. Organization Schema on Homepage
      if (route.url === '/') {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'GRAZEL',
          'url': SITE_URL,
          'logo': `${SITE_URL}/favicon.ico`,
          'sameAs': [
            'https://instagram.com/grazel',
            'https://facebook.com/grazel'
          ]
        });
      }
      
      // B. Product Schema on Product Page
      if (route.product) {
        const p = route.product;
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': p.name,
          'description': p.description || '',
          'image': p.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`)),
          'brand': {
            '@type': 'Brand',
            'name': 'GRAZEL'
          },
          'sku': `GRZ-${p.id}-${p.color.substring(0, 3).toUpperCase()}`,
          'offers': {
            '@type': 'Offer',
            'url': canonicalUrl,
            'priceCurrency': 'INR',
            'price': p.price,
            'priceValidUntil': '2027-12-31',
            'itemCondition': 'https://schema.org/NewCondition',
            'availability': p.stock_quantity === 0 ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock'
          }
        });
        
        // C. Breadcrumb for Product Page
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': SITE_URL
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': p.category,
              'item': `${SITE_URL}/${p.category}`
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': p.name,
              'item': canonicalUrl
            }
          ]
        });
      }
      
      // D. Breadcrumb for Category Pages
      if (['/men', '/women', '/essentials'].includes(route.url)) {
        const catName = route.url === '/men' ? 'Men' : route.url === '/women' ? 'Women' : 'Essentials';
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': SITE_URL
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': catName,
              'item': canonicalUrl
            }
          ]
        });
      }
      
      // Inject schemas into HTML head
      if (schemas.length > 0) {
        const schemaString = schemas
          .map((s) => `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`)
          .join('\n');
        html = html.replace('</head>', `${schemaString}\n</head>`);
      }
      
      // 4. Write HTML file to destination
      const routeDir = path.join(__dirname, '../dist', route.url);
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
      
      // If it is the homepage, overwrite dist/index.html as well
      if (route.url === '/') {
        fs.writeFileSync(templatePath, html, 'utf8');
      }
      
    } catch (err) {
      console.error(`Error rendering route ${route.url}:`, err);
    }
  }
  
  // 5. Generate sitemap.xml
  const sitemapUrls = routes.map((r) => {
    const canonicalUrl = `${SITE_URL}${r.url === '/' ? '' : r.url}`;
    const priority = r.url === '/' ? '1.0' : r.url.startsWith('/product/') ? '0.8' : '0.6';
    const changefreq = r.url.startsWith('/product/') ? 'weekly' : 'daily';
    return `  <url>
    <loc>${canonicalUrl}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.join('\n')}
</urlset>`;
  
  fs.writeFileSync(path.resolve(__dirname, '../dist/sitemap.xml'), sitemapContent, 'utf8');
  console.log('✓ sitemap.xml generated.');
  
  // 6. Generate robots.txt
  const robotsContent = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /checkout
Disallow: /review-order
Disallow: /wishlist

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.resolve(__dirname, '../dist/robots.txt'), robotsContent, 'utf8');
  console.log('✓ robots.txt generated.');
  
  // 7. Cleanup server bundle
  const serverDir = path.resolve(__dirname, '../dist/server');
  if (fs.existsSync(serverDir)) {
    fs.rmSync(serverDir, { recursive: true, force: true });
  }
  
  console.log('Static site pre-rendering (SSG) complete!');
}

run();
