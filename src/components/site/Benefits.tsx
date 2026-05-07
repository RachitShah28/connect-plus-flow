import { useEffect, useRef, useState } from "react";
import { Zap, MessageSquare, TrendingUp, Workflow } from "lucide-react";

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
  };
  return { ref, style };
}

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

/** Native counter — no framer-motion useInView dependency */
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
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
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{n}{suffix}</span>;
}

export function Benefits() {
  const header = useFadeIn();
  return (
    <section className="py-8 sm:py-10 md:py-16 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div {...header} className="text-center max-w-5xl mx-auto mb-8 sm:mb-10 md:mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Measurable ROI</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Real Business Results That Drive Growth
          </h2>
          <p className="mt-4 text-slate-600">
            Businesses using WBConnect+ see measurable improvements across sales, support, and customer engagement. By automating repetitive communication tasks, businesses improve response times, increase engagement, convert more leads, and allow teams to focus on higher-value customer interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const fade = useFadeIn(i * 0.08);
            return (
              <div
                key={s.label}
                {...fade}
                className="group rounded-2xl bg-white p-4 sm:p-5 md:p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#2BB5D4]/50 transition-all duration-300 relative overflow-hidden"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
