"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden text-white pt-24 lg:pt-28 pb-10 lg:pb-8 min-h-screen flex items-center">
      {/* Background handled by global AppBackground */}

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
              <span className="block text-primary-200">
                {t.home.heroTitle.split(" ").slice(0, 3).join(" ")}
              </span>
              <span className="block text-primary-300">
                {t.home.heroTitle.split(" ").slice(3).join(" ")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl text-primary-200/90 max-w-xl mx-auto lg:mx-0"
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
              <span className="text-sm md:text-base text-primary-200/80">
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
            <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl bg-primary-800/80 backdrop-blur-sm p-6 border-2 border-primary-400/60 shadow-[0_0_20px_rgba(56,189,248,0.22)]">
              <div className="relative mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-50/90">
                    {t.home.heroBadgeLabel}
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">
                    {t.home.heroCardTitle}
                  </p>
                </div>
                <Image
                  src="/logo.jpg"
                  alt="Shamal Recruitment logo"
                  width={48}
                  height={48}
                  className="rounded-full border border-primary-100 shadow-md shadow-primary-900/30"
                />
              </div>

              <div className="relative grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl bg-white/10 px-4 py-3">
                  <p className="text-xs font-medium text-primary-50/90">
                    {t.home.heroExperienceLabel}
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-white">
                    {t.home.heroExperienceYears}
                  </p>
                  <p className="text-xs text-primary-100/90">
                    {t.home.heroExperienceBody}
                  </p>
                </div>
                <div className="rounded-2xl bg-primary-900/90 text-primary-50 px-4 py-3">
                  <p className="text-xs font-medium text-primary-100/90">
                    {t.home.heroCandidatesLabel}
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-white">
                    {t.home.heroCandidatesTitle}
                  </p>
                  <p className="text-xs text-primary-100/90">
                    {t.home.heroCandidatesBody}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-3 col-span-2">
                  <p className="text-xs font-medium text-primary-50/90">
                    {t.home.heroRegionLabel}
                  </p>
                  <p className="mt-1 text-sm text-primary-100/90">
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

