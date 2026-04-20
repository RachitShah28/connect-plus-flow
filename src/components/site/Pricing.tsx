import { motion } from "framer-motion";
import { Check, Zap, TrendingUp, RefreshCw } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$49",
    suffix: "/user · mo",
    desc: "For small teams piloting WhatsApp in Salesforce.",
    features: ["Up to 5 users", "1 WABA number", "No-code Flow Builder", "Email support"],
  },
  {
    name: "Professional",
    price: "$99",
    suffix: "/user · mo",
    desc: "Most popular — full automation & analytics.",
    features: [
      "Unlimited users",
      "Up to 5 WABA numbers",
      "Broadcast + Analytics",
      "Template builder",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    suffix: "",
    desc: "For regulated industries needing SLAs & SSO.",
    features: ["Unlimited WABA numbers", "SSO + SCIM", "Audit log exports", "Dedicated CSM"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ROI banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-[#2BB5D4] to-[#22C55E] p-8 text-white shadow-2xl shadow-[#2BB5D4]/20"
        >
          <div className="flex flex-wrap items-center justify-around gap-6 text-center">
            {[
              { icon: Zap, stat: "30%", label: "Faster Response" },
              { icon: TrendingUp, stat: "3.2×", label: "Higher Engagement" },
              { icon: RefreshCw, stat: "100%", label: "Data Sync" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-white/20 grid place-items-center">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold leading-none">{s.stat}</div>
                  <div className="text-sm opacity-90 mt-1">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mt-20 mb-12"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#22C55E]">Pricing</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Simple, transparent, scales with you.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-3xl p-7 flex flex-col ${
                t.featured
                  ? "border-gradient-brand shadow-2xl shadow-[#2BB5D4]/20 md:scale-[1.04] bg-white relative"
                  : "bg-white border border-slate-200 shadow-lg shadow-slate-200/50"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#2BB5D4] to-[#22C55E] text-white px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}
              <div className="text-sm font-semibold text-slate-500">{t.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">{t.price}</span>
                <span className="text-sm text-slate-500">{t.suffix}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{t.desc}</p>
              <ul className="mt-6 space-y-2 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="h-4 w-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-7 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  t.featured
                    ? "bg-[#2BB5D4] text-white hover:bg-[#2BB5D4]/90"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {t.price === "Custom" ? "Talk to sales" : "Start free trial"}
              </a>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 mt-8">
          Need a tailor-made plan? <a href="#cta" className="text-[#2BB5D4] font-semibold">Get a custom quote →</a>
        </p>
      </div>
    </section>
  );
}
