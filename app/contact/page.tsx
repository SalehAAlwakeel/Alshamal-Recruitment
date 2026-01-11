"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const router = useRouter();
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t.contact.nameRequired;
    if (!formData.email.trim()) {
      newErrors.email = t.contact.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.emailInvalid;
    }
    if (!formData.phone.trim()) newErrors.phone = t.contact.phoneRequired;
    if (!formData.subject.trim()) newErrors.subject = t.contact.subjectRequired;
    if (!formData.message.trim()) newErrors.message = t.contact.messageRequired;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch {
      setErrors({ submit: t.contact.submitError });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {t.contact.thankYou}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {t.contact.successMessage}
          </p>
          <p className="text-sm text-gray-500">{t.contact.redirecting}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Map with office location */}
      <section className="mt-8">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-3xl border border-primary-900/30 shadow-lg h-64 md:h-80">
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
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">
            {t.contact.title}
          </h1>
          <p className="text-lg text-primary-100/90 mb-8 text-center">
            {t.contact.subtitle}
          </p>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.contact.name} {t.contact.required}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t.contact.name}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.contact.email} {t.contact.required}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t.contact.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.contact.phone} {t.contact.required}
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t.contact.phonePlaceholder}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.contact.subject} {t.contact.required}
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t.contact.subjectPlaceholder}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.contact.message} {t.contact.required}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder={t.contact.messagePlaceholder}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t.contact.sending : t.contact.sendMessage}
              </button>
            </form>
          </div>

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t.contact.otherWays}
            </h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start gap-2">
                <span className="font-semibold">{t.footer.phone}:</span>
                <div className="flex flex-col gap-1">
                  {PHONE_NUMBERS.map((e164) => (
                    <a
                      key={e164}
                      href={`tel:${e164}`}
                      className="text-primary-600 hover:text-primary-700"
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
              <div className="flex items-start gap-2">
                <span className="font-semibold">{t.footer.whatsapp}:</span>
                <div className="flex flex-col gap-1">
                  {PHONE_NUMBERS.map((e164) => (
                    <a
                      key={e164}
                      href={`https://wa.me/${e164.replace("+", "")}`}
                      className="text-primary-600 hover:text-primary-700"
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
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="font-semibold text-gray-800 mb-2">
                  {t.contact.location}:
                </p>
                <p className="text-gray-600">
                  Floor 2, 6547 Uthman Ibn Affan Branch Rd
                  <br />
                  Al Izdihar, Riyadh 12485
                  <br />
                  Saudi Arabia
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="font-semibold text-gray-800 mb-2">
                  {t.contact.followUs}:
                </p>
                <a
                  href="https://www.instagram.com/alshamalksa_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
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
          </div>
        </div>
      </div>
    </>
  );
}


