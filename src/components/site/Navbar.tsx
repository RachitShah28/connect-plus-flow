import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { WBCLogo } from "./WBCLogo";
import { useLocation, useNavigate } from "@tanstack/react-router";

// Lazy-load DemoModal — it's never visible on initial paint, so keep it out of the critical bundle
const DemoModal = lazy(() =>
  import("./DemoModal").then((m) => ({ default: m.DemoModal }))
);

const links = [
  { href: "#top", label: "Home", aria: "WBConnect+ home" },
  { href: "#features", label: "Features", aria: "WBConnect+ WhatsApp Salesforce features" },
  { href: "#why-choose-us", label: "Why Choose Us", aria: "Why choose WBConnect+ over other integrations" },
  { href: "#industries", label: "Industries", aria: "Industries using WBConnect+ WhatsApp Salesforce" },
  { href: "#implementation", label: "Implementation", aria: "WBConnect+ implementation steps" },
  { href: "#pricing", label: "Pricing", aria: "WBConnect+ WhatsApp Salesforce pricing" },
];

const PACKAGE_URL = "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tQy000000TnoX";

export function Navbar() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to switch navbar to opaque background
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const location = useLocation();
  const isHome = location.pathname === "/";

  // Build the correct href for nav links:
  // On the homepage, keep bare anchors (#features). On any other page,
  // prefix with / so clicking "Features" navigates to /#features instead
  // of /capabilities#features.
  const resolveHref = (anchor: string) => (isHome ? anchor : `/${anchor.replace(/^\//, "")}`);

  const navigate = useNavigate();

  const handleNavClick = (anchor: string) => {
    setMenuOpen(false);
    if (isHome) {
      // Update the URL hash so the address bar reflects the active section
      history.pushState(null, "", anchor);
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Client-side navigation to home — no full page reload.
      const hashId = anchor.replace("#", "");
      navigate({ to: "/", hash: hashId }).then(() => {
        setTimeout(() => {
          const el = document.getElementById(hashId) ?? document.querySelector(anchor);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 200);
      });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 navbar-drop-in"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <nav
            role="navigation"
            aria-label="WBConnect+ main navigation"
            className={[
              "transition-all duration-300 border rounded-2xl flex items-center justify-between px-4 sm:px-6 py-3",
              scrolled
                ? "bg-white border-slate-200/80 shadow-lg shadow-slate-200/50"
                : "bg-white/70 border-white/40 shadow-lg shadow-slate-200/20 backdrop-blur-md",
            ].join(" ")}
          >
            {/* Logo */}
            <a href={isHome ? "#top" : "/"} aria-label="WBConnect+ home — WhatsApp Salesforce integration" className="flex items-center">
              <WBCLogo height={36} />
              <span className="sr-only">WBConnect+ Home</span>
            </a>

            {/* Desktop nav links — always intercept to use client-side navigation */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={resolveHref(l.href)}
                  aria-label={l.aria}
                  onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA buttons */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href={PACKAGE_URL}
                target="_blank"
                rel="noopener"
                aria-label="Start free trial of WBConnect+ WhatsApp Salesforce managed package"
                className="relative overflow-hidden inline-flex items-center rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors group"
              >
                <span className="relative z-10">Start Free Trial</span>
                <span className="shimmer-btn" aria-hidden />
              </a>
              <button
                onClick={() => setDemoOpen(true)}
                aria-label="Request a custom WBConnect+ WhatsApp Salesforce demo"
                className="relative overflow-hidden inline-flex items-center rounded-xl bg-[#2BB5D4] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#2BB5D4]/30 hover:bg-[#2BB5D4]/90 transition-colors group"
              >
                <span className="relative z-10">Request Custom Demo</span>
                <span className="shimmer-btn" aria-hidden />
              </button>
            </div>

            {/* Mobile: Demo button + Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setDemoOpen(true)}
                aria-label="Request a demo"
                className="relative overflow-hidden inline-flex items-center rounded-xl bg-[#2BB5D4] px-3 py-2 text-xs font-semibold text-white shadow-md shadow-[#2BB5D4]/30"
              >
                <span className="relative z-10">Get Demo</span>
                <span className="shimmer-btn" aria-hidden />
              </button>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="h-9 w-9 rounded-xl border border-slate-200 bg-white grid place-items-center text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden mx-4 mt-2"
            >
              <div className="backdrop-blur-xl bg-white/95 border border-white/60 rounded-2xl shadow-2xl shadow-slate-300/40 overflow-hidden">
                <nav className="flex flex-col py-2">
                  {links.map((l) => (
                    <button
                      key={l.href}
                      onClick={() => handleNavClick(l.href)}
                      className="w-full text-left px-5 py-3.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                    >
                      {l.label}
                    </button>
                  ))}
                </nav>
                <div className="px-4 py-4 pt-2 flex flex-col gap-2.5 border-t border-slate-100">
                  <a
                    href={PACKAGE_URL}
                    target="_blank"
                    rel="noopener"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    Start Free Trial
                  </a>
                  <button
                    onClick={() => { setMenuOpen(false); setDemoOpen(true); }}
                    className="w-full rounded-xl bg-[#2BB5D4] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2BB5D4]/30 hover:bg-[#2BB5D4]/90 transition-colors"
                  >
                    Request Custom Demo
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      </Suspense>
    </>
  );
}
