const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const dataDir = path.join(process.cwd(), "data");
const maidsFile = path.join(dataDir, "maids.json");

const seedMaids = [
  {
    id: nanoid(),
    name: "Maria Santos",
    age: 28,
    nationality: "Philippines",
    etaDays: 14,
    hasExperience: true,
    yearsExperience: 5,
    photos: ["/maids/placeholder.svg"],
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
    photos: ["/maids/placeholder.svg"],
    notes: "Specializes in childcare and cleaning",
  },
  {
    id: nanoid(),
    name: "Grace Wanjiru",
    age: 26,
    nationality: "Kenya",
    etaDays: 10,
    hasExperience: false,
    photos: ["/maids/placeholder.svg"],
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
    photos: ["/maids/placeholder.svg"],
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
    photos: ["/maids/placeholder.svg"],
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
    photos: ["/maids/placeholder.svg"],
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
    photos: ["/maids/placeholder.svg"],
    notes: "Experienced in large household management",
  },
  {
    id: nanoid(),
    name: "Nakato Kintu",
    age: 25,
    nationality: "Uganda",
    etaDays: 15,
    hasExperience: false,
    photos: ["/maids/placeholder.svg"],
    notes: "Fast learner and reliable",
  },
];

async function seed() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(maidsFile, JSON.stringify(seedMaids, null, 2), "utf-8");
    console.log("✅ Seeded maids.json with", seedMaids.length, "entries");
    console.log("📝 Note: Update photo paths in data/maids.json after adding images to public/maids/");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seed();

