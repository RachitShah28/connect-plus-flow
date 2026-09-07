import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  schemaData?: any;
}

const DOMAIN = "https://www.wbconnectplus.com";

export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  schemaData,
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Resolve canonical URL dynamically
    let finalCanonical = canonical;
    if (!finalCanonical) {
      const path = window.location.pathname;
      const cleanPath = path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
      finalCanonical = `${DOMAIN}${cleanPath}`;
    } else if (!finalCanonical.startsWith("http")) {
      const cleanPath = finalCanonical.startsWith("/") ? finalCanonical : `/${finalCanonical}`;
      finalCanonical = `${DOMAIN}${cleanPath}`;
    } else if (finalCanonical.startsWith("https://wbconnectplus.com")) {
      finalCanonical = finalCanonical.replace("https://wbconnectplus.com", DOMAIN);
    }

    // Resolve OG URL dynamically
    let finalOgUrl = ogUrl;
    if (!finalOgUrl) {
      finalOgUrl = finalCanonical;
    } else if (finalOgUrl.startsWith("https://wbconnectplus.com")) {
      finalOgUrl = finalOgUrl.replace("https://wbconnectplus.com", DOMAIN);
    }

    // Helper to set or create meta tags
    const setMetaTag = (attr: "name" | "property", key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to set or create link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Standard SEO
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    setLinkTag("canonical", finalCanonical);

    // Open Graph (OG) Tags
    setMetaTag("property", "og:title", ogTitle || title);
    setMetaTag("property", "og:description", ogDescription || description);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:url", finalOgUrl);
    setMetaTag("property", "og:site_name", "WBConnectplus");
    setMetaTag("property", "og:image", ogImage || `${DOMAIN}/favicon.svg`);
    setMetaTag("property", "og:image:alt", "WBConnectplus WhatsApp Automation Tool");
    setMetaTag("property", "og:image:width", "1200");
    setMetaTag("property", "og:image:height", "630");
    setMetaTag("property", "og:locale", "en_US");

    // Dynamic Schema
    let scriptEl = document.getElementById("seo-schema") as HTMLScriptElement | null;
    if (schemaData) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.type = "application/ld+json";
        scriptEl.id = "seo-schema";
        document.head.appendChild(scriptEl);
      }
      scriptEl.text = JSON.stringify(schemaData);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      if (scriptEl) scriptEl.remove();
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogUrl, ogImage, schemaData]);
}
