"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const PHONE_NUMBERS = [
    "+966552006060",
    "+966591307777",
    "+966543632000",
    "+966562019199",
  ];

  const formatPhone = (e164: string) => {
    const m = e164.match(/^\+966(\d{2})(\d{3})(\d{4})$/);
    if (m) return `+966 ${m[1]} ${m[2]} ${m[3]}`;
    return e164;
  };

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">{t.officeName}</h3>
            <p className="text-gray-300 mb-4">
              {t.footer.tagline}
            </p>
            <div className="mt-4">
              <a
                href="https://www.instagram.com/alshamalksa_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-primary-400 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@alshamalksa_</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t.footer.contactUs}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <div className="flex items-start gap-2">
                  <span className="font-semibold">{t.footer.phone}:</span>
                  <div className="flex flex-col gap-1">
                    {PHONE_NUMBERS.map((e164) => (
                      <a
                        key={e164}
                        href={`tel:${e164}`}
                        className="hover:text-white transition-colors"
                      >
                        <span
                          dir="ltr"
                          style={{ unicodeBidi: "plaintext" }}
                          className="inline-block"
                        >
                          {formatPhone(e164)}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <span className="font-semibold">{t.footer.whatsapp}:</span>
                  <div className="flex flex-col gap-1">
                    {PHONE_NUMBERS.map((e164) => (
                      <a
                        key={e164}
                        href={`https://wa.me/${e164.replace("+", "")}`}
                        className="hover:text-white transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span
                          dir="ltr"
                          style={{ unicodeBidi: "plaintext" }}
                          className="inline-block"
                        >
                          {formatPhone(e164)}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="mt-4">
                <p className="text-sm">
                  Floor 2, 6547 Uthman Ibn Affan Branch Rd<br />
                  Al Izdihar, Riyadh 12485<br />
                  Saudi Arabia
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/helpers" className="hover:text-white transition-colors">
                  {t.nav.browseMaids}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.nav.contactUs}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 {t.officeName}. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

