"use server";

import { setAuthCookie, removeAuthCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/validation";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Check if admin password is configured
  if (!adminPassword) {
    console.error("ERROR: ADMIN_PASSWORD is not set in environment variables");
    console.error("Please create .env.local file with: ADMIN_PASSWORD=your_password");
    throw new Error("Server configuration error: Admin password not configured. Please contact the administrator.");
  }

  // Validate input
  if (!password) {
    throw new Error("Password is required");
  }

  try {
    const validated = loginSchema.parse({ password });
    
    // Compare passwords
    if (validated.password === adminPassword) {
      await setAuthCookie();
      redirect("/admin/maids");
    } else {
      throw new Error("Invalid password. Please check your password and try again.");
    }
  } catch (error: any) {
    // Handle Next.js redirect (which throws an error, but it's actually success)
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error; // Let the redirect happen
    }
    // Re-throw other errors with their messages
    throw error;
  }
}

export async function logoutAction() {
  await removeAuthCookie();
  redirect("/admin");
}
