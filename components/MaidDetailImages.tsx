"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";
import InquiryModal from "./InquiryModal";
import { useLanguage } from "@/contexts/LanguageContext";

interface MaidDetailImagesProps {
  photos: string[];
  maidId: string;
  maidName: string;
}

export default function MaidDetailImages({
  photos,
  maidId,
  maidName,
}: MaidDetailImagesProps) {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="relative h-96 md:h-full">
        <div
          className="relative h-full w-full cursor-pointer"
          onClick={() => handleImageClick(0)}
        >
          <Image
            src={photos[0] || "/maids/placeholder.svg"}
            alt={maidName}
            fill
            className="object-cover"
          />
          {photos.length > 1 && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded">
              {t.maids.clickToView} ({photos.length})
            </div>
          )}
        </div>
      </div>

      {/* Additional photos */}
      {photos.length > 1 && (
        <div className="p-8 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t.maids.additionalPhotos}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.slice(1).map((photo, index) => (
              <div
                key={index}
                className="relative h-48 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleImageClick(index + 1)}
              >
                <Image
                  src={photo}
                  alt={`${maidName} - Photo ${index + 2}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <ImageLightbox
        images={photos}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentImageIndex}
        maidId={maidId}
        maidName={maidName}
        onInquire={() => {
          setLightboxOpen(false);
          setInquiryModalOpen(true);
        }}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        maidId={maidId}
      />
    </>
  );
}

