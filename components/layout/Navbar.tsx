"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ArrowUpRight, Menu, X } from "lucide-react";
import DonateModal from "@/components/DonateModal";

const GOOGLE_FORM_URL = "https://forms.gle/7c4nFZpz9qh4BAYy7";

const menuItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Gallery", id: "gallery" },
  { name: "Resources", id: "resources" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [donateOpen, setDonateOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      setScrolled(scrollY > 40);

      if (scrollY + windowHeight >= documentHeight - 80) {
        setActive("contact");
        return;
      }

      let currentSection = "home";
      let closestTop = Number.NEGATIVE_INFINITY;

      menuItems.forEach((item) => {
        if (item.id === "contact") return;

        const section = document.getElementById(item.id);

        if (!section) return;

        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY;

        if (
          scrollY + 140 >= sectionTop &&
          sectionTop > closestTop
        ) {
          closestTop = sectionTop;
          currentSection = item.id;
        }
      });

      setActive(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);

    if (id === "contact") {
      window.scrollTo({
        top: document.documentElement.scrollHeight - window.innerHeight,
        behavior: "smooth",
      });
      return;
    }

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleDonate = () => {
    setMobileMenuOpen(false);
    setDonateOpen(true);
  };

  const navClass = scrolled || mobileMenuOpen
    ? "border-b border-slate-200/80 bg-white/95 shadow-lg backdrop-blur-2xl"
    : "bg-transparent";

  const logoTextClass = scrolled || mobileMenuOpen
    ? "text-slate-900"
    : "text-white";

  const subtitleClass = scrolled || mobileMenuOpen
    ? "text-[#038C0E]"
    : "text-white/85";

  const donateClass = scrolled || mobileMenuOpen
    ? "border-[#038C0E]/30 bg-white text-[#038C0E] shadow-sm hover:bg-[#038C0E] hover:text-white"
    : "border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-[#038C0E]";

  const menuButtonClass = scrolled || mobileMenuOpen
    ? "text-slate-900 hover:bg-slate-100"
    : "bg-white/10 text-white hover:bg-white/20";

  return (
    <>
      <nav className={"fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 " + navClass}>
        <div className={"mx-auto flex h-[76px] max-w-[1450px] items-center justify-between gap-2 px-4 sm:h-20 sm:px-8 xl:px-12 " + (scrolled ? "xl:h-20" : "xl:h-24")}>

          {/* LOGO */}
          <a
            href="#home"
            onClick={(event) => scrollToSection(event, "home")}
            aria-label="UPAVI Home"
            className="group flex min-w-0 shrink items-center gap-2 sm:gap-3"
          >
            <Image
              src="/image/upavi black.png"
              alt="UPAVI Logo"
              width={78}
              height={78}
              priority
              className="h-11 w-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14 xl:h-[68px] xl:w-[68px]"
            />

            <div className="min-w-0">
              <h1 className={"text-[27px] font-black leading-none tracking-tight transition-colors sm:text-[34px] xl:text-[38px] " + logoTextClass}>
                ഉപവി
              </h1>

              <p className={"mt-1 whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.12em] transition-colors sm:text-[9px] sm:tracking-[0.25em] xl:text-[10px] xl:tracking-[0.38em] " + subtitleClass}>
                CUAP Malayali Association
              </p>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <ul className="hidden items-center gap-1 lg:flex">
            {menuItems.map((item) => {
              const isActive = active === item.id;

              let linkClass = "text-white/85 hover:text-white";

              if (scrolled) {
                linkClass = "text-slate-700 hover:text-[#038C0E]";
              }

              if (isActive) {
                linkClass = scrolled
                  ? "bg-[#038C0E]/10 text-[#038C0E]"
                  : "bg-white/15 text-white";
              }

              return (
                <li key={item.id}>
                  <a
                    href={"#" + item.id}
                    onClick={(event) => scrollToSection(event, item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={"block rounded-full px-4 py-3 text-sm font-semibold transition-colors xl:px-5 " + linkClass}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ACTION BUTTONS */}
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">

            {/* DONATE: ALWAYS VISIBLE */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDonate}
              aria-label="Donate to UPAVI"
              className={"flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-all sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm " + donateClass}
            >
              <Heart size={16} />
              <span>Donate</span>
            </motion.button>

            {/* DESKTOP JOIN BUTTON */}
            <motion.a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden items-center gap-2 rounded-full bg-[#038C0E] px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#02730B] lg:flex xl:px-6"
            >
              Join Us
              <ArrowUpRight size={16} />
            </motion.a>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((previous) => !previous)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors lg:hidden " + menuButtonClass}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={25} />}
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              key="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
            >
              <div className="max-h-[calc(100dvh-76px)] overflow-y-auto px-5 pb-6 pt-4 sm:px-8">

                <div className="space-y-1">
                  {menuItems.map((item, index) => {
                    const isActive = active === item.id;

                    return (
                      <motion.a
                        key={item.id}
                        href={"#" + item.id}
                        onClick={(event) => scrollToSection(event, item.id)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        aria-current={isActive ? "location" : undefined}
                        className={"flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors " + (isActive ? "bg-[#038C0E]/10 text-[#038C0E]" : "text-slate-700 hover:bg-slate-50 hover:text-[#038C0E]")}
                      >
                        <span>{item.name}</span>

                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-[#038C0E]" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>

                {/* MOBILE JOIN BUTTON */}
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#038C0E] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#02730B]"
                >
                  Join UPAVI
                  <ArrowUpRight size={17} />
                </a>

                <p className="mt-4 text-center text-xs text-slate-400">
                  CUAP Malayali Association
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* DONATE MODAL */}
      <DonateModal
        open={donateOpen}
        onClose={() => setDonateOpen(false)}
      />
    </>
  );
}
