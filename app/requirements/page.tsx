"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RequirementsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Recruitment requirements section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-primary-900 via-primary-900/95 to-primary-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              {t.home.requirementsTitle}
            </h1>
            <p className="text-sm md:text-base text-primary-100/90 max-w-3xl mx-auto">
              {t.home.requirementsSubtitle}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Documents card */}
            <div className="rounded-[32px] bg-primary-800/70 border border-primary-600/60 shadow-xl shadow-black/40 px-6 py-8 md:px-10 md:py-10 text-primary-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-extrabold">
                  {t.home.requirementsDocsTitle}
                </h2>
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
            <div className="rounded-[32px] bg-primary-800/70 border border-primary-600/60 shadow-xl shadow-black/40 px-6 py-8 md:px-10 md:py-10 text-primary-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-extrabold">
                  {t.home.requirementsVisaTitle}
                </h2>
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

      {/* Musaned section */}
      <section className="pt-8 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-primary-900 via-primary-900/95 to-primary-900">
        <div className="container mx-auto px-4 space-y-16">
          <div className="rounded-[40px] bg-white/95 shadow-xl shadow-primary-950/20 border border-gray-100 px-6 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-extrabold text-primary-900">
                {t.home.musanedTitle}
              </h2>
              <p className="text-sm md:text-base text-primary-900 leading-relaxed">
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

          {/* Requirements explanatory video */}
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 text-center">
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1">
                {language === "ar"
                  ? "فيديو توضيحي عن متطلبات الاستقدام"
                  : "Requirements walkthrough video"}
              </h3>
              <p className="text-xs md:text-sm text-primary-100/90">
                {language === "ar"
                  ? "شاهد هذا الفيديو لمعرفة الخطوات والمتطلبات بالتفصيل."
                  : "Watch this video to understand the steps and requirements in detail."}
              </p>
            </div>
            <div className="relative w-full overflow-hidden rounded-3xl border border-primary-900/40 shadow-2xl shadow-black/60 bg-black/60 pt-[56.25%]">
              <iframe
                src="https://www.youtube.com/embed/wlLjqeDDi2Y"
                title="Recruitment requirements explainer"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


