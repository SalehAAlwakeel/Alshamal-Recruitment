import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";
import type { Maid } from "@/types/maid";

const dataDir = path.join(process.cwd(), "data");
const maidsFile = path.join(dataDir, "maids.json");

const seedMaids: Maid[] = [
  {
    id: nanoid(),
    name: "Maria Santos",
    age: 28,
    nationality: "Philippines",
    etaDays: 14,
    hasExperience: true,
    yearsExperience: 5,
    photos: ["/maids/sample-1.jpg"],
    notes: "Experienced in household management and cooking",
  },
  {
    id: nanoid(),
    name: "Siti Nurhaliza",
    age: 32,
    nationality: "Indonesia",
    etaDays: 21,
    hasExperience: true,
    yearsExperience: 8,
    photos: ["/maids/sample-2.jpg"],
    notes: "Specializes in childcare and cleaning",
  },
  {
    id: nanoid(),
    name: "Grace Wanjiru",
    age: 26,
    nationality: "Kenya",
    etaDays: 10,
    hasExperience: false,
    photos: ["/maids/sample-3.jpg"],
    notes: "Eager to learn and adapt",
  },
  {
    id: nanoid(),
    name: "Hanna Tesfaye",
    age: 30,
    nationality: "Ethiopia",
    etaDays: 18,
    hasExperience: true,
    yearsExperience: 4,
    photos: ["/maids/sample-4.jpg"],
    notes: "Excellent cooking skills",
  },
  {
    id: nanoid(),
    name: "Priya Kumari",
    age: 29,
    nationality: "Sri Lanka",
    etaDays: 25,
    hasExperience: true,
    yearsExperience: 6,
    photos: ["/maids/sample-5.jpg"],
    notes: "Multilingual and experienced",
  },
  {
    id: nanoid(),
    name: "Saraswati Thapa",
    age: 27,
    nationality: "Nepal",
    etaDays: 12,
    hasExperience: true,
    yearsExperience: 3,
    photos: ["/maids/sample-6.jpg"],
    notes: "Friendly and hardworking",
  },
  {
    id: nanoid(),
    name: "Lakshmi Devi",
    age: 31,
    nationality: "India",
    etaDays: 20,
    hasExperience: true,
    yearsExperience: 7,
    photos: ["/maids/sample-7.jpg"],
    notes: "Experienced in large household management",
  },
  {
    id: nanoid(),
    name: "Nakato Kintu",
    age: 25,
    nationality: "Uganda",
    etaDays: 15,
    hasExperience: false,
    photos: ["/maids/sample-8.jpg"],
    notes: "Fast learner and reliable",
  },
];

async function seed() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(maidsFile, JSON.stringify(seedMaids, null, 2), "utf-8");
    console.log("✅ Seeded maids.json with", seedMaids.length, "entries");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seed();

