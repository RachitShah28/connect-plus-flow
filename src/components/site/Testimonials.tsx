import { motion } from "framer-motion";

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
  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Background ambient glow matching the brand's light theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-5xl mx-auto mb-16 md:mb-24"
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Customer Stories</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Testimonials
          </h2>
          <p className="mt-4 text-slate-600">
            Businesses across industries rely on WBConnect+ to automate communication, improve customer experience, and create measurable growth through faster, smarter WhatsApp engagement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {testimonials.map((t, i) => {
            // The middle card is elevated on desktop layout
            const isMiddle = i === 1;
            return (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-3xl bg-white p-8 md:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 relative flex flex-col h-full ${isMiddle ? "md:-translate-y-8" : ""
                  }`}
              >
                <div className="mb-6">
                  {/* Custom Quote Icon with Theme Gradient (#2BB5D4 to #22C55E) */}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
