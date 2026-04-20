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
  head: () => ({
    meta: [
      { title: "WBConnect+ — Salesforce-native WhatsApp engine with AWS S3 storage" },
      {
        name: "description",
        content:
          "WBConnect+ by MV Clouds: a Salesforce-native managed package on Meta Cloud API with automated AWS S3 media offloading, no-code flow builder, broadcasts and analytics.",
      },
      { property: "og:title", content: "WBConnect+ — Enterprise WhatsApp inside Salesforce" },
      {
        property: "og:description",
        content:
          "Direct Meta Cloud API. Automated AWS S3 offloading. Zero middleman markup. The Salesforce-native WhatsApp engine built for enterprise volume.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <Evolution />
      <FeatureShowcase />
      <Industries />
      <Benefits />
      <Steps />
      <Compare />
      <Pricing />
      <CTAFooter />
    </main>
  );
}
