import { motion } from "framer-motion";
import { Cloud, Search, Bell, User, Briefcase, Users, BarChart3, Settings, CheckCheck, Image as ImageIcon, Database } from "lucide-react";

export function SalesforceMock() {
  return (
    <div className="relative">
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/60 border border-slate-200/70 bg-white">
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

        <div className="grid grid-cols-[150px_1fr] min-h-[420px]">
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
            <div className="mt-5 rounded-xl border border-dashed border-slate-200 p-3 text-[11px] text-slate-500 flex items-center gap-2">
              <Database className="h-3.5 w-3.5 text-[#22C55E]" />
              CRM storage usage{" "}
              <span className="ml-auto text-[#22C55E] font-semibold">2.4 MB · S3 offload active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp chat */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-6 -right-2 sm:-right-8 w-64 rounded-2xl shadow-2xl shadow-emerald-200/60 border border-white overflow-hidden bg-white"
      >
        <div className="bg-[#075E54] text-white px-3 py-2 flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-white/20 grid place-items-center text-xs font-semibold">SK</div>
          <div className="text-xs">
            <div className="font-semibold leading-none">Sara Kapoor</div>
            <div className="text-[10px] opacity-80 mt-0.5">online · synced to CRM</div>
          </div>
        </div>
        <div className="p-3 space-y-2 bg-[#ECE5DD] text-xs">
          <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[80%] shadow-sm">
            Site visit tomorrow 4 PM. Confirm?
          </div>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="ml-auto bg-[#DCF8C6] rounded-lg rounded-tr-none px-3 py-2 max-w-[80%] shadow-sm flex items-center gap-1"
          >
            <ImageIcon className="h-3 w-3 text-emerald-700" />
            <span>floor-plan.jpg · 18 MB</span>
            <CheckCheck className="h-3 w-3 text-[#22C55E] ml-1" />
          </motion.div>
        </div>
      </motion.div>

      {/* S3 bucket vector + animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute -left-4 sm:-left-10 bottom-10 w-44"
      >
        <div className="relative">
          {/* falling photo */}
          <motion.div
            animate={{ y: [-40, 30, -40], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-10 top-0 h-8 w-8 rounded-md bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] shadow-lg grid place-items-center text-white"
          >
            <ImageIcon className="h-4 w-4" />
          </motion.div>

          <div className="mt-12 rounded-2xl bg-white shadow-2xl shadow-slate-300/50 border border-slate-200 p-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-500 grid place-items-center text-white text-[10px] font-bold">
                S3
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-900">AWS S3 Bucket</div>
                <div className="text-[10px] text-slate-500">media-archive</div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-2 text-[10px] rounded-md bg-emerald-50 text-emerald-700 px-2 py-1 font-semibold inline-block"
            >
              +90% Space Saved
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
