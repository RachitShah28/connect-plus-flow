import { useEffect } from "react";

const BASE_URL = "https://www.wbconnectplus.com";

export interface BreadcrumbCrumb {
  name: string;
  /** URL path (e.g. "/blog"). Omit on the last / active crumb. */
  path?: string;
}

/**
 * useBreadcrumbSchema
 *
 * Injects a JSON-LD BreadcrumbList schema into <head> for Google rich results.
 * Always prepends "Home" automatically.
 * Cleans up on unmount / route change.
 *
 * Usage:
 *   useBreadcrumbSchema([{ name: "Blog", path: "/blog" }, { name: "Post Title" }])
 *   → Home > Blog > Post Title  (schema only — no visible UI)
 */
export function useBreadcrumbSchema(items: BreadcrumbCrumb[]) {
  const trail: BreadcrumbCrumb[] = [{ name: "Home", path: "/" }, ...items];

  useEffect(() => {
    const schemaId = "seo-breadcrumb-schema";

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: trail.map((crumb, index) => {
        const entry: Record<string, unknown> = {
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
        };
        if (crumb.path) {
          entry["item"] = `${BASE_URL}${crumb.path}`;
        }
        return entry;
      }),
    };

    let script = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = schemaId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(schema);

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(trail)]);
}
