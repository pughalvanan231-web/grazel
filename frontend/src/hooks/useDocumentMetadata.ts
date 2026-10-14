import { useEffect } from 'react';
import { SITE_CONFIG } from '@/config/site';

export function useDocumentMetadata(title: string, description?: string, canonicalPath?: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    document.title = title ? title : SITE_CONFIG.title;
    
    const desc = description || SITE_CONFIG.description;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }

    // Update Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const fullUrl = `${SITE_CONFIG.url}${canonicalPath || ''}`;
    canonical.setAttribute('href', fullUrl);
  }, [title, description, canonicalPath]);
}
