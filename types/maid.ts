export type Maid = {
  id: string; // nanoid
  maidId?: string; // Stable display ID (MAID0001, MAID0002, etc.)
  name: string;
  age: number;
  nationality: string;
  etaDays: number; // days to arrive
  hasExperience: boolean;
  yearsExperience?: number; // required if hasExperience
  photos: string[]; // /maids/filename.jpg
  notes?: string;
};

