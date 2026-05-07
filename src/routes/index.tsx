import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { useSEO } from "@/hooks/useSEO";

// Lazy-load below-the-fold sections to reduce initial JS payload
const Problem = lazy(() =>
  import("@/components/site/Problem").then((m) => ({ default: m.Problem }))
);
const Evolution = lazy(() =>
  import("@/components/site/Evolution").then((m) => ({ default: m.Evolution }))
);
const FeatureShowcase = lazy(() =>
  import("@/components/site/FeatureShowcase").then((m) => ({
    default: m.FeatureShowcase,
  }))
);
const Compare = lazy(() =>
  import("@/components/site/Compare").then((m) => ({ default: m.Compare }))
);
const Industries = lazy(() =>
  import("@/components/site/Industries").then((m) => ({
    default: m.Industries,
  }))
);
const Benefits = lazy(() =>
  import("@/components/site/Benefits").then((m) => ({ default: m.Benefits }))
);
const Steps = lazy(() =>
  import("@/components/site/Steps").then((m) => ({ default: m.Steps }))
);
const Testimonials = lazy(() =>
  import("@/components/site/Testimonials").then((m) => ({ default: m.Testimonials }))
);
const Pricing = lazy(() =>
  import("@/components/site/Pricing").then((m) => ({ default: m.Pricing }))
);
const CTAFooter = lazy(() =>
  import("@/components/site/CTAFooter").then((m) => ({ default: m.CTAFooter }))
);

// Lightweight skeleton placeholder while lazy sections load
function SectionSkeleton() {
  return (
    <div className="w-full py-24 px-4 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="h-8 bg-slate-100 rounded-lg w-1/3 mx-auto" />
        <div className="h-4 bg-slate-100 rounded w-2/3 mx-auto" />
        <div className="h-4 bg-slate-100 rounded w-1/2 mx-auto" />
      </div>
    </div>
  );
}

// InView wrapper strictly defers React component mounting until scrolled near
function InView({ children, id, style, rootMargin = "600px" }: { children: React.ReactNode, id?: string, style?: React.CSSProperties, rootMargin?: string }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div id={id} style={style} ref={ref}>
      {inView ? <Suspense fallback={<SectionSkeleton />}>{children}</Suspense> : <SectionSkeleton />}
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useSEO({
    title: "WhatsApp Automation Tool for Business | WBConnect+",
    description: "Automate customer conversations, campaigns, and follow-ups with WBConnect+, a powerful WhatsApp automation tool built for sales, support, and Salesforce teams.",
    keywords: "WhatsApp automation tool, automate WhatsApp messages, WhatsApp bulk message software, WhatsApp business automation, Salesforce WhatsApp integration",
    canonical: "https://www.wbconnectplus.com/",
    ogTitle: "WhatsApp Automation Tool for Business & Salesforce | WBConnect+",
    ogDescription: "Automate customer conversations, campaigns, and follow-ups with WBConnect Plus, a powerful WhatsApp automation tool built for sales, support, and Salesforce teams.",
    ogUrl: "https://www.wbconnectplus.com/",
    ogImage: "Logo/image Source url",
  });

  return (
    <main
      className="min-h-screen bg-white text-slate-900"
      aria-label="WBConnect+ WhatsApp Business integration for Salesforce"
    >
      {/* Above-the-fold: load immediately */}
      <Navbar />
      <Hero />

      {/* Author byline — E-E-A-T signal for search engines */}
      <address className="sr-only" aria-label="Content author">
        Published by{" "}
        <a href="https://mvclouds.com/about" rel="author">MV Clouds Pvt Ltd</a>,
        Salesforce ISV Partner with 11 years of CRM expertise.
      </address>

      {/* Below-the-fold: strictly lazy-rendered on scroll */}
      {/* 1. Problem */}
      <InView>
        <Problem />
      </InView>
      {/* 2. Evolution */}
      <InView>
        <Evolution />
      </InView>
      {/* 3. Features */}
      <InView id="features" style={{ scrollMarginTop: '88px' }}>
        <FeatureShowcase />
      </InView>
      {/* 4. Industry */}
      <InView>
        <Industries />
      </InView>
      {/* 5. Why Choose Us */}
      <InView>
        <Compare />
      </InView>
      {/* 6. ROI */}
      <InView>
        <Benefits />
      </InView>
      {/* 7. Pricing */}
      <InView>
        <Pricing />
      </InView>
      {/* 8. Testimonials */}
      <InView>
        <Testimonials />
      </InView>
      {/* 9. Implementation */}
      <InView>
        <Steps />
      </InView>
      {/* 10. CTA + Footer */}
      <InView>
        <CTAFooter />
      </InView>
    </main>
  );
}
