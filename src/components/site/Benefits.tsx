import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, MessageSquare, TrendingUp, Workflow } from "lucide-react";

const stats = [
  {
    icon: Zap,
    value: 70,
    suffix: "%",
    label: "Faster Response Times",
    sub: "Respond to leads and customers instantly.",
  },
  {
    icon: MessageSquare,
    value: 3,
    suffix: "X",
    label: "More Customer Engagement",
    sub: "Drive better conversations and stronger relationships.",
  },
  {
    icon: TrendingUp,
    value: 40,
    suffix: "%",
    label: "Higher Lead Conversion",
    sub: "Turn more inquiries into paying customers.",
  },
  {
    icon: Workflow,
    value: 80,
    suffix: "%",
    label: "Less Manual Work",
    sub: "Free your team from repetitive follow-ups.",
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
          className="text-center max-w-5xl mx-auto mb-14"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Measurable ROI</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Real Business Results That Drive Growth
          </h2>
          <p className="mt-4 text-slate-600">
            Businesses using WBConnect+ see measurable improvements across sales, support, and customer engagement. By automating repetitive communication tasks, businesses improve response times, increase engagement, convert more leads, and allow teams to focus on higher-value customer interactions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#2BB5D4]/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#2BB5D4]/10 blur-3xl group-hover:bg-[#2BB5D4]/20 transition-colors duration-500" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-[#2BB5D4]/10 group-hover:bg-[#2BB5D4]/20 grid place-items-center text-[#2BB5D4] transition-colors duration-300">
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
