import { motion } from "framer-motion";
import { Shield, Cloud, Workflow, Database } from "lucide-react";

const cards = [
  {
    title: "Security",
    description: "Enterprise-grade security with a Salesforce Native Managed Package. Your data never leaves your org.",
    icon: Shield,
    accent: "from-[#2BB5D4]/10 to-blue-50",
    iconBg: "bg-[#2BB5D4]/10 text-[#2BB5D4]"
  },
  {
    title: "API",
    description: "Direct Meta Cloud API integration with embedded signup and transparent, zero-markup pricing.",
    icon: Cloud,
    accent: "from-violet-50 to-purple-50",
    iconBg: "bg-violet-100 text-violet-600"
  },
  {
    title: "Automation",
    description: "Build dynamic, multi-step customer journeys seamlessly with our no-code WhatsApp Flow Builder.",
    icon: Workflow,
    accent: "from-emerald-50 to-green-50",
    iconBg: "bg-emerald-100 text-emerald-600"
  },
  {
    title: "Data storage",
    description: "Native Salesforce object mapping and unlimited AWS S3 media storage that you control entirely.",
    icon: Database,
    accent: "from-orange-50 to-amber-50",
    iconBg: "bg-orange-100 text-orange-500"
  }
];

export function Compare() {
  return (
    <section id="why-choose-us" className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-5xl mx-auto mb-14"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Why Choose Us</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Why Global Brands Choose WBConnect+ Over Other WhatsApp Solutions
          </h2>
          <p className="mt-4 text-slate-600">
            Businesses choose WBConnect+ because they need more than messaging — they need automation, reliability, security, and scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl bg-gradient-to-br ${card.accent} border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group`}
            >
              <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#2BB5D4]/30 to-transparent" />
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${card.iconBg} mb-5`}>
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
