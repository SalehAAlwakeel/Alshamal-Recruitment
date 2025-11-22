"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      <nav className="relative bg-primary-950/95 text-white backdrop-blur-xl border-b border-primary-900/70">
        <div className="w-full px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Logo + name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden ring-2 ring-primary-300/80 shadow-md shadow-black/40">
                <Image
                  src="/logo.jpg"
                  alt="Shamal Recruitment Logo"
                  fill
                  className="object-cover"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-200 group-hover:text-primary-100 transition-colors">
                  Shamal
                </span>
                <span className="text-lg md:text-xl font-extrabold text-white">
                  {t.officeName}
                </span>
              </div>
            </Link>

            {/* Desktop nav links centered */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-8">
              <Link
                href="/"
                className="px-2 text-sm md:text-base font-medium tracking-wide text-white/80 hover:text-white transition-colors"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/maids"
                className="px-2 text-sm md:text-base font-medium tracking-wide text-white/80 hover:text-white transition-colors"
              >
                {t.nav.browseMaids}
              </Link>
              <Link
                href="/requirements"
                className="px-2 text-sm md:text-base font-medium tracking-wide text-white/80 hover:text-white transition-colors"
              >
                {t.nav.requirements}
              </Link>
              <Link
                href="/contact"
                className="relative px-2 text-sm md:text-base font-medium tracking-wide text-white/80 hover:text-white transition-colors group"
              >
                <span>{t.nav.contactUs}</span>
                <span
                  className={`pointer-events-none absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 bg-primary-300 rounded-full transition-all duration-300 w-0 group-hover:w-10 ${
                    pathname === "/contact" ? "w-10" : ""
                  }`}
                />
              </Link>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Language switcher always visible */}
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>

              {/* Mobile burger */}
              <button
                type="button"
                aria-label="Toggle navigation menu"
                className="inline-flex items-center justify-center rounded-full border border-white/60 bg-transparent px-2.5 py-2 text-white shadow-sm md:hidden"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span className="sr-only">Menu</span>
                <div className="space-y-1">
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-white transition-transform ${
                      menuOpen ? "translate-y-1.5 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-white transition-opacity ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-white transition-transform ${
                      menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile side menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative ml-auto h-full w-64 bg-gradient-to-b from-slate-800 to-primary-950 text-white shadow-2xl flex flex-col gap-4 px-5 py-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-white/90">
                {t.officeName}
              </span>
              <button
                aria-label="Close menu"
                className="text-white/80"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-3 text-white">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                {t.nav.home}
              </Link>
              <Link href="/maids" onClick={() => setMenuOpen(false)}>
                {t.nav.browseMaids}
              </Link>
              <Link href="/requirements" onClick={() => setMenuOpen(false)}>
                {t.nav.requirements}
              </Link>
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                {t.nav.contactUs}
              </Link>
            </nav>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

