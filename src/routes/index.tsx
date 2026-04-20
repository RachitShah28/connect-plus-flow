import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Industries } from "@/components/site/Industries";
import { ProblemSolution } from "@/components/site/ProblemSolution";
import { Features } from "@/components/site/Features";
import { Steps } from "@/components/site/Steps";
import { Compare } from "@/components/site/Compare";
import { Pricing } from "@/components/site/Pricing";
import { CTAFooter } from "@/components/site/CTAFooter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "WBConnect+ — Salesforce-native WhatsApp powered by Cloud API" },
      {
        name: "description",
        content:
          "Bring WhatsApp directly into your Salesforce workflow. Salesforce-native managed package on Meta Cloud API — flows, broadcasts, analytics, and full data sync.",
      },
      { property: "og:title", content: "WBConnect+ — WhatsApp, native to Salesforce" },
      {
        property: "og:description",
        content:
          "The Salesforce-native WhatsApp Cloud API package. Unify conversations, automate flows, and sync every message to your CRM.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <Industries />
      <ProblemSolution />
      <Features />
      <Steps />
      <Compare />
      <Pricing />
      <CTAFooter />
    </main>
  );
}
