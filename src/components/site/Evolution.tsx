import { motion } from "framer-motion";
import { Smartphone, Database, AlertTriangle, DollarSign, Network, Sparkles, Cloud } from "lucide-react";

const cols = [
  {
    tone: "muted",
    title: "Standard WhatsApp App",
    sub: "The lonely silo",
    points: [
      "Agents use personal numbers for customer chats",
      "When an agent leaves, the chat history walks out the door",
      "No brand identity — customers see a personal contact",
      "Manual data entry with zero CRM sync",
      "256 recipient broadcast cap and phone storage fills fast",
    ],
  },
  {
    tone: "warn",
    title: "Middleman Competitors",
    sub: "The tangled tax",
    points: [
      "Per-message markup billing eats into margins",
      "Data stored on third-party servers outside your control",
      "Expensive Salesforce file usage costs",
      "Clunky external integrations that break",
      "Limited custom object support",
    ],
  },
  {
    tone: "brand",
    title: "WBConnect+",
    sub: "The native engine",
    points: [
      "One centralised WhatsApp Business number for the whole organisation",
      "Customers message the brand, not an individual, building trust and recognition",
      "Full chat history stays inside Salesforce, owned by the company",
      "Direct Meta Cloud API billing with automated AWS S3 media offload",
      "Native no-code flow and template builders plus unlimited broadcasts",
    ],
  },
];

function Vector({ tone }: { tone: string }) {
  if (tone === "muted") {
    return (
      <div className="relative h-32 grid place-items-center">
        <div className="h-20 w-12 rounded-2xl border-2 border-slate-300 grid place-items-center bg-slate-100">
          <Smartphone className="h-6 w-6 text-slate-400" />
        </div>
        <div className="absolute right-2 top-2 h-12 w-12 rounded-xl border-2 border-dashed border-slate-300 grid place-items-center text-slate-300">
          <Database className="h-5 w-5" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-24 bg-slate-300 [mask-image:linear-gradient(90deg,transparent,black,transparent)]" />
      </div>
    );
  }
  if (tone === "warn") {
    return (
      <div className="relative h-32 grid place-items-center overflow-hidden">
        <Network className="h-16 w-16 text-amber-500" />
        <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1">
          <DollarSign className="h-3 w-3" /> +Markup
        </div>
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1">
          <AlertTriangle className="h-3 w-3" /> 3rd-party
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-32 grid place-items-center">
      <div
        className="absolute h-28 w-28 rounded-full border-2 border-dashed border-[#2BB5D4]/40 hero-blob-blue"
      />
      <div className="relative flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#22C55E] to-emerald-400 grid place-items-center text-white shadow-lg">
          <Cloud className="h-5 w-5" />
        </div>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2BB5D4] to-cyan-400 grid place-items-center text-white shadow-lg">
          <Database className="h-5 w-5" />
        </div>
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-500 grid place-items-center text-white shadow-lg text-[10px] font-bold">
          S3
        </div>
      </div>
      <Sparkles className="absolute top-2 right-2 h-4 w-4 text-[#22C55E]" />
    </div>
  );
}

export function Evolution() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">The Evolution</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900" aria-label="WBConnect+ compared to Standard WhatsApp and third-party middlemen">
            WBConnect+ versus Standard WhatsApp and Third-Party Middlemen
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cols.map((c, i) => {
            const isBrand = c.tone === "brand";
            const isWarn = c.tone === "warn";
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`rounded-3xl p-7 border ${isBrand
                    ? "bg-gradient-to-br from-[#2BB5D4]/10 via-white to-[#22C55E]/10 border-[#22C55E]/30 shadow-2xl shadow-[#2BB5D4]/20 ring-1 ring-[#2BB5D4]/20"
                    : isWarn
                      ? "bg-amber-50/40 border-amber-200"
                      : "bg-slate-50 border-slate-200"
                  }`}
              >
                <Vector tone={c.tone} />
                <div className="mt-4">
                  <div
                    className={`text-xs font-semibold uppercase tracking-wider ${isBrand ? "text-[#22C55E]" : isWarn ? "text-amber-600" : "text-slate-500"
                      }`}
                  >
                    {c.sub}
                  </div>
                  <h3
                    className={`mt-1 text-xl font-bold ${isBrand ? "text-slate-900" : isWarn ? "text-slate-700" : "text-slate-600"
                      }`}
                  >
                    {c.title}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {c.points.map((p) => (
                      <li
                        key={p}
                        className={`flex items-start gap-2 text-sm ${isBrand ? "text-slate-800" : "text-slate-600"
                          }`}
                      >
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${isBrand ? "bg-[#22C55E]" : isWarn ? "bg-amber-500" : "bg-slate-400"
                            }`}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
