# Wowdy Donuts: website demo

Demo website for Wowdy Donuts, 3035 S Shiloh Rd #130, Garland, TX 75041 · (972) 212-4080.

- Single static page (`index.html`), English/Spanish (`?lang=es`).
- Coffee-cup language switch, donut light/dark switch (strawberry ↔ chocolate glaze), live open/closed status.

## Needed before going live
- [ ] Closing time (listings say 12 PM or 1 PM) and whether they close early when sold out
- [ ] Name: "Wowdy" or "Howdy" Donuts? Listings use both
- [ ] Which phone to show: (972) 212-4080 or (972) 926-5676
- [ ] Menu with prices (donut flavors, kolache types, drinks/coffee?)
- [ ] Photos of the donuts and the shop
- [ ] Bulk/dozen ordering and delivery apps they use

## Stack
- **Next.js** (static export) + **TypeScript** + **Tailwind CSS v4**
- **Magic UI** (Marquee, MagicCard, BorderBeam), **Motion**, **GSAP**, **Lenis** smooth scroll, **Phosphor** icons
- Strings live in `src/content/strings.json` (English plus each translation); the page is `src/app/page.tsx`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```
Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).
