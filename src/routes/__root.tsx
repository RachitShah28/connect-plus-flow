import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "WBConnect+ | WhatsApp Business Integration for Salesforce" },
      {
        name: "description",
        content:
          "WBConnect+ by MV Clouds is the only Salesforce-native managed package for WhatsApp Business. Send broadcasts, run WhatsApp flows, automate replies and keep every message inside your CRM. Built on Meta Cloud API with no per-message markup.",
      },
      { name: "keywords", content: "WhatsApp Salesforce integration, WhatsApp Business API Salesforce, WBConnect+, WhatsApp CRM, WhatsApp Business managed package, Salesforce WhatsApp, Meta Cloud API Salesforce, WhatsApp broadcast Salesforce, WhatsApp automation Salesforce, MV Clouds, WhatsApp for Salesforce, Salesforce native WhatsApp, WhatsApp flow builder, WhatsApp template builder, WhatsApp messaging Salesforce, WBConnect Plus" },
      { name: "author", content: "MV Clouds Pvt Ltd" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#2BB5D4" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "WBConnect+" },
      { property: "og:title", content: "WBConnect+ | WhatsApp Business Integration for Salesforce" },
      {
        property: "og:description",
        content:
          "The Salesforce-native managed package that puts WhatsApp Business inside your CRM. Broadcasts, flows, templates, automation and full audit trails — all built on Meta Cloud API with zero middleman markup.",
      },
      { property: "og:url", content: "https://wbconnectplus.com/" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6147a5cf-c74b-4a9a-8680-dc245c355385/id-preview-a2c07831--00193c38-fb00-4750-a1fc-e67867c3b103.lovable.app-1776678419620.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "WBConnect+ — WhatsApp Business inside Salesforce" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@mvclouds" },
      { name: "twitter:creator", content: "@mvclouds" },
      { name: "twitter:title", content: "WBConnect+ | WhatsApp Business Integration for Salesforce" },
      {
        name: "twitter:description",
        content:
          "Salesforce-native WhatsApp integration by MV Clouds. Broadcasts, flows, templates, automation — all inside your CRM on Meta Cloud API.",
      },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6147a5cf-c74b-4a9a-8680-dc245c355385/id-preview-a2c07831--00193c38-fb00-4750-a1fc-e67867c3b103.lovable.app-1776678419620.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "canonical",
        href: "https://wbconnectplus.com/",
      },
    ],
    scripts: [
      {
        src: "https://www.google.com/recaptcha/api.js?render=explicit",
        async: true,
        defer: true,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "WBConnect+",
          "alternateName": "WBConnect Plus",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Salesforce",
          "description": "WBConnect+ is a Salesforce-native managed package that brings WhatsApp Business into your CRM. Features include broadcast messaging, WhatsApp flow builder, template builder, automation and AWS S3 media storage — all built on Meta Cloud API.",
          "url": "https://wbconnectplus.com/",
          "offers": {
            "@type": "Offer",
            "price": "29",
            "priceCurrency": "USD",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "29",
              "priceCurrency": "USD",
              "unitText": "MONTH"
            }
          },
          "author": {
            "@type": "Organization",
            "name": "MV Clouds Pvt Ltd",
            "url": "https://mvclouds.com/",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9558019600",
              "contactType": "sales",
              "email": "info@mvclouds.com"
            }
          },
          "keywords": "WhatsApp Salesforce, WhatsApp Business API, Salesforce WhatsApp integration, WhatsApp CRM, Meta Cloud API, WhatsApp broadcast, WhatsApp automation"
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
