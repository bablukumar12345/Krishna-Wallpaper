# Noida Decor — Premium Home Décor Website

A production-ready React + Vite single-page application for a home décor
business: Wallpapers, PVC Panels, Zebra Blinds, Artificial Grass, Curtains
and Flooring. Modern luxury light theme with glassmorphism, smooth
animations, lazy loading, and a mobile-first responsive layout.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build       # production build -> /dist
npm run preview     # preview the production build locally
```

## Folder structure

```
noida-decor/
├─ public/
│  ├─ images/
│  │  ├─ services/<service-slug>/<category-slug>/*.jpg   ← product photos
│  │  ├─ services/<service-slug>/<service-slug>-banner.jpg
│  │  ├─ services/<service-slug>/<service-slug>-thumb.jpg
│  │  ├─ hero/, about/, logo/, icons/, placeholders/
│  ├─ robots.txt, sitemap.xml, _redirects (Netlify)
├─ scripts/
│  └─ generate_placeholders.py   ← regenerates local placeholder JPGs
├─ src/
│  ├─ components/     Navbar, Footer, WhatsAppButton, ServiceCard,
│  │                  ProductCard, CategoryDropdown, Breadcrumb, Loader, SEO
│  ├─ pages/           Home, Services, ServiceDetail, ProductDetail,
│  │                    Cart, Quotation, About, Contact, NotFound
│  │                    (each page has its own .jsx + .css)
│  ├─ context/         CartContext.jsx (cart state + localStorage)
│  ├─ data/            servicesData.js (single source of truth for
│  │                    services/categories/products)
│  ├─ routes/           AppRoutes.jsx (lazy-loaded route definitions)
│  ├─ hooks/            useScrollToTop.js
│  ├─ utils/             googleSheets.js (quotation form integration)
│  └─ styles/            variables.css (design tokens), global.css
├─ index.html
└─ vercel.json           SPA rewrite rule for Vercel hosting
```

## Replacing placeholder images

Every image referenced by the app already exists as a generated JPG
placeholder (run `python3 scripts/generate_placeholders.py` to regenerate
them). To use real photography, upload files with the **exact same name**
into the matching folder under `public/images/...` — the app requires no
code changes. Naming pattern for products:

```
public/images/services/<service>/<category>/<category>-<n>.jpg       (main image)
public/images/services/<service>/<category>/<category>-<n>-alt1.jpg  (thumbnail 2)
public/images/services/<service>/<category>/<category>-<n>-alt2.jpg  (thumbnail 3)
public/images/services/<service>/<category>/<category>-<n>-alt3.jpg  (thumbnail 4)
```

## Adding / editing services & categories

Everything is generated from `src/data/servicesData.js`. Add a service to
the `rawServices` array (name, slug, banner, thumbnail, category names) and
the app automatically creates its route, category dropdown, and 25+
products per category — no other file needs to change.

## Google Sheets integration (quotation form)

The quotation form (`/quotation`) is integration-ready out of the box.
See the full setup steps and Apps Script snippet in
`src/utils/googleSheets.js`. In short:

1. Create a Google Sheet and open **Extensions → Apps Script**.
2. Paste the provided `doPost` snippet and deploy as a Web App
   (Execute as "Me", Access "Anyone").
3. Copy the deployment URL into a `.env` file:
   ```
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/XXXX/exec
   ```
4. Restart `npm run dev` — form submissions (name, phone, address,
   message, selected product names & images) now append to the sheet.

Until the endpoint is configured, submissions are logged to the browser
console so the flow can still be tested end-to-end.

## WhatsApp button

A floating 3D WhatsApp button appears on every page (`WhatsAppButton`
component) and opens a chat with **+91 99900 99668** with a pre-filled
message. Update the number in
`src/components/WhatsAppButton/WhatsAppButton.jsx` if it ever changes.

## Deployment (SPA routing)

This is a client-side-routed SPA (React Router, no full page reloads).
Static hosts need a catch-all rewrite to `index.html`:

- **Netlify** — already configured via `public/_redirects`.
- **Vercel** — already configured via `vercel.json`.
- **Other static hosts** — configure an equivalent "rewrite all routes to
  index.html" rule.

## Notes

- No admin panel is included, per spec — all catalogue data lives in
  `src/data/servicesData.js` and is edited directly in code.
- No online/external images are used anywhere; every `<img>` points into
  `/public/images/...`.
- Cart state persists in `localStorage` so it survives page refreshes.
