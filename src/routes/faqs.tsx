import { createFileRoute } from "@tanstack/react-router";
import { lazy, memo, Suspense, useEffect, useRef, useState } from "react";
import { ChevronRight, Plus, Minus } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { useSEO } from "@/hooks/useSEO";

// ── SEO title ─────────────────────────────────────────────────────────────────
// Using global useSEO hook instead

// ── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/faqs")({
  component: FAQsPage,
});

// ── FAQ data ──────────────────────────────────────────────────────────────────

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "general",
    label: "General Questions",
    items: [
      {
        q: "What is WBConnect+?",
        a: "WBConnect+ is a powerful WhatsApp Business API integration designed specifically for Salesforce CRM. It allows businesses to send, receive, and automate WhatsApp messages directly from their Salesforce environment, enabling seamless customer communication at scale.",
      },
      {
        q: "Do I need a WhatsApp Business API account to use WBConnect+?",
        a: "Yes, WBConnect+ connects your Salesforce CRM to the official WhatsApp Business API. We provide an embedded sign-up process to help you create and link your WhatsApp Business account quickly.",
      },
      {
        q: "Can I use my existing WhatsApp number with WBConnect+?",
        a: "Yes, you can migrate an existing number to the WhatsApp Business API. However, the number must first be disconnected from the standard WhatsApp or WhatsApp Business mobile app before it can be linked to the API via WBConnect+.",
      },
      {
        q: "How do I create automated marketing workflows?",
        a: "Marketing workflows automate messages, lead scoring, reminders, and customer journeys, helping businesses improve engagement, conversions, and campaign performance with less manual effort. Use our Automation Builder inside Salesforce to create multi-step conversational flows triggered by any Salesforce event.",
      },
      {
        q: "How do I schedule a WhatsApp message?",
        a: "Use WBConnect+ to schedule messages — select your audience, set a delivery time, and automate personalized customer communication. You can schedule both one-to-one messages and large broadcast campaigns.",
      },
    ],
  },
  {
    id: "setup-onboarding",
    label: "Setup & Onboarding",
    items: [
      {
        q: "How do I connect my WhatsApp account to Salesforce?",
        a: 'We provide a seamless "Embedded Sign-Up" wizard. You simply log in with your Facebook Business credentials inside Salesforce, select or create your WhatsApp Business Account (WABA), and verify your phone number to complete the connection.',
      },
      {
        q: "Can I use an existing WhatsApp number?",
        a: "Yes, you can migrate an existing number to the API. However, you must first delete the account associated with that number from the standard WhatsApp or WhatsApp Business mobile app before connecting it via WBConnect+.",
      },
      {
        q: "What is Meta Business Verification, and is it required?",
        a: "Business Verification is Meta's process to confirm your legal business identity. While you can start sending a small batch of messages immediately after sign-up, completing this verification is required to unlock higher daily messaging limits and full API access.",
      },
      {
        q: "How long does the technical setup process take?",
        a: "The initial installation and embedded sign-up take only a few minutes. However, if you need to complete Meta's Business Verification, the approval process from Meta typically takes 1 to 3 business days.",
      },
      {
        q: "Is my data secure when using this integration?",
        a: "Yes. WBConnect+ operates entirely inside your Salesforce environment, inheriting Salesforce's enterprise-grade security. All messages transmitted through the WhatsApp Business API utilize end-to-end encryption.",
      },
    ],
  },
  {
    id: "message-templates",
    label: "Message Templates",
    items: [
      {
        q: "What are WhatsApp Message Templates?",
        a: "Templates are predefined, structured message formats required by Meta to initiate conversations with customers outside of the 24-hour service window. They can include text, media, and interactive buttons.",
      },
      {
        q: "Do I need Meta's approval before using a template?",
        a: "Yes, all templates must be reviewed and approved by Meta to ensure they comply with WhatsApp's commerce and business policies. You can submit them directly from Salesforce, and approval usually takes just a few minutes.",
      },
      {
        q: "Can I personalize my template messages?",
        a: "Absolutely. You can map WhatsApp template variables (e.g., {{1}}, {{2}}) directly to your Salesforce fields (such as Contact Name, Order Number, or Appointment Date) so that every outgoing message is customized for the recipient.",
      },
      {
        q: "Can I include buttons or links in my templates?",
        a: 'Yes, WBConnect+ fully supports interactive templates. You can add "Quick Reply" buttons for simple responses (e.g., Yes/No) or "Call-to-Action" buttons that link to a website URL or trigger a direct phone call.',
      },
      {
        q: "Why was my template rejected by Meta?",
        a: "Templates are usually rejected if they violate Meta's commerce policies, contain spelling/grammatical errors, or use improper variable formatting. The rejection reason is logged in Salesforce so you can make necessary edits and resubmit.",
      },
    ],
  },
  {
    id: "broadcasts",
    label: "Broadcasts & Audiences",
    items: [
      {
        q: "What is a WhatsApp Broadcast?",
        a: "A broadcast allows you to send mass messages (using pre-approved templates) to a targeted list of Salesforce Contacts or Leads simultaneously. It is highly effective for marketing campaigns, alerts, and mass updates.",
      },
      {
        q: "How do I create an audience list for a Broadcast?",
        a: 'You can create "Broadcast Groups" in two ways: by selecting records directly from your existing Salesforce List Views, or by uploading a CSV file containing your customer data and phone numbers.',
      },
      {
        q: "Are there daily limits on how many broadcast messages I can send?",
        a: "WBConnect+ does not restrict your sending volume. However, Meta enforces a daily messaging limit that starts at 250 or 1,000 business-initiated conversations. This limit automatically scales up (to 10K, 100K, or unlimited) based on your phone number's quality rating.",
      },
      {
        q: "Can I schedule a broadcast for a future date?",
        a: "Yes, WBConnect+ allows you to configure a broadcast and schedule it to be sent automatically at a specific date and time, ensuring your messages reach customers at the optimal moment.",
      },
      {
        q: "What happens if a customer replies 'STOP' to a broadcast?",
        a: "WBConnect+ supports opt-out compliance. You can easily configure rules so that when a customer opts out, their Salesforce Contact/Lead record is flagged, ensuring they are automatically excluded from any future broadcast groups.",
      },
    ],
  },
  {
    id: "automation",
    label: "Automation & Flows",
    items: [
      {
        q: "What is the Automation feature in WBConnect+?",
        a: "Our Automation feature allows you to build interactive, multi-step conversational flows directly within Salesforce. Instead of just sending a single message, you can create automated, chatbot-like experiences that guide customers through a series of predefined paths.",
      },
      {
        q: "How does button-based routing work in an Automation?",
        a: "When setting up an automation flow, you select an initial WhatsApp template that contains Quick Reply buttons. From there, you can define specific actions for each button. When a customer clicks a specific button, WBConnect+ automatically sends the corresponding follow-up template you mapped to that reply.",
      },
      {
        q: "Can I build complex conversational trees?",
        a: 'Yes. Because you determine which template is sent next based on the customer\'s exact button click, you can build dynamic decision trees. For example, if a customer clicks "Support," they receive a support-focused template, but if they click "Sales," they receive a pricing template.',
      },
      {
        q: "Can I trigger these interactive automations automatically?",
        a: 'Yes! You can trigger the start of an interactive flow based on Salesforce events (like a Lead status changing to "Qualified") using Salesforce Flow Builder. Once the initial template is sent, the WBConnect+ Automation engine handles all the subsequent back-and-forth based on the customer\'s button clicks.',
      },
      {
        q: "Do I need coding skills to build these button-reply flows?",
        a: "No coding is required. The Automation interface provides a straightforward, visual way to map your templates. You simply select your starting template, view the available buttons, and choose which template should be sent next from a dropdown menu.",
      },
    ],
  },
  {
    id: "billing",
    label: "Billing & Performance",
    items: [
      {
        q: "Are WhatsApp messages free to send?",
        a: "Meta charges per conversation. Incoming customer service conversations are charged at one rate, while business-initiated conversations (like Broadcasts or Automated Flow templates) are charged based on the template category (Marketing, Utility, Authentication) and the recipient's country.",
      },
      {
        q: "How do I pay for the WhatsApp messages?",
        a: "Since billing is handled directly by Meta, you must attach a credit card or set up a line of credit within your Meta Business Manager account to cover the cost of the WhatsApp conversations.",
      },
      {
        q: 'What is the "24-hour customer service window"?',
        a: 'When a customer sends a message to your WhatsApp number, a 24-hour window opens. During this timeframe, you can reply with free-form text without needing to use a pre-approved template, and all messages within that window are counted as a single "Service Conversation."',
      },
      {
        q: "Can I track the delivery status of my messages?",
        a: "Yes. WBConnect+ provides real-time status updates directly on the Salesforce record. You can see exactly when a message was Sent, Delivered, Read, or if it Failed.",
      },
      {
        q: "Where can I view the overall performance of a Broadcast campaign?",
        a: "For every Broadcast sent, WBConnect+ generates a detailed analytics summary within Salesforce. You can view the total number of recipients, the delivery success rate, read receipts, and access specific error logs if any messages failed to send.",
      },
    ],
  },
  {
    id: "technical-support",
    label: "Technical & Support",
    items: [
      {
        q: "Is WBConnect+ secure?",
        a: "Yes, WBConnect+ operates entirely within your Salesforce environment, inheriting Salesforce's enterprise-grade security. Messages are transmitted securely via the official WhatsApp Business API, which utilizes end-to-end encryption.",
      },
      {
        q: "Where can I get support if I face an issue?",
        a: "You can reach our support team directly through the help portal or by emailing WBConnect Support. We also provide comprehensive technical documentation and user guides for all features.",
      },
    ],
  },
];

// ── Accordion Item ─────────────────────────────────────────────────────────────

const AccordionItem = memo(function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group transition-all"
      >
        <span
          className={[
            "text-lg sm:text-[19px] font-semibold leading-snug transition-colors duration-200",
            isOpen ? "text-[#2BB5D4]" : "text-slate-800 group-hover:text-[#2BB5D4]",
          ].join(" ")}
        >
          {item.q}
        </span>
        <span
          className={[
            "flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300",
            isOpen
              ? "bg-[#2BB5D4] text-white rotate-45 shadow-sm"
              : "bg-slate-100 text-slate-500 group-hover:bg-[#2BB5D4]/15 group-hover:text-[#2BB5D4]",
          ].join(" ")}
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </span>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: isOpen ? "600px" : "0",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.32s ease, opacity 0.25s ease",
        }}
      >
        <div className="pb-6 pr-12 pt-1 text-[15px] sm:text-base text-slate-500 leading-relaxed">
          {item.a}
        </div>
      </div>
    </div>
  );
});

// ── FAQ List ────────────────────────────────────────────────────────────────

const FAQList = memo(function FAQList({
  category,
}: {
  category: FAQCategory;
}) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  // Reset open items when category changes
  useEffect(() => {
    setOpenIndices([0]);
  }, [category.id]);

  const handleToggle = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div
      key={category.id}
      style={{ animation: "hero-fade-up 0.3s ease both" }}
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight lg:mt-[6px]">
        {category.label}
      </h2>
      <div className="border-t-2 border-slate-100">
        {category.items.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            isOpen={openIndices.includes(i)}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>
    </div>
  );
});

// ── Lazy footer ────────────────────────────────────────────────────────────────

const CTAFooter = lazy(() =>
  import("@/components/site/CTAFooter").then((m) => ({ default: m.CTAFooter }))
);
const SectionSkeleton = () => (
  <div className="w-full py-24 px-4 animate-pulse">
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="h-8 bg-slate-100 rounded-lg w-1/3 mx-auto" />
      <div className="h-4 bg-slate-100 rounded w-2/3 mx-auto" />
    </div>
  </div>
);

// ── Page ───────────────────────────────────────────────────────────────────────

function FAQsPage() {
  // Generate dynamic FAQ schema directly from the rendered content
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(cat => cat.items).map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  useSEO({
    title: "WhatsApp Automation FAQs | Setup, Broadcast & Workflows | WBConnect+",
    description: "Get answers about WhatsApp automation, message templates, broadcasts, workflow setup, scheduling messages, and Salesforce integration with WBConnect+.",
    keywords: "WhatsApp automation tool, schedule a WhatsApp message, automate WhatsApp messages, WhatsApp API FAQ, WhatsApp business automation",
    canonical: "https://www.wbconnectplus.com/faq",
    ogTitle: "WhatsApp Automation Tool for Business & Salesforce | WBConnect+",
    ogDescription: "Automate customer conversations, campaigns, and follow-ups with WBConnect Plus, a powerful WhatsApp automation tool built for sales, support, and Salesforce teams.",
    ogUrl: "https://www.wbconnectplus.com/faq",
    ogImage: "Logo/image Source url",
    schemaData: faqSchema,
  });

  const [activeId, setActiveId] = useState("general");
  const activeCategory =
    faqCategories.find((c) => c.id === activeId) ?? faqCategories[0];

  return (
    <main
      className="min-h-screen bg-white text-slate-900"
      aria-label="WBConnect+ Frequently Asked Questions"
    >
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section
        aria-label="FAQ hero"
        className="relative overflow-hidden bg-white pt-32"
      >
        {/* Soft centered radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 65% at 50% -5%, rgba(43,181,212,0.13) 0%, transparent 70%)",
          }}
        />

        {/* Dot-grid texture masked at top */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(43,181,212,0.2) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 65% 55% at 50% 0%, black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 50% 0%, black 0%, transparent 100%)",
          }}
        />

        {/* Left ambient blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -left-32 h-[420px] w-[420px] rounded-full bg-[#2BB5D4]/7 blur-[90px]"
        />
        {/* Right ambient blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-32 h-[360px] w-[360px] rounded-full bg-[#2BB5D4]/6 blur-[90px]"
        />

        {/* Centered content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div style={{ animation: "hero-fade-up 0.6s ease both" }}>
            {/* Eyebrow badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#2BB5D4]/30 bg-[#2BB5D4]/8 mb-7"
              style={{ animation: "hero-fade-up 0.4s ease 0.08s both" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2BB5D4] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2BB5D4]" />
              </span>
              <span className="text-[#2BB5D4] text-xs font-bold tracking-[0.14em] uppercase">Help Center</span>
            </div>

            {/* Main H1 */}
            <h1 className="font-extrabold tracking-tight leading-[1.08] mb-5">
              <span className="block text-4xl sm:text-5xl lg:text-[3.5rem] text-slate-900">
                WBConnect
                <span
                  style={{
                    background: "linear-gradient(135deg, #2BB5D4 0%, #22C55E 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  plus
                </span>
                {" "}FAQs
              </span>
              <span className="block text-xl sm:text-2xl lg:text-[1.7rem] text-slate-500 font-semibold mt-3 leading-snug">
                WhatsApp Business API for Salesforce
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-500 text-base sm:text-[17px] leading-relaxed max-w-2xl mx-auto mb-9">
              Find answers about setup, onboarding, automation, message templates,
              broadcasts, billing, security, and technical support.
            </p>


          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-b from-transparent to-white pointer-events-none"
        />
      </section>

      {/* ══ CONTENT ════════════════════════════════════════════════════════ */}
      <div className="relative bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-[#2BB5D4]/5 to-transparent blur-[110px]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-10">

          {/* ── Mobile/Tablet: horizontal scrollable tab bar ───────────── */}
          <div className="lg:hidden mb-6">
            <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
              <nav
                className="flex gap-2 w-max"
                aria-label="FAQ categories"
              >
                {faqCategories.map((cat) => {
                  const isActive = cat.id === activeId;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveId(cat.id)}
                      className={[
                        "flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap",
                        isActive
                          ? "bg-[#2BB5D4] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                      ].join(" ")}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* ── Desktop: two-column layout ────────────────────────────── */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">

            {/* ── Left Sidebar (desktop only) ───────────────────────── */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div style={{ animation: "hero-fade-up 0.5s ease 0.15s both" }}>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 px-1">Categories</p>
                <nav className="flex flex-col space-y-1" aria-label="FAQ categories desktop">
                  {faqCategories.map((cat) => {
                    const isActive = cat.id === activeId;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveId(cat.id)}
                        className={[
                          "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-all duration-200",
                          isActive
                            ? "bg-[#2BB5D4]/8 text-[#2BB5D4] shadow-sm ring-1 ring-[#2BB5D4]/15"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                        ].join(" ")}
                      >
                        <span className="text-[14.5px]">{cat.label}</span>
                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-[#2BB5D4]" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Support CTA card */}
                <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-[#2BB5D4]/8 to-[#2BB5D4]/3 border border-[#2BB5D4]/15">
                  <p className="text-sm font-semibold text-slate-800 mb-1">Still have questions?</p>
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                    Can't find what you're looking for? Reach out to our support team.
                  </p>
                  <a
                    href="mailto:info@mvclouds.com"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2BB5D4] hover:underline underline-offset-4"
                  >
                    Contact support →
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right Content Area ────────────────────────────────── */}
            <div className="flex-1 w-full min-h-[400px]">
              <div style={{ animation: "hero-fade-up 0.5s ease 0.2s both" }}>
                <FAQList category={activeCategory} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <Suspense fallback={<SectionSkeleton />}>
        <CTAFooter />
      </Suspense>
    </main>
  );
}
