import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { WBCLogo } from "./WBCLogo";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const DemoModal = lazy(() =>
  import("./DemoModal").then((m) => ({ default: m.DemoModal }))
);

const links = [
  { href: "#top", label: "Home", aria: "WBConnect+ home", page: false },
  { href: "#features", label: "Features", aria: "WBConnect+ WhatsApp Salesforce features", page: false },
  { href: "#industries", label: "Industries", aria: "Industries using WBConnect+ WhatsApp Salesforce", page: false },
  { href: "#why-choose-us", label: "Why Choose Us", aria: "Why choose WBConnect+ over other integrations", page: false },
  { href: "#pricing", label: "Pricing", aria: "WBConnect+ WhatsApp Salesforce pricing", page: false },
  { href: "#implementation", label: "Implementation", aria: "WBConnect+ implementation steps", page: false },
  { href: "/faqs", label: "FAQs", aria: "WBConnect+ frequently asked questions", page: true },
  { href: "/blog", label: "Blog", aria: "WBConnect+ blog articles and insights", page: true },
];

const PACKAGE_URL = "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tQy000000TnoX";
const FORCE_MOUNT_EVENT = "wbc-force-mount";

// ── Slim top progress bar ────────────────────────────────────────────────────
// Shows during cross-page anchor navigation to give instant visual feedback.
function NavProgressBar({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9999,
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: active ? "opacity 0.1s ease" : "opacity 0.4s ease 0.2s",
      }}
    >
      <div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, #2BB5D4, #22C55E)",
          transformOrigin: "left center",
          animation: active ? "nav-progress 0.9s cubic-bezier(0.4,0,0.2,1) forwards" : "none",
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
}

export function Navbar() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navigating, setNavigating] = useState(false);
  // Track if hover has already pre-warmed sections
  const preWarmed = useRef(false);

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
      if (window.innerWidth >= 1024) setMenuOpen(false);
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

  const resolveHref = (anchor: string) => (isHome ? anchor : `/${anchor.replace(/^\//, "")}`);

  const navigate = useNavigate();

  const SCROLL_RESTORE_KEY = "wbc_scroll_restore";

  // ── Pre-warm lazy sections on hover (home page only) ───────────────────────
  // Users hover ~150-300ms before clicking — dispatching force-mount here means
  // by the time the click fires, lazy sections are already loading/rendered.
  const handleNavHover = useCallback((isPage: boolean) => {
    if (isHome && !isPage && !preWarmed.current) {
      preWarmed.current = true;
      window.dispatchEvent(new Event(FORCE_MOUNT_EVENT));
    }
  }, [isHome]);

  const handleNavClick = (anchor: string, isPage = false) => {
    setMenuOpen(false);
    if (isPage) {
      if (location.pathname === anchor) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        try { sessionStorage.setItem(SCROLL_RESTORE_KEY, String(window.scrollY)); } catch { }
        navigate({ to: anchor as any }).then(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
      return;
    }

    // Scroll to top of page
    if (anchor === "#top") {
      if (isHome) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        try { sessionStorage.removeItem(SCROLL_RESTORE_KEY); } catch { }
      } else {
        try { sessionStorage.removeItem(SCROLL_RESTORE_KEY); } catch { }
        navigate({ to: "/" }).then(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }
      return;
    }

    const hashId = anchor.replace("#", "");

    if (isHome) {
      // Sections were likely pre-warmed on hover. Dispatch force-mount again
      // in case hover didn't fire (e.g. mobile tap). Use a shorter 300ms wait
      // since sections are already loading/loaded from the hover pre-warm.
      window.dispatchEvent(new Event(FORCE_MOUNT_EVENT));
      setTimeout(() => {
        const el = document.getElementById(hashId) ?? document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      // Cross-page navigation (e.g. FAQs → #implementation):
      // Show progress bar immediately for instant visual feedback, then navigate.
      setNavigating(true);
      try { sessionStorage.setItem("wbc_force_mount", "1"); } catch { }
      navigate({ to: "/" }).then(() => {
        // Fire force-mount immediately so InView sections start rendering
        window.dispatchEvent(new Event(FORCE_MOUNT_EVENT));
        // Wait for all lazy Suspense sections to render at full height.
        // The wrapper div (with the anchor id) is always in the DOM immediately,
        // so we MUST wait for its content to load before scrollIntoView fires —
        // otherwise layout is based on skeleton heights and we land in the wrong place.
        setTimeout(() => {
          try { sessionStorage.removeItem("wbc_force_mount"); } catch { }
          const el = document.getElementById(hashId) ?? document.querySelector(anchor);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          setNavigating(false);
        }, 800);
      });
    }
  };

  return (
    <>
      {/* Slim progress bar — visible during cross-page anchor navigation */}
      <NavProgressBar active={navigating} />

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
              <WBCLogo height={50} />
              <span className="sr-only">WBConnect+ Home</span>
            </a>

            {/* Desktop nav links — always intercept to use client-side navigation */}
            <div className="hidden lg:flex items-center lg:gap-3 xl:gap-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.page ? l.href : resolveHref(l.href)}
                  aria-label={l.aria}
                  onMouseEnter={() => handleNavHover(l.page)}
                  onClick={(e) => { e.preventDefault(); handleNavClick(l.href, l.page); }}
                  className="text-xs xl:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={PACKAGE_URL}
                target="_blank"
                rel="noopener"
                aria-label="Start free trial of WBConnect+ WhatsApp Salesforce managed package"
                className="relative overflow-hidden inline-flex items-center rounded-full border border-slate-300 bg-white lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 text-xs xl:text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors group whitespace-nowrap"
              >
                <span className="relative z-10">Start Free Trial</span>
                <span className="shimmer-btn" aria-hidden />
              </a>
              <button
                onClick={() => setDemoOpen(true)}
                aria-label="Request a custom WBConnect+ WhatsApp Salesforce demo"
                className="relative overflow-hidden inline-flex items-center rounded-full bg-gradient-to-r from-[#2BB5D4] to-[#22C55E] lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 text-xs xl:text-sm font-semibold text-white shadow-md shadow-[#2BB5D4]/30 hover:shadow-lg hover:shadow-[#22C55E]/30 transition-all group whitespace-nowrap"
              >
                <span className="relative z-10">Request Custom Demo</span>
                <span className="shimmer-btn" aria-hidden />
              </button>
            </div>

            {/* Mobile: Demo button + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setDemoOpen(true)}
                aria-label="Request a demo"
                className="relative overflow-hidden inline-flex items-center rounded-full bg-gradient-to-r from-[#2BB5D4] to-[#22C55E] px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-[#2BB5D4]/30 hover:shadow-lg transition-all"
              >
                <span className="relative z-10">Get Demo</span>
                <span className="shimmer-btn" aria-hidden />
              </button>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="h-9 w-9 rounded-full border border-slate-200 bg-white grid place-items-center text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Dropdown Menu — CSS transition, no Framer Motion */}
        <div
          className="lg:hidden mx-4 mt-2 overflow-hidden"
          style={{
            maxHeight: menuOpen ? '600px' : '0px',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.98)',
            transition: menuOpen
              ? 'max-height 0.3s ease, opacity 0.2s ease, transform 0.2s ease'
              : 'max-height 0.25s ease, opacity 0.15s ease, transform 0.15s ease',
            pointerEvents: menuOpen ? 'auto' : 'none',
          }}
        >
          <div className="backdrop-blur-xl bg-white/95 border border-white/60 rounded-2xl shadow-2xl shadow-slate-300/40 overflow-hidden">
            <nav className="flex flex-col py-2">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNavClick(l.href, l.page)}
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
                className="w-full rounded-xl bg-gradient-to-r from-[#2BB5D4] to-[#22C55E] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2BB5D4]/30 hover:shadow-lg transition-all"
              >
                Request Custom Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop for mobile menu — CSS transition */}
      <div
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.2s ease',
        }}
      />

      <Suspense fallback={null}>
        <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      </Suspense>
    </>
  );
}
