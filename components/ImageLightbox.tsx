"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  maidId: string;
  maidName: string;
  onInquire?: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  maidId,
  maidName,
  onInquire,
}: ImageLightboxProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const header = document.querySelector("header") as HTMLElement | null;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (header) {
        header.style.opacity = "0";
        header.style.pointerEvents = "none";
      }
    } else {
      document.body.style.overflow = "unset";
      if (header) {
        header.style.opacity = "";
        header.style.pointerEvents = "";
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      if (header) {
        header.style.opacity = "";
        header.style.pointerEvents = "";
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const handlePrevious = () => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onNavigate((currentIndex + 1) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black bg-opacity-100 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Previous image"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Next image"
            >
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Image container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center px-4 pb-32"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={images[currentIndex] || "/helpers/placeholder.svg"}
                alt={`${maidName} - Photo ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute top-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
                {currentIndex + 1} / {images.length}
              </div>
            )}

            {/* Inquire button */}
            <div className="absolute bottom-24">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onInquire) {
                    onInquire();
                  } else {
                    // Fallback: close lightbox and let parent handle
                    onClose();
                  }
                }}
                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
              >
                {t.maids.inquire}
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 overflow-x-auto">
              <div className="flex gap-2 justify-center">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(index);
                    }}
                    className={`relative w-20 h-20 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                      index === currentIndex
                        ? "border-primary-500 scale-110"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

