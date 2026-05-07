import { useEffect, useRef, useState } from "react";
import { Download, Layers, KeyRound, Rocket } from "lucide-react";

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

const steps = [
  {
    icon: Download,
    title: "Direct Package Installation",
    desc: "Install the WBConnect+ WhatsApp Salesforce Managed Package straight into your Salesforce org via a secure install link with no marketplace dependencies.",
  },
  {
    icon: Layers,
    title: "Map Standard and Custom Objects",
    desc: "Point-and-click mapping for any Salesforce object, field or relationship. Bring your own Salesforce data model.",
  },
  {
    icon: KeyRound,
    title: "Authenticate Meta and AWS S3",
    desc: "Embedded Signup for WhatsApp Cloud API with a guided wizard to connect your S3 bucket and KMS keys for secure media storage.",
  },
  {
    icon: Rocket,
    title: "Launch WhatsApp Operations Globally",
    desc: "Go live with WhatsApp broadcasts, flows and a unified inbox across teams, regions and brands inside Salesforce.",
  },
];

/** Approximate path length for the SVG curve (viewBox 100×800) */
const PATH_LENGTH = 900;

/** Hook: returns a 0–1 progress value driven by how far the section has scrolled into view */
function useScrollProgress(sectionRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start filling when the top of the section reaches the bottom of the viewport
      // Finish filling when the bottom of the section reaches the top of the viewport
      const start = windowH;          // rect.top == windowH  → progress 0
      const end   = -rect.height;    // rect.top == -height  → progress 1

      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // seed on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionRef]);

  return progress;
}

export function Steps() {
  const header = useFadeIn();
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef as React.RefObject<HTMLElement | null>);

  // strokeDashoffset goes from PATH_LENGTH (hidden) → 0 (fully drawn)
  const offset = PATH_LENGTH - progress * PATH_LENGTH;

  return (
    <section ref={sectionRef} id="implementation" className="py-10 sm:py-14 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div {...header} className="text-center max-w-5xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#22C55E]">Implementation</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Get Started Without Complex Setup
          </h2>
          <p className="mt-4 text-slate-600 text-base md:text-lg">
            From onboarding to deployment, our implementation team helps you launch quickly with minimal technical effort.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Scroll-driven connector line */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-32 hidden sm:block pointer-events-none"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="stepsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2BB5D4" />
                <stop offset="1" stopColor="#22C55E" />
              </linearGradient>
            </defs>

            {/* Faint ghost track */}
            <path
              d="M 50 20 C 90 120, 10 220, 50 340 C 90 460, 10 560, 50 780"
              stroke="#e2e8f0"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />

            {/* Animated fill path */}
            <path
              d="M 50 20 C 90 120, 10 220, 50 340 C 90 460, 10 560, 50 780"
              stroke="url(#stepsGrad)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={PATH_LENGTH}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.05s linear" }}
            />
          </svg>

          <div className="space-y-5 sm:space-y-7 md:space-y-8 relative">
            {steps.map((s, i) => {
              const fade = useFadeIn(i * 0.08);
              return (
                <div
                  key={s.title}
                  {...fade}
                  className={`flex sm:w-1/2 ${i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10"}`}
                >
                  <div className="rounded-2xl bg-white p-4 sm:p-5 md:p-6 border border-slate-200 shadow-xl shadow-slate-200/50 w-full">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] grid place-items-center text-white shadow-md">
                        <s.icon className="h-5 w-5" />
                      </div>
                      <div className="text-xs font-semibold text-[#2BB5D4]">Milestone {i + 1}</div>
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
