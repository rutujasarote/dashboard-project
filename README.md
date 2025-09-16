# Dashboard Assignment

This project implements the "Dashboard Page" assignment you uploaded:  
Assignment For Frontend Trainees.pdf fileciteturn0file0

## Features
- JSON-driven categories & widgets (initial data in Redux store).
- Add/Remove widgets in categories.
- Add new categories.
- Search widgets across all categories.
- Local persistence via `localStorage`.
- Built with React + Vite + Redux Toolkit.

## Run locally

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

The app will open at `http://localhost:5173` (Vite default).

## Create GitHub repo & push (example)

```bash
git init
git add .
git commit -m "Initial dashboard assignment"
# create repo on GitHub (replace <USERNAME>/<REPO>)
gh repo create <USERNAME>/dashboard-assignment --public --source=. --remote=origin
git push -u origin main
```

or using plain git + GitHub website:
1. Create new repository on GitHub.
2. Follow the commands shown by GitHub to push your local code.

## Deploy options

### Deploy to Vercel (recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. From project root run: `vercel`
3. Follow prompts and choose project settings (public).
Vercel will deploy and provide a public URL.

### Deploy to Netlify
1. Sign in to Netlify and create a new site from Git.
2. Connect your GitHub repo.
3. Set build command: `npm run build` and publish directory: `dist`.

### GitHub Pages
Works for static builds if you upload the `dist/` folder.

## Notes
- The app uses `localStorage` to persist changes per browser.
- Replace initial JSON data in `src/store/slice.js` to load custom JSON structure.
