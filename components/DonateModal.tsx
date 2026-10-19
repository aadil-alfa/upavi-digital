"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Heart,
  X,
  ShieldCheck,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DonateModal({
  open,
  onClose,
}: DonateModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock background scrolling and manage focus.
  useEffect(() => {
    if (!open) return;

    previousActiveElement.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      previousActiveElement.current?.focus();
    };
  }, [open]);

  // Close the modal with Escape.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Keep keyboard focus inside the modal.
  const handleModalKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key !== "Tab") return;

    const focusableElements =
      modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );

    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement =
      focusableElements[focusableElements.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-slate-950/70 px-3 py-4 backdrop-blur-md sm:items-center sm:px-5 sm:py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
          onTouchStart={(event) => {
            if (event.target === event.currentTarget) {
              // Allows outside interaction without blocking modal scrolling.
            }
          }}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-modal-title"
            aria-describedby="donate-modal-description"
            onKeyDown={handleModalKeyDown}
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 16,
              scale: 0.98,
            }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative my-auto w-full max-w-md overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-2xl sm:rounded-[30px]"
          >
            {/* BRAND ACCENT */}
            <div className="absolute inset-x-0 top-0 h-1 bg-[#038C0E]" />

            {/* CLOSE BUTTON */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={handleClose}
              aria-label="Close donation dialog"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-[#038C0E]/20 sm:right-5 sm:top-5"
            >
              <X size={19} />
            </button>

            <div className="max-h-[calc(100dvh-32px)] overflow-y-auto px-5 pb-6 pt-8 sm:max-h-[calc(100dvh-64px)] sm:px-8 sm:pb-8 sm:pt-10">
              {/* HEADING */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.08,
                    type: "spring",
                    stiffness: 250,
                    damping: 18,
                  }}
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#038C0E]/10 text-[#038C0E]"
                >
                  <Heart size={27} strokeWidth={1.8} />
                </motion.div>

                <h2
                  id="donate-modal-title"
                  className="mt-4 pr-8 text-2xl font-black tracking-tight text-slate-900 sm:mt-5 sm:text-3xl"
                >
                  Support UPAVI
                </h2>

                <p
                  id="donate-modal-description"
                  className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500"
                >
                  Your contribution helps us organize cultural
                  events, academic initiatives, and student
                  welfare activities.
                </p>
              </div>

              {/* DONATION QR CODE */}
              <div className="mt-6 flex justify-center sm:mt-7">
                <div className="rounded-[22px] border border-slate-200 bg-white p-2.5 shadow-[0_12px_35px_rgba(15,23,42,0.08)] sm:p-3">
                  <Image
                    src="/image/SADIQQR.jpeg"
                    alt="Scan this QR code to donate to UPAVI"
                    width={270}
                    height={270}
                    priority
                    className="h-auto w-full max-w-[230px] rounded-xl object-contain sm:max-w-[250px]"
                  />
                </div>
              </div>

              {/* PAYMENT INSTRUCTIONS */}
              <div className="mt-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                  Scan to Donate
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Use a supported UPI payment app.
                </p>
              </div>

              {/* OPTIONAL DETAILS */}
              <div className="mt-6 space-y-3">
                <div>
                  <label
                    htmlFor="donor-name"
                    className="mb-1.5 block text-xs font-semibold text-slate-600"
                  >
                    Name
                    <span className="ml-1 font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <input
                    id="donor-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#038C0E]/50 focus:bg-white focus:ring-4 focus:ring-[#038C0E]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="donor-phone"
                    className="mb-1.5 block text-xs font-semibold text-slate-600"
                  >
                    Phone Number
                    <span className="ml-1 font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>

                  <input
                    id="donor-phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#038C0E]/50 focus:bg-white focus:ring-4 focus:ring-[#038C0E]/10"
                  />
                </div>
              </div>

              {/* CLOSE / DONATION ACKNOWLEDGEMENT */}
              <button
                type="button"
                onClick={handleClose}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#038C0E] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#038C0E]/15 transition-colors hover:bg-[#02730B] focus:outline-none focus:ring-4 focus:ring-[#038C0E]/25"
              >
                <Check
                  size={17}
                  className="transition-transform group-hover:scale-110"
                />

                <span>I've Donated</span>

                <span aria-hidden="true">❤️</span>
              </button>

              {/* PRIVACY / THANK YOU NOTE */}
              <div className="mt-4 flex items-start justify-center gap-1.5 text-center">
                <ShieldCheck
                  size={13}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                <p className="text-[10px] leading-5 text-slate-400">
                  Thank you for supporting the UPAVI community.
                  Your details are not submitted by this form.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

