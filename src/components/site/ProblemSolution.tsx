import { motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

const problems = [
  "Conversations scattered across personal phones",
  "Customer data siloed outside Salesforce",
  "Reps copy-pasting messages and notes manually",
  "No audit trail or compliance visibility",
];

const solutions = [
  "Unified WhatsApp inbox inside every Salesforce record",
  "Two-way sync between WhatsApp Business and Salesforce CRM data",
  "Automated logging, WhatsApp templates and reply automation",
  "Full WhatsApp audit log with role-based access controls",
];

export function ProblemSolution() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            From <span className="text-slate-400 line-through">friction</span> to{" "}
            <span className="text-gradient-brand">flow.</span>
          </h2>
          <p className="mt-3 text-slate-600">
            See what your team loses when WhatsApp lives outside Salesforce — and what changes when you use WBConnect+.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-slate-100 p-8 grayscale-[20%]"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Without WBConnect+
            </div>
            <h3 className="mt-2 text-2xl font-bold text-slate-700">The friction tax.</h3>
            <ul className="mt-6 space-y-3">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-slate-600">
                  <span className="h-6 w-6 rounded-full bg-red-100 text-red-600 grid place-items-center flex-shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm">{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl glass p-8 shadow-xl shadow-emerald-100/40 border border-white/60"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-[#22C55E]">
              The WBConnect+ way
            </div>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">Unified, automated, native.</h3>
            <ul className="mt-6 space-y-3">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 text-slate-800">
                  <span className="h-6 w-6 rounded-full bg-emerald-50 text-[#22C55E] grid place-items-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
