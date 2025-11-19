"use client";

import Hero from "@/components/Hero";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div>
      <Hero />
      <section className="bg-white">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] items-start">
            {/* Text content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900 mb-2">
                {t.home.title}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600 rounded-full mb-4" />
              {language === "ar" ? (
                <p className="text-lg text-gray-700 leading-relaxed">
                  <span className="text-blue-600 font-semibold">
                    {t.officeName}
                  </span>{" "}
                  {t.home.description1}
                </p>
              ) : (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t.home.description1}
                </p>
              )}
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.home.description2}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.home.description3}
              </p>
            </div>

            {/* Highlight cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-primary-100 bg-primary-50/80 p-5 shadow-sm">
                <p className="text-sm font-semibold text-primary-700 mb-1">
                  {t.home.whyChooseTitle}
                </p>
                <p className="text-sm text-primary-900">
                  {t.home.whyChooseBody}
                </p>
              </div>
              <div className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-primary-700 mb-1">
                  {t.home.processTitle}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-700 list-disc list-inside">
                  <li>{t.home.processStep1}</li>
                  <li>{t.home.processStep2}</li>
                  <li>{t.home.processStep3}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

