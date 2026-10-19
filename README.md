# StyleMate GE

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-yaxj4pjz)

**StyleMate GE** is a Gen Z–oriented fashion stylist web app built for the Georgian audience. Pick the weather, occasion, and mood, and StyleMate suggests outfit combinations pulled from your own digital wardrobe — with a match score and a short explanation for each look. The UI is in Georgian and ships with a 40-item seed wardrobe so the experience is useful from the first load.

**Live site:** https://stylematege.vercel.app/

**GitHub repository:** _Add your repository URL here, e.g._ `https://github.com/<your-username>/stylemate-ge`

---

## Main features

- **Outfit Generator** — Choose weather, occasion, mood, and gender/style to get three curated outfit combinations, each with a match percentage and a short styling rationale. Includes a "Surprise Me" mode that randomizes occasion and mood.
- **Live weather lookup** — Select a Georgian city (Tbilisi, Batumi, Kutaisi, Rustavi, Gori, Telavi) and a date (up to 14 days ahead) to auto-detect the weather category and map it to the outfit generator.
- **Digital wardrobe** — Add, edit, and delete clothing items with name, category, color, season, style, gender, brand, shop link, and a photo URL. Search and filter by category. Comes pre-seeded with 40 items.
- **AI Outfit Matcher** — Pick 2–4 items from your wardrobe and get an instant match score with a color-harmony and category-balance explanation.
- **Saved looks** — Favorite generated outfits to revisit them later, with shop-the-look links to Zara, H&M, Shein, and Temu (demo links only).
- **Profile & preferences** — Set preferred gender and style; these flow into the generator. Includes a one-click reset that restores the seed wardrobe and clears saved looks and preferences.
- **Responsive design** — Desktop top nav and a mobile bottom tab bar with a prominent center action. Built on an 8px spacing system with a warm ivory/charcoal/olive/taupe palette.
- **Local persistence** — Wardrobe, saved looks, and preferences are stored in the browser via `localStorage`, so data survives page refreshes. No account or server is required.

---

## Technologies & frameworks

- **React 18** with TypeScript
- **Vite 5** as the build tool and dev server
- **Tailwind CSS 3** for styling (custom theme: `ink`, `electric`, `hot` color ramps, custom shadows and animations)
- **lucide-react** for icons
- **Open-Meteo API** for free, keyless weather forecasts (no API key required)
- **Pexels** stock photos for all fashion imagery (license-free)
- **localStorage** for client-side data persistence (no backend database is used by the app)

Fonts: Space Grotesk (display) and Noto Sans Georgian (body), loaded from Google Fonts.

> _Note: `@supabase/supabase-js` is listed in `package.json` and a `VITE_SUPABASE_*` env var is present in `.env`, but the application code does not currently use Supabase. All data is handled client-side through `localStorage`._

---

## Getting started

### Prerequisites

- **Node.js 18+** and npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The app starts on Vite's default local URL (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

The optimized output is written to the `dist/` directory. Preview the production build locally with:

```bash
npm run preview
```

### Type checking and linting

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
```

---

## Fashion imagery

All fashion photography is sourced from **Pexels** (license-free, guaranteed to load). The images are curated to evoke a Pinterest-inspired fashion moodboard aesthetic: editorial street-style portraits, natural-light flatlays, fabric textures, and styled still-life compositions in neutral tones.

- **Outfit / hero imagery** — editorial fashion portraits at a 2:3 aspect ratio, used on the homepage hero, example outfit cards, and generated outfit cards.
- **Item imagery** — Pinterest-style garment photography keyed by clothing subtype (e.g. `teeWhite`, `jeansBlue`, `coatBeige`), used for each wardrobe item and as category fallbacks.

All image URLs are defined in [`src/images.ts`](src/images.ts), where each entry is documented with a short description of what the photo shows. No AI image generation is used; every image is a real Pexels stock photo referenced by its CDN URL.

---

## Environment variables

The application runs fully client-side and does **not** require any API keys to function. The weather API (Open-Meteo) is free and keyless.

A Supabase project is referenced in `.env` for potential future use:

| Variable | Purpose | Required? |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL | No — not used by current app code |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key | No — not used by current app code |

No other environment variables or API keys are needed.

---

## License

This is a demo project. Fashion imagery is licensed through Pexels. Brand names (Zara, H&M, Shein, Temu) are referenced for demo purposes only; StyleMate GE is not affiliated with them.
