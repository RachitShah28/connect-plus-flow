import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Building2, Sparkles, Rocket } from "lucide-react";
import { DemoModal } from "./DemoModal";

const PACKAGE_URL = "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tQy000000TnoX";

const standardFeatures = [
  "Unlimited Salesforce users",
  "1 WhatsApp Business Account number (WABA)",
  "Native Salesforce WhatsApp messaging UI",
  "No-code WhatsApp Flow Builder",
  "WhatsApp Template Builder with Meta approval",
  "WhatsApp broadcast messaging",
  "Automation for quick-reply triggers",
  "Full conversation timeline on every Salesforce record",
  "Email and chat support",
];

const tiers = [
  {
    name: "7-Day Free Trial",
    price: "Free",
    suffix: "",
    desc: "Experience the full power of WBConnect+ before committing. All standard capabilities included.",
    features: standardFeatures,
    popular: false,
    cta: "Get Started",
    ctaType: "package" as const,
    icon: Rocket,
  },
  {
    name: "WBConnect+ Standard",
    price: "$189",
    suffix: "/mo",
    desc: "Everything you need to start using WhatsApp Business inside Salesforce for your whole team at one flat monthly price.",
    features: standardFeatures,
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

export function Pricing() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section id="pricing" className="py-16 md:py-20 bg-[#0F172A] relative overflow-hidden">

        {/* Background glow orbs — same palette as CTA */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#2BB5D4]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#22C55E]/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[#2BB5D4]/8 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="text-xs font-semibold tracking-wider uppercase text-[#22C55E]">Pricing</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
              Simple, transparent pricing for{" "}
              <span className="text-gradient-brand">WhatsApp Business</span> in Salesforce.
            </h2>
            <p className="mt-4 text-slate-400">
              Start for a flat $189 per month or talk to us for a custom plan built around your team size and WhatsApp workflows.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-3xl p-8 flex flex-col relative border transition-all duration-300 ${t.popular
                    ? "bg-white/8 border-[#2BB5D4]/60 shadow-2xl shadow-[#2BB5D4]/20 ring-1 ring-[#2BB5D4]/30"
                    : "bg-white/5 border-white/10 shadow-xl shadow-black/30 hover:border-white/20"
                  }`}
              >
                {/* Subtle inner glow for popular card */}
                {t.popular && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2BB5D4]/5 to-[#22C55E]/5 pointer-events-none" />
                )}

                {t.popular && (
                  <div className="absolute -top-3 left-8 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#2BB5D4] to-[#22C55E] text-white px-3 py-1 rounded-full shadow-md shadow-[#2BB5D4]/40">
                    Most Popular
                  </div>
                )}

                <div className={`h-10 w-10 rounded-xl grid place-items-center mb-4 ${t.popular ? "bg-[#2BB5D4]/20" : "bg-white/8"
                  }`}>
                  <t.icon className={`h-5 w-5 ${t.popular ? "text-[#2BB5D4]" : "text-slate-400"}`} />
                </div>

                <div className="text-sm font-semibold text-slate-400 relative z-10">{t.name}</div>
                <div className="mt-3 flex items-baseline gap-1 relative z-10">
                  <span className="text-5xl font-bold text-white">{t.price}</span>
                  {t.suffix && <span className="text-sm ml-1 text-slate-400">{t.suffix}</span>}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 relative z-10">{t.desc}</p>

                <ul className="mt-6 space-y-2.5 flex-1 relative z-10">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
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
                    className={`mt-8 relative overflow-hidden inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all group z-10 ${t.popular
                        ? "bg-gradient-to-r from-[#2BB5D4] to-[#22C55E] shadow-[#2BB5D4]/40 hover:opacity-90 hover:shadow-[#2BB5D4]/60"
                        : "bg-white/10 border border-white/20 hover:bg-white/15 shadow-black/20"
                      }`}
                    style={{ isolation: "isolate" }}
                  >
                    <span className="relative z-10">{t.cta}</span>
                    <span className="shimmer-btn" aria-hidden />
                  </a>
                ) : (
                  <button
                    onClick={() => setDemoOpen(true)}
                    className="mt-8 relative overflow-hidden inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/15 shadow-lg shadow-black/20 transition-all group z-10"
                    style={{ isolation: "isolate" }}
                  >
                    <span className="relative z-10">{t.cta}</span>
                    <span className="shimmer-btn" aria-hidden />
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 mt-10 relative z-10">
            All plans include unlimited WhatsApp conversations with no per-message fees.{" "}
            <button onClick={() => setDemoOpen(true)} className="text-[#2BB5D4] font-semibold ml-1 hover:underline">
              Questions? Talk to us
            </button>
          </p>
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
