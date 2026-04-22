import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SalesforceMock } from "./SalesforceMock";
import { DemoModal } from "./DemoModal";

const PACKAGE_URL = "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tQy000000TnoX";

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section
        id="top"
        className="relative flex items-center pt-24 pb-12 md:pt-32 md:pb-16 md:min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-green-50 to-white"
      >
        {/* Background blobs */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-[#2BB5D4]/30 blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full bg-[#22C55E]/20 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 md:gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <motion.div
              animate={{ boxShadow: ["0 0 0 0 rgba(43,181,212,0.4)", "0 0 0 10px rgba(43,181,212,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-xs font-medium text-slate-700 mb-5 border border-[#2BB5D4]/30"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#2BB5D4]" />
              Salesforce Native Managed Package on Meta Cloud API
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Your customers are already on WhatsApp.{" "}
              <span className="text-gradient-brand">Now your CRM is too.</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
              WBConnect+ is a CRM-native WhatsApp Business integration by MV Clouds: Track messages, assign leads, and store conversations instantly via Meta Cloud API.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href={PACKAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get started with WBConnect+ free trial"
                className="group relative overflow-hidden inline-flex items-center gap-2 rounded-xl bg-[#2BB5D4] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2BB5D4]/30 hover:bg-[#2BB5D4]/90 transition-colors"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </span>
                <span className="shimmer-btn" aria-hidden />
              </a>
              <button
                onClick={() => setDemoOpen(true)}
                aria-label="Request a custom WBConnect+ WhatsApp Salesforce demo"
                className="relative overflow-hidden inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors group"
              >
                <span className="relative z-10">Request a Demo</span>
                <span className="shimmer-btn" aria-hidden />
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start gap-6 text-xs text-slate-500">
              <div>★★★★★ 4.9 enterprise rating</div>
              <div className="hidden sm:block">500+ Salesforce orgs powered by 11 years of MV Clouds expertise</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden md:block"
          >
            <SalesforceMock />
          </motion.div>
        </div>
      </section>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
