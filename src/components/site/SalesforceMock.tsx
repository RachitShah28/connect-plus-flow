import { motion } from "framer-motion";
import { Cloud, Search, Bell, User, Briefcase, Users, BarChart3, Settings, CheckCheck } from "lucide-react";

export function SalesforceMock() {
  return (
    <div className="relative">
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/60 border border-slate-200/70 bg-white">
        {/* App header */}
        <div className="bg-gradient-to-r from-[#0b5cab] to-[#1098d6] text-white px-4 py-3 flex items-center gap-3">
          <Cloud className="h-5 w-5" />
          <span className="font-semibold text-sm">Sales Cloud</span>
          <div className="ml-4 flex-1 max-w-md">
            <div className="flex items-center gap-2 bg-white/15 rounded-md px-3 py-1.5 text-xs">
              <Search className="h-3.5 w-3.5" />
              <span className="opacity-80">Search Salesforce</span>
            </div>
          </div>
          <Bell className="h-4 w-4 opacity-80" />
          <div className="h-7 w-7 rounded-full bg-white/20 grid place-items-center">
            <User className="h-4 w-4" />
          </div>
        </div>

        <div className="grid grid-cols-[180px_1fr] min-h-[420px]">
          {/* Sidebar */}
          <div className="bg-slate-50 border-r border-slate-200 py-4 px-2 space-y-1 text-sm">
            {[
              { icon: Briefcase, label: "Accounts" },
              { icon: Users, label: "Contacts", active: true },
              { icon: BarChart3, label: "Opportunities" },
              { icon: Settings, label: "Cases" },
            ].map((it) => (
              <div
                key={it.label}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  it.active ? "bg-white text-[#0b5cab] font-semibold shadow-sm" : "text-slate-600"
                }`}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </div>
            ))}
          </div>

          {/* Record */}
          <div className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] grid place-items-center text-white font-semibold">
                SK
              </div>
              <div>
                <div className="text-xs text-slate-500">Contact</div>
                <div className="font-semibold text-slate-900">Sara Kapoor</div>
              </div>
              <div className="ml-auto text-xs px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-medium">
                Qualified Lead
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                ["Phone", "+91 98•••• 4521"],
                ["Email", "sara@acme.io"],
                ["Account", "Acme Realty"],
                ["Stage", "Negotiation"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-slate-200 p-3">
                  <div className="text-slate-500">{k}</div>
                  <div className="font-medium text-slate-800 mt-0.5">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-dashed border-slate-200 p-4 text-xs text-slate-500">
              Activity timeline · 12 events synced from WhatsApp
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp chat */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-8 -right-4 sm:-right-10 w-72 rounded-2xl shadow-2xl shadow-emerald-200/60 border border-white overflow-hidden bg-white"
      >
        <div className="bg-[#075E54] text-white px-3 py-2 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white/20 grid place-items-center text-sm font-semibold">SK</div>
          <div className="text-sm">
            <div className="font-semibold leading-none">Sara Kapoor</div>
            <div className="text-[10px] opacity-80 mt-0.5">online · synced to Salesforce</div>
          </div>
        </div>
        <div className="p-3 space-y-2 bg-[#ECE5DD] text-xs">
          <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[80%] shadow-sm">
            Hi Sara, your site visit is scheduled for tomorrow 4 PM. Confirm?
          </div>
          <div className="ml-auto bg-[#DCF8C6] rounded-lg rounded-tr-none px-3 py-2 max-w-[80%] shadow-sm flex items-end gap-1">
            <span>Confirm ✅</span>
            <CheckCheck className="h-3 w-3 text-[#22C55E]" />
          </div>
          <div className="text-[10px] text-center text-slate-500 pt-1">
            Status auto-updated → <span className="text-[#22C55E] font-semibold">Confirmed</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
