import { useEffect, useRef } from "react";
import { X, CheckCircle2 } from "lucide-react";

const problems = [
  "Conversations scattered across personal phones",
  "Customer data siloed outside Salesforce",
  "Reps copy-pasting messages and notes manually",
  "No audit trail or compliance visibility",
];

const solutions = [
  "Unified WhatsApp inbox inside every Salesforce record",
  "Two-way sync between WhatsApp Business and Salesforce CRM data",
  "Automated logging, WhatsApp templates and reply automation",
  "Full WhatsApp audit log with role-based access controls",
];

export function ProblemSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".reveal-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="reveal-item text-center max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-14"
          style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            From <span className="text-slate-400 line-through">friction</span> to{" "}
            <span className="text-gradient-brand">flow.</span>
          </h2>
          <p className="mt-3 text-slate-600">
            See what your team loses when WhatsApp lives outside Salesforce — and what changes when you use WBConnect+.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="reveal-item rounded-3xl bg-slate-100 p-5 sm:p-6 md:p-8 grayscale-[20%]"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Without WBConnect+
            </div>
            <h3 className="mt-2 text-2xl font-bold text-slate-700">The friction tax.</h3>
            <ul className="mt-6 space-y-3">
              {problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-slate-600">
                  <span className="h-6 w-6 rounded-full bg-red-100 text-red-600 grid place-items-center flex-shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal-item rounded-3xl glass p-5 sm:p-6 md:p-8 shadow-xl shadow-emerald-100/40 border border-white/60"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s" }}
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-[#22C55E]">
              The WBConnect+ way
            </div>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">Unified, automated, native.</h3>
            <ul className="mt-6 space-y-3">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3 text-slate-800">
                  <span className="h-6 w-6 rounded-full bg-emerald-50 text-[#22C55E] grid place-items-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                  <span className="text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
