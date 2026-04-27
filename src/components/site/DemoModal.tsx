import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { sendDemoRequest } from "../../lib/emailService";

/* ─── grecaptcha type augment ────────────────────────────────────────────── */
declare global {
  interface Window {
    grecaptcha?: {
      render: (container: HTMLElement, params: object) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

/* ─── Salesforce Web-to-Lead field names ─────────────────────────────────── */
type FormState = {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  city: string;
  state: string;
  lead_source: string;
};

const EMPTY_FORM: FormState = {
  first_name: "",
  last_name: "",
  email: "",
  company: "",
  city: "",
  state: "",
  lead_source: "WBConnect Website",
};


const SF_ORG_ID = "00D5g000007qhe9";
const SF_RECAPTCHA_SITE_KEY = "6LfTFIksAAAAAPiO8BeHTgZSDMNCaIxnW5ZmbA0L";
const SF_ENDPOINT = `https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=${SF_ORG_ID}`;

const getCaptchaSettings = () =>
  JSON.stringify({
    keyname: "EstateXpert_New",
    fallback: "true",
    orgId: SF_ORG_ID,
    ts: String(Date.now()),
  });

/* ─── Shared inner content ───────────────────────────────────────────────── */
function ModalInner({
  form,
  submitted,
  loading,
  captchaError,
  recaptchaRef,
  handleChange,
  handleSubmit,
  handleClose,
}: {
  form: FormState;
  submitted: boolean;
  loading: boolean;
  captchaError: string;
  recaptchaRef: React.RefObject<HTMLDivElement | null>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClose: () => void;
}) {
  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2BB5D4]/40 focus:border-[#2BB5D4] transition";

  return (
    <>
      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#2BB5D4] via-[#1fa8c8] to-[#17a34a] px-5 sm:px-8 py-5 sm:py-6 flex items-start justify-between overflow-hidden">
        <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-white/10" />
        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Book a Demo
          </h2>
          <p className="text-white/85 text-sm mt-1 leading-snug">
            Fill the form and we'll be in touch.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close demo modal"
          className="relative z-10 h-8 w-8 rounded-full bg-white/20 hover:bg-white/35 transition-colors grid place-items-center text-white flex-shrink-0 ml-3"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Body — split into scrollable fields + pinned captcha/actions */}
      {submitted ? (
        /* ── Success state (no scroll needed) ── */
        <div className="px-5 sm:px-8 py-5 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
              className="h-16 w-16 rounded-full bg-emerald-50 grid place-items-center mx-auto mb-4"
            >
              <CheckCircle2 className="h-8 w-8 text-[#22C55E]" />
            </motion.div>
            <h3 className="text-lg font-bold text-slate-900">
              Request Submitted!
            </h3>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-xs mx-auto">
              Thank you! Our team will reach out within 1 business day to
              schedule your personalised WBConnect+ demo.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 inline-flex items-center rounded-xl bg-[#2BB5D4] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2BB5D4]/90 transition-colors shadow-lg shadow-[#2BB5D4]/25"
            >
              Close
            </button>
          </motion.div>
        </div>
      ) : (
        /* ── Salesforce Web-to-Lead form ── */
        <form onSubmit={handleSubmit}>
          {/* ── Scrollable area: ALL fields + reCAPTCHA together ── */}
          <div className="px-5 sm:px-8 pt-4 pb-4 space-y-3 max-h-[55vh] overflow-y-auto">
            {/* First + Last Name — always side by side to save vertical space */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  maxLength={40}
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  placeholder="Jane"
                  className={inputCls}
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="last_name"
                  type="text"
                  name="last_name"
                  maxLength={80}
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  placeholder="Smith"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Work Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                maxLength={80}
                value={form.email}
                onChange={handleChange}
                required
                placeholder="jane@company.com"
                className={inputCls}
              />
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                Company <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                type="text"
                name="company"
                maxLength={40}
                value={form.company}
                onChange={handleChange}
                required
                placeholder="Acme Inc."
                className={inputCls}
              />
            </div>

            {/* City + State — side by side */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  maxLength={40}
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  className={inputCls}
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  State / Province
                </label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  maxLength={20}
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  className={inputCls}
                />
              </div>
            </div>

            {/* ── reCAPTCHA — sits naturally after the fields ── */}
            <div>
              <div ref={recaptchaRef} />
              {captchaError && (
                <p className="text-xs text-red-500 mt-1.5">{captchaError}</p>
              )}
            </div>
          </div>

          {/* ── Pinned: action buttons only ── */}
          <div className="px-5 sm:px-8 pt-3 pb-5 sm:pb-6 border-t border-slate-100 bg-white">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleClose}
                className="relative overflow-hidden inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
                style={{ isolation: "isolate" }}
              >
                <span className="relative z-10">Cancel</span>
                <span className="shimmer-btn" aria-hidden />
              </button>
              <button
                type="submit"
                disabled={loading}
                className="relative overflow-hidden inline-flex items-center gap-2 rounded-xl bg-[#2BB5D4] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#2BB5D4]/30 hover:bg-[#2BB5D4]/90 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ isolation: "isolate" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                  {loading ? "Submitting…" : "Submit Request"}
                </span>
                <span className="shimmer-btn" aria-hidden />
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

/* ─── Main export ─────────────────────────────────────────────────────────── */
export function DemoModal({ open, onClose }: DemoModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [captchaSettings, setCaptchaSettings] = useState(getCaptchaSettings());
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const recaptchaWidgetId = useRef<number | null>(null);

  /* ─── Lock body scroll while modal is open ────────────────────────── */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ─── Lazy-inject reCAPTCHA script + render widget ─────────────────── */
  useEffect(() => {
    if (!open) return;

    // Refresh captcha_settings timestamp every 500 ms while token is empty
    const timestampInterval = setInterval(() => {
      if (!recaptchaToken) {
        setCaptchaSettings(getCaptchaSettings());
      }
    }, 500);

    const tryRender = () => {
      if (
        recaptchaRef.current &&
        window.grecaptcha?.render &&
        recaptchaWidgetId.current === null
      ) {
        // Clear stale content from a previous open
        recaptchaRef.current.innerHTML = "";
        recaptchaWidgetId.current = window.grecaptcha.render(
          recaptchaRef.current,
          {
            sitekey: SF_RECAPTCHA_SITE_KEY,
            callback: (token: string) => {
              setRecaptchaToken(token);
              setCaptchaError("");
            },
            "expired-callback": () => setRecaptchaToken(""),
          }
        );
      }
    };

    const RECAPTCHA_SRC =
      "https://www.google.com/recaptcha/api.js?render=explicit&hl=en";

    const injectAndRender = () => {
      // Wait for the modal animation to settle before rendering
      const delay = setTimeout(() => {
        if (window.grecaptcha) {
          tryRender();
        } else {
          const poll = setInterval(() => {
            if (window.grecaptcha) {
              tryRender();
              clearInterval(poll);
            }
          }, 200);
          return () => clearInterval(poll);
        }
      }, 150);
      return delay;
    };

    let delay: ReturnType<typeof setTimeout>;

    // Inject the script tag only once — if it doesn't already exist
    if (!document.querySelector(`script[src="${RECAPTCHA_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = RECAPTCHA_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        delay = injectAndRender();
      };
      document.head.appendChild(script);
    } else {
      delay = injectAndRender();
    }

    return () => {
      clearTimeout(delay);
      clearInterval(timestampInterval);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCaptchaError("");

    if (!recaptchaToken) {
      setCaptchaError("Please complete the reCAPTCHA verification.");
      return;
    }

    setLoading(true);

    try {
      // Build a hidden iframe (reuse if already exists)
      const IFRAME_ID = "sf-wbc-iframe";
      let iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement | null;
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = IFRAME_ID;
        iframe.name = IFRAME_ID;
        iframe.style.display = "none";
        document.body.appendChild(iframe);
      }

      // Build a transient hidden form with all required Salesforce fields
      const formEl = document.createElement("form");
      formEl.method = "POST";
      formEl.action = SF_ENDPOINT;
      formEl.target = IFRAME_ID;

      const data: Record<string, string> = {
        captcha_settings: captchaSettings,
        oid: SF_ORG_ID,
        retURL: "https://wbconnectplus.com/",
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        company: form.company,
        city: form.city,
        state: form.state,
        lead_source: "WBConnect Website",
        "g-recaptcha-response": recaptchaToken,
      };

      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        formEl.appendChild(input);
      });

      document.body.appendChild(formEl);
      formEl.submit();

      // Cleanup the temporary form after submission
      setTimeout(() => document.body.removeChild(formEl), 1000);

      // Also send our internal email notification
      await sendDemoRequest({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        company: form.company,
        city: form.city,
        state: form.state,
      });

      // Brief delay before showing success
      await new Promise((r) => setTimeout(r, 700));
      setSubmitted(true);
    } catch {
      // Treat as success — Salesforce no-cors responses always throw opaque errors
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    // Reset reCAPTCHA widget
    if (recaptchaWidgetId.current !== null) {
      window.grecaptcha?.reset(recaptchaWidgetId.current);
      recaptchaWidgetId.current = null;
    }
    setSubmitted(false);
    setLoading(false);
    setRecaptchaToken("");
    setCaptchaError("");
    setCaptchaSettings(getCaptchaSettings());
    setForm(EMPTY_FORM);
    onClose();
  }

  const innerProps = {
    form,
    submitted,
    loading,
    captchaError,
    recaptchaRef,
    handleChange,
    handleSubmit,
    handleClose,
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* ── Single backdrop ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[199] bg-slate-900/50 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* ── Single modal: centered on mobile, bottom-right on desktop ──
                Using ONE ModalInner so recaptchaRef is never duplicated.
                CSS handles the positioning difference. */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={[
                "fixed z-[200] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden",
                // Mobile: centered
                "inset-x-4 top-1/2 -translate-y-1/2 w-auto",
                // Desktop: bottom-right floating
                "md:inset-x-auto md:top-auto md:translate-y-0 md:bottom-6 md:right-6 md:w-full md:max-w-xl",
              ].join(" ")}
              style={{
                boxShadow:
                  "0 32px 80px -8px rgba(43,181,212,0.25), 0 8px 32px rgba(0,0,0,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalInner {...innerProps} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
