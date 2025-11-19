"use server";

import { nanoid } from "nanoid";
import { promises as fs } from "fs";
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

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/_{2,}/g, "_")
    .toLowerCase();
}

async function saveImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error("File size exceeds 2MB limit");
  }

  const ext = path.extname(file.name) || ".jpg";
  const sanitized = sanitizeFilename(path.basename(file.name, ext));
  const filename = `${sanitized}_${nanoid(8)}${ext}`;
  const filepath = path.join(process.cwd(), "public", "maids", filename);

  // Ensure directory exists
  const dir = path.dirname(filepath);
  await fs.mkdir(dir, { recursive: true });

  await fs.writeFile(filepath, buffer);
  return `/maids/${filename}`;
}

export async function createMaidAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const age = parseInt(formData.get("age") as string);
    const nationality = formData.get("nationality") as string;
    const etaDays = parseInt(formData.get("etaDays") as string);
    const hasExperience = formData.get("hasExperience") === "true";
    const yearsExperience = formData.get("yearsExperience")
      ? parseInt(formData.get("yearsExperience") as string)
      : undefined;
    const notes = (formData.get("notes") as string) || undefined;

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
        const photoPath = await saveImage(file);
        photos.push(photoPath);
      }
    }

    if (hasExperience && !yearsExperience) {
      throw new Error("Years of experience is required when experience is Yes");
    }

    const maidData = {
      name,
      age,
      nationality,
      etaDays,
      hasExperience,
      yearsExperience: hasExperience ? yearsExperience : undefined,
      photos,
      notes,
    };

    const validated = maidSchema.parse(maidData);

    // Generate stable maid ID
    const allMaids = await getMaids();
    const maidId = generateNextMaidId(allMaids);

    const maid: Maid = {
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
    const name = formData.get("name") as string;
    const age = parseInt(formData.get("age") as string);
    const nationality = formData.get("nationality") as string;
    const etaDays = parseInt(formData.get("etaDays") as string);
    const hasExperience = formData.get("hasExperience") === "true";
    const yearsExperience = formData.get("yearsExperience")
      ? parseInt(formData.get("yearsExperience") as string)
      : undefined;
    const notes = (formData.get("notes") as string) || undefined;
    const existingPhotos = JSON.parse(
      (formData.get("existingPhotos") as string) || "[]"
    ) as string[];

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
        const photoPath = await saveImage(file);
        newPhotos.push(photoPath);
      }
    }

    const photos = [...existingPhotos, ...newPhotos];

    if (photos.length === 0) {
      throw new Error("At least one photo is required");
    }

    if (hasExperience && !yearsExperience) {
      throw new Error("Years of experience is required when experience is Yes");
    }

    const maidData = {
      name,
      age,
      nationality,
      etaDays,
      hasExperience,
      yearsExperience: hasExperience ? yearsExperience : undefined,
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
    await deleteMaid(id);
    revalidatePath("/maids");
    revalidatePath("/admin/maids");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

