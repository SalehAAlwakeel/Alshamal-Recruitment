"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();

  const countries = [
    {
      code: "PH",
      flag: "🇵🇭",
      image: "/flag/philippines.png",
      nameEn: "Philippines",
      nameAr: "الفلبين",
      active: true,
    },
    {
      code: "LK",
      flag: "🇱🇰",
      image: "/flag/SriLanka.png",
      nameEn: "Sri Lanka",
      nameAr: "سريلانكا",
      active: false,
    },
    {
      code: "IN",
      flag: "🇮🇳",
      image: "/flag/India.png",
      nameEn: "India",
      nameAr: "الهند",
      active: false,
    },
    {
      code: "ET",
      flag: "🇪🇹",
      image: "/flag/Ethiopia.png",
      nameEn: "Ethiopia",
      nameAr: "إثيوبيا",
      active: true,
    },
    {
      code: "KE",
      flag: "🇰🇪",
      image: "/flag/Kenya.png",
      nameEn: "Kenya",
      nameAr: "كينيا",
      active: true,
    },
    {
      code: "UG",
      flag: "🇺🇬",
      image: "/flag/Uganda.jpg",
      nameEn: "Uganda",
      nameAr: "أوغندا",
      active: true,
    },
    {
      code: "BD",
      flag: "🇧🇩",
      image: "/flag/Bangladesh.png",
      nameEn: "Bangladesh",
      nameAr: "بنغلاديش",
      active: false,
    },
  ];

  const countriesScrollRef = useRef<HTMLDivElement | null>(null);
  const isHoveringCountries = useRef(false);

  const steps = [
    {
      number: "01",
      title: t.home.processStepCard1Title,
      body: t.home.processStepCard1Body,
    },
    {
      number: "02",
      title: t.home.processStepCard2Title,
      body: t.home.processStepCard2Body,
    },
    {
      number: "03",
      title: t.home.processStepCard3Title,
      body: t.home.processStepCard3Body,
    },
    {
      number: "04",
      title: t.home.processStepCard4Title,
      body: t.home.processStepCard4Body,
    },
    {
      number: "05",
      title: t.home.processStepCard5Title,
      body: t.home.processStepCard5Body,
    },
    {
      number: "06",
      title: t.home.processStepCard6Title,
      body: t.home.processStepCard6Body,
    },
    {
      number: "07",
      title: t.home.processStepCard7Title,
      body: t.home.processStepCard7Body,
    },
    {
      number: "08",
      title: t.home.processStepCard8Title,
      body: t.home.processStepCard8Body,
    },
  ];

  const aboutBadges = [
    {
      key: "support",
      ar: "دعم عملاء على مدار الساعة",
      en: "24/7 customer support",
    },
    {
      key: "licensed",
      ar: "مرخَّصون ومتواجدون في منصة مساند",
      en: "Licensed • on Musaned",
    },
    {
      key: "guarantee",
      ar: "ضمان ٣ أشهر للعمالة",
      en: "3‑month guarantee",
    },
    {
      key: "delivery",
      ar: "توصيل العمالة إلى المنزل",
      en: "Home delivery available",
    },
  ];

  // Auto-scroll countries row: every 3s move one card to the right, loop forever
  useEffect(() => {
    const container = countriesScrollRef.current;
    if (!container) return;

    const getStepSize = () => {
      const firstCard = container.firstElementChild as HTMLElement | null;
      if (!firstCard) return 260;

      const style = window.getComputedStyle(container);
      const gap =
        parseFloat(style.columnGap || style.gap || "0") ||
        parseFloat(style.rowGap || "0") ||
        24;

      return firstCard.offsetWidth + gap;
    };

    const intervalId = window.setInterval(() => {
      const el = countriesScrollRef.current;
      if (!el || isHoveringCountries.current) return;

      if (el.scrollWidth <= el.clientWidth) return;

      const stepSize = getStepSize();
      const maxScroll = el.scrollWidth - el.clientWidth;
      const nextLeft = el.scrollLeft + stepSize;

      if (nextLeft >= maxScroll - 1) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({ left: nextLeft, behavior: "smooth" });
      }
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen">
      <section className="min-h-screen flex items-stretch">
        <div className="flex-1">
          <Hero />
        </div>
      </section>

      <section className="pt-4 lg:pt-6 pb-16 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto border-y border-white/15 py-10 lg:py-14">
            {/* Text content */}
            <div className="space-y-6 text-center">
              <div
                className={`flex items-center gap-3 mb-4 justify-center ${
                  language === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  {t.home.title}
                </h2>
                <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/5 border border-primary-200/60 overflow-hidden">
                  <Image
                    src="/logo.jpg"
                    alt={t.officeName}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="mx-auto h-1 w-24 bg-gradient-to-r from-primary-400 via-primary-200 to-primary-400 rounded-full mb-4" />
              {language === "ar" ? (
                <p className="text-lg text-primary-200/90 leading-relaxed">
                  <span className="text-blue-300 font-semibold">
                    {t.officeName}
                  </span>{" "}
                  {t.home.description1}
                </p>
              ) : (
                <p className="text-lg text-primary-200/90 leading-relaxed">
                  {t.home.description1}
                </p>
              )}
              <p className="text-lg text-primary-200/90 leading-relaxed">
                {t.home.description2}
              </p>
              <p className="text-lg text-primary-200/90 leading-relaxed">
                {t.home.description3}
              </p>

              {/* Feature badges under About text (pills) */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-primary-100/90">
                {aboutBadges.map((badge) => (
                  <span
                    key={badge.key}
                    className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 border border-primary-200/60 shadow-sm shadow-primary-950/30"
                  >
                    {language === "ar" ? badge.ar : badge.en}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-primary-900 via-primary-900/95 to-primary-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                {t.home.countriesTitle}
              </h2>
              <p className="text-sm md:text-base text-primary-100/90 max-w-2xl">
                {t.home.countriesSubtitle}
              </p>
            </div>
            <Link
              href="/maids"
              className="inline-flex items-center justify-center rounded-full bg-white text-primary-800 px-6 py-3 text-sm md:text-base font-semibold shadow-lg shadow-primary-900/40 hover:bg-primary-50 transition-colors"
            >
              {t.nav.browseMaids}
            </Link>
          </div>

          <div
            ref={countriesScrollRef}
            onMouseEnter={() => {
              isHoveringCountries.current = true;
            }}
            onMouseLeave={() => {
              isHoveringCountries.current = false;
            }}
            className="countries-scroll flex gap-6 md:gap-8 overflow-x-auto pb-2"
          >
            {countries.map((country) => {
              const name =
                language === "ar" ? country.nameAr : country.nameEn;
              const isActive = country.active;
              return (
                <motion.div
                  key={country.code}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 24px 60px rgba(7, 7, 51, 0.65)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative overflow-hidden rounded-3xl bg-primary-800/80 p-6 md:p-7 shadow-md border border-primary-700/70 cursor-pointer min-w-[220px] sm:min-w-[240px] md:min-w-[260px] ${
                    isActive ? "" : "opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-50 to-primary-200 text-5xl shadow-md shadow-primary-900/20 overflow-hidden">
                      {isActive && country.image ? (
                        <Image
                          src={country.image}
                          alt={name}
                          fill
                          className={
                            country.code === "UG"
                              ? "object-cover scale-[1.25]"
                              : country.code === "PH"
                              ? "object-cover scale-110"
                              : "object-cover"
                          }
                        />
                      ) : null}
                    </div>
                  </div>
                  <p className="text-base md:text-lg font-bold text-white text-center mb-2">
                    {name}
                  </p>
                  <p className="text-xs md:text-sm text-primary-100/90 text-center mb-4">
                    {t.home.countryCardSubtitle}
                  </p>
                  {isActive ? (
                    <div className="flex justify-center">
                      <Link
                        href="/maids"
                        className="inline-flex items-center justify-center rounded-full bg-primary-600 text-white px-5 py-2 text-xs md:text-sm font-semibold shadow-sm hover:bg-primary-700 transition-colors group-hover:shadow-primary-900/40"
                      >
                        {language === "ar" ? "اطلب الآن" : "View candidates"}
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1 mt-4">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200/80 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <path d="M12 2a5 5 0 00-5 5v2H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 7V7a3 3 0 016 0v2H9zm-1 3h8a1 1 0 011 1v4.5a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5V13a1 1 0 011-1z" />
                        </svg>
                      </div>
                      <p className="text-[11px] md:text-xs text-gray-400">
                        {language === "ar" ? "قريباً" : "Coming soon"}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process steps grid */}
      <section className="min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {t.home.processGridTitle}
            </h2>
            <p className="text-sm md:text-base text-primary-100/90">
              {t.home.processGridSubtitle}
            </p>
          </div>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative overflow-hidden rounded-2xl bg-primary-800/80 p-6 shadow-xl shadow-black/60 border border-primary-700/70"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-primary-50 text-sm font-extrabold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-sm text-primary-100/90 text-center leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment requirements section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-primary-900 via-primary-900/95 to-primary-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              {t.home.requirementsTitle}
            </h2>
            <p className="text-sm md:text-base text-primary-100/90 max-w-3xl mx-auto">
              {t.home.requirementsSubtitle}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Documents card */}
            <div className="relative overflow-hidden rounded-[32px] bg-primary-800/80 border border-primary-600/70 shadow-xl shadow-black/40 px-6 py-8 md:px-10 md:py-10 text-primary-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-extrabold">
                  {t.home.requirementsDocsTitle}
                </h3>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600/90 text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M7 2a2 2 0 0 0-2 2v16l7-3 7 3V4a2 2 0 0 0-2-2H7z" />
                  </svg>
                </div>
              </div>
              <p className="mb-4 text-sm md:text-base">
                {language === "ar"
                  ? "لتقديم طلب إصدار تأشيرة الاستقدام عبر برنامج مساند، تأكد من توفر ما يلي:"
                  : "To request a recruitment visa through Musaned, make sure you have:"}
              </p>
              <ul className="space-y-2 text-sm md:text-base leading-relaxed list-decimal list-inside">
                <li>
                  {language === "ar"
                    ? "الهوية الوطنية أو الإقامة للمقيمين."
                    : "National ID (for citizens) or residence permit (for residents)."}
                </li>
                <li>
                  {language === "ar"
                    ? "تعريف بالراتب من جهة العمل أو كشف حساب بنكي يثبت القدرة المالية."
                    : "Salary certificate from employer or bank statement proving financial capability."}
                </li>
                <li>
                  {language === "ar"
                    ? "بيانات عقد الاستقدام عبر مساند وسداد الرسوم المطلوبة."
                    : "Musaned recruitment contract details and proof of fee payment."}
                </li>
              </ul>
            </div>

            {/* Visa card */}
            <div className="relative overflow-hidden rounded-[32px] bg-primary-800/80 border border-primary-600/70 shadow-xl shadow-black/40 px-6 py-8 md:px-10 md:py-10 text-primary-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-extrabold">
                  {t.home.requirementsVisaTitle}
                </h3>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600/90 text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M4 4h16v4H4zm0 6h16v4H4zm0 6h10v4H4z" />
                  </svg>
                </div>
              </div>
              <p className="mb-4 text-sm md:text-base">
                {language === "ar"
                  ? "خطوات إصدار التأشيرة عبر منصة مساند:"
                  : "Steps to issue the visa through Musaned:"}
              </p>
              <ul className="space-y-2 text-sm md:text-base leading-relaxed list-decimal list-inside">
                <li>
                  {language === "ar"
                    ? "الدخول إلى منصة مساند بحسابك وتعبئة بيانات الطلب واختيار الدولة والمهنة."
                    : "Log in to Musaned, fill in the request details, and choose the country and profession."}
                </li>
                <li>
                  {language === "ar"
                    ? "التحقق من صحة البيانات وإرفاق المستندات المطلوبة."
                    : "Verify your information and upload the required documents."}
                </li>
                <li>
                  {language === "ar"
                    ? "الإقرار بالمعلومات الصحيحة وسداد الرسوم لإصدار التأشيرة إلكترونياً."
                    : "Confirm the information, pay the fees, and issue the visa electronically."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

          {/* Musaned section (last content section, same background as requirements) */}
          <section className="pt-8 pb-16 lg:pt-10 lg:pb-20 bg-gradient-to-b from-primary-900 via-primary-900/95 to-primary-900">
            <div className="container mx-auto px-4 space-y-16">
              {/* Musaned card */}
              <div className="relative overflow-hidden rounded-[40px] bg-primary-800/80 shadow-xl shadow-black/60 border border-primary-700/70 px-6 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                {t.home.musanedTitle}
              </h2>
              <p className="text-sm md:text-base text-white/90 leading-relaxed">
                {t.home.musanedBody}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Link
                href="https://www.musaned.com.sa/ar/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-3xl bg-white border border-gray-200 shadow-md shadow-primary-900/15 hover:bg-primary-50 transition-colors overflow-hidden"
              >
                <Image
                  src="/Externalcoop/musaned-logo.png"
                  alt="Musaned logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Office location map */}
      <section className="pt-10 pb-16 lg:pt-12 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-3xl border border-primary-900/40 shadow-2xl h-72 md:h-96">
            <iframe
              src="https://www.google.com/maps?q=Floor+2,+6547+Uthman+Ibn+Affan+Branch+Rd,+Al+Izdihar,+Riyadh+12485,+Saudi+Arabia&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

