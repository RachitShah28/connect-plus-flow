/**
 * Prismic → ContentBlock mapper
 * Ported from the reference prismicMapper.ts and adapted for this repo's field names.
 *
 * Field mapping (our Prismic custom type):
 *   title / blog_title         → post title
 *   author_name / author       → author
 *   catagory / category        → category
 *   reading_time               → read time
 *   publish_date               → displayed date
 *   cover_photo / cover_image  → cover image
 *   contnet / body             → rich text body  ← note the typo "contnet" is intentional
 *   excerpt / description      → lead paragraph
 */

// ─── Types ───────────────────────────────────────────────────────────────────

/** A single inline-formatting span from a Prismic rich-text block. */
export interface PrismicSpan {
  type: "strong" | "em" | "hyperlink" | "label" | string;
  start: number;
  end: number;
  data?: {
    url?: string;
    target?: string;
    link_type?: string;
    [key: string]: unknown;
  };
}

export type ContentBlock =
  | { type: "paragraph";  text: string; spans?: PrismicSpan[] }
  | { type: "heading";    text: string; spans?: PrismicSpan[] }
  | { type: "subheading"; text: string; spans?: PrismicSpan[] }
  | { type: "callout";    text: string; spans?: PrismicSpan[] }
  | { type: "list";       items: string[]; itemSpans?: PrismicSpan[][] }
  | { type: "image";      url: string; alt?: string }
  | { type: "embed";      html: string; url?: string; provider?: string }
  | { type: "table";      headRow?: string[]; bodyRows: string[][] }
  | { type: "rawhtml";    html: string }
  | { type: "codeblock";  code: string; language?: string };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractText(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((block: { text?: string }) => block?.text ?? "")
      .join(" ")
      .trim();
  }
  return "";
}

function isListItem(type: string): boolean {
  return type === "list-item" || type === "o-list-item";
}

function extractCellText(cell: unknown): string {
  if (!cell) return "";
  if (typeof cell === "string") return cell;
  if (Array.isArray(cell)) {
    return cell
      .map((c: { text?: string }) => c?.text ?? "")
      .join(" ")
      .trim();
  }
  const c = cell as Record<string, unknown>;
  if (Array.isArray(c.content)) return extractCellText(c.content);
  if (typeof c.value === "string") return c.value;
  if (typeof c.text  === "string") return c.text;
  return "";
}

/**
 * Maps a Prismic table block to our internal table ContentBlock.
 * Handles two API shapes:
 *   Shape A: { head_row: { cells }, body: [{ cells }] }
 *   Shape B: { rows: [{ cells, head?: boolean }] }
 */
function mapTableBlock(
  block: Record<string, unknown>
): { type: "table"; headRow?: string[]; bodyRows: string[][] } | null {
  // Shape A
  if (block.head_row !== undefined || block.body !== undefined) {
    const headRow = block.head_row
      ? ((block.head_row as Record<string, unknown>).cells as unknown[] ?? []).map(extractCellText)
      : undefined;
    const bodyRows = ((block.body as unknown[]) ?? []).map((row) => {
      const r = row as Record<string, unknown>;
      return ((r.cells as unknown[]) ?? []).map(extractCellText);
    });
    if (bodyRows.length === 0 && !headRow?.length) return null;
    return { type: "table", headRow, bodyRows };
  }

  // Shape B
  if (Array.isArray(block.rows)) {
    const rows = block.rows as Record<string, unknown>[];
    if (rows.length === 0) return null;
    const allRows = rows.map((row) =>
      ((row.cells as unknown[]) ?? []).map(extractCellText)
    );
    if (rows[0]?.head === true || rows[0]?.is_header === true) {
      return { type: "table", headRow: allRows[0], bodyRows: allRows.slice(1) };
    }
    return { type: "table", bodyRows: allRows };
  }

  return null;
}

// ─── Main mapper ─────────────────────────────────────────────────────────────

/**
 * Converts a Prismic Rich Text field into typed ContentBlock[].
 *
 * preformatted block behaviour (exactly matching the reference prismicMapper):
 *
 *   1. Starts with <!-- TABLE_HTML -->
 *      → strips marker, renders rest as raw HTML  (rawhtml)
 *
 *   2. Contains <table or <style anywhere (auto-detect, no marker needed)
 *      → renders as raw HTML  (rawhtml)
 *
 *   3. Everything else → styled code block  (codeblock)
 *      Optionally declare the language on the very first line:
 *        // lang: javascript      ← JS / CSS comment style
 *        # lang: python           ← Shell / Python comment style
 *        <!-- lang: html -->      ← HTML comment style
 *      The language hint line is stripped from the displayed code.
 */
export function mapRichTextToBlocks(rtBlocks: unknown): ContentBlock[] {
  if (!Array.isArray(rtBlocks) || rtBlocks.length === 0) return [];
  const result: ContentBlock[] = [];

  for (let i = 0; i < rtBlocks.length; i++) {
    const block = rtBlocks[i] as {
      type?: string;
      text?: string;
      url?:  string;
      alt?:  string;
      spans?: PrismicSpan[];
    };
    const type  = block?.type ?? "";
    const text  = block?.text ?? "";
    const spans: PrismicSpan[] = Array.isArray((block as any)?.spans)
      ? (block as any).spans
      : [];

    if (!type) continue;
    if (type !== "image" && type !== "embed" && type !== "table" && !text.trim()) continue;
    // Skip paragraphs that are only whitespace / non-breaking spaces (Prismic editor artefacts)
    if (type === "paragraph" && !text.replace(/[\s\u00a0]+/g, "")) continue;

    // ── image ─────────────────────────────────────────────────────────────
    if (type === "image") {
      const imageUrl = block?.url ?? "";
      if (imageUrl) {
        result.push({ type: "image", url: imageUrl, alt: block?.alt ?? "" });
      }
      continue;
    }

    // ── embed ─────────────────────────────────────────────────────────────
    if (type === "embed") {
      const oembed   = (block as any)?.oembed;
      const html     = oembed?.html || (block as any)?.html || "";
      const embedUrl = oembed?.embed_url || (block as any)?.embed_url || oembed?.url || (block as any)?.url || "";

      const isPhoto =
        oembed?.type === "photo" ||
        oembed?.provider_name === "static_image" ||
        html.includes("<img") ||
        (!html.includes("<iframe") && html.includes("src="));

      if (isPhoto && embedUrl) {
        result.push({ type: "image", url: embedUrl, alt: oembed?.title || "" });
      } else if (html) {
        result.push({ type: "embed", html, url: embedUrl, provider: oembed?.provider_name || "" });
      } else if (embedUrl) {
        const isImageUrl = /\.(jpg|jpeg|png|webp|gif|svg|bmp)(\?.*)?$/i.test(embedUrl);
        if (isImageUrl) {
          result.push({ type: "image", url: embedUrl, alt: oembed?.title || "" });
        } else {
          result.push({ type: "paragraph", text: embedUrl });
        }
      }
      continue;
    }

    // ── table ─────────────────────────────────────────────────────────────
    if (type === "table") {
      const tableBlock = mapTableBlock(block as unknown as Record<string, unknown>);
      if (tableBlock) result.push(tableBlock);
      continue;
    }

    // ── headings ──────────────────────────────────────────────────────────
    if (type === "heading1" || type === "heading2") {
      result.push({ type: "heading", text, spans: spans.length ? spans : undefined });
      continue;
    }
    if (type === "heading3" || type === "heading4" || type === "heading5" || type === "heading6") {
      result.push({ type: "subheading", text, spans: spans.length ? spans : undefined });
      continue;
    }

    // ── paragraph ─────────────────────────────────────────────────────────
    if (type === "paragraph") {
      result.push({ type: "paragraph", text, spans: spans.length ? spans : undefined });
      continue;
    }

    // ── preformatted — matches reference prismicMapper exactly ───────────────
    //   Preformatted blocks are raw HTML previews by default.
    //   Use explicit markers to opt into other render modes:
    //     <!-- CODE_PREVIEW -->  → code block with optional lang hint
    //     <!-- CALLOUT -->       → styled callout box
    //     <!-- TABLE_HTML -->    → raw HTML (explicit, same as default but intentional)
    if (type === "preformatted") {
      const trimmed = text.trim();
      const CODE_MARKER    = "<!-- CODE_PREVIEW -->";
      const CALLOUT_MARKER = "<!-- CALLOUT -->";
      const TABLE_MARKER   = "<!-- TABLE_HTML -->";

      if (trimmed.startsWith(CALLOUT_MARKER)) {
        // Styled callout box
        const calloutText = trimmed.slice(CALLOUT_MARKER.length).trim();
        if (calloutText) result.push({ type: "callout", text: calloutText, spans: spans.length ? spans : undefined });
      } else if (trimmed.startsWith(CODE_MARKER)) {
        // Explicit code block — detect optional language hint on the first line
        //   // lang: javascript   → JS/CSS comment style
        //   # lang: python        → shell/Python comment style
        //   <!-- lang: html -->   → HTML comment style
        let code = trimmed.slice(CODE_MARKER.length).trim();
        let language: string | undefined;
        const langLineMatch = code.match(
          /^(?:\/\/|#|<!--)\s*lang(?:uage)?:\s*([a-zA-Z0-9+\-#.]+)\s*(?:-->)?\r?\n/i
        );
        if (langLineMatch) {
          language = langLineMatch[1].toLowerCase();
          code = code.slice(langLineMatch[0].length);
        }
        if (code) result.push({ type: "codeblock", code, language });
      } else {
        // Default: render as raw HTML (same as reference)
        // This correctly handles inline-CSS HTML, tables, custom components, etc.
        const html = trimmed.startsWith(TABLE_MARKER)
          ? trimmed.slice(TABLE_MARKER.length).trim()
          : trimmed;
        if (html) result.push({ type: "rawhtml", html });
      }
      continue;
    }


    // ── list items (consecutive items are grouped into one list block) ────
    if (isListItem(type)) {
      const items: string[]       = [text];
      const itemSpans: PrismicSpan[][] = [spans];
      while (
        i + 1 < rtBlocks.length &&
        isListItem((rtBlocks[i + 1] as { type?: string })?.type ?? "")
      ) {
        i++;
        const next = rtBlocks[i] as { text?: string; spans?: PrismicSpan[] };
        items.push(next?.text ?? "");
        itemSpans.push(Array.isArray((next as any)?.spans) ? (next as any).spans : []);
      }
      result.push({ type: "list", items: items.filter(Boolean), itemSpans });
      continue;
    }
  }

  return result;
}

/** Extracts plain text from any Prismic field for meta/title use. */
export { extractText };

/**
 * Maps a Prismic `faqs` group field (array of {faq_question, faq_answer} slices)
 * into the app's FAQ shape: { question: string; answer: string }[].
 *
 * Both question and answer support rich-text arrays or plain strings.
 * Items with an empty question or answer are silently dropped.
 */
export function mapFaqs(
  faqs: unknown
): { question: string; answer: string }[] {
  if (!Array.isArray(faqs) || faqs.length === 0) return [];
  return faqs
    .map((f: any) => ({
      question: extractText(f?.faq_question),
      answer:   extractText(f?.faq_answer),
    }))
    .filter((f) => f.question && f.answer);
}
