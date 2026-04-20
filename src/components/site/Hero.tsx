import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { SalesforceMock } from "./SalesforceMock";

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 bg-mesh-hero overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-slate-700 mb-5">
            <Sparkles className="h-3.5 w-3.5 text-[#2BB5D4]" />
            Salesforce-native · Powered by WhatsApp Cloud API
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.05]">
            Bring WhatsApp Directly into Your{" "}
            <span className="text-gradient-brand">Salesforce Workflow.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            The ultimate Salesforce-native managed package leveraging Cloud API for seamless,
            two-way customer communication — without ever leaving your CRM.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="inline-flex items-center rounded-xl bg-[#2BB5D4] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2BB5D4]/30 hover:bg-[#2BB5D4]/90 transition-colors"
            >
              Get Started on AppExchange
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <Play className="h-4 w-4 text-[#22C55E]" /> View Demo
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-slate-500">
            <div>⭐⭐⭐⭐⭐ 4.9 on AppExchange</div>
            <div className="hidden sm:block">500+ teams onboarded</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <SalesforceMock />
        </motion.div>
      </div>
    </section>
  );
}
