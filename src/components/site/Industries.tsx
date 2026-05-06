import { useState, useEffect, useRef } from "react";
import {
  Building2,
  HeartPulse,
  ShoppingBag,
  GraduationCap,
  Plane,
  Banknote,
  Car,
  Utensils,
  Dumbbell,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Industry = {
  icon: typeof Building2;
  name: string;
  headline: string;
  body: string;
  flow: string[];
  details: {
    intro: string;
    examples: { title: string; desc: string }[];
    outcomes: string[];
  };
};

const industries: Industry[] = [
  {
    icon: Building2,
    name: "Real Estate",
    headline: "Close site visits faster.",
    body: "Send rich property cards, schedule site visits and auto-log responses against the Lead record.",
    flow: ["Property card sent via WhatsApp", "Lead replies with preferred visit time", "Salesforce creates Event automatically"],
    details: {
      intro:
        "Brokers and developers run on speed. WBConnect+ turns every WhatsApp inbound into a CRM-tracked opportunity and lets agents send brochures, floor plans and visit invites without leaving Salesforce.",
      examples: [
        { title: "Property broadcast", desc: "Broadcast 3-BHK listings to a saved-search audience with WhatsApp image carousels." },
        { title: "Site visit booking via WhatsApp Flow", desc: "WhatsApp Flow collects name, preferred date and property type and Salesforce creates an Event automatically." },
        { title: "Post-visit follow-up automation", desc: "Automation sends a feedback template 2 hours after the visit and replies update Opportunity stage." },
      ],
      outcomes: ["3.2 times more booked site visits", "65% faster lead first response", "Zero leakage between marketing and sales"],
    },
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    headline: "Reduce no-shows by 40%.",
    body: "Appointment reminders, prescription refills and pre-visit forms — synced to the Patient object.",
    flow: ["Appointment reminder sent via WhatsApp", "Patient confirms appointment", "Status updated to Confirmed"],
    details: {
      intro:
        "Hospitals and clinics use WBConnect+ to remind, confirm and triage patients on a channel they actually open — while keeping every interaction inside their EHR-linked Salesforce org.",
      examples: [
        { title: "Pre-visit intake WhatsApp Flow", desc: "Patient fills symptoms, allergies and insurance details inside a WhatsApp Flow and data is pushed to the Patient record." },
        { title: "Appointment reminders", desc: "WhatsApp template fires 24 hours before with quick replies for Confirm, Reschedule or Cancel and updates the Appointment object." },
        { title: "Prescription refill requests", desc: "Quick-reply button triggers an automated refill template routed to the assigned pharmacist." },
      ],
      outcomes: ["40% fewer no-shows", "Faster triage with structured intake", "HIPAA-friendly with bring-your-own S3"],
    },
  },
  {
    icon: ShoppingBag,
    name: "E-commerce and Retail",
    headline: "Recover abandoned carts.",
    body: "Trigger cart recovery, order updates and post-purchase NPS — all from your Salesforce Orders.",
    flow: ["Cart abandoned", "WhatsApp recovery offer sent", "Customer completes checkout"],
    details: {
      intro:
        "Turn WhatsApp into a revenue channel. Recover carts, confirm orders, share tracking and run post-purchase NPS — all tied to the Order and Customer records.",
      examples: [
        { title: "Cart recovery via WhatsApp", desc: "Automation sends a 10 percent off template 1 hour after abandonment with a deep link back to checkout." },
        { title: "Order tracking updates", desc: "Status changes in Salesforce push templated WhatsApp updates to the customer in real time." },
        { title: "Post-purchase NPS WhatsApp Flow", desc: "WhatsApp Flow collects star rating and comment 7 days after delivery, written back to the Order record." },
      ],
      outcomes: ["12 to 18 percent cart recovery uplift", "5 times higher CSAT response rate versus email", "Direct attribution to revenue"],
    },
  },
  {
    icon: GraduationCap,
    name: "Education",
    headline: "Engage students at scale.",
    body: "Admission updates, fee reminders and broadcast announcements native to your Education Cloud.",
    flow: ["Application received", "Documents requested via WhatsApp", "Admission confirmed"],
    details: {
      intro:
        "From inquiry to alumni, run the entire student lifecycle on WhatsApp without losing a single touchpoint inside Education Cloud.",
      examples: [
        { title: "Application WhatsApp Flow", desc: "Prospect fills program, intake and contact details inside a WhatsApp Flow and a Lead is created in Education Cloud." },
        { title: "Document collection via WhatsApp", desc: "Quick-reply triggers a follow-up template that lists pending documents per applicant." },
        { title: "Fee payment reminders", desc: "Scheduled broadcast 5 days before due date with a Pay Now CTA button." },
      ],
      outcomes: ["2 times faster application-to-admit cycle", "90 percent or more open rate on fee reminders", "Lower call centre load"],
    },
  },
  {
    icon: Plane,
    name: "Travel and Hospitality",
    headline: "Be the concierge in their pocket.",
    body: "Booking confirmations, check-in reminders, upgrades and on-trip support — all on WhatsApp.",
    flow: ["Booking confirmed via WhatsApp", "Check-in reminder sent", "Upgrade accepted"],
    details: {
      intro:
        "Airlines, hotels and OTAs use WBConnect+ to handle the entire journey — from search to post-stay review — without making the guest install another app.",
      examples: [
        { title: "Check-in WhatsApp Flow", desc: "Guest picks seat and room preferences inside WhatsApp 24 hours before arrival." },
        { title: "Upsell automation via WhatsApp", desc: "Quick-reply on the confirmation template offers a paid upgrade with one-tap acceptance." },
        { title: "On-trip WhatsApp support", desc: "Live agent handover from the Global Chat Window with full booking context." },
      ],
      outcomes: ["+22% ancillary revenue", "Lower call centre minutes per booking", "Higher review scores"],
    },
  },
  {
    icon: Banknote,
    name: "Banking and Financial Services",
    headline: "Onboard, Service and Cross-Sell.",
    body: "KYC collection, statement delivery, loan offers and dispute handling — secured inside your CRM.",
    flow: ["KYC link sent via WhatsApp", "Documents submitted", "Account activated"],
    details: {
      intro:
        "Banks, NBFCs and insurers run secure customer journeys on WhatsApp with full audit trails inside Salesforce Financial Services Cloud.",
      examples: [
        { title: "KYC WhatsApp Flow", desc: "Customer uploads PAN and Aadhaar inside a WhatsApp Flow and files land in your S3 bucket with references on the Salesforce record." },
        { title: "Loan pre-approval via WhatsApp", desc: "Personalised template with eligible amount and an Apply quick-reply that triggers the loan application automation." },
        { title: "Statement delivery via WhatsApp", desc: "Monthly statement template with a secure deep link that opens an authenticated portal." },
      ],
      outcomes: ["50% faster KYC turnaround", "Higher cross-sell conversion", "Full regulatory audit trail"],
    },
  },
  {
    icon: Car,
    name: "Automotive",
    headline: "From test drive to service.",
    body: "Test drive booking, finance offers, delivery updates and service reminders — all on one number.",
    flow: ["Test drive booked via WhatsApp", "Finance offer sent", "Delivery scheduled"],
    details: {
      intro:
        "Dealerships and OEMs use WBConnect+ to nurture leads from the showroom inquiry through ownership and service.",
      examples: [
        { title: "Test drive booking WhatsApp Flow", desc: "Customer chooses model, dealership and slot and the appointment is created in Salesforce." },
        { title: "Service reminder via WhatsApp", desc: "Automation 11 months after delivery suggests next service with a Book Now button." },
        { title: "Personalised finance offers on WhatsApp", desc: "Personalised EMI template per lead with an Apply quick-reply button." },
      ],
      outcomes: ["+30% test drive show-up rate", "Higher service retention", "Centralised conversation history per VIN"],
    },
  },
  {
    icon: Utensils,
    name: "Food and Delivery",
    headline: "Orders, OTPs and Feedback.",
    body: "Take orders, send delivery OTPs and capture feedback — all inside WhatsApp.",
    flow: ["WhatsApp menu sent to customer", "Order placed via WhatsApp", "Delivery OTP shared"],
    details: {
      intro:
        "Cloud kitchens and restaurant chains use WBConnect+ for direct ordering, freeing them from aggregator commissions.",
      examples: [
        { title: "WhatsApp Menu Flow", desc: "Customer browses categories, adds items and confirms order inside a WhatsApp Flow." },
        { title: "Delivery OTP via WhatsApp", desc: "Utility template fires when the rider is 5 minutes away." },
        { title: "Post-delivery Feedback WhatsApp Flow", desc: "Star rating and comment captured 30 minutes after delivery." },
      ],
      outcomes: ["Higher repeat-order rate", "Lower aggregator dependence", "Real-time CSAT"],
    },
  },
  {
    icon: Dumbbell,
    name: "Fitness and Wellness",
    headline: "Class Bookings and Member Retention.",
    body: "Class schedules, trainer chat, renewal reminders and progress check-ins on WhatsApp.",
    flow: ["Class slots sent via WhatsApp", "Member books a class", "Reminder fires automatically"],
    details: {
      intro:
        "Gyms, studios and wellness apps cut churn by staying in touch on the channel members actually open.",
      examples: [
        { title: "Class booking WhatsApp Flow", desc: "Member picks studio, class and slot and the booking is pushed to Salesforce." },
        { title: "Membership renewal nudge via WhatsApp", desc: "Personalised template with a renew now CTA 7 days before expiry." },
        { title: "Direct trainer WhatsApp chat", desc: "Direct line to assigned trainer, logged on the member record in Salesforce." },
      ],
      outcomes: ["Lower churn", "Higher class fill-rate", "Personalised at scale"],
    },
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    headline: "Client Communications, Organised.",
    body: "Consultations, document requests, status updates and invoices — every message tied to the matter.",
    flow: ["Consultation booked via WhatsApp", "Documents requested", "Invoice shared on WhatsApp"],
    details: {
      intro:
        "Law firms, accounting practices and consultancies use WBConnect+ so partners and associates can talk to clients on WhatsApp without losing the audit trail.",
      examples: [
        { title: "Consultation booking WhatsApp Flow", desc: "Prospective client picks practice area, urgency and slot inside a WhatsApp Flow." },
        { title: "Document collection via WhatsApp", desc: "Quick-reply triggers a templated checklist of pending documents." },
        { title: "Matter status updates via WhatsApp", desc: "Status changes auto-notify the client with a personalised templated update." },
      ],
      outcomes: ["Faster matter turnaround", "Cleaner audit trail", "Higher client satisfaction"],
    },
  },
];

export function Industries() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const pendingActive = useRef(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Fade header in with IntersectionObserver (no Framer Motion)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Item = industries[active];
  const Icon = Item.icon;

  const handleTabChange = (i: number) => {
    if (i === active) return;
    pendingActive.current = i;
    setVisible(false);
    // After fade-out (200ms), swap content and fade back in
    setTimeout(() => {
      setActive(pendingActive.current);
      setVisible(true);
    }, 200);
  };

  return (
    <section id="industries" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="text-center max-w-5xl mx-auto"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <div className="text-xs font-semibold tracking-wider uppercase text-[#2BB5D4]">Industries</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900">
            Built for the way <span className="text-gradient-brand">your team</span> sells and supports.
          </h2>
          <p className="mt-4 text-slate-600">
            From real estate to financial services, teams across industries run their WhatsApp Business playbooks inside Salesforce with WBConnect+. Designed for teams that depend on fast customer communication and consistent follow-ups.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {industries.map((ind, i) => (
            <button
              key={ind.name}
              onClick={() => handleTabChange(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${i === active
                ? "bg-[#2BB5D4] text-white shadow-md shadow-[#2BB5D4]/30"
                : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                }`}
            >
              <ind.icon className="h-3.5 w-3.5" />
              {ind.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-8 items-stretch">
          {/* Text panel — CSS fade/slide transition */}
          <div
            className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
              willChange: 'opacity, transform',
            }}
          >
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] grid place-items-center text-white">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-slate-900">{Item.headline}</h3>
            <p className="mt-3 text-slate-600">{Item.body}</p>
            <button
              onClick={() => setOpen(true)}
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#2BB5D4] hover:gap-2 transition-all"
            >
              See full use case <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Flow panel — CSS fade/slide transition */}
          <div
            className="rounded-3xl glass p-8 shadow-xl shadow-slate-200/40 flex flex-col items-center justify-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.25s ease 0.04s, transform 0.25s ease 0.04s',
              willChange: 'opacity, transform',
            }}
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 text-center w-full">
              Example WhatsApp Flow / Automation
            </div>
            <ol className="mt-5 space-y-4 w-full">
              {Item.flow.map((step, idx) => (
                <li key={step} className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-[#22C55E] text-white text-xs font-bold grid place-items-center flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="rounded-xl bg-white px-4 py-3 text-sm text-slate-800 shadow-sm border border-slate-100 flex-1 text-center">
                    {step}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#2BB5D4] to-[#22C55E] grid place-items-center text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#2BB5D4]">{Item.name}</div>
                <DialogTitle className="text-2xl">{Item.headline}</DialogTitle>
              </div>
            </div>
            <DialogDescription className="pt-3 text-slate-600 text-base">
              {Item.details.intro}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Example playbooks
            </div>
            <div className="space-y-2">
              {Item.details.examples.map((ex) => (
                <div key={ex.title} className="rounded-xl border border-slate-200 p-3">
                  <div className="font-semibold text-slate-900 text-sm">{ex.title}</div>
                  <div className="text-sm text-slate-600 mt-0.5">{ex.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Typical outcomes
            </div>
            <ul className="space-y-1.5">
              {Item.details.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
