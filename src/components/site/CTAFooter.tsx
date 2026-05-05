import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { DemoModal } from "./DemoModal";
import { WBCLogo } from "./WBCLogo";

const ecosystem = [
  { label: "QuickForm", href: "https://mvclouds.com/solutions/quickform" },
  { label: "Signature Anywhere", href: "https://mvclouds.com/solutions/signature-anywhere" },
  { label: "DocGenius", href: "https://mvclouds.com/solutions/docgenius" },
  { label: "EstateXpert", href: "https://mvclouds.com/solutions/estatexpert" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Why WBConnect+", href: "/#why" },
  { label: "Industries", href: "/#industries" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQs", href: "/#faqs" },
];

const PACKAGE_URL = "https://login.salesforce.com/packaging/installPackage.apexp?p0=04tQy000000TnoX";

const WA_URL =
  "https://api.whatsapp.com/send/?phone=919558019600&text=Hello%2C+I%E2%80%99m+interested+in+WBConnect%2B.+Can+we+discuss+further%3F&type=phone_number&app_absent=0";

const socials = [
  {
    label: "WhatsApp",
    href: WA_URL,
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mv-clouds-private-limited/posts/?feedView=all",
    icon: <Linkedin className="h-4 w-4" />,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/mvclouds_tech",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100063698268170#",
    icon: <Facebook className="h-4 w-4" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mvcloudsync/",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];

export function CTAFooter() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      {/* CTA Banner & Footer Wrapper */}
      <div className="relative mt-16 sm:mt-24">
        {/* Dark background connection block to eliminate white gap */}
        <div className="absolute inset-x-0 bottom-0 top-32 bg-[#0F172A]" aria-hidden="true" />

        {/* CTA Banner */}
        <section id="cta" className="relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto rounded-[2rem] bg-[#162032] border border-white/10 text-white p-10 sm:p-14 lg:p-20 relative overflow-hidden shadow-2xl"
          >
            {/* Ambient glows inside the card */}
            <div className="absolute -top-32 -right-32 h-[30rem] w-[30rem] rounded-full bg-[#2BB5D4]/10 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 h-[30rem] w-[30rem] rounded-full bg-[#22C55E]/10 blur-[80px] pointer-events-none" />

            <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Ready to bring <span className="text-gradient-brand">WhatsApp Business</span> natively into Salesforce?
              </h2>
              <p className="mt-5 text-slate-300 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
                Join 500+ Salesforce orgs running WhatsApp Business natively with unlimited AWS S3 media storage, zero
                middleman markup and a no-code flow builder.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                <a
                  href={PACKAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2BB5D4] to-[#22C55E] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#22C55E]/20 hover:shadow-xl hover:shadow-[#22C55E]/30 transition-all hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get the Managed Package
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="shimmer-btn" aria-hidden />
                </a>
                <button
                  onClick={() => setDemoOpen(true)}
                  className="group relative overflow-hidden inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Book a Strategy Call</span>
                  <span className="shimmer-btn" aria-hidden />
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="relative bg-[#0F172A] text-slate-300 pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">

            {/* Brand */}
            <div className="lg:col-span-4 pr-0 lg:pr-8">
              <WBCLogo height={36} white />
              <p className="mt-6 text-sm text-slate-400 leading-relaxed max-w-sm">
                The ultimate native WhatsApp Business integration for Salesforce. Automate messaging, engage customers, and scale your operations effortlessly.
              </p>
              <div className="mt-6">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2">Powered by</p>
                <img
                  src="/mv-clouds-logo.svg"
                  alt="MV Clouds"
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  style={{ filter: "brightness(0) invert(1)" }}
                  loading="lazy"
                />
              </div>
              <div className="mt-8 flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow MV Clouds on ${s.label}`}
                    title={`MV Clouds on ${s.label}`}
                    className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#22C55E]/10 hover:text-[#22C55E] hover:border-[#22C55E]/30 transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Our Ecosystem */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Our Ecosystem</h3>
              <ul className="space-y-3">
                {ecosystem.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Visit ${item.label} by MV Clouds`}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-label={item.label}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4 lg:pl-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Contact Us</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3 text-slate-400 group">
                  <div className="mt-0.5 p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:border-[#22C55E]/50 group-hover:text-[#22C55E] transition-colors">
                    <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                  </div>
                  <a href="mailto:info@mvclouds.com" className="hover:text-white transition-colors pt-1">
                    info@mvclouds.com
                  </a>
                </li>
                <li className="flex items-start gap-3 text-slate-400 group">
                  <div className="mt-0.5 p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:border-[#22C55E]/50 group-hover:text-[#22C55E] transition-colors">
                    <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                  </div>
                  <a href="tel:+919558019600" className="hover:text-white transition-colors pt-1">
                    +91 9558019600
                  </a>
                </li>
                <li className="flex items-start gap-3 text-slate-400 group">
                  <div className="mt-0.5 p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:border-[#22C55E]/50 group-hover:text-[#22C55E] transition-colors">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  </div>
                  <div className="space-y-3 pt-1">
                    <div>
                      <span className="text-white font-semibold text-xs block mb-1">India (Headquarters)</span>
                      <span className="leading-relaxed">D-404, The First Synthesis, B/H Keshavbaug Party Plot, Ahmedabad, Gujarat – 380015</span>
                    </div>
                    <div>
                      <span className="text-white font-semibold text-xs block mb-1">U.A.E.</span>
                      <span className="leading-relaxed">Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <span>© {new Date().getFullYear()} WBConnect+. All rights reserved.</span>
              </div>

              <div className="flex items-center gap-6">
                <a
                  href="https://mvclouds.com/privacypolicy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <span className="hidden sm:inline text-white/20">|</span>
                <a
                  href="https://mvclouds.com/about-mv-clouds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
