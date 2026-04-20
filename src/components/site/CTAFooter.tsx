import { motion } from "framer-motion";
import { MessageCircle, Twitter, Linkedin, Github, Youtube } from "lucide-react";

export function CTAFooter() {
  return (
    <>
      <section id="cta" className="px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto rounded-3xl bg-slate-900 text-white p-10 sm:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-30 bg-mesh-hero pointer-events-none" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Ready to unify your <span className="text-gradient-brand">communications?</span>
            </h2>
            <p className="mt-4 text-slate-300 text-lg">
              Join 500+ teams running WhatsApp natively inside Salesforce. No middleware, no markup, no chaos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center rounded-xl bg-[#2BB5D4] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2BB5D4]/30 hover:bg-[#2BB5D4]/90 transition-colors"
              >
                Get Started on AppExchange
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Book a 15-min demo
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] grid place-items-center text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-slate-900 text-lg">
                WBConnect<span className="text-[#22C55E]">+</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600 max-w-xs">
              Salesforce-native WhatsApp, powered by Meta Cloud API.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Industries", "Pricing", "AppExchange"] },
            { title: "Company", links: ["About", "Customers", "Blog", "Careers"] },
            { title: "Legal", links: ["Privacy", "Terms", "DPA", "Security"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-900">{col.title}</div>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} WBConnect+. All rights reserved.
            </div>
            <div className="flex items-center gap-3 text-slate-500">
              {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-8 w-8 rounded-lg border border-slate-200 grid place-items-center hover:text-[#2BB5D4] hover:border-[#2BB5D4] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
