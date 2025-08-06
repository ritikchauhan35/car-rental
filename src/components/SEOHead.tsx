import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEOHead = ({
  title = "Rent Flow - Premium Vehicle Rental Platform",
  description = "Rent cars, motorcycles, and scooters from trusted owners worldwide. Find the perfect vehicle for your journey with flexible booking and competitive prices.",
  keywords = "car rental, motorcycle rental, scooter rental, vehicle sharing, peer-to-peer rental, roadster rentals",
  image = "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&h=630&fit=crop",
  url = window.location.href,
  type = "website"
}: SEOHeadProps) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Rent Flow', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Additional SEO tags
    updateMetaTag('author', 'Rent Flow');
    updateMetaTag('theme-color', '#3b82f6');
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    
  }, [title, description, keywords, image, url, type]);

  return null;
};