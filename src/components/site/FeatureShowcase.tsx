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
  return (
    <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 shadow-xl shadow-slate-200/50 relative overflow-hidden">
      <div className="text-xs font-semibold text-slate-500 mb-4">Flow Canvas</div>
      <svg viewBox="0 0 400 220" className="w-full h-auto">
        <defs>
          <linearGradient id="flowGrad" x1="0" x2="1">
            <stop offset="0" stopColor="#2BB5D4" />
            <stop offset="1" stopColor="#22C55E" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 90 60 C 180 60, 200 160, 290 160"
          stroke="url(#flowGrad)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute top-10 left-6 rounded-xl bg-white shadow-lg border border-slate-200 px-3 py-2 text-xs">
        <div className="font-semibold text-slate-900">Customer replies</div>
        <div className="text-slate-500">"Yes"</div>
      </div>
      <div className="absolute bottom-10 right-6 rounded-xl bg-white shadow-lg border-2 border-[#22C55E] px-3 py-2 text-xs">
        <div className="font-semibold text-slate-900">Update Lead</div>
        <div className="text-[#22C55E] font-medium">Status → Hot</div>
      </div>
      <motion.div
        animate={{ x: [60, 280], y: [70, 160] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 text-slate-700"
      >
        <MousePointer2 className="h-4 w-4 fill-slate-700" />
      </motion.div>
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
            badge="Visual Flow Builder"
            title="Drag, drop, automate."
            desc="A no-code canvas to design WhatsApp Flows, conditional branches, and direct Salesforce actions — without writing a single line of Apex."
            bullets={[
              "Visual node graph with branching logic",
              "Direct field updates on any object",
              "Reusable templates and reusable subflows",
              "Live test mode with sandbox WABA",
            ]}
            visual={<FlowBuilderVisual />}
          />
        </div>

        <Row
          reverse
          badge="Broadcast & Analytics"
          title="Send millions. Measure everything."
          desc="High-volume broadcasts with smart throttling, opt-out management, and a real-time analytics dashboard tied back to opportunity revenue."
          bullets={[
            "Native template builder + Meta approvals",
            "Delivery, read, click, reply attribution",
            "ROI dashboard linked to Opportunity stages",
            "Audience segmentation from any SOQL query",
          ]}
          visual={<AnalyticsVisual />}
        />
      </div>
    </section>
  );
}

export const featureIcons = { Cloud, Database, HardDrive, MessageSquare, Workflow, BarChart3, ArrowRight };
