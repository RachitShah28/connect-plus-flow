import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
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

      {/* Below-the-fold: lazy-loaded + content-visibility:auto for paint skip */}
      {/* 1. Problem */}
      <div className="cv-auto"><Suspense fallback={<SectionSkeleton />}>
        <Problem />
      </Suspense></div>
      {/* 2. Evolution */}
      <div className="cv-auto"><Suspense fallback={<SectionSkeleton />}>
        <Evolution />
      </Suspense></div>
      {/* 3. Capabilities */}
      <div id="features" style={{ scrollMarginTop: '88px' }} className="cv-auto">
        <Suspense fallback={<SectionSkeleton />}>
          <FeatureShowcase />
        </Suspense>
      </div>
      {/* 4. Industry */}
      <div className="cv-auto"><Suspense fallback={<SectionSkeleton />}>
        <Industries />
      </Suspense></div>
      {/* 5. Why Choose Us */}
      <div className="cv-auto"><Suspense fallback={<SectionSkeleton />}>
        <Compare />
      </Suspense></div>
      {/* 6. ROI */}
      <div className="cv-auto"><Suspense fallback={<SectionSkeleton />}>
        <Benefits />
      </Suspense></div>
      {/* 7. Pricing */}
      <div className="cv-auto"><Suspense fallback={<SectionSkeleton />}>
        <Pricing />
      </Suspense></div>
      {/* 8. Testimonials */}
      <div className="cv-auto"><Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense></div>
      {/* 9. Implementation */}
      <div className="cv-auto"><Suspense fallback={<SectionSkeleton />}>
        <Steps />
      </Suspense></div>
      {/* 10. CTA + Footer */}
      <div className="cv-auto"><Suspense fallback={<SectionSkeleton />}>
        <CTAFooter />
      </Suspense></div>
    </main>
  );
}
