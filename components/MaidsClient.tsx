"use client";

import { useState, useMemo } from "react";
import type { Maid } from "@/types/maid";
import { getMaidDisplayId } from "@/lib/utils";
import MaidCard from "./MaidCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface MaidsClientProps {
  initialMaids: Maid[];
}

export default function MaidsClient({ initialMaids }: MaidsClientProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMaids = useMemo(() => {
    if (!searchQuery.trim()) {
      return initialMaids;
    }
    return initialMaids.filter((maid) => {
      const maidDisplayId = getMaidDisplayId(maid, initialMaids);
      return maidDisplayId.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [initialMaids, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          {t.maids.title}
        </h1>
        <p className="text-sm md:text-base text-primary-100/80">
          {t.maids.headerTagline}
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-md mb-8">
        <label className="block text-sm font-medium text-gray-800 mb-2">
          {t.maids.searchLabel}
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.maids.searchPlaceholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
        />
      </div>

      {/* Results count */}
      <p className="text-white/80 mb-4">
        {t.maids.showing} {filteredMaids.length} {t.maids.of} {initialMaids.length} {t.maids.maids}
      </p>

      {/* Grid */}
      {filteredMaids.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMaids.map((maid) => (
            <MaidCard
              key={maid.id}
              maid={maid}
              maidDisplayId={getMaidDisplayId(maid, initialMaids)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">{t.maids.noResults}</p>
        </div>
      )}
    </div>
  );
}

