import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Evolution } from "@/components/site/Evolution";
import { FeatureShowcase } from "@/components/site/FeatureShowcase";
import { Industries } from "@/components/site/Industries";
import { Benefits } from "@/components/site/Benefits";
import { Steps } from "@/components/site/Steps";
import { Compare } from "@/components/site/Compare";
import { Pricing } from "@/components/site/Pricing";
import { CTAFooter } from "@/components/site/CTAFooter";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-white text-slate-900" aria-label="WBConnect+ WhatsApp Business integration for Salesforce">
      <Navbar />
      <Hero />
      <Evolution />
      <FeatureShowcase />
      <Compare />
      <Industries />
      <Benefits />
      <Steps />
      <Pricing />
      <CTAFooter />
    </main>
  );
}
