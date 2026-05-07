import { createFileRoute } from "@tanstack/react-router";
import { lazy, memo, Suspense, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, HardDrive, Webhook, LayoutDashboard, Cloud, Zap } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";

const GlobalChatVisual = lazy(() => import("@/components/site/FeatureShowcase").then(m => ({ default: m.GlobalChatVisual })));
const FlowBuilderVisual = lazy(() => import("@/components/site/FeatureShowcase").then(m => ({ default: m.FlowBuilderVisual })));
const TemplateBuilderVisual = lazy(() => import("@/components/site/FeatureShowcase").then(m => ({ default: m.TemplateBuilderVisual })));

import { useSEO } from "@/hooks/useSEO";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".reveal-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── SEO title ─────────────────────────────────────────────────────────────────
// Using global useSEO hook instead

// ── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/features")({
  component: FeaturesPage,
});

// ── Row ───────────────────────────────────────────────────────────────────────

const Row = memo(function Row({
  reverse,
  badge,
  title,
  desc,
  bullets,
  visual,
}: {
  reverse?: boolean;
  badge: string;
  title: string;
  desc: string;
  bullets: string[];
  visual: React.ReactNode;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-10 items-center">
      <div
        className={`reveal-item w-full ${reverse ? "md:order-2" : ""}`}
        style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
      >
        <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">{badge}</div>
        <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">{title}</h3>
        <p className="mt-4 text-slate-600 text-sm sm:text-base">{desc}</p>
        <ul className="mt-5 space-y-2.5">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-slate-700">
              <CheckCircle2 className="h-5 w-5 text-[#22C55E] mt-0.5 flex-shrink-0" />
              <span className="text-sm">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`reveal-item w-full ${reverse ? "md:order-1" : ""}`}
        style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s" }}
      >
        <Suspense fallback={<div className="h-64 w-full animate-pulse bg-slate-100 rounded-2xl" />}>
          {visual}
        </Suspense>
      </div>
    </div>
  );
});

// ── Visuals for features 4–6 ──────────────────────────────────────────────────

const AutomationBuilderVisual = memo(function AutomationBuilderVisual() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-white p-6 shadow-2xl shadow-slate-300/40 border border-slate-200">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3">Trigger to Action</div>
      <div className="space-y-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-[10px] uppercase text-slate-500 font-semibold">When</div>
          <div className="text-sm font-semibold text-slate-900 mt-0.5">Customer taps quick reply</div>
          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#2BB5D4]/10 text-[#0b5cab] text-[11px] font-semibold px-2 py-1">
            Button: "Interested"
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-[#22C55E] automation-arrow-bounce">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
        <div className="rounded-xl border-2 border-[#22C55E]/40 bg-emerald-50/50 p-3 shadow-sm">
          <div className="text-[10px] uppercase text-emerald-700 font-semibold">Then send template</div>
          <div className="text-sm font-semibold text-slate-900 mt-0.5">"brochure_followup_v2"</div>
          <div className="mt-2 rounded-md bg-white border border-emerald-200 p-2 text-[11px] text-slate-700">
            Great! Here's the brochure for {"{{Property.Name}}"}. Tap below to book a visit.
          </div>
          <div className="mt-2 flex gap-1.5">
            <div className="flex-1 rounded bg-[#22C55E] text-white text-center py-1 text-[11px] font-semibold">Book a visit</div>
            <div className="flex-1 rounded bg-white border border-slate-200 text-slate-700 text-center py-1 text-[11px] font-semibold">Talk to agent</div>
          </div>
        </div>
      </div>
    </div>
  );
});

const S3IntegrationVisual = memo(function S3IntegrationVisual() {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 shadow-2xl shadow-slate-900/30 border border-slate-700">
      <div className="flex items-center justify-between text-white mb-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-500 grid place-items-center text-[10px] font-bold text-white">S3</div>
          <div>
            <div className="text-sm font-semibold">Bring Your Own Bucket</div>
            <div className="text-[11px] text-slate-400">customer-owned, IAM secured</div>
          </div>
        </div>
        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
      </div>
      <div className="rounded-xl bg-slate-800/60 border border-slate-700 p-3 space-y-2 text-[11px] font-mono">
        <div className="text-slate-400">AWS_BUCKET = <span className="text-emerald-400">"acme-wa-media"</span></div>
        <div className="text-slate-400">AWS_REGION = <span className="text-emerald-400">"ap-south-1"</span></div>
        <div className="text-slate-400">KMS_KEY_ID = <span className="text-emerald-400">"arn:aws:kms:..."</span></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-800/60 p-3 border border-slate-700">
          <div className="text-[10px] uppercase text-slate-400">Salesforce file storage</div>
          <div className="text-lg font-bold text-rose-400 line-through">$$$ / GB</div>
        </div>
        <div className="rounded-xl bg-emerald-500/10 p-3 border border-emerald-500/30">
          <div className="text-[10px] uppercase text-emerald-400">Your S3</div>
          <div className="text-lg font-bold text-emerald-300">$ / GB</div>
        </div>
      </div>
      <div className="mt-3 text-[11px] text-slate-300 flex items-center gap-2">
        <HardDrive className="h-3.5 w-3.5 text-emerald-400" /> Files never leave your AWS account.
      </div>
    </div>
  );
});

const AnalyticsVisual = memo(function AnalyticsVisual() {
  const bars = [40, 65, 50, 80, 95, 70, 88];
  return (
    <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-slate-300/40 border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500">Broadcast Performance</div>
          <div className="font-bold text-slate-900">Spring Campaign, 28k sent</div>
        </div>
        <div className="text-xs px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold">Live</div>
      </div>
      <div className="mt-6 grid grid-cols-[1fr_100px] sm:grid-cols-[1fr_120px] gap-4 sm:gap-6 items-end">
        <div className="flex items-end gap-2 h-36">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-[#2BB5D4] to-[#22C55E]"
              style={{ height: `${h}%`, transition: "height 0.8s ease", transitionDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
        <div className="relative h-28 w-28 mx-auto">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" stroke="#e2e8f0" strokeWidth="10" fill="none" />
            <circle
              cx="50" cy="50" r="42"
              stroke="url(#ringGradCap4)" strokeWidth="10" fill="none"
              strokeLinecap="round" strokeDasharray="264"
              strokeDashoffset={264 - 264 * 0.98}
              style={{ transition: "stroke-dashoffset 1.6s ease-out" }}
            />
            <defs>
              <linearGradient id="ringGradCap4" x1="0" x2="1">
                <stop offset="0" stopColor="#2BB5D4" /><stop offset="1" stopColor="#22C55E" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">98%</div>
              <div className="text-[10px] text-slate-500">Open Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ── Lazy footer ───────────────────────────────────────────────────────────────

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

// ── Dev & Enterprise section (no framer-motion) ────────────────────────────────

const devCards = [
  {
    icon: <Webhook className="h-6 w-6" />,
    title: "Webhook Configuration",
    desc: "Connect with CRM, ERP, or internal systems.",
    accent: "from-[#2BB5D4]/10 to-blue-50",
    iconBg: "bg-[#2BB5D4]/10 text-[#2BB5D4]",
  },
  {
    icon: <LayoutDashboard className="h-6 w-6" />,
    title: "Chat Window Configuration",
    desc: "Customise agent workspace and branding.",
    accent: "from-violet-50 to-purple-50",
    iconBg: "bg-violet-100 text-violet-600",
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "AWS Configuration",
    desc: "Connect your own S3 storage.",
    accent: "from-orange-50 to-amber-50",
    iconBg: "bg-orange-100 text-orange-500",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Automation Configuration",
    desc: "Automate template selection based on reply button clicks.",
    accent: "from-emerald-50 to-green-50",
    iconBg: "bg-emerald-100 text-emerald-600",
  },
];

function DevEnterpriseSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".reveal-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div
        className="reveal-item text-center max-w-5xl mx-auto mb-14"
        style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
      >
        <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Developer &amp; Enterprise</div>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Built for Developers and Enterprises
        </h2>
        <p className="mt-4 text-slate-500 text-base">
          Advanced features for complete customisation and control.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {devCards.map((card, i) => (
          <div
            key={card.title}
            className={`reveal-item relative rounded-2xl bg-gradient-to-br ${card.accent} border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group`}
            style={{ opacity: 0, transform: "translateY(24px)", transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s` }}
          >
            <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#2BB5D4]/30 to-transparent" />
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} mb-5`}>
              {card.icon}
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function FeaturesPage() {
  useSEO({
    title: "WhatsApp Automation FAQs | Setup, Broadcast & Workflows | WBConnect+",
    description: "Get answers about WhatsApp automation, message templates, broadcasts, workflow setup, scheduling messages, and Salesforce integration with WBConnect+.",
    keywords: "WhatsApp automation tool, schedule a WhatsApp message, automate WhatsApp messages, WhatsApp API FAQ, WhatsApp business automation",
    canonical: "https://www.wbconnectplus.com/feature",
    ogTitle: "WhatsApp Automation Tool for Business & Salesforce | WBConnect+",
    ogDescription: "Automate customer conversations, campaigns, and follow-ups with WBConnect Plus, a powerful WhatsApp automation tool built for sales, support, and Salesforce teams.",
    ogUrl: "https://www.wbconnectplus.com/feature",
    ogImage: "Logo/image Source url",
  });

  return (
    <main className="min-h-screen bg-white text-slate-900" aria-label="WBConnect+ All Features">
      <Navbar />

      {/* Section header — matches homepage style exactly */}
      <section className="pt-32 pb-0 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto py-10 cap-hero-reveal" style={{ animation: "hero-fade-up 0.5s ease both" }}>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Features</div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
              Everything your team needs to run<br />WhatsApp Business inside Salesforce.
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              From one-to-one conversations to enterprise campaigns, WBConnect Plus gives your team everything needed to automate customer communication and scale faster.
            </p>
          </div>
        </div>
      </section>

      {/* All 6 features */}
      <section className="pt-12 pb-16 md:pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 md:space-y-20">

          {/* 1 */}
          <Row
            reverse
            badge="Global Chat Window"
            title="One WhatsApp Conversation Across Every Salesforce Record"
            desc="A persistent WhatsApp chat overlay that follows the rep across Accounts, Cases, Custom Invoices and any Salesforce object you choose. No double-handling and no lost context."
            bullets={[
              "Renders inside Lightning, Console and Mobile",
              "Object-agnostic context binding for any Salesforce record",
              "Quick replies, internal notes and mentions",
              "Full WhatsApp conversation timeline on every record",
            ]}
            visual={<GlobalChatVisual />}
          />

          {/* 2 */}
          <Row
            badge="WhatsApp Flow Builder"
            title="Drag, Drop and Collect Inside WhatsApp"
            desc="WhatsApp Flows let you collect customer details right inside a WhatsApp message using forms, menus, date pickers and dropdowns — all with a visual drag-and-drop canvas and a live preview."
            bullets={[
              "Drag components onto the canvas with no JSON authoring",
              "Live WhatsApp app preview as you build",
              "Auto-publishes a Meta-compliant Flow JSON in the background",
              "Reusable screens for forms, menus and conditional fields",
            ]}
            visual={<FlowBuilderVisual />}
          />

          {/* 3 */}
          <Row
            reverse
            badge="WhatsApp Template Builder"
            title="Personalised WhatsApp Templates with Salesforce Merge Fields"
            desc="Design every WhatsApp message template Meta supports with rich headers, body copy, footers and quick-reply or call-to-action buttons. Drop in Salesforce merge fields for full personalisation."
            bullets={[
              "All Meta-supported template categories and header types",
              "Merge fields from any Standard or Custom Salesforce object",
              "Quick-reply, URL and phone-number button support",
              "Submit for Meta approval in one click and track status inside Salesforce",
            ]}
            visual={<TemplateBuilderVisual />}
          />

          {/* 4 — scroll target when arriving from homepage "View More" */}
          <div id="feature-4" style={{ scrollMarginTop: "100px" }}>
            <Row
              badge="WhatsApp Automation Builder"
              title="Automate Replies to WhatsApp Quick Reply Buttons"
              desc="When a customer taps a quick-reply button on one of your WhatsApp templates, fire off the next template instantly. Perfect for follow-ups, brochures, booking links and multi-step nurture journeys."
              bullets={[
                "Trigger on any quick-reply button across any WhatsApp template",
                "Chain follow-up templates without writing Apex code",
                "Branch logic based on which button was tapped",
                "Logged on the Salesforce contact timeline for full visibility",
              ]}
              visual={<AutomationBuilderVisual />}
            />
          </div>

          {/* 5 */}
          <Row
            reverse
            badge="AWS S3 Media Storage"
            title="Bring Your Own S3 Bucket for WhatsApp Media"
            desc="Salesforce standard storage gets very expensive the moment you start moving images, video and PDFs over WhatsApp. WBConnect+ lets you plug in your own AWS S3 bucket — files never leave your account."
            bullets={[
              "Customer-owned bucket so we never hold your WhatsApp media",
              "IAM and KMS encryption respected end to end",
              "Cuts Salesforce file-storage cost dramatically",
              "Works with any region including data-residency restricted ones",
            ]}
            visual={<S3IntegrationVisual />}
          />

          {/* 6 */}
          <Row
            badge="WhatsApp Broadcast and Analytics"
            title="Send Millions of WhatsApp Messages. Measure Everything."
            desc="High-volume WhatsApp broadcasts with smart throttling, opt-out management and a real-time analytics dashboard tied back to Salesforce opportunity revenue."
            bullets={[
              "Delivery, read, click and reply attribution",
              "ROI dashboard linked to Salesforce Opportunity stages",
              "Audience segmentation from any SOQL query",
              "Smart throttling to respect Meta rate limits",
            ]}
            visual={<AnalyticsVisual />}
          />

        </div>
      </section>

      {/* ── Built for Developers and Enterprises ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DevEnterpriseSection />
        </div>
      </section>


      <Suspense fallback={<SectionSkeleton />}>
        <CTAFooter />
      </Suspense>
    </main>
  );
}
