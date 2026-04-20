import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, HardDrive, Coins, Rocket } from "lucide-react";

const stats = [
  {
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "Data Ownership",
    sub: "Direct Meta Cloud API · zero middleman",
  },
  {
    icon: HardDrive,
    value: 90,
    suffix: "%",
    label: "Storage Savings",
    sub: "Automated AWS S3 offloading",
  },
  {
    icon: Coins,
    value: 0,
    suffix: "%",
    label: "Middleman Tax",
    sub: "Pay Meta directly · no per-msg markup",
  },
  {
    icon: Rocket,
    value: 5,
    suffix: "×",
    label: "Faster Deployment",
    sub: "Native managed package · live in days",
  },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Benefits() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#22C55E]">Measurable ROI</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Numbers that move the board deck.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="rounded-3xl bg-gradient-to-br from-slate-50 to-white p-7 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-[#2BB5D4]/10 to-[#22C55E]/10 blur-2xl" />
              <div className="relative">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] grid place-items-center text-white shadow-lg shadow-[#2BB5D4]/20">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{s.label}</div>
                <div className="mt-1 text-xs text-slate-500">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
