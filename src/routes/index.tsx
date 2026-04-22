import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";

// Lazy-load below-the-fold sections to reduce initial JS payload
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
  return (
    <main
      className="min-h-screen bg-white text-slate-900"
      aria-label="WBConnect+ WhatsApp Business integration for Salesforce"
    >
      {/* Above-the-fold: load immediately */}
      <Navbar />
      <Hero />

      {/* Below-the-fold: lazy-loaded to reduce initial JS */}
      <Suspense fallback={<SectionSkeleton />}>
        <Evolution />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FeatureShowcase />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Compare />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Industries />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Steps />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CTAFooter />
      </Suspense>
    </main>
  );
}
