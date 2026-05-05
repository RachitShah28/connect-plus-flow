import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { lazy, memo, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, HardDrive } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import {
  GlobalChatVisual,
  FlowBuilderVisual,
  TemplateBuilderVisual,
} from "@/components/site/FeatureShowcase";

// ── Scroll to hash on mount (e.g. /capabilities#feature-4) ──────────────────

function useScrollToHash() {
  const navigate = useNavigate();
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace("#", "");
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Remove hash from URL once scroll fires — tell TanStack to keep scroll position
        setTimeout(() => {
          navigate({
            to: window.location.pathname,
            search: (prev: any) => prev,
            hash: '',
            replace: true,
            resetScroll: false,
          });
        }, 800);
      } else if (attempts < 15) {
        setTimeout(() => tryScroll(attempts + 1), 100);
      }
    };
    // Wait for page paint then scroll
    setTimeout(() => tryScroll(), 400);
  }, [navigate]);
}

// ── SEO title ─────────────────────────────────────────────────────────────────

function usePageTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}

// ── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/capabilities")({
  component: CapabilitiesPage,
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
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-10 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`w-full ${reverse ? "md:order-2" : ""}`}
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
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`w-full ${reverse ? "md:order-1" : ""}`}
      >
        {visual}
      </motion.div>
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
            <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08 }}
              className="flex-1 rounded-t-md bg-gradient-to-t from-[#2BB5D4] to-[#22C55E]" />
          ))}
        </div>
        <div className="relative h-28 w-28 mx-auto">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" stroke="#e2e8f0" strokeWidth="10" fill="none" />
            <motion.circle cx="50" cy="50" r="42" stroke="url(#ringGradCap4)" strokeWidth="10" fill="none"
              strokeLinecap="round" strokeDasharray="264"
              initial={{ strokeDashoffset: 264 }} whileInView={{ strokeDashoffset: 264 - 264 * 0.98 }}
              viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeOut" }} />
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

// ── Page ──────────────────────────────────────────────────────────────────────

function CapabilitiesPage() {
  usePageTitle("WBConnectPlus Features | WhatsApp Automation, S3 Storage & Broadcast Analytics for Salesforce");
  useScrollToHash();

  return (
    <main className="min-h-screen bg-white text-slate-900" aria-label="WBConnect+ All Capabilities">
      <Navbar />

      {/* Section header — matches homepage style exactly */}
      <section className="pt-32 pb-0 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto py-10"
          >
            <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Capabilities</div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
              Everything your team needs to run WhatsApp Business inside Salesforce.
            </h1>
          </motion.div>
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

      <Suspense fallback={<SectionSkeleton />}>
        <CTAFooter />
      </Suspense>
    </main>
  );
}
