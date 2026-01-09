"use server";

import { nanoid } from "nanoid";
import path from "path";
import { revalidatePath } from "next/cache";
import {
  createMaid,
  updateMaid,
  deleteMaid,
  getMaids,
  getMaidById,
} from "@/lib/data";
import { maidSchema } from "@/lib/validation";
import type { Maid } from "@/types/maid";
import { generateNextMaidId } from "@/lib/utils";
import { getSupabaseAdmin, SUPABASE_STORAGE_BUCKET } from "@/lib/supabaseAdmin";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/_{2,}/g, "_")
    .toLowerCase();
}

async function uploadImageToSupabase(file: File): Promise<string> {
  const supabaseAdmin = getSupabaseAdmin();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error("File size exceeds 2MB limit");
  }

  const ext = path.extname(file.name) || ".jpg";
  const sanitized = sanitizeFilename(path.basename(file.name, ext));
  const filename = `${sanitized}_${nanoid(8)}${ext}`;
  const objectPath = `maids/${filename}`;

  const { error } = await supabaseAdmin.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .upload(objectPath, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage
    .from(SUPABASE_STORAGE_BUCKET)
    .getPublicUrl(objectPath);

  return data.publicUrl;
}

function extractStorageObjectPath(publicUrl: string): string | null {
  // Expected format:
  // https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>
  const marker = `/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return publicUrl.slice(idx + marker.length);
}

export async function createMaidAction(formData: FormData) {
  try {
    const nationality = formData.get("nationality") as string;
    const notes = undefined;

    // Handle photo uploads
    const photoFiles = formData.getAll("photos") as File[];
    const photos: string[] = [];

    if (photoFiles.length === 0 || (photoFiles.length === 1 && !photoFiles[0].name)) {
      throw new Error("At least one photo is required");
    }

    for (const file of photoFiles) {
      if (file.name) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          throw new Error(
            `Invalid file type: ${file.type}. Allowed: jpg, png, webp`
          );
        }
        const photoPath = await uploadImageToSupabase(file);
        photos.push(photoPath);
      }
    }

    if (!nationality) {
      throw new Error("Nationality is required");
    }

    // We now auto-generate all other maid details.
    // Admin only chooses nationality and uploads photos.
    const maidData = {
      name: "Maid",
      age: 30,
      nationality,
      etaDays: 30,
      hasExperience: false,
      yearsExperience: undefined,
      photos,
      notes,
    };

    const validated = maidSchema.parse(maidData);

    // Generate stable maid ID
    const allMaids = await getMaids();
    const maidId = generateNextMaidId(allMaids);

    const maid: Maid = {
      // Not used for DB id (Supabase generates uuid), but kept for type compatibility
      id: nanoid(),
      maidId,
      ...validated,
    };

    await createMaid(maid);
    revalidatePath("/maids");
    revalidatePath("/admin/maids");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateMaidAction(id: string, formData: FormData) {
  try {
    const nationality = formData.get("nationality") as string;
    const notes = undefined;
    const existingPhotos = JSON.parse(
      (formData.get("existingPhotos") as string) || "[]"
    ) as string[];

    const existingMaid = await getMaidById(id);
    if (!existingMaid) {
      throw new Error("Maid not found");
    }

    // Handle new photo uploads
    const photoFiles = formData.getAll("photos") as File[];
    const newPhotos: string[] = [];

    for (const file of photoFiles) {
      if (file.name) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          throw new Error(
            `Invalid file type: ${file.type}. Allowed: jpg, png, webp`
          );
        }
        const photoPath = await uploadImageToSupabase(file);
        newPhotos.push(photoPath);
      }
    }

    const photos = [...existingPhotos, ...newPhotos];

    if (photos.length === 0) {
      throw new Error("At least one photo is required");
    }

    const maidData = {
      name: existingMaid.name,
      age: existingMaid.age,
      nationality,
      etaDays: existingMaid.etaDays,
      hasExperience: existingMaid.hasExperience,
      yearsExperience: existingMaid.yearsExperience,
      photos,
      notes,
    };

    const validated = maidSchema.parse(maidData);

    await updateMaid(id, validated);
    revalidatePath("/maids");
    revalidatePath("/admin/maids");
    revalidatePath(`/maids/${id}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMaidAction(id: string) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const maid = await getMaidById(id);
    if (maid?.photos?.length) {
      const objectPaths = maid.photos
        .map(extractStorageObjectPath)
        .filter((p): p is string => Boolean(p));
      if (objectPaths.length) {
        await supabaseAdmin.storage
          .from(SUPABASE_STORAGE_BUCKET)
          .remove(objectPaths);
      }
    }

    await deleteMaid(id);
    revalidatePath("/maids");
    revalidatePath("/admin/maids");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

