import { motion } from "framer-motion";
import { MessageSquare, Database, Workflow, BarChart, LayoutTemplate } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Global WhatsApp Chat Window",
    desc: "Access live WhatsApp conversations from any Salesforce screen — Lightning, Console or Mobile.",
    span: "md:col-span-2",
    accent: "from-[#2BB5D4]/10 to-[#22C55E]/10",
  },
  {
    icon: Database,
    title: "Object Agnostic Salesforce Integration",
    desc: "Native support for Standard and Custom Salesforce objects. Map any field in seconds.",
  },
  {
    icon: Workflow,
    title: "No-Code WhatsApp Flow Builder",
    desc: "Visual builder for WhatsApp Flows — forms, menus and conditional logic inside WhatsApp.",
  },
  {
    icon: BarChart,
    title: "WhatsApp Broadcast and Analytics",
    desc: "Mass WhatsApp messaging with delivery, read and ROI dashboards in real time.",
  },
  {
    icon: LayoutTemplate,
    title: "WhatsApp Template Builder",
    desc: "Native WhatsApp template builder with Meta approval submission for instant deployment inside Salesforce.",
    span: "md:col-span-2",
    accent: "from-[#22C55E]/10 to-[#2BB5D4]/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Features</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Everything you need to send WhatsApp messages at scale from Salesforce.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative rounded-3xl bg-white p-7 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-slate-300/50 hover:scale-[1.02] transition-transform overflow-hidden ${f.span ?? ""}`}
            >
              {f.accent && (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
              )}
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] grid place-items-center text-white shadow-lg shadow-[#2BB5D4]/20">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
