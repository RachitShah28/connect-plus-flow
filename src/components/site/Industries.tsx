import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, HeartPulse, ShoppingBag, GraduationCap, ArrowRight } from "lucide-react";

const industries = [
  {
    icon: Building2,
    name: "Real Estate",
    headline: "Close site visits faster.",
    body: "Send rich property cards, schedule site visits and auto-log responses against the Lead record.",
    flow: ["Property card sent", "Lead replies 'Visit Sat 4PM'", "Salesforce creates Event"],
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    headline: "Reduce no-shows by 40%.",
    body: "Appointment reminders, prescription refills and pre-visit forms — synced to the Patient object.",
    flow: ["Reminder sent", "Patient replies 'Confirm'", "Status → Confirmed"],
  },
  {
    icon: ShoppingBag,
    name: "E-commerce",
    headline: "Recover abandoned carts.",
    body: "Trigger cart recovery, order updates and post-purchase NPS — all from your Salesforce Orders.",
    flow: ["Cart abandoned", "Offer sent on WhatsApp", "Checkout completed"],
  },
  {
    icon: GraduationCap,
    name: "Education",
    headline: "Engage students at scale.",
    body: "Admission updates, fee reminders and broadcast announcements native to your Education Cloud.",
    flow: ["Application received", "Docs requested", "Admission confirmed"],
  },
];

export function Industries() {
  const [active, setActive] = useState(0);
  const Item = industries[active];
  const Icon = Item.icon;

  return (
    <section id="industries" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Industries</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Built for the way <span className="text-gradient-brand">your team</span> sells & supports.
          </h2>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {industries.map((ind, i) => (
            <button
              key={ind.name}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === active
                  ? "bg-[#2BB5D4] text-white shadow-md shadow-[#2BB5D4]/30"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-8 items-stretch">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${active}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] grid place-items-center text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-slate-900">{Item.headline}</h3>
              <p className="mt-3 text-slate-600">{Item.body}</p>
              <a
                href="#cta"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#2BB5D4] hover:gap-2 transition-all"
              >
                See full use case <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`flow-${active}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="rounded-3xl glass p-8 shadow-xl shadow-slate-200/40"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                WhatsApp Flow
              </div>
              <ol className="mt-5 space-y-4">
                {Item.flow.map((step, idx) => (
                  <motion.li
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="h-7 w-7 rounded-full bg-[#22C55E] text-white text-xs font-bold grid place-items-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="rounded-xl bg-white px-4 py-3 text-sm text-slate-800 shadow-sm border border-slate-100 flex-1">
                      {step}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
