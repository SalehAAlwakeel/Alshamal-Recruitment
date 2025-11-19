"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40">
      {/* Vibrant blurred bar behind the header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-primary-700/40 via-primary-500/30 to-primary-700/40 blur-2xl" />

      <nav className="relative bg-white/90 backdrop-blur-md border-b border-primary-100 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-6">
            {/* Logo + name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-primary-500/70 shadow-md shadow-primary-900/20">
                <Image
                  src="/logo.jpg"
                  alt="Shamal Recruitment Logo"
                  fill
                  className="object-cover"
                  style={{ backgroundColor: "transparent" }}
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-500 group-hover:text-primary-600 transition-colors">
                  Shamal
                </span>
                <span className="text-lg md:text-xl font-extrabold text-primary-800">
                  {t.officeName}
                </span>
              </div>
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-4 md:gap-6">
              <Link
                href="/"
                className="text-sm md:text-base font-medium text-primary-900/80 hover:text-primary-700 transition-colors"
              >
                {t.nav.home}
              </Link>
              <Link
                href="/maids"
                className="text-sm md:text-base font-medium text-primary-900/80 hover:text-primary-700 transition-colors"
              >
                {t.nav.browseMaids}
              </Link>
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-4 py-2 text-sm md:text-base font-semibold text-white shadow-md shadow-primary-900/30 hover:from-primary-400 hover:to-primary-600 transition-colors"
              >
                {t.nav.contactUs}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

