import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#solutions", label: "Solutions" },
  { href: "#s3", label: "S3 Storage" },
  { href: "#compare", label: "Compare" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <nav className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-lg shadow-slate-200/50 flex items-center justify-between px-4 sm:px-6 py-3">
          <a href="#top" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] grid place-items-center text-white shadow-md">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-slate-900 text-lg">
              WBConnect<span className="text-[#22C55E]">+</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#cta"
              className="hidden sm:inline-flex items-center rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
            >
              Get the Package
            </a>
            <a
              href="#cta"
              className="relative overflow-hidden inline-flex items-center rounded-xl bg-[#2BB5D4] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#2BB5D4]/30 hover:bg-[#2BB5D4]/90 transition-colors group"
            >
              <span className="relative z-10">Request Custom Demo</span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
