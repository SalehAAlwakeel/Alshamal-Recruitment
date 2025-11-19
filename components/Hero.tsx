"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden text-white py-20 lg:py-24">
      {/* Animated background layers */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 opacity-80" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary-400/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary-300/20 blur-3xl animate-float-slower" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_55%)]" />

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text block */}
          <div className="text-center lg:text-start space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              <span className="block text-primary-100/90">
                {t.home.heroTitle.split(" ").slice(0, 3).join(" ")}
              </span>
              <span className="block text-primary-200">
                {t.home.heroTitle.split(" ").slice(3).join(" ")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl text-primary-100/90 max-w-xl mx-auto lg:mx-0"
            >
              {t.home.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/maids"
                className="inline-flex items-center justify-center rounded-full bg-white text-primary-800 px-8 py-3 text-base md:text-lg font-semibold shadow-lg shadow-primary-900/40 hover:bg-primary-50 transition-colors"
              >
                {t.home.heroButton}
              </Link>
              <span className="text-sm md:text-base text-primary-100/80">
                {t.home.heroTagline}
              </span>
            </motion.div>
          </div>

          {/* Right-side highlight block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="mx-auto max-w-md rounded-3xl bg-white/95 backdrop-blur-sm p-6 shadow-2xl shadow-primary-950/40 ring-1 ring-primary-100">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-500">
                    {t.home.heroBadgeLabel}
                  </p>
                  <p className="mt-1 text-lg font-bold text-primary-900">
                    {t.home.heroCardTitle}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 font-extrabold text-lg">
                  SR
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-primary-50/80 px-4 py-3">
                  <p className="text-xs font-medium text-primary-500">
                    {t.home.heroExperienceLabel}
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-primary-900">
                    {t.home.heroExperienceYears}
                  </p>
                  <p className="text-xs text-primary-700/80">
                    {t.home.heroExperienceBody}
                  </p>
                </div>
                <div className="rounded-2xl bg-primary-900 text-primary-50 px-4 py-3">
                  <p className="text-xs font-medium text-primary-200">
                    {t.home.heroCandidatesLabel}
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-white">
                    {t.home.heroCandidatesTitle}
                  </p>
                  <p className="text-xs text-primary-100/90">
                    {t.home.heroCandidatesBody}
                  </p>
                </div>
                <div className="rounded-2xl bg-primary-100/80 px-4 py-3 col-span-2">
                  <p className="text-xs font-medium text-primary-700">
                    {t.home.heroRegionLabel}
                  </p>
                  <p className="mt-1 text-sm text-primary-900">
                    {t.home.heroRegionBody}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

