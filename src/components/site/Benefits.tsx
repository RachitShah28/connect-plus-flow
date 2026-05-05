import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, MessageSquare, RefreshCw } from "lucide-react";

const stats = [
  {
    icon: Zap,
    value: 30,
    suffix: "%",
    label: "Faster Response",
    sub: "Teams respond 30% faster with WhatsApp natively inside Salesforce",
  },
  {
    icon: MessageSquare,
    value: 3.2,
    suffix: "×",
    label: "Higher Engagement",
    sub: "WhatsApp messages see 3.2× higher engagement than email",
  },
  {
    icon: RefreshCw,
    value: 100,
    suffix: "%",
    label: "Data Sync",
    sub: "Every conversation synced to Salesforce in real time with zero lag",
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
      setN(Math.round(to * eased * 10) / 10);
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
    <section className="py-12 md:py-16 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="text-xs font-bold tracking-wider uppercase text-emerald-600 mb-2">Measurable ROI</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Numbers that prove the business case for WhatsApp inside Salesforce.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-50 blur-3xl group-hover:bg-emerald-100 transition-colors duration-500" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 grid place-items-center text-emerald-600 transition-colors duration-300">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-base font-bold text-slate-900">{s.label}</div>
                <div className="mt-1.5 text-sm text-slate-600 leading-relaxed">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
