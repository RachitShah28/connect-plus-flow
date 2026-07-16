import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/prismic";
import { Navbar } from "@/components/site/Navbar";
import { CTAFooter } from "@/components/site/CTAFooter";
import type { PrismicDocument } from "@prismicio/client";
import { useSEO } from "@/hooks/useSEO";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
});

// ── constants ──────────────────────────────────────────────────────────────

const PAGE_SIZE = 3;

// ── helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getImageUrl(doc: PrismicDocument): string {
  // Support both "cover_photo" (current) and "cover_image" (fallback)
  const img = doc.data?.cover_photo || doc.data?.cover_image;
  return img?.url ?? "";
}

function getText(doc: PrismicDocument, field: string): string {
  const val = doc.data?.[field];
  if (typeof val === "string") return val;
  if (Array.isArray(val) && val.length > 0) return val[0].text ?? "";
  return "";
}

function getImageAlt(doc: PrismicDocument): string {
  // Prefer explicit text image alt tag, then direct image alt, then title
  const explicitAlt = getText(doc, "image_alt_tag");
  if (explicitAlt) return explicitAlt;
  const img = doc.data?.cover_photo || doc.data?.cover_image;
  return img?.alt || getText(doc, "title") || "Blog post cover";
}

function getExcerpt(doc: PrismicDocument): string {
  const explicitExcerpt = getText(doc, "excerpt");
  if (explicitExcerpt) return explicitExcerpt;

  // Extract plain text snippet from rich text "contnet" or "body" if no excerpt exists
  const body = doc.data?.contnet || doc.data?.body || [];
  if (Array.isArray(body)) {
    const paragraph = body.find((b: any) => b.type === "paragraph" && typeof b.text === "string" && b.text.trim().length > 0);
    if (paragraph) {
      const text = paragraph.text.trim();
      return text.length > 150 ? text.slice(0, 147) + "..." : text;
    }
  }
  return "";
}

// ── fetchPage ──────────────────────────────────────────────────────────────
// Fetches exactly PAGE_SIZE posts from Prismic for a given page number.
// Returns { docs, totalPages }.

async function fetchPage(page: number): Promise<{ docs: PrismicDocument[]; totalPages: number }> {
  const customType = (import.meta.env.VITE_PRISMIC_CUSTOM_TYPE || "blog_post").toLowerCase();
  const client = createClient();

  const orderings: { field: string; direction: "desc" }[] = [
    { field: `my.${customType}.publish_date`, direction: "desc" },
    { field: `my.${customType}.published_date`, direction: "desc" },
    { field: "document.first_publication_date", direction: "desc" },
  ];

  // Try each ordering until one succeeds
  for (const ordering of orderings) {
    try {
      const result = await client.getByType(customType, {
        pageSize: PAGE_SIZE,
        page,
        orderings: [ordering],
      });
      return { docs: result.results, totalPages: result.total_pages };
    } catch {
      // try next ordering
    }
  }

  // Last-resort: no ordering
  try {
    const result = await client.getByType(customType, { pageSize: PAGE_SIZE, page });
    return { docs: result.results, totalPages: result.total_pages };
  } catch {
    return { docs: [], totalPages: 0 };
  }
}

// ── BlogCard ───────────────────────────────────────────────────────────────

function BlogCard({ doc }: { doc: PrismicDocument }) {
  const title = getText(doc, "title") || "";
  const excerpt = getExcerpt(doc);
  const coverUrl = getImageUrl(doc);
  const coverAlt = getImageAlt(doc);
  const date = formatDate(doc.data?.publish_date ?? doc.data?.published_date ?? doc.first_publication_date);
  const author = getText(doc, "author_name") || getText(doc, "author") || "WBConnect Team";
  const category = getText(doc, "catagory") || getText(doc, "category");

  return (
    <Link to="/blog/$uid" params={{ uid: doc.uid || doc.id }} className="blog-card">
      <div className="blog-card-img-wrap">
        <img src={coverUrl || "/blog_placeholder.png"} alt={coverAlt} className="blog-card-img" />
      </div>
      <div className="blog-card-body">
        {category && <span className="blog-card-category">{category}</span>}
        <h2 className="blog-card-title">{title}</h2>
        {excerpt && <p className="blog-card-excerpt">{excerpt}</p>}
        <div className="blog-card-meta">
          <span className="blog-card-author">By {author}</span>
          {date && <span className="blog-card-date">{date}</span>}
        </div>
        <span className="blog-card-cta">Read article →</span>
      </div>
    </Link>
  );
}

// ── Skeleton ───────────────────────────────────────────────────────────────

function BlogSkeleton() {
  return (
    <div className="blog-skeleton">
      {[...Array(PAGE_SIZE)].map((_, i) => (
        <div key={i} className="blog-skeleton-card">
          <div className="blog-skeleton-img animate-pulse" />
          <div className="blog-skeleton-body">
            <div className="blog-skeleton-tag animate-pulse" />
            <div className="blog-skeleton-title animate-pulse" />
            <div className="blog-skeleton-text animate-pulse" />
            <div
              className="blog-skeleton-text animate-pulse"
              style={{ width: "60%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

function BlogPage() {
  useSEO({
    title: "WBConnect+ Blog | WhatsApp Business Insights & Guides",
    description: "Practical advice on WhatsApp automation, Salesforce integrations, and driving revenue through smarter customer conversations.",
    keywords: "WBConnect, WBConnectPlus, WBConnect+, WhatsApp automation, Salesforce integration, blog, WhatsApp marketing",
    canonical: "https://wbconnectplus.com/blog",
  });

  const [posts, setPosts] = useState<PrismicDocument[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Initial load — page 1
  useEffect(() => {
    let active = true;
    setInitialLoading(true);

    fetchPage(1).then(({ docs, totalPages: tp }) => {
      if (!active) return;
      setPosts(docs);
      setTotalPages(tp);
      setCurrentPage(1);
      setInitialLoading(false);
    });

    return () => { active = false; };
  }, []);

  // Fetch next page and append
  const handleLoadMore = async () => {
    if (loadingMore) return;
    const nextPage = currentPage + 1;
    setLoadingMore(true);

    const { docs, totalPages: tp } = await fetchPage(nextPage);

    setPosts((prev) => [...prev, ...docs]);
    setTotalPages(tp);
    setCurrentPage(nextPage);
    setLoadingMore(false);

    // Scroll to the newly loaded cards smoothly
    setTimeout(() => {
      loadMoreRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 80);
  };

  const hasMore = currentPage < totalPages;

  return (
    <>
      <Navbar />
      <main className="blog-page">
        {/* Hero */}
        <section className="blog-hero">
          <div className="blog-hero-inner">
            <span className="blog-hero-badge">Our Blog</span>
            <h1 className="blog-hero-title">
              Insights, Guides &amp; <br />
              <span className="blog-hero-title-accent">WhatsApp Tips</span>
            </h1>
            <p className="blog-hero-subtitle">
              Practical advice on WhatsApp automation, Salesforce integrations,
              and driving revenue through smarter customer conversations.
            </p>
          </div>
          <div className="blog-hero-glow" />
        </section>

        {/* Posts */}
        <section className="blog-content">
          <div className="blog-content-inner">
            {initialLoading && <BlogSkeleton />}

            {!initialLoading && posts.length === 0 && (
              <div className="blog-empty">
                <div className="blog-empty-image-wrap">
                  <img src="/empty_blog_state.png" alt="No published posts yet" className="blog-empty-img" />
                </div>
                <h3>No published articles yet</h3>
                <p>
                  We are currently writing and configuring our dynamic blog posts.
                </p>
              </div>
            )}

            {!initialLoading && posts.length > 0 && (
              <>
                <div className="blog-grid" ref={loadMoreRef}>
                  {posts.map((doc) => (
                    <BlogCard key={doc.id} doc={doc} />
                  ))}
                </div>

                {/* Load more skeletons */}
                {loadingMore && (
                  <div className="blog-load-more-skeletons">
                    <BlogSkeleton />
                  </div>
                )}

                {/* View More button */}
                {hasMore && !loadingMore && (
                  <div className="blog-view-more-wrap">
                    <button
                      id="blog-view-more-btn"
                      className="blog-view-more-btn"
                      onClick={handleLoadMore}
                    >
                      View More Articles
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* All loaded indicator */}
                {!hasMore && posts.length > PAGE_SIZE && (
                  <div className="blog-all-loaded">
                    <span>✦ You've reached the end ✦</span>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <CTAFooter />
    </>
  );
}
