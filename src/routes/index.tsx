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
      { title: "WBConnect+ | WhatsApp Business Integration for Salesforce by MV Clouds" },
      {
        name: "description",
        content:
          "WBConnect+ by MV Clouds brings WhatsApp Business natively into Salesforce. Send broadcasts, automate replies with WhatsApp flows, build message templates and keep every conversation tracked inside your CRM — built on Meta Cloud API with zero middleman markup.",
      },
      {
        name: "keywords",
        content:
          "WhatsApp Salesforce integration, WBConnect Plus, WhatsApp Business API, Salesforce WhatsApp, WhatsApp CRM, WhatsApp broadcast Salesforce, WhatsApp flow builder, Meta Cloud API Salesforce, WhatsApp automation, Salesforce managed package WhatsApp, WhatsApp for enterprise Salesforce, MV Clouds WhatsApp",
      },
      { property: "og:title", content: "WBConnect+ | WhatsApp Business Integration for Salesforce" },
      {
        property: "og:description",
        content:
          "Your customers are already on WhatsApp. Now your CRM is too. WBConnect+ is a Salesforce-native managed package built on Meta Cloud API with no-code flow builders, broadcast messaging and full conversation audit trail inside Salesforce.",
      },
      { property: "og:url", content: "https://wbconnectplus.com/" },
    ],
  }),
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
