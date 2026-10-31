"use client";
// Client lead form. Submits to /api/lead (Next.js Route Handler).
// On Vercel this becomes a serverless function automatically.
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  span?: 1 | 2;
  placeholder?: string;
  textarea?: boolean;
};

type Props = {
  formKind: "cma" | "contact";
  intro?: string;
  submitLabel?: string;
};

const CMA_FIELDS: Field[] = [
  { name: "name", label: "Name", required: true, span: 1, placeholder: "Full name" },
  { name: "email", label: "Email", type: "email", required: true, span: 1, placeholder: "you@email.com" },
  { name: "phone", label: "Phone", type: "tel", required: true, span: 1, placeholder: "(408) 000-0000" },
  { name: "address", label: "Property address", required: true, span: 1, placeholder: "Street, city" },
];

const CONTACT_FIELDS: Field[] = [
  { name: "name", label: "Name", required: true, span: 1, placeholder: "Full name" },
  { name: "email", label: "Email", type: "email", required: true, span: 1, placeholder: "you@email.com" },
  { name: "phone", label: "Phone", type: "tel", required: false, span: 2, placeholder: "(408) 000-0000" },
  {
    name: "message",
    label: "How can Joey help?",
    required: true,
    span: 2,
    placeholder: "Briefly tell Joey what you're looking for",
    textarea: true,
  },
];

export default function LeadForm({ formKind, intro, submitLabel }: Props) {
  const fields = formKind === "cma" ? CMA_FIELDS : CONTACT_FIELDS;
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const payload: Record<string, string> = { formKind };
    formData.forEach((v, k) => { payload[k] = String(v); });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      setDone(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call (408) 613-7001."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="border border-gold/40 bg-gold/[0.06] p-8 md:p-12 text-center">
        <Check className="w-10 h-10 text-gold mx-auto" strokeWidth={1.4} />
        <h3 className="display-serif text-2xl md:text-[1.9rem] text-navy mt-5">
          Thank you.
        </h3>
        <p className="mt-3 text-stone-700 max-w-md mx-auto">
          Joey will reach out personally within one business day. For anything
          urgent, call{" "}
          <a href="tel:+14086137001" className="text-gold underline underline-offset-4">
            (408) 613-7001
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2" noValidate>
      {intro && <p className="text-stone-600 mb-8 text-[0.98rem]">{intro}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
        {fields.map((f) => (
          <div key={f.name} className={f.span === 2 ? "sm:col-span-2" : ""}>
            <label
              htmlFor={`field-${formKind}-${f.name}`}
              className="block eyebrow text-stone-500 mb-2"
            >
              {f.label}
              {f.required && <span className="text-gold ml-1">*</span>}
            </label>
            {f.textarea ? (
              <textarea
                id={`field-${formKind}-${f.name}`}
                name={f.name}
                required={f.required}
                placeholder={f.placeholder}
                rows={4}
                className="input-field resize-none"
              />
            ) : (
              <input
                id={`field-${formKind}-${f.name}`}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                placeholder={f.placeholder}
                className="input-field"
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-600 pt-4">{error}</p>
      )}

      <div className="pt-8">
        <button type="submit" disabled={submitting} className="btn-gold disabled:opacity-50">
          {submitting ? "Sending…" : (submitLabel ?? "Submit")}
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
        <p className="mt-5 text-xs text-stone-500 max-w-md">
          By submitting, you agree to be contacted by Joey De Leon regarding
          your real estate needs. Your information is never shared.
        </p>
      </div>
    </form>
  );
}
