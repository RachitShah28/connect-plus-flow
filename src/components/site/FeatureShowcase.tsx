import { motion } from "framer-motion";
import {
  Cloud,
  Database,
  HardDrive,
  MessageSquare,
  Workflow,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon,
  MousePointer2,
} from "lucide-react";

function Row({
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
    <div
      className={`grid md:grid-cols-2 gap-12 items-center ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">{badge}</div>
        <h3 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{title}</h3>
        <p className="mt-4 text-slate-600 text-lg">{desc}</p>
        <ul className="mt-6 space-y-3">
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
      >
        {visual}
      </motion.div>
    </div>
  );
}

function S3Visual() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl shadow-slate-900/30 border border-slate-700">
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-emerald-500/20 grid place-items-center">
            <ImageIcon className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-sm font-semibold">site-walkthrough.mp4</div>
            <div className="text-[11px] text-slate-400">52.4 MB · received now</div>
          </div>
        </div>
        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
      </div>

      <div className="mt-6 relative">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="h-2 rounded-full bg-gradient-to-r from-[#2BB5D4] to-[#22C55E]"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-2">
          <span>WhatsApp Cloud API</span>
          <span>Skipping CRM →</span>
          <span>AWS S3</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-700/50 p-4 border border-slate-700">
          <div className="text-[10px] uppercase tracking-wider text-slate-400">CRM Storage Cost</div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="text-2xl font-bold text-emerald-400 mt-1"
          >
            $0.00
          </motion.div>
          <div className="text-[10px] text-slate-500">52.4 MB diverted</div>
        </div>
        <div className="rounded-xl bg-emerald-500/10 p-4 border border-emerald-500/30">
          <div className="text-[10px] uppercase tracking-wider text-emerald-400">S3 Bucket</div>
          <div className="text-sm font-semibold text-white mt-1">media-archive</div>
          <div className="text-[10px] text-slate-300">us-east-1 · encrypted</div>
        </div>
      </div>
    </div>
  );
}

function GlobalChatVisual() {
  const tabs = ["Account: Acme", "Invoice INV-204", "Case 8821"];
  return (
    <div className="relative">
      <div className="rounded-3xl bg-white shadow-2xl shadow-slate-300/40 border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-[#0b5cab] to-[#1098d6] text-white px-4 py-2 flex gap-2 text-xs">
          {tabs.map((t, i) => (
            <div
              key={t}
              className={`px-3 py-1 rounded-md ${i === 0 ? "bg-white/25 font-semibold" : "bg-white/10"}`}
            >
              {t}
            </div>
          ))}
        </div>
        <div className="relative p-6 min-h-[260px] bg-slate-50">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 2, times: [0, 0.1, 0.9, 1] }}
              className="absolute inset-6 grid grid-cols-3 gap-2"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-12 rounded-lg bg-white border border-slate-200" />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 sm:-right-6 top-12 w-60 rounded-2xl bg-white shadow-2xl shadow-emerald-200/50 border border-white overflow-hidden"
      >
        <div className="bg-[#075E54] text-white px-3 py-2 text-xs font-semibold">WhatsApp · Live</div>
        <div className="p-3 space-y-2 bg-[#ECE5DD] text-xs">
          <div className="bg-white rounded-lg px-3 py-2 max-w-[80%] shadow-sm">
            Stays put across every screen 🔒
          </div>
          <div className="ml-auto bg-[#DCF8C6] rounded-lg px-3 py-2 max-w-[80%] shadow-sm">
            Object-agnostic ✅
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FlowBuilderVisual() {
  const palette = [
    { label: "Heading", color: "bg-[#2BB5D4]" },
    { label: "Text Input", color: "bg-[#22C55E]" },
    { label: "Dropdown", color: "bg-amber-500" },
    { label: "Date Picker", color: "bg-violet-500" },
    { label: "Submit", color: "bg-slate-700" },
  ];
  return (
    <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5 shadow-xl shadow-slate-200/50 relative overflow-hidden">
      <div className="grid grid-cols-[140px_1fr_180px] gap-4">
        {/* Component palette */}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Components</div>
          <div className="space-y-1.5">
            {palette.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2 rounded-md bg-white border border-slate-200 px-2 py-1.5 text-[11px] shadow-sm cursor-grab"
              >
                <span className={`h-2 w-2 rounded-full ${p.color}`} />
                {p.label}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="rounded-xl bg-white border-2 border-dashed border-slate-200 p-3 min-h-[260px] relative">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Flow Screen · "Book a visit"</div>
          <div className="space-y-2">
            {[
              { label: "Heading: Schedule a site visit", color: "border-[#2BB5D4]" },
              { label: "Text Input: Full name", color: "border-[#22C55E]" },
              { label: "Dropdown: Property type", color: "border-amber-500" },
              { label: "Date Picker: Preferred date", color: "border-violet-500" },
            ].map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.12 }}
                className={`rounded-md bg-slate-50 border-l-4 ${b.color} px-3 py-2 text-[11px] text-slate-700`}
              >
                {b.label}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0 }}
              className="rounded-md bg-slate-900 text-white text-[11px] text-center py-2 font-semibold"
            >
              Submit
            </motion.div>
          </div>
          <motion.div
            animate={{ x: [-20, 100, 60], y: [10, 80, 140] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 text-slate-700"
          >
            <MousePointer2 className="h-4 w-4 fill-slate-700" />
          </motion.div>
        </div>

        {/* Live WhatsApp preview */}
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Live Preview</div>
          <div className="rounded-2xl bg-[#075E54] p-1.5 shadow-lg">
            <div className="rounded-xl bg-[#ECE5DD] p-2 min-h-[240px]">
              <div className="bg-white rounded-lg p-2 shadow-sm space-y-1.5 text-[10px]">
                <div className="font-bold text-slate-900 text-[11px]">Schedule a site visit</div>
                <div className="rounded border border-slate-200 px-1.5 py-1 text-slate-400">Full name</div>
                <div className="rounded border border-slate-200 px-1.5 py-1 text-slate-400 flex justify-between">Property type <span>▾</span></div>
                <div className="rounded border border-slate-200 px-1.5 py-1 text-slate-400">📅 Preferred date</div>
                <div className="rounded bg-[#22C55E] text-white text-center py-1 font-semibold mt-1">Submit</div>
              </div>
              <div className="text-[9px] text-slate-500 mt-1.5 text-center">as it appears in WhatsApp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateBuilderVisual() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-slate-300/40 border border-slate-200">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Template Editor</div>
          <div className="space-y-2 text-[11px]">
            <div className="rounded bg-slate-50 border border-slate-200 px-2 py-1.5">
              <span className="text-slate-500">Category: </span><span className="font-semibold text-slate-800">Marketing</span>
            </div>
            <div className="rounded bg-slate-50 border border-slate-200 px-2 py-1.5">
              <span className="text-slate-500">Header: </span><span className="font-semibold text-slate-800">Image</span>
            </div>
            <div className="rounded bg-slate-50 border border-slate-200 px-2 py-2 leading-relaxed">
              Hi <span className="rounded bg-[#2BB5D4]/15 text-[#0b5cab] px-1 font-semibold">{"{{Contact.FirstName}}"}</span>, your quote for <span className="rounded bg-[#22C55E]/15 text-emerald-700 px-1 font-semibold">{"{{Opportunity.Name}}"}</span> is ready.
            </div>
            <div className="flex gap-1.5">
              <div className="flex-1 rounded bg-slate-900 text-white text-center py-1 font-semibold">Quick Reply: Yes</div>
              <div className="flex-1 rounded bg-slate-900 text-white text-center py-1 font-semibold">Quick Reply: No</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Preview · Personalised</div>
          <div className="rounded-2xl bg-[#ECE5DD] p-2 min-h-[200px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-2 shadow-sm text-[11px] space-y-1.5"
            >
              <div className="h-16 rounded bg-gradient-to-br from-[#2BB5D4] to-[#22C55E]" />
              <div className="text-slate-800">Hi <b>Sara</b>, your quote for <b>Acme Realty – Tower B</b> is ready.</div>
              <div className="grid grid-cols-2 gap-1 pt-1 border-t border-slate-100">
                <div className="text-center text-[#2BB5D4] font-semibold">Yes</div>
                <div className="text-center text-[#2BB5D4] font-semibold">No</div>
              </div>
            </motion.div>
            <div className="text-[9px] text-slate-500 mt-1.5 text-center">Meta-approved · merge-field powered</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationBuilderVisual() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-white p-6 shadow-2xl shadow-slate-300/40 border border-slate-200">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-3">Trigger → Action</div>
      <div className="space-y-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-[10px] uppercase text-slate-500 font-semibold">When</div>
          <div className="text-sm font-semibold text-slate-900 mt-0.5">Customer taps quick reply</div>
          <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#2BB5D4]/10 text-[#0b5cab] text-[11px] font-semibold px-2 py-1">
            Button: "Interested"
          </div>
        </div>
        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="text-[#22C55E]"
          >
            <ArrowRight className="h-5 w-5 rotate-90" />
          </motion.div>
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
}

function S3IntegrationVisual() {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 shadow-2xl shadow-slate-900/30 border border-slate-700">
      <div className="flex items-center justify-between text-white mb-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-500 grid place-items-center text-[10px] font-bold text-white">S3</div>
          <div>
            <div className="text-sm font-semibold">Bring Your Own Bucket</div>
            <div className="text-[11px] text-slate-400">customer-owned · IAM secured</div>
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
          <div className="text-lg font-bold text-emerald-300">¢ / GB</div>
        </div>
      </div>
      <div className="mt-3 text-[11px] text-slate-300 flex items-center gap-2">
        <HardDrive className="h-3.5 w-3.5 text-emerald-400" /> Files never leave your AWS account.
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [40, 65, 50, 80, 95, 70, 88];
  return (
    <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-slate-300/40 border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500">Broadcast Performance</div>
          <div className="font-bold text-slate-900">Spring Campaign · 28k sent</div>
        </div>
        <div className="text-xs px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold">
          Live
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[1fr_120px] gap-6 items-end">
        <div className="flex items-end gap-2 h-36">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="flex-1 rounded-t-md bg-gradient-to-t from-[#2BB5D4] to-[#22C55E]"
            />
          ))}
        </div>
        <div className="relative h-28 w-28 mx-auto">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" stroke="#e2e8f0" strokeWidth="10" fill="none" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#ringGrad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="264"
              initial={{ strokeDashoffset: 264 }}
              whileInView={{ strokeDashoffset: 264 - (264 * 0.98) }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="ringGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#2BB5D4" />
                <stop offset="1" stopColor="#22C55E" />
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
}

export function FeatureShowcase() {
  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Capabilities</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Built for the messaging workloads enterprises actually run.
          </h2>
        </motion.div>

        <div id="s3">
          <Row
            badge="AWS S3 Offloading"
            title="Send any file. Pay nothing in CRM storage."
            desc="WBConnect+ intercepts every inbound and outbound media file and routes it directly to your AWS S3 bucket — Salesforce never touches the bytes."
            bullets={[
              "Automatic offload for images, video, PDFs, audio",
              "Signed URLs surfaced inside the chat window",
              "Bring your own bucket · region · KMS keys",
              "Slash CRM file storage cost up to 90%",
            ]}
            visual={<S3Visual />}
          />
        </div>

        <Row
          reverse
          badge="Global Chat Window"
          title="One conversation. Every record."
          desc="A persistent chat overlay that follows the rep across Accounts, Cases, Custom Invoices and any object you choose — no double-handling, no losing context."
          bullets={[
            "Renders inside Lightning, Console & Mobile",
            "Object-agnostic context binding",
            "Quick replies, internal notes, mentions",
            "Full conversation timeline on every record",
          ]}
          visual={<GlobalChatVisual />}
        />

        <div id="solutions">
          <Row
            badge="WhatsApp Flow Builder"
            title="Drag, drop, collect — inside WhatsApp."
            desc="WhatsApp Flows let you collect customer details right inside a WhatsApp message — forms, menus, date pickers, dropdowns. Meta's Cloud API expects raw JSON; we replaced that with a visual select-and-drag canvas plus a live preview that mirrors exactly how the Flow renders in your customer's WhatsApp app."
            bullets={[
              "Drag components onto the canvas — no JSON authoring",
              "Live WhatsApp-app preview as you build",
              "Auto-publishes a Meta-compliant Flow JSON in the background",
              "Reusable screens for forms, menus & conditional fields",
            ]}
            visual={<FlowBuilderVisual />}
          />
        </div>

        <Row
          reverse
          badge="Template Builder"
          title="Personalised templates with merge fields."
          desc="Design every WhatsApp message template Meta supports — Marketing, Utility, Authentication — with rich headers, body copy, footers and quick-reply or call-to-action buttons. Drop in Salesforce merge fields so each customer receives a fully personalised message."
          bullets={[
            "All Meta-supported template categories & header types",
            "Merge fields from any Standard or Custom object",
            "Quick-reply, URL and phone-number button support",
            "Submit for Meta approval in one click — track status inside Salesforce",
          ]}
          visual={<TemplateBuilderVisual />}
        />

        <Row
          badge="Automation Builder"
          title="Reply to a quick-reply, automatically."
          desc="When a customer taps a quick-reply button on one of your templates, fire off the next template instantly — perfect for follow-ups, brochures, booking links and multi-step nurtures. Set it up once, run it forever."
          bullets={[
            "Trigger on any quick-reply button across any template",
            "Chain follow-up templates without writing Apex",
            "Branch by which button was tapped",
            "Logged on the contact timeline for full visibility",
          ]}
          visual={<AutomationBuilderVisual />}
        />

        <Row
          reverse
          badge="AWS S3 Integration"
          title="Bring your own S3 bucket for media."
          desc="Salesforce standard storage gets very expensive the moment you start moving images, video and PDFs over WhatsApp. WBConnect+ lets you plug in your own AWS S3 bucket — your files never leave your AWS account, and you sidestep Salesforce file-storage costs entirely."
          bullets={[
            "Customer-owned bucket — we never hold your media",
            "IAM & KMS encryption respected end-to-end",
            "Cuts Salesforce file-storage cost dramatically",
            "Works with any region, including data-residency-restricted ones",
          ]}
          visual={<S3IntegrationVisual />}
        />

        <Row
          badge="Broadcast & Analytics"
          title="Send millions. Measure everything."
          desc="High-volume broadcasts with smart throttling, opt-out management, and a real-time analytics dashboard tied back to opportunity revenue."
          bullets={[
            "Delivery, read, click, reply attribution",
            "ROI dashboard linked to Opportunity stages",
            "Audience segmentation from any SOQL query",
            "Smart throttling to respect Meta rate limits",
          ]}
          visual={<AnalyticsVisual />}
        />
      </div>
    </section>
  );
}

export const featureIcons = { Cloud, Database, HardDrive, MessageSquare, Workflow, BarChart3, ArrowRight };
