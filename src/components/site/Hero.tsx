import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SalesforceMock } from "./SalesforceMock";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-green-50 to-white"
    >
      {/* Background blobs */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#2BB5D4]/30 blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#22C55E]/20 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(43,181,212,0.4)", "0 0 0 10px rgba(43,181,212,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-xs font-medium text-slate-700 mb-5 border border-[#2BB5D4]/30"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#2BB5D4]" />
            Direct Salesforce Native Package · Cloud API
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.05]">
            The Ultimate Salesforce WhatsApp Engine with{" "}
            <span className="text-gradient-brand">Infinite S3 Storage.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-xl">
            Bypass standard WhatsApp limitations. Build no-code flows, send mass broadcasts, and
            auto-archive heavy media to AWS S3 — without ever burning your CRM storage.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#2BB5D4] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2BB5D4]/30 hover:bg-[#2BB5D4]/90 transition-colors"
            >
              Schedule Implementation
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              Explore the Engine
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-slate-500">
            <div>★★★★★ 4.9 enterprise rating</div>
            <div className="hidden sm:block">500+ orgs · 11+ yrs MV Clouds</div>
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
