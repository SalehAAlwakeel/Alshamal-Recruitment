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

  const handleImageClick = () => {
    if (maid.photos.length > 0) {
      setCurrentImageIndex(0);
      setLightboxOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {/* Maid ID at the top */}
        <div className="bg-primary-50 px-4 py-2 border-b border-primary-100">
          <p className="text-sm font-mono font-semibold text-primary-700">
            {maidDisplayId}
          </p>
        </div>
        
        {/* Photo */}
        <div
          className="relative h-64 w-full cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src={maid.photos[0] || "/maids/placeholder.svg"}
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
            className="block w-full bg-primary-600 text-white text-center px-4 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
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
        maidId={maidDisplayId}
        maidName={maid.name}
        onInquire={() => {
          setLightboxOpen(false);
          setInquiryModalOpen(true);
        }}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        maidId={maidDisplayId}
      />
    </>
  );
}

