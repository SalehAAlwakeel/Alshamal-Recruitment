"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createMaidAction, updateMaidAction } from "@/app/actions/maids";
import type { Maid } from "@/types/maid";
import { getMaidDisplayId } from "@/lib/utils";

interface MaidFormProps {
  maid?: Maid | null;
  allMaids?: Maid[];
  onSuccess: () => void;
  onCancel: () => void;
}

const NATIONALITIES = [
  "Philippines",
  "Indonesia",
  "Kenya",
  "Ethiopia",
  "Sri Lanka",
  "Nepal",
  "India",
  "Uganda",
  "Other",
];

export default function MaidForm({ maid, allMaids = [], onSuccess, onCancel }: MaidFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    nationality: "",
    customNationality: "",
    etaDays: "",
    hasExperience: false,
    yearsExperience: "",
    notes: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (maid) {
      // Keep existing data for submission but don't show in form
      setFormData({
        name: maid.name,
        age: maid.age.toString(),
        nationality: NATIONALITIES.includes(maid.nationality)
          ? maid.nationality
          : "Other",
        customNationality:
          NATIONALITIES.includes(maid.nationality) ? "" : maid.nationality,
        etaDays: maid.etaDays.toString(),
        hasExperience: maid.hasExperience,
        yearsExperience: maid.yearsExperience?.toString() || "",
        notes: maid.notes || "",
      });
      setExistingPhotos(maid.photos);
    } else {
      // For new maids, show all fields
      setFormData({
        name: "",
        age: "",
        nationality: "",
        customNationality: "",
        etaDays: "",
        hasExperience: false,
        yearsExperience: "",
        notes: "",
      });
    }
  }, [maid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("age", formData.age);
      formDataToSend.append(
        "nationality",
        formData.nationality === "Other"
          ? formData.customNationality
          : formData.nationality
      );
      formDataToSend.append("etaDays", formData.etaDays);
      formDataToSend.append("hasExperience", formData.hasExperience.toString());
      if (formData.hasExperience) {
        formDataToSend.append("yearsExperience", formData.yearsExperience);
      }
      formDataToSend.append("notes", formData.notes);

      if (maid) {
        formDataToSend.append("existingPhotos", JSON.stringify(existingPhotos));
      }

      photos.forEach((photo) => {
        formDataToSend.append("photos", photo);
      });

      if (maid) {
        const result = await updateMaidAction(maid.id, formDataToSend);
        if (result.success) {
          onSuccess();
        } else {
          setErrors({ submit: result.error || "Failed to update maid" });
        }
      } else {
        const result = await createMaidAction(formDataToSend);
        if (result.success) {
          onSuccess();
        } else {
          setErrors({ submit: result.error || "Failed to create maid" });
        }
      }
    } catch (error: any) {
      setErrors({ submit: error.message || "An error occurred" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length + photos.length > 5) {
        setErrors({
          photos: "Maximum 5 photos allowed",
        });
        return;
      }
      setPhotos([...photos, ...files]);
      setErrors({});
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const removeExistingPhoto = (index: number) => {
    setExistingPhotos(existingPhotos.filter((_, i) => i !== index));
  };

  const totalPhotos = existingPhotos.length + photos.length;
  const canAddMore = totalPhotos < 5;

  const maidDisplayId = maid && allMaids.length > 0 
    ? getMaidDisplayId(maid, allMaids) 
    : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {maid ? "Edit Maid" : "Add New Maid"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Show Maid ID only when editing */}
            {maid && maidDisplayId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maid ID
                </label>
                <input
                  type="text"
                  value={maidDisplayId}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed font-mono"
                />
              </div>
            )}

            {/* Nationality (for both new and existing maids) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.nationality}
                onChange={(e) =>
                  setFormData({ ...formData, nationality: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select...</option>
                {NATIONALITIES.map((nat) => (
                  <option key={nat} value={nat}>
                    {nat}
                  </option>
                ))}
              </select>
              {formData.nationality === "Other" && (
                <input
                  type="text"
                  value={formData.customNationality}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customNationality: e.target.value,
                    })
                  }
                  placeholder="Enter nationality"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mt-2"
                  required
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos <span className="text-red-500">*</span> (1-5 images, max
                2MB each)
              </label>
              {existingPhotos.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm text-gray-600 mb-2">Existing photos:</p>
                  <div className="flex flex-wrap gap-2">
                    {existingPhotos.map((photo, index) => (
                      <div key={index} className="relative h-20 w-20">
                        <Image
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          fill
                          className="object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingPhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs z-10"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {photos.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm text-gray-600 mb-2">New photos:</p>
                  <div className="flex flex-wrap gap-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`New photo ${index + 1}`}
                          className="h-20 w-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {canAddMore && (
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  onChange={handlePhotoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              )}
              {errors.photos && (
                <p className="text-red-500 text-sm mt-1">{errors.photos}</p>
              )}
              {totalPhotos === 0 && (
                <p className="text-red-500 text-sm mt-1">
                  At least one photo is required
                </p>
              )}
            </div>

            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || totalPhotos === 0}
                className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Saving..."
                  : maid
                    ? "Update Maid"
                    : "Create Maid"}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

