import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "Salesforce Native Managed Package", us: true, them: false, themLabel: "External app" },
  { feature: "Pricing Model", us: "Direct Meta Cloud API pricing", them: "Marked-up per message" },
  { feature: "No-Code WhatsApp Flow Builder", us: true, them: false, themLabel: "Requires external tool" },
  { feature: "Salesforce Object and Field Mapping", us: "Any standard or custom object", them: "Limited objects" },
  { feature: "WhatsApp Data Residency", us: "Stays in your Salesforce org", them: "Third-party servers" },
  { feature: "Embedded Signup via Meta Cloud API", us: true, them: false },
];

function Cell({ value, fallback }: { value: boolean | string; fallback?: string }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="inline-flex h-7 w-7 rounded-full bg-emerald-50 text-[#22C55E] items-center justify-center">
        <Check className="h-4 w-4" />
      </span>
    ) : (
      <span className="inline-flex items-center gap-2 text-slate-500 text-sm">
        <span className="inline-flex h-7 w-7 rounded-full bg-red-50 text-red-500 items-center justify-center">
          <X className="h-4 w-4" />
        </span>
        {fallback && <span>{fallback}</span>}
      </span>
    );
  }
  return <span className="text-sm text-slate-700">{value}</span>;
}

export function Compare() {
  return (
    <section id="why-choose-us" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Why Choose Us</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Why Salesforce teams choose WBConnect+ for WhatsApp.
          </h2>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="hidden md:block rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
                  <th className="px-6 py-4 font-semibold">Feature</th>
                  <th className="px-6 py-4 font-semibold bg-[#2BB5D4]/5 text-[#2BB5D4]">WBConnect+</th>
                  <th className="px-6 py-4 font-semibold">Third-Party WhatsApp Integrations</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.feature}
                    className={`border-b border-slate-100 last:border-0 ${i % 2 ? "bg-slate-50/40" : ""}`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{r.feature}</td>
                    <td className="px-6 py-4 bg-[#2BB5D4]/5">
                      <Cell value={r.us} />
                    </td>
                    <td className="px-6 py-4">
                      <Cell value={r.them} fallback={r.themLabel} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile Card layout */}
        <div className="md:hidden space-y-4">
          {/* Header labels */}
          <div className="grid grid-cols-2 gap-3 px-1">
            <div className="rounded-xl bg-[#2BB5D4]/10 border border-[#2BB5D4]/30 px-4 py-2 text-center text-xs font-bold text-[#2BB5D4] uppercase tracking-wider">
              WBConnect+
            </div>
            <div className="rounded-xl bg-slate-100 border border-slate-200 px-4 py-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
              Others
            </div>
          </div>

          {rows.map((r, i) => (
            <motion.div
              key={r.feature}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="px-4 py-3 text-sm font-semibold text-slate-800 border-b border-slate-100 bg-slate-50">
                {r.feature}
              </div>
              <div className="grid grid-cols-2 divide-x divide-slate-100">
                <div className="px-4 py-3 flex items-center justify-center bg-[#2BB5D4]/5">
                  <Cell value={r.us} />
                </div>
                <div className="px-4 py-3 flex items-center justify-center">
                  <Cell value={r.them} fallback={r.themLabel} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
