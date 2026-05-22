import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/prismic";
import { PrismicRichText } from "@prismicio/react";
import { Navbar } from "@/components/site/Navbar";
import { CTAFooter } from "@/components/site/CTAFooter";
import type { PrismicDocument } from "@prismicio/client";

export const Route = createFileRoute("/blog/$uid")({
  component: BlogPostPage,
});

// ── helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getText(doc: PrismicDocument, field: string): string {
  const val = doc.data?.[field];
  if (typeof val === "string") return val;
  if (Array.isArray(val) && val.length > 0) return val[0].text ?? "";
  return "";
}

function getRichText(doc: PrismicDocument, field: string) {
  const val = doc.data?.[field];
  return Array.isArray(val) ? val : [];
}

/** Estimate read time from all text in a Prismic rich text field */
function estimateReadTime(richText: any[]): number {
  const words = richText
    .map((b) => b.text ?? "")
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ── Skeleton ────────────────────────────────────────────────────────────────

function PostSkeleton() {
  return (
    <div className="post2-skeleton">
      <div className="post2-skeleton-topbar animate-pulse" />
      <div className="post2-skeleton-cover animate-pulse" />
      <div className="post2-skeleton-body">
        <div className="post2-skeleton-lead animate-pulse" />
        <div className="post2-skeleton-lead animate-pulse" style={{ width: "85%" }} />
        <div className="post2-skeleton-lead animate-pulse" style={{ width: "70%" }} />
        <hr className="post2-divider" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="post2-skeleton-line animate-pulse" style={{ width: `${75 + Math.random() * 25}%` }} />
        ))}
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

function BlogPostPage() {
  const { uid } = Route.useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState<PrismicDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [redirectChecked, setRedirectChecked] = useState(false);
  const checkStarted = useRef(false);

  useEffect(() => {
    // Reset all states when UID changes to prevent state leakage
    setDoc(null);
    setLoading(true);
    setNotFound(false);
    setRedirectChecked(false);
    checkStarted.current = false;

    let active = true;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog?uid=${uid}`);
        if (!res.ok) throw new Error("fallback");
        const data = await res.json();
        if (active) {
          setDoc(data);
          setLoading(false);
        }
      } catch {
        // Direct CMS fetch (used when no edge proxy is available)
        const customType = (import.meta.env.VITE_PRISMIC_CUSTOM_TYPE || "blog_post").toLowerCase();
        const client = createClient();
        client
          .getByUID(customType, uid)
          .then((d) => {
            if (active) { setDoc(d); setLoading(false); }
          })
          .catch(() => {
            client
              .getByID(uid)
              .then((d) => {
                if (active) { setDoc(d); setLoading(false); }
              })
              .catch(() => {
                if (active) { setNotFound(true); setLoading(false); }
              });
          });
      }
    };

    fetchPost();

    return () => {
      active = false;
    };
  }, [uid]);

  // ── Redirect lookup (runs only after a 404) ─────────────────────────────
  useEffect(() => {
    if (!notFound || redirectChecked || checkStarted.current) return;

    let active = true;

    const checkRedirect = async () => {
      checkStarted.current = true;
      console.log("[Redirect Debug] checkRedirect started. UID:", uid);

      try {
        console.log("[Redirect Debug] Attempting fetch to edge redirects API...");
        const res = await fetch(`/api/redirects?from=${encodeURIComponent(uid)}`);
        console.log("[Redirect Debug] Edge redirects API returned status:", res.status, "ok:", res.ok);
        if (res.ok) {
          const data = await res.json();
          console.log("[Redirect Debug] Edge redirects API json:", data);
          if (active && data?.to) {
            console.log("[Redirect Debug] Found edge redirect match! Navigating to:", data.to);
            navigate({ to: "/blog/$uid", params: { uid: data.to }, replace: true });
            return;
          }
        }
      } catch (err) {
        console.log("[Redirect Debug] Edge redirects API threw error (expected in local dev):", err);
      }

      console.log("[Redirect Debug] Attempting direct Prismic url_redirect query...");
      try {
        const client = createClient();
        const results = await client.getAllByType("url_redirect");
        console.log("[Redirect Debug] Total url_redirect docs from Prismic:", results.length);
        if (!active) {
          console.log("[Redirect Debug] Component unmounted or inactive. Aborting.");
          return;
        }

        const match = results.find((doc) => {
          const raw = doc.data?.from_uid;
          let slug = "";
          if (typeof raw === "string") {
            slug = raw.trim();
          } else if (Array.isArray(raw) && raw.length > 0) {
            slug = (raw[0].text ?? "").trim();
          }
          const cleanSlug = slug.replace(/^\/?(blog\/)?/, "").replace(/\/$/, "").trim();
          const cleanUid = uid.replace(/^\/?(blog\/)?/, "").replace(/\/$/, "").trim();
          console.log(`[Redirect Debug] Comparing cleanSlug "${cleanSlug}" with cleanUid "${cleanUid}"`);
          return cleanSlug === cleanUid;
        });

        console.log("[Redirect Debug] Found match in Prismic url_redirect list:", match ? JSON.stringify(match.data) : "None");

        if (match) {
          const rawTo = match.data?.to_uid;
          let toUid = "";
          if (typeof rawTo === "string") {
            toUid = rawTo.trim();
          } else if (Array.isArray(rawTo) && rawTo.length > 0) {
            toUid = (rawTo[0].text ?? "").trim();
          } else if (rawTo?.uid) {
            toUid = rawTo.uid;
          }

          if (toUid) {
            toUid = toUid.replace(/^\/?(blog\/)?/, "").replace(/\/$/, "").trim();
            if (toUid.includes("/")) {
              const segments = toUid.split("/").filter(Boolean);
              toUid = segments[segments.length - 1] || "";
            }
          }

          console.log("[Redirect Debug] Final target UID resolved to:", toUid);

          if (toUid && active) {
            console.log("[Redirect Debug] Navigating to target UID:", toUid);
            navigate({ to: "/blog/$uid", params: { uid: toUid }, replace: true });
            return;
          }
        } else {
          console.log("[Redirect Debug] No matching redirect found in Prismic list.");
        }
      } catch (err) {
        console.error("[Redirect Debug] Direct Prismic query failed with error:", err);
      } finally {
        if (active) {
          setRedirectChecked(true);
        }
      }
    };

    checkRedirect();

    return () => {
      active = false;
    };
  }, [notFound, redirectChecked, uid, navigate]);

  const title    = doc ? getText(doc, "title") || "" : "";
  const author   = doc ? getText(doc, "author_name") || getText(doc, "author") || "WBConnect Team" : "";
  const category = doc ? getText(doc, "catagory") || getText(doc, "category") : "";
  
  // Custom robust excerpt builder
  const getExcerptLocal = (d: PrismicDocument) => {
    const explicit = getText(d, "excerpt");
    if (explicit) return explicit;
    const bodyVal = d.data?.contnet || d.data?.body || [];
    if (Array.isArray(bodyVal)) {
      const paragraph = bodyVal.find((b: any) => b.type === "paragraph" && typeof b.text === "string" && b.text.trim().length > 0);
      if (paragraph) {
        const text = paragraph.text.trim();
        return text.length > 160 ? text.slice(0, 157) + "..." : text;
      }
    }
    return "";
  };
  const excerpt  = doc ? getExcerptLocal(doc) : "";

  // Support both "cover_photo" (current) and "cover_image" (fallback)
  const coverUrl = doc ? (doc.data?.cover_photo?.url ?? doc.data?.cover_image?.url ?? "") : "";
  
  // Support image_alt_tag
  const coverAlt = doc ? (getText(doc, "image_alt_tag") || doc.data?.cover_photo?.alt || doc.data?.cover_image?.alt || title) : title;
  
  // Support publish_date
  const date     = doc ? formatDate(doc.data?.publish_date ?? doc.data?.published_date ?? doc.first_publication_date) : "";
  
  // Support contnet or body
  const body     = doc ? (getRichText(doc, "contnet").length > 0 ? getRichText(doc, "contnet") : getRichText(doc, "body")) : [];
  
  // Support explicit reading_time, otherwise fall back to estimate!
  const getReadTimeLocal = (d: PrismicDocument, bodyRichText: any[]) => {
    const explicit = d.data?.reading_time;
    if (explicit !== undefined && explicit !== null) {
      const stringVal = String(explicit).trim();
      if (stringVal.length > 0) {
        if (/^\d+$/.test(stringVal)) {
          return `${stringVal} min read`;
        }
        return stringVal.toLowerCase().includes("read") ? stringVal : `${stringVal} min read`;
      }
    }
    return `${estimateReadTime(bodyRichText)} min read`;
  };
  const readTime = doc ? getReadTimeLocal(doc, body) : "";

  // ── SEO Head & Schema Injection ──────────────────────────────────────────
  useEffect(() => {
    if (!doc) return;

    // 1. Resolve SEO fields from Prismic content with intelligent defaults
    const metaTitle = getText(doc, "meta_title") || getText(doc, "seo_title") || `${title} | WBConnect+`;
    const metaDesc  = getText(doc, "meta_description") || getText(doc, "seo_description") || excerpt || `Read ${title} on the WBConnect+ blog.`;
    const keywords  = getText(doc, "meta_keywords") || getText(doc, "seo_keywords") || `${category ? category + ', ' : ''}real estate, blog, crm`;
    
    // Canonical link handling (supports standard strings or dynamic Link objects)
    let canonical = "";
    const rawCanonical = doc.data?.canonical_url;
    if (rawCanonical) {
      if (typeof rawCanonical === "string") {
        canonical = rawCanonical;
      } else if (typeof rawCanonical === "object" && rawCanonical.url) {
        canonical = rawCanonical.url;
      }
    }
    if (!canonical) {
      canonical = window.location.href;
    }
    
    const customSchema = getText(doc, "custom_json_schema") || getText(doc, "json_schema") || doc.data?.custom_schema;

    // 2. Dynamically set title
    document.title = metaTitle;

    // Helper: update/insert meta elements safely
    const setMetaTag = (name: string, content: string, keyAttr: "name" | "property" = "name") => {
      let meta = document.querySelector(`meta[${keyAttr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(keyAttr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Helper: update/insert link element safely
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    // Helper: manage schema script insertion
    const setSchemaScript = (id: string, schemaObj: object | null) => {
      if (!schemaObj) return;
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schemaObj);
    };

    // 3. Inject standard SEO head tags
    setMetaTag("description", metaDesc);
    setMetaTag("keywords", keywords);
    setLinkTag("canonical", canonical);

    // 4. Inject OpenGraph rich card tags
    setMetaTag("og:title", metaTitle, "property");
    setMetaTag("og:description", metaDesc, "property");
    setMetaTag("og:type", "article", "property");
    setMetaTag("og:url", canonical, "property");
    if (coverUrl) {
      setMetaTag("og:image", coverUrl, "property");
    }

    // 5. Inject Twitter share tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", metaTitle);
    setMetaTag("twitter:description", metaDesc);
    if (coverUrl) {
      setMetaTag("twitter:image", coverUrl);
    }

    // 6. Generate & Inject Article Schema (JSON-LD) if enabled in Prismic (default: true if not explicitly false)
    const shouldInjectArticle = doc.data?.article_schema !== false;
    if (shouldInjectArticle) {
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": excerpt || metaDesc,
        "image": coverUrl || undefined,
        "datePublished": doc.data?.publish_date || doc.data?.published_date || doc.first_publication_date,
        "dateModified": doc.last_publication_date,
        "author": {
          "@type": "Person",
          "name": author
        },
        "publisher": {
          "@type": "Organization",
          "name": "WBConnect+",
          "logo": {
            "@type": "ImageObject",
            "url": "https://wbconnectplus.com/assets/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonical
        }
      };
      setSchemaScript("seo-article-schema", articleSchema);
    }

    // 7. Inject Custom JSON Schema if provided in Prismic
    if (customSchema) {
      try {
        const parsed = typeof customSchema === "string" ? JSON.parse(customSchema) : customSchema;
        setSchemaScript("seo-custom-schema", parsed);
      } catch {
        // Silently ignore malformed custom schema
      }
    }

    // Cleanup scripts on unmount / route exit
    return () => {
      const artScript = document.getElementById("seo-article-schema");
      if (artScript) artScript.remove();
      const custScript = document.getElementById("seo-custom-schema");
      if (custScript) custScript.remove();
    };
  }, [doc, title, excerpt, coverUrl, author, category, date]);

  return (
    <>
      <Navbar />
      <div className="post2-page">

        {loading && (
          <div className="post2-container">
            <PostSkeleton />
          </div>
        )}

        {!loading && notFound && redirectChecked && (
          <div className="post2-container post2-not-found">
            <div className="blog-empty-image-wrap">
              <img src="/post_not_found.png" alt="Post not found" className="blog-empty-img" />
            </div>
            <h1>Post not found</h1>
            <p>This article may have been moved or unpublished.</p>
            <Link to="/blog" className="post2-back-link">
              ← Back to Blog
            </Link>
          </div>
        )}

        {!loading && !notFound && doc && (
          <div className="post2-container">

            {/* ── Top meta bar ─────────────────────────────────────────── */}
            <div className="post2-topbar">
              {/* Left: back button */}
              <Link to="/blog" className="post2-back-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Blog
              </Link>

              {/* Right: article meta */}
              <div className="post2-topbar-meta">
                {category && <span className="post2-topbar-category">{category}</span>}
                {author && (
                  <span className="post2-topbar-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    {author}
                  </span>
                )}
                {readTime && (
                  <span className="post2-topbar-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {readTime}
                  </span>
                )}
                {date && <span className="post2-topbar-item post2-topbar-date">{date}</span>}
              </div>
            </div>

            {/* ── Cover card ───────────────────────────────────────────── */}
            {coverUrl && (
              <div className="post2-cover-card">
                <img src={coverUrl} alt={coverAlt} className="post2-cover-img" />
              </div>
            )}

            {/* ── Article body ─────────────────────────────────────────── */}
            <article className="post2-article">

              {/* Title + author */}
              <header className="post2-header">
                {category && (
                  <span className="post2-category-pill">{category}</span>
                )}
                <h1 className="post2-title">{title}</h1>
                
                <div className="post2-author-row">
                  <div className="post2-author-avatar">
                    {author.charAt(0).toUpperCase()}
                  </div>
                  <div className="post2-author-meta">
                    <span className="post2-author-name">{author}</span>
                    <span className="post2-meta-divider">•</span>
                    <span className="post2-author-date">{date}</span>
                    {readTime && (
                      <>
                        <span className="post2-meta-divider">•</span>
                        <span className="post2-author-readtime">{readTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </header>


              {/* Rich text body */}
              <div className="post2-body">
                {body.length > 0 ? (
                  <PrismicRichText field={body as any} />
                ) : (
                  <p className="post2-no-content">
                    This article's content is coming soon. Check back later.
                  </p>
                )}
              </div>


            </article>

          </div>
        )}
      </div>
      <CTAFooter />
    </>
  );
}
