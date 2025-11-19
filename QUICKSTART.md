# Quick Start Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Create Environment File
Create a file named `.env.local` in the root directory with:
```
ADMIN_PASSWORD=changeme
```

## Step 3: Seed Data (Optional)
```bash
npm run seed
```
This will create `data/maids.json` with 8 sample maid entries.

## Step 4: Run Development Server
```bash
npm run dev
```

## Step 5: Open in Browser
- Main site: http://localhost:3000
- Admin panel: http://localhost:3000/admin
- Default password: `changeme`

## Next Steps

1. **Add Images**: Place images in `public/maids/` directory and update photo paths in `data/maids.json`
2. **Change Admin Password**: Update `ADMIN_PASSWORD` in `.env.local` to something secure
3. **Customize**: Edit content in components and pages as needed

## Troubleshooting

- **Build errors**: Make sure all dependencies are installed (`npm install`)
- **Images not loading**: Check that images exist in `public/maids/` and paths in `data/maids.json` are correct
- **Admin login not working**: Verify `ADMIN_PASSWORD` is set in `.env.local` and restart the dev server

## Production Deployment

1. Set `ADMIN_PASSWORD` in your production environment
2. Update `public/sitemap.xml` and `public/robots.txt` with your domain
3. Build: `npm run build`
4. Start: `npm start`

For serverless deployments (Vercel, Netlify), consider migrating to a database and cloud storage for images.

