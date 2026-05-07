import { useEffect, useRef, useState } from "react";

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

const testimonials = [
  {
    quote: "Before using WBConnect+, our sales team managed every WhatsApp conversation manually. Now follow-ups are automated, response times are faster, and our lead conversion has improved significantly.",
    author: "Sales Director",
  },
  {
    quote: "The Salesforce integration changed how our support team works. Every customer conversation stays inside Salesforce, giving our agents full context and helping us resolve queries much faster.",
    author: "Customer Support Lead",
  },
  {
    quote: "Broadcast campaigns, scheduled messages, and workflow automation have helped us reach thousands of customers without increasing manual effort. The analytics make campaign optimization much easier.",
    author: "Marketing Manager",
  },
];

export function Testimonials() {
  const header = useFadeIn();
  return (
    <section className="py-10 sm:py-14 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div {...header} className="text-center max-w-5xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Customer Stories</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Testimonials
          </h2>
          <p className="mt-4 text-slate-600">
            Businesses across industries rely on WBConnect+ to automate communication, improve customer experience, and create measurable growth through faster, smarter WhatsApp engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {testimonials.map((t, i) => {
            const isMiddle = i === 1;
            const fade = useFadeIn(i * 0.1);
            return (
              <div
                key={t.author}
                {...fade}
                className={`rounded-3xl bg-white p-5 sm:p-6 md:p-8 lg:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 relative flex flex-col h-full ${isMiddle ? "md:-translate-y-8" : ""}`}
              >
                <div className="mb-6">
                  <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id={`quoteGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2BB5D4" />
                        <stop offset="100%" stopColor="#22C55E" />
                      </linearGradient>
                    </defs>
                    <path d="M0 24L6.5 0H12L5.5 24H0ZM15 24L21.5 0H27L20.5 24H15Z" fill={`url(#quoteGrad-${i})`} />
                  </svg>
                </div>
                <blockquote className="text-slate-600 text-[15px] leading-relaxed mb-8 flex-1 italic">
                  "{t.quote}"
                </blockquote>
                <div className="font-bold text-slate-900 text-[15px]">
                  {t.author}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
