"use client";

import { useState } from "react";
import Image from "next/image";
import type { Maid } from "@/types/maid";
import ImageLightbox from "./ImageLightbox";
import InquiryModal from "./InquiryModal";
import { useLanguage } from "@/contexts/LanguageContext";

interface MaidCardProps {
  maid: Maid;
  maidDisplayId: string;
}

export default function MaidCard({ maid, maidDisplayId }: MaidCardProps) {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // Display ID in the form "ID 0001" instead of "MAID0001"
  const displayId = maidDisplayId.startsWith("MAID")
    ? `ID ${maidDisplayId.replace("MAID", "")}`
    : `ID ${maidDisplayId}`;

  const handleImageClick = () => {
    if (maid.photos.length > 0) {
      setCurrentImageIndex(0);
      setLightboxOpen(true);
    }
  };

  return (
    <>
      <div className="bg-primary-800/80 rounded-3xl border border-primary-700/70 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow text-primary-50">
        {/* Maid ID at the top */}
        <div className="bg-primary-900/70 px-4 py-2 border-b border-primary-700/80">
          <p className="text-sm font-mono font-semibold text-white/90">
            {displayId}
          </p>
        </div>
        
        {/* Photo */}
        <div
          className="relative h-64 w-full cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src={maid.photos[0] || "/helpers/placeholder.svg"}
            alt={maidDisplayId}
            fill
            className="object-cover"
          />
          {maid.photos.length > 1 && (
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              +{maid.photos.length - 1}
            </div>
          )}
        </div>
        
        {/* Inquire Button */}
        <div className="p-4">
          <button
            onClick={() => setInquiryModalOpen(true)}
            className="block w-full bg-white text-primary-800 text-center px-4 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-md shadow-primary-900/30"
          >
            {t.maids.inquire}
          </button>
        </div>
      </div>

      <ImageLightbox
        images={maid.photos}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentImageIndex}
        maidId={displayId}
        maidName={t.maids.maidId}
        onInquire={() => {
          setLightboxOpen(false);
          setInquiryModalOpen(true);
        }}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        maidId={displayId}
      />
    </>
  );
}

