import { motion } from "framer-motion";
import { Smartphone, Database, Clock, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: Smartphone,
    title: "Lost Customer Conversations",
    desc: "When teams use personal WhatsApp numbers, valuable customer relationships and chat history are permanently lost if an employee leaves.",
  },
  {
    icon: Database,
    title: "Missing CRM Data",
    desc: "Important deal updates get stuck in personal phone chats. Without a proper integration, your management team can't see the full customer picture in Salesforce.",
  },
  {
    icon: Clock,
    title: "Time-Consuming Manual Work",
    desc: "Your sales and support reps waste hours every week copying and pasting WhatsApp messages into Salesforce records instead of focusing on their actual work.",
  },
  {
    icon: AlertTriangle,
    title: "High Salesforce Storage Fees",
    desc: "Saving customer images, PDFs, and videos directly into your CRM quickly leads to expensive data storage limits and costly upgrade fees.",
  },
];

export function Problem() {
  return (
    <section className="py-16 md:py-20 lg:py-32 bg-slate-50 relative overflow-hidden border-b border-slate-100">
      {/* Background ambient glow matching the brand's light theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20 lg:mb-24"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4] mb-3">The Challenge</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            WhatsApp is where your customers are. <br className="hidden sm:block" />
            But it creates a headache for your CRM.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 lg:gap-y-20 max-w-6xl mx-auto">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start"
            >
              <div className="shrink-0 mt-1">
                <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2BB5D4]/15 to-[#22C55E]/15" />
                  <p.icon className="h-6 w-6 text-[#2BB5D4]" />
                </div>
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-600 text-base sm:text-[17px] leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
