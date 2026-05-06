import { useState, lazy, Suspense } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SalesforceMock } from "./SalesforceMock";

// Lazy-load DemoModal — not needed on first paint
const DemoModal = lazy(() =>
  import("./DemoModal").then((m) => ({ default: m.DemoModal }))
);

const PACKAGE_URL = "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tQy000000TnoX";

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section
        id="top"
        className="relative flex items-center pt-24 pb-12 md:pt-32 md:pb-16 md:min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-green-50 to-white"
      >
        {/* Background blobs — CSS animation, no JS required */}
        <div className="hero-blob-blue absolute -top-40 -left-40 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-[#2BB5D4]/30 blur-3xl pointer-events-none" />
        <div className="hero-blob-green absolute -bottom-40 -right-40 h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full bg-[#22C55E]/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 md:gap-12 items-center w-full">
          {/* Hero text — CSS fade-in so LCP h1 is visible on first paint */}
          <div className="hero-content text-center md:text-left">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-xs font-medium text-slate-700 mb-5 border border-[#2BB5D4]/30">
              <Sparkles className="h-3.5 w-3.5 text-[#2BB5D4]" aria-hidden />
              Offical Meta Tech Provider
            </div>
            {/* LCP element — visible immediately, no opacity:0 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Close Deals Faster with a{" "}
              <span className="text-gradient-brand">Powerful WhatsApp Automation Tool</span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
              WBConnect+ is a WhatsApp automation tool that helps businesses streamline communication, automate follow-ups, and manage campaigns from one centralized platform. Designed for sales, support, and marketing teams, it improves response speed, boosts engagement, and helps convert more leads.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => setDemoOpen(true)}
                aria-label="Book a WBConnect+ demo"
                className="group relative overflow-hidden inline-flex items-center gap-2 rounded-xl bg-[#2BB5D4] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2BB5D4]/30 hover:bg-[#2BB5D4]/90 transition-colors"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Demo
                </span>
                <span className="shimmer-btn" aria-hidden />
              </button>
              <a
                href={PACKAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start WBConnect+ free trial"
                className="relative overflow-hidden inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 hero-arrow" />
                </span>
                <span className="shimmer-btn" aria-hidden />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-900 font-bold">1M+</span> Messages Sent
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <span className="text-slate-900 font-bold">50+</span> Businesses
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
              <div className="flex items-center gap-1.5">
                <span className="text-slate-900 font-bold">99.9%</span> Delivery Rate
              </div>
            </div>
          </div>

          {/* Salesforce mock — decorative, below fold on mobile */}
          <div className="hero-visual relative hidden md:block">
            <SalesforceMock />
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      </Suspense>
    </>
  );
}
