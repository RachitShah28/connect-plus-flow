import { motion } from "framer-motion";
import { MessageCircle, Linkedin, Twitter, Facebook, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const ecosystem = [
  "WBConnect",
  "WBConnect Plus",
  "Mass Update Without ID",
  "Signature Anywhere",
  "DocGenius",
  "EstateXpert",
];

export function CTAFooter() {
  return (
    <>
      <section id="cta" className="px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto rounded-3xl bg-[#0F172A] text-white p-10 sm:p-16 relative overflow-hidden"
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#2BB5D4]/15 to-transparent pointer-events-none"
          />
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[#22C55E]/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Ready to unlock <span className="text-gradient-brand">enterprise WhatsApp</span> automation?
            </h2>
            <p className="mt-4 text-slate-300 text-lg">
              Join 500+ Salesforce orgs running WhatsApp natively — with infinite S3 storage, zero
              middleman markup, and a no-code flow builder built for serious volume.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#2BB5D4] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2BB5D4]/30 hover:bg-[#2BB5D4]/90 transition-colors"
              >
                Get the Managed Package
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Book a 15-min strategy call
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="bg-[#0F172A] text-slate-300 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] grid place-items-center text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                WBConnect<span className="text-[#22C55E]">+</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-xs">
              Built by <span className="text-white font-semibold">MV Clouds Pvt Ltd</span> — turning
              ideas into intelligent CRM solutions with 11+ years of certified Salesforce expertise.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white">Our Ecosystem</div>
            <ul className="mt-4 space-y-2">
              {ecosystem.map((p) => (
                <li key={p}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white">Contact & Sales</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-slate-400">
                <Phone className="h-4 w-4 mt-0.5 text-[#22C55E]" />
                <a href="tel:+919558019600" className="hover:text-white transition-colors">
                  +91 9558019600
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <Mail className="h-4 w-4 mt-0.5 text-[#22C55E]" />
                <a href="mailto:info@mvclouds.com" className="hover:text-white transition-colors">
                  info@mvclouds.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 text-[#22C55E]" />
                Ahmedabad, Gujarat · India
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white">Legal</div>
            <ul className="mt-4 space-y-2">
              {["Privacy Policy", "Terms of Service", "Data Processing", "Security"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-2">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-lg border border-white/15 bg-white/5 grid place-items-center text-slate-300 hover:text-[#22C55E] hover:border-[#22C55E] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>© {new Date().getFullYear()} MV Clouds Pvt Ltd. All rights reserved.</div>
            <div>WBConnect+ is a Salesforce-native managed package. WhatsApp is a trademark of Meta.</div>
          </div>
        </div>
      </footer>
    </>
  );
}
