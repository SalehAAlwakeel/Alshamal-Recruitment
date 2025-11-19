"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import MaidDetailImages from "./MaidDetailImages";
import InquiryModal from "./InquiryModal";
import type { Maid } from "@/types/maid";

interface MaidDetailContentProps {
  maid: Maid;
  maidDisplayId: string;
}

export default function MaidDetailContent({
  maid,
  maidDisplayId,
}: MaidDetailContentProps) {
  const { t } = useLanguage();
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/maids"
        className="text-primary-600 hover:text-primary-700 mb-4 inline-block"
      >
        {t.maids.backToMaids}
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <MaidDetailImages
              photos={maid.photos}
              maidId={maidDisplayId}
              maidName={maid.name}
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{maid.name}</h1>
            <div className="space-y-4 mb-6">
              <div>
                <span className="font-semibold text-gray-700">{t.maids.maidId}:</span>{" "}
                <span className="text-gray-600 font-mono">{maidDisplayId}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">{t.maids.age}:</span>{" "}
                <span className="text-gray-600">{maid.age}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">{t.maids.nationality}:</span>{" "}
                <span className="text-gray-600">{maid.nationality}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">{t.maids.eta}:</span>{" "}
                <span className="text-gray-600">{maid.etaDays} {t.maids.days}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">{t.maids.experience}:</span>{" "}
                <span className="text-gray-600">
                  {maid.hasExperience ? t.maids.yes : t.maids.no}
                </span>
              </div>
              {maid.hasExperience && maid.yearsExperience && (
                <div>
                  <span className="font-semibold text-gray-700">
                    {t.maids.yearsExperience}:
                  </span>{" "}
                  <span className="text-gray-600">{maid.yearsExperience} {t.maids.years}</span>
                </div>
              )}
              {maid.notes && (
                <div>
                  <span className="font-semibold text-gray-700">{t.maids.notes}:</span>
                  <p className="text-gray-600 mt-1">{maid.notes}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setInquiryModalOpen(true)}
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              {t.maids.inquire}
            </button>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        maidId={maidDisplayId}
      />
    </div>
  );
}

