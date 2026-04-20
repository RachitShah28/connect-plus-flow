import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Layers, KeyRound, Rocket } from "lucide-react";

const steps = [
  {
    icon: Download,
    title: "Direct Package Installation",
    desc: "Install the WBConnect+ Managed Package straight into your Salesforce org via secure install link — no marketplace dependencies.",
  },
  {
    icon: Layers,
    title: "Map Standard & Custom Objects",
    desc: "Point-and-click mapping for any Salesforce object, field or relationship. Bring your own data model.",
  },
  {
    icon: KeyRound,
    title: "Authenticate Meta & AWS S3",
    desc: "Embedded Signup for WhatsApp Cloud API + a guided wizard to wire up your S3 bucket and KMS keys.",
  },
  {
    icon: Rocket,
    title: "Launch Global Operations",
    desc: "Go live with broadcasts, flows and a unified inbox across teams, regions and brands.",
  },
];

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#22C55E]">Implementation</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Live in <span className="text-gradient-brand">four guided milestones.</span>
          </h2>
        </motion.div>

        <div ref={ref} className="relative max-w-3xl mx-auto">
          {/* SVG winding line */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-32 hidden sm:block"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
          >
            <path
              d="M 50 20 C 90 120, 10 220, 50 340 C 90 460, 10 560, 50 780"
              stroke="#e2e8f0"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <motion.path
              d="M 50 20 C 90 120, 10 220, 50 340 C 90 460, 10 560, 50 780"
              stroke="url(#stepsGrad)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="stepsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2BB5D4" />
                <stop offset="1" stopColor="#22C55E" />
              </linearGradient>
            </defs>
          </svg>

          <div className="space-y-8 relative">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`flex sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10"}`}
              >
                <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-xl shadow-slate-200/50 w-full">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] grid place-items-center text-white shadow-md">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-semibold text-[#2BB5D4]">Milestone {i + 1}</div>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
