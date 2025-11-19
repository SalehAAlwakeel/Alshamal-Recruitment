# Shamal Recruitment Website

A production-quality, locally-runnable recruitment website for domestic help services in Saudi Arabia.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **TailwindCSS** + PostCSS + Autoprefixer
- **Framer Motion** for animations
- **Zod** for input validation
- **File-based persistence** (JSON files)
- **ESLint** + **Prettier** for code quality

## Prerequisites

- Node.js 18+ and npm
- A code editor (VS Code recommended)

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   echo "ADMIN_PASSWORD=changeme" > .env.local
   ```
   Or manually create `.env.local` with:
   ```
   ADMIN_PASSWORD=changeme
   ```
   ⚠️ **Important:** Change the password to something secure before deploying!

3. **Seed initial data (optional):**
   ```bash
   npm run seed
   ```
   This will create `data/maids.json` with 8 sample maid entries.

4. **Add sample images (optional):**
   Place sample images in `public/maids/` directory:
   - `sample-1.jpg` through `sample-8.jpg`
   - Or use your own images and update the photo paths in `data/maids.json`

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Main site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin
   - Default password: `changeme` (from `.env.local`)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions
│   ├── admin/             # Admin pages
│   ├── inquire/           # Inquiry form pages
│   ├── maids/             # Maid catalog pages
│   └── page.tsx           # Home page
├── components/            # React components
├── data/                  # JSON data files
│   ├── maids.json        # Maid records
│   └── leads.json        # Lead/inquiry records
├── lib/                   # Utility functions
│   ├── auth.ts           # Authentication helpers
│   ├── data.ts           # Data access layer
│   └── validation.ts     # Zod schemas
├── public/               # Static assets
│   └── maids/           # Uploaded maid photos
└── types/               # TypeScript types
```

## Features

### Public Pages

- **Home (`/`)**: Welcome page with hero animation, company intro, and CTA
- **Maid Catalog (`/maids`)**: Browse all available maids with search and filters
- **Maid Detail (`/maids/[id]`)**: View detailed information about a specific maid
- **Inquiry Form (`/inquire`)**: Submit an inquiry for a specific maid

### Admin Pages

- **Admin Login (`/admin`)**: Password-protected login
- **Admin Dashboard (`/admin/maids`)**: Manage maid entries (Create, Read, Update, Delete)

### Key Features

- ✅ Search and filter maids by name, nationality, age, and experience
- ✅ Image upload (1-5 images per maid, max 2MB each)
- ✅ Lead/inquiry submission with validation
- ✅ Secure admin authentication via HTTP-only cookies
- ✅ Responsive, mobile-first design
- ✅ Arabic/English friendly layout (currently English, easy to translate)

## Data Models

### Maid
```typescript
{
  id: string;              // nanoid
  name: string;
  age: number;             // 21-55
  nationality: string;
  etaDays: number;         // 1-60 days
  hasExperience: boolean;
  yearsExperience?: number; // 1-15 (required if hasExperience=true)
  photos: string[];        // Array of image paths
  notes?: string;
}
```

### Lead
```typescript
{
  id: string;              // nanoid
  maidId: string;
  name: string;
  phone: string;           // Saudi format: +9665XXXXXXXX or 05XXXXXXXX
  email?: string;
  message?: string;
  createdAt: string;       // ISO timestamp
}
```

## Validation Rules

### Phone Number
- Saudi format: `+9665XXXXXXXX` or `05XXXXXXXX`
- Spaces, dashes, and parentheses are automatically removed

### Age
- Range: 21-55

### ETA Days
- Range: 1-60

### Years of Experience
- Range: 1-15 (required if `hasExperience` is true)

### Images
- Formats: JPG, PNG, WebP
- Max size: 2MB per image
- Max images: 5 per maid
- Min images: 1 per maid

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Adding Images

1. **Via Admin Panel:**
   - Log in to `/admin`
   - Create or edit a maid
   - Upload 1-5 images (jpg/png/webp, max 2MB each)
   - Images are automatically saved to `public/maids/`

2. **Manually:**
   - Place images in `public/maids/`
   - Update `data/maids.json` with the correct photo paths
   - Example: `"/maids/your-image.jpg"`

## Deployment

### Before Deploying

1. **Change admin password:**
   Update `ADMIN_PASSWORD` in your production environment variables.

2. **Update sitemap.xml:**
   Replace `https://yourdomain.com` with your actual domain.

3. **Update robots.txt:**
   Replace `https://yourdomain.com` with your actual domain.

4. **Set up environment variables:**
   ```
   ADMIN_PASSWORD=your_secure_password_here
   NODE_ENV=production
   ```

### Deployment Platforms

This project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any Node.js hosting** that supports Next.js

### Important Notes

- File-based storage (`/data` directory) works for local development but may not persist on serverless platforms
- For production, consider migrating to a database (PostgreSQL, MongoDB, etc.)
- Image uploads in `public/maids/` will work on platforms with persistent file storage
- For serverless deployments, consider using cloud storage (S3, Cloudinary, etc.)

## Future Enhancements

- [ ] Email/WhatsApp integration for lead notifications (TODO comments in code)
- [ ] Database migration (PostgreSQL/MongoDB)
- [ ] Cloud storage for images (S3, Cloudinary)
- [ ] Multi-language support (Arabic/English)
- [ ] Advanced filtering and sorting
- [ ] Image gallery with lightbox
- [ ] Admin dashboard for viewing leads
- [ ] Export functionality (CSV/Excel)
- [ ] Analytics integration

## Security Considerations

- Admin routes are protected by middleware
- Passwords are stored in environment variables (never in code)
- HTTP-only cookies for session management
- Input validation with Zod
- File upload validation (type, size)
- Filename sanitization

## Troubleshooting

### Images not loading
- Ensure images are in `public/maids/` directory
- Check that photo paths in `data/maids.json` are correct (should start with `/maids/`)
- Verify file permissions

### Admin login not working
- Check that `ADMIN_PASSWORD` is set in `.env.local`
- Restart the development server after changing `.env.local`
- Clear browser cookies and try again

### Data not persisting
- Ensure `data/` directory exists and is writable
- Check file permissions
- Verify JSON files are valid

## License

This project is proprietary software for Shamal Recruitment.

## Support

For issues or questions, please contact the development team.

