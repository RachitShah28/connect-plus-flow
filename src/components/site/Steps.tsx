import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Cloud, Layers } from "lucide-react";

const steps = [
  {
    icon: Download,
    title: "Install",
    desc: "One-click installation of the WBConnect+ Managed Package from AppExchange.",
  },
  {
    icon: Cloud,
    title: "Embedded Signup",
    desc: "Connect your WhatsApp Business Account using Meta's Embedded Signup — fully Cloud API.",
  },
  {
    icon: Layers,
    title: "Object Setup",
    desc: "Map standard or custom objects, pick templates and launch in under an hour.",
  },
];

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-white">
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
            Live in <span className="text-gradient-brand">three steps.</span>
          </h2>
        </motion.div>

        <div ref={ref} className="relative max-w-3xl mx-auto pl-12 sm:pl-16">
          {/* timeline track */}
          <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-0.5 bg-slate-200 rounded-full" />
          <motion.div
            style={{ height: fillHeight }}
            className="absolute left-4 sm:left-6 top-2 w-0.5 bg-gradient-to-b from-[#2BB5D4] to-[#22C55E] rounded-full"
          />

          <div className="space-y-12">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-12 sm:-left-16 top-1 h-9 w-9 rounded-full bg-white border-2 border-[#22C55E] grid place-items-center text-[#22C55E] shadow-md">
                  <s.icon className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100">
                  <div className="text-xs font-semibold text-[#2BB5D4]">Step {i + 1}</div>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">{s.title}</h3>
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
