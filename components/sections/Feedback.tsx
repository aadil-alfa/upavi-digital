"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";

export default function Feedback() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSending(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      firstName: String(formData.get("firstName") ?? ""),
      lastName: String(formData.get("lastName") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message.");
      }

      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });

      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section
      id="feedback"
      className="bg-[#F8F7F4] px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#038C0E]">
            Your Voice Matters
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Send Us Your Feedback
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Have a suggestion, question, or idea for UPAVI?
            We would love to hear from you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 md:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="feedback-first-name"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                First Name <span className="text-red-600">*</span>
              </label>

              <input
                id="feedback-first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Enter your first name"
                required
                maxLength={80}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#038C0E] focus:ring-4 focus:ring-[#038C0E]/10"
              />
            </div>

            <div>
              <label
                htmlFor="feedback-last-name"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Last Name <span className="text-red-600">*</span>
              </label>

              <input
                id="feedback-last-name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Enter your last name"
                required
                maxLength={80}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#038C0E] focus:ring-4 focus:ring-[#038C0E]/10"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="feedback-email"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Email Address <span className="text-red-600">*</span>
            </label>

            <input
              id="feedback-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              maxLength={254}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#038C0E] focus:ring-4 focus:ring-[#038C0E]/10"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="feedback-message"
              className="mb-2 block text-sm font-semibold text-slate-800"
            >
              Message <span className="text-red-600">*</span>
            </label>

            <textarea
              id="feedback-message"
              name="message"
              placeholder="Write your message here..."
              required
              minLength={10}
              maxLength={5000}
              rows={6}
              className="w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-[#038C0E] focus:ring-4 focus:ring-[#038C0E]/10"
            />
          </div>

          {status && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-5 rounded-lg p-4 text-sm ${
                status.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#038C0E] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#02730B] focus:outline-none focus:ring-4 focus:ring-[#038C0E]/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                  <ArrowUpRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
          <CheckCircle2 size={15} className="text-[#038C0E]" />
          Your feedback helps us improve the UPAVI community.
        </div>
      </div>
    </section>
  );
}