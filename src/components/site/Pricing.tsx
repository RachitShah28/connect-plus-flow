import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Building2, Sparkles } from "lucide-react";
import { DemoModal } from "./DemoModal";

const PACKAGE_URL = "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tQy000000TnoX";

const tiers = [
  {
    name: "WBConnect+ Standard",
    price: "$189",
    suffix: "/mo",
    desc: "Everything you need to start using WhatsApp Business inside Salesforce for your whole team at one flat monthly price.",
    features: [
      "Unlimited Salesforce users",
      "1 WhatsApp Business Account number (WABA)",
      "Native Salesforce WhatsApp messaging UI",
      "No-code WhatsApp Flow Builder",
      "WhatsApp Template Builder with Meta approval",
      "WhatsApp broadcast messaging",
      "Automation for quick-reply triggers",
      "Full conversation timeline on every Salesforce record",
      "Email and chat support",
    ],
    popular: true,
    cta: "Start Free Trial",
    ctaType: "package" as const,
    icon: Sparkles,
  },
  {
    name: "Enterprise",
    price: "Custom",
    suffix: "",
    desc: "For businesses that need scale, flexibility, and advanced support.",
    features: [
      "Everything in Standard",
      "Custom solutions & integrations",
      "Priority SLA-backed support",
      "Multiple WhatsApp Business Account numbers (WABA)",
      "Multi-team and multi-org Salesforce setup",
      "Scale conversations without losing control",
    ],
    popular: false,
    cta: "Talk to our sales team",
    ctaType: "demo" as const,
    icon: Building2,
  },
];

// Shimmer uses inline animation so it only plays on hover-enter, not reverse on leave
const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)",
  animation: "none",
};

export function Pricing() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="text-xs font-semibold tracking-wider uppercase text-[#22C55E]">Pricing</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
              Simple, transparent pricing for WhatsApp Business in Salesforce.
            </h2>
            <p className="mt-4 text-slate-600">
              Start for a flat $189 per month or talk to us for a custom plan built around your team size and WhatsApp workflows.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl p-8 flex flex-col relative border-gradient-brand shadow-2xl shadow-[#2BB5D4]/20 bg-white"
              >
                {t.popular && (
                  <div className="absolute -top-3 left-8 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#2BB5D4] to-[#22C55E] text-white px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="h-10 w-10 rounded-xl grid place-items-center mb-4 bg-[#2BB5D4]/10">
                  <t.icon className="h-5 w-5 text-[#2BB5D4]" />
                </div>

                <div className="text-sm font-semibold text-slate-500">{t.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-slate-900">{t.price}</span>
                  {t.suffix && <span className="text-sm ml-1 text-slate-500">{t.suffix}</span>}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.desc}</p>

                <ul className="mt-6 space-y-2.5 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#22C55E]" />
                      {f}
                    </li>
                  ))}
                </ul>

                {t.ctaType === "package" ? (
                  <a
                    href={PACKAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 relative overflow-hidden inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold bg-[#2BB5D4] text-white hover:bg-[#2BB5D4]/90 shadow-lg shadow-[#2BB5D4]/30 transition-colors group"
                    style={{ isolation: "isolate" }}
                  >
                    <span className="relative z-10">{t.cta}</span>
                    <span className="shimmer-btn" aria-hidden />
                  </a>
                ) : (
                  <button
                    onClick={() => setDemoOpen(true)}
                    className="mt-8 relative overflow-hidden inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold bg-[#2BB5D4] text-white hover:bg-[#2BB5D4]/90 shadow-lg shadow-[#2BB5D4]/30 transition-colors group"
                    style={{ isolation: "isolate" }}
                  >
                    <span className="relative z-10">{t.cta}</span>
                    <span className="shimmer-btn" aria-hidden />
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 mt-10">
            All plans include unlimited WhatsApp conversations with no per-message fees.{" "}
            <button onClick={() => setDemoOpen(true)} className="text-[#2BB5D4] font-semibold ml-1 hover:underline">Questions? Talk to us</button>
          </p>
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
