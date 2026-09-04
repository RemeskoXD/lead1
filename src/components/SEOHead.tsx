import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: 'website' | 'article' | 'product';
  canonicalUrl?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  productPrice?: {
    name: string;
    lowPrice: number;
    priceCurrency?: string;
    description: string;
  };
}

export default function SEOHead({
  title,
  description,
  keywords,
  ogType = 'website',
  canonicalUrl,
  breadcrumbs,
  faqs,
  productPrice
}: SEOHeadProps) {
  const location = useLocation();
  const currentUrl = canonicalUrl || `https://optiva.cz${location.pathname}`;

  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMeta = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta tags
    setMeta('name', 'description', description);
    if (keywords) {
      setMeta('name', 'keywords', keywords);
    }
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('name', 'author', 'Optiva Telekomunikace');

    // OpenGraph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', currentUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:site_name', 'Optiva');
    setMeta('property', 'og:locale', 'cs_CZ');
    setMeta('property', 'og:image', 'https://web2.itnahodinu.cz/lead/favicon-96x96.png');

    // Twitter card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', 'https://web2.itnahodinu.cz/lead/favicon-96x96.png');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // 3. Structured Data (JSON-LD)
    const scriptId = 'seo-structured-data-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemas: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'Optiva',
        'url': 'https://optiva.cz',
        'logo': 'https://web2.itnahodinu.cz/lead/favicon-96x96.png',
        'telephone': '+420608638304',
        'contactPoint': [
          {
            '@type': 'ContactPoint',
            'telephone': '+420608638304',
            'contactType': 'customer service',
            'areaServed': 'CZ',
            'availableLanguage': 'Czech'
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Optiva',
        'url': 'https://optiva.cz',
        'description': 'Nezávislý srovnávač internetu, mobilních tarifů a digitální TV v ČR'
      }
    ];

    // Add Breadcrumb schema if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': b.name,
          'item': b.url.startsWith('http') ? b.url : `https://optiva.cz${b.url}`
        }))
      });
    }

    // Add FAQ schema if provided
    if (faqs && faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      });
    }

    // Add Product/Offer schema if price provided
    if (productPrice) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': productPrice.name,
        'description': productPrice.description,
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': productPrice.priceCurrency || 'CZK',
          'lowPrice': productPrice.lowPrice,
          'offerCount': '164',
          'availability': 'https://schema.org/InStock'
        }
      });
    }

    scriptTag.textContent = JSON.stringify(schemas);

  }, [title, description, keywords, ogType, currentUrl, breadcrumbs, faqs, productPrice]);

  return null;
}
