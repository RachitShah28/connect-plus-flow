import React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/prismic";
import { Navbar } from "@/components/site/Navbar";
import { CTAFooter } from "@/components/site/CTAFooter";
import type { PrismicDocument } from "@prismicio/client";
import { mapRichTextToBlocks, mapFaqs } from "@/lib/prismicMapper";
import type { ContentBlock, PrismicSpan } from "@/lib/prismicMapper";

// ─── Inline rich-text renderer ───────────────────────────────────────────────
// Converts a Prismic text + spans array into React nodes with bold/italic/links.
function renderRichText(text: string, spans?: PrismicSpan[]): React.ReactNode {
  if (!spans || spans.length === 0) return text;

  type Seg = { start: number; end: number; types: string[]; url?: string; target?: string };
  const boundaries = new Set<number>([0, text.length]);
  spans.forEach((s) => {
    boundaries.add(Math.max(0, s.start));
    boundaries.add(Math.min(text.length, s.end));
  });
  const pts = Array.from(boundaries).sort((a, b) => a - b);
  const segments: Seg[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const start = pts[i], end = pts[i + 1];
    if (start >= end) continue;
    const active = spans.filter((s) => s.start <= start && s.end >= end);
    const hyperlinkSpan = active.find((s) => s.type === "hyperlink");
    segments.push({ start, end, types: active.map((s) => s.type), url: hyperlinkSpan?.data?.url, target: hyperlinkSpan?.data?.target });
  }

  return segments.map((seg, idx) => {
    const slice      = text.slice(seg.start, seg.end);
    const isBold     = seg.types.includes("strong");
    const isItalic   = seg.types.includes("em");
    const isLink     = seg.types.includes("hyperlink") && !!seg.url;
    const isCode     = seg.types.includes("label");

    let node: React.ReactNode = slice;
    if (isCode)   node = <code   key={`c-${idx}`} className="post2-inline-code">{node}</code>;
    if (isBold)   node = <strong key={`b-${idx}`}>{node}</strong>;
    if (isItalic) node = <em     key={`i-${idx}`}>{node}</em>;
    if (isLink)   node = <a key={`a-${idx}`} href={seg.url} target={seg.target || "_blank"} rel="noopener noreferrer" className="post2-body-link">{node}</a>;
    if (!isBold && !isItalic && !isLink && !isCode) return <span key={idx}>{slice}</span>;
    return node;
  });
}

// ─── Code block ──────────────────────────────────────────────────────────────
function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const displayLang = language || "text";

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    } else {
      const el = document.createElement("textarea");
      el.value = code; document.body.appendChild(el); el.select();
      document.execCommand("copy"); document.body.removeChild(el);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="post2-code-block">
      <div className="post2-code-header">
        <div className="post2-code-dots">
          <span className="post2-code-dot post2-code-dot-red" />
          <span className="post2-code-dot post2-code-dot-yellow" />
          <span className="post2-code-dot post2-code-dot-green" />
        </div>
        <span className="post2-code-lang">{displayLang}</span>
        <button className={`post2-code-copy${copied ? " post2-code-copy--copied" : ""}`} onClick={handleCopy} aria-label="Copy code">
          {copied ? (
            <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Copied!</span></>
          ) : (
            <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span></>
          )}
        </button>
      </div>
      <pre className="post2-code-pre"><code className="post2-code-content">{code}</code></pre>
    </div>
  );
}

// ─── Raw HTML block ───────────────────────────────────────────────────────────
// Uses ref.current.innerHTML directly (not dangerouslySetInnerHTML) so that
// the browser natively processes <style> tags inside the injected HTML.
function RawHtmlBlock({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = html;
    }
  }, [html]);

  return <div ref={ref} className="post2-html-block" />;
}

// ─── Block renderer (same pattern as reference BlogPost.tsx renderBlock) ──────
function renderBlock(block: ContentBlock, i: number): React.ReactNode {
  switch (block.type) {
    case "heading":
      return <h2 key={i} className="post2-block-h2">{renderRichText(block.text, block.spans)}</h2>;
    case "subheading":
      return <h3 key={i} className="post2-block-h3">{renderRichText(block.text, block.spans)}</h3>;
    case "paragraph":
      return <p key={i} className="post2-block-p">{renderRichText(block.text, block.spans)}</p>;
    case "list":
      return (
        <ul key={i} className="post2-block-list">
          {block.items.map((item, j) => (
            <li key={j} className="post2-block-list-item">
              <span className="post2-block-list-dot" />
              {renderRichText(item, block.itemSpans?.[j])}
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure key={i} className="post2-block-figure">
          <img src={block.url} alt={block.alt || ""} loading="lazy" className="post2-block-img" />
          {block.alt && <figcaption className="post2-block-caption">{block.alt}</figcaption>}
        </figure>
      );
    case "embed":
      return (
        <div key={i} className="post2-block-embed">
          <div dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case "table":
      if (!block.bodyRows?.length && !block.headRow?.length) return null;
      return (
        <div key={i} className="post2-table-wrap">
          <table>
            {block.headRow && block.headRow.length > 0 && (
              <thead>
                <tr>{block.headRow.map((cell, ci) => <th key={ci}>{cell}</th>)}</tr>
              </thead>
            )}
            <tbody>
              {block.bodyRows.map((row, ri) => (
                <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <div key={i} className="post2-block-callout">
          <span className="post2-block-callout-icon" aria-hidden>💡</span>
          <p>{renderRichText(block.text, block.spans)}</p>
        </div>
      );
    case "rawhtml":
      return <RawHtmlBlock key={i} html={block.html} />;
    case "codeblock":
      return <CodeBlock key={i} code={block.code} language={block.language} />;
    default:
      return null;
  }
}

// ─── Rich-text entry point ────────────────────────────────────────────────────
function RichTextWithTables({ field }: { field: any[] }) {
  const blocks = mapRichTextToBlocks(field);
  if (blocks.length === 0) return null;
  return <>{blocks.map((block, i) => renderBlock(block, i))}</>;
}
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
  const [prevPost, setPrevPost] = useState<PrismicDocument | null>(null);
  const [nextPost, setNextPost] = useState<PrismicDocument | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // Reset all states when UID changes to prevent state leakage
    setDoc(null);
    setLoading(true);
    setNotFound(false);
    setRedirectChecked(false);
    checkStarted.current = false;
    setPrevPost(null);
    setNextPost(null);

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

  // ── Fetch adjacent posts for More Blogs section ─────────────────────────
  useEffect(() => {
    if (!doc) return;
    let active = true;

    const fetchAdjacent = async () => {
      try {
        const customType = (import.meta.env.VITE_PRISMIC_CUSTOM_TYPE || "blog_post").toLowerCase();
        const client = createClient();
        const orderings: { field: string; direction: "desc" }[] = [
          { field: `my.${customType}.publish_date`, direction: "desc" },
          { field: `my.${customType}.published_date`, direction: "desc" },
          { field: "document.first_publication_date", direction: "desc" },
        ];

        let allDocs: PrismicDocument[] = [];
        for (const ordering of orderings) {
          try {
            const result = await client.getAllByType(customType, { orderings: [ordering] });
            if (result.length > 0) { allDocs = result; break; }
          } catch { /* try next */ }
        }
        if (allDocs.length === 0) {
          allDocs = await client.getAllByType(customType).catch(() => []);
        }

        if (!active) return;
        const idx = allDocs.findIndex((d) => d.uid === doc.uid);
        if (idx === -1) return;
        // "Previous" = older post (higher index in desc-sorted list)
        // "Next"     = newer post (lower index)
        setPrevPost(idx < allDocs.length - 1 ? allDocs[idx + 1] : null);
        setNextPost(idx > 0 ? allDocs[idx - 1] : null);
      } catch {
        // silently ignore
      }
    };

    fetchAdjacent();
    return () => { active = false; };
  }, [doc]);

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

    // 8. Generate & Inject FAQPage Schema (JSON-LD) if FAQs exist
    const faqsForSchema = mapFaqs(doc.data?.faqs);
    if (faqsForSchema.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqsForSchema.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      };
      setSchemaScript("seo-faq-schema", faqSchema);
    }

    // Cleanup scripts on unmount / route exit
    return () => {
      const artScript = document.getElementById("seo-article-schema");
      if (artScript) artScript.remove();
      const custScript = document.getElementById("seo-custom-schema");
      if (custScript) custScript.remove();
      const faqScript = document.getElementById("seo-faq-schema");
      if (faqScript) faqScript.remove();
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
                  <RichTextWithTables field={body} />
                ) : (
                  <p className="post2-no-content">
                    This article's content is coming soon. Check back later.
                  </p>
                )}
              </div>

              {/* ── FAQ Accordion Section ────────────────────────────── */}
              {(() => {
                const faqs = mapFaqs(doc.data?.faqs);
                if (!faqs.length) return null;
                return (
                  <section className="blog-faq-section" aria-label="Frequently Asked Questions">
                    <div className="blog-faq-header">
                      <h2 className="blog-faq-title">
                        Frequently Asked <span className="blog-faq-title-accent">Questions</span>
                      </h2>
                      <div className="blog-faq-underline" />
                    </div>
                    <div className="blog-faq-list">
                      {faqs.map((faq, idx) => (
                        <div
                          key={idx}
                          className={`blog-faq-item${openFaq === idx ? " blog-faq-item--open" : ""}`}
                        >
                          <button
                            className="blog-faq-question"
                            aria-expanded={openFaq === idx}
                            aria-controls={`faq-answer-${idx}`}
                            id={`faq-question-${idx}`}
                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                          >
                            <span>{faq.question}</span>
                            <span className="blog-faq-chevron" aria-hidden="true">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </span>
                          </button>
                          <div
                            className="blog-faq-answer"
                            id={`faq-answer-${idx}`}
                            role="region"
                            aria-labelledby={`faq-question-${idx}`}
                          >
                            <div className="blog-faq-answer-inner">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })()}


            </article>

          </div>
        )}

        {/* ── More Blogs: Prev / Next navigation ───────────────────── */}
        {!loading && !notFound && doc && (prevPost || nextPost) && (
          <div className="more-blogs-section">
            <div className="more-blogs-header">
              <h2 className="more-blogs-title">
                More <span className="more-blogs-title-accent">Blogs</span>
              </h2>
              <div className="more-blogs-underline" />
            </div>

            <div className={`more-blogs-grid ${!prevPost || !nextPost ? "more-blogs-grid--single" : ""}`}>

              {/* Previous post card */}
              {prevPost && (
                <Link
                  to="/blog/$uid"
                  params={{ uid: prevPost.uid! }}
                  className="more-blogs-card more-blogs-card--prev"
                >
                  {/* Background image */}
                  {(prevPost.data?.cover_photo?.url || prevPost.data?.cover_image?.url) && (
                    <div className="more-blogs-card-img-wrap">
                      <img
                        src={prevPost.data?.cover_photo?.url || prevPost.data?.cover_image?.url}
                        alt={prevPost.data?.cover_photo?.alt || ""}
                        className="more-blogs-card-img"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {/* Badge – absolute top-left */}
                  <span className="more-blogs-nav-badge more-blogs-nav-badge--prev">
                    ← PREVIOUS BLOG
                  </span>
                  {/* Text overlay at bottom */}
                  <div className="more-blogs-card-body">
                    {(prevPost.data?.catagory || prevPost.data?.category) && (
                      <span className="more-blogs-card-category">
                        {prevPost.data?.catagory || prevPost.data?.category}
                      </span>
                    )}
                    <p className="more-blogs-card-title">
                      {Array.isArray(prevPost.data?.title)
                        ? prevPost.data.title[0]?.text ?? ""
                        : prevPost.data?.title ?? ""}
                    </p>
                  </div>
                </Link>
              )}

              {/* Next post card */}
              {nextPost && (
                <Link
                  to="/blog/$uid"
                  params={{ uid: nextPost.uid! }}
                  className="more-blogs-card more-blogs-card--next"
                >
                  {/* Background image */}
                  {(nextPost.data?.cover_photo?.url || nextPost.data?.cover_image?.url) && (
                    <div className="more-blogs-card-img-wrap">
                      <img
                        src={nextPost.data?.cover_photo?.url || nextPost.data?.cover_image?.url}
                        alt={nextPost.data?.cover_photo?.alt || ""}
                        className="more-blogs-card-img"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {/* Badge – absolute top-left */}
                  <span className="more-blogs-nav-badge more-blogs-nav-badge--next">
                    NEXT BLOG →
                  </span>
                  {/* Text overlay at bottom */}
                  <div className="more-blogs-card-body">
                    {(nextPost.data?.catagory || nextPost.data?.category) && (
                      <span className="more-blogs-card-category">
                        {nextPost.data?.catagory || nextPost.data?.category}
                      </span>
                    )}
                    <p className="more-blogs-card-title">
                      {Array.isArray(nextPost.data?.title)
                        ? nextPost.data.title[0]?.text ?? ""
                        : nextPost.data?.title ?? ""}
                    </p>
                  </div>
                </Link>
              )}

            </div>
          </div>
        )}
      </div>
      <CTAFooter />
    </>
  );
}
