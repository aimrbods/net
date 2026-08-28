# adskerala-next

Next.js static export for AdsKerala / AI Mr Ferdy.

## Local

```bash
npm install
npm run build
```

The production files are generated in `out/`. This project is configured with `output: 'export'`, so it is intended for static hosting such as Cloudflare Pages.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `out`
- Node.js: 22 (or another supported Node 20.9+)

Environment variables:

```env
NEXT_PUBLIC_SITE_DOMAIN=https://adskerala.com
NEXT_PUBLIC_API_BASE=https://api-adskerala.aimrbods.workers.dev
```

The API is fetched during the build. Dynamic article/category/AMP/OG pages are pre-generated from the API response. Search is a static JSON index consumed by the browser.
