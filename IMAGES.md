# Adding Images to Laiba's Little Universe

## Where to put images

### 1. `public/` — Static assets served at root `/`

Files placed in `public/` are served directly at the root URL.
No import statements needed — reference them with a leading `/`.

```
public/
├── favicon.svg          — Browser tab icon (already present)
├── og-image.svg          — Social media preview image (already present)
└── paper-texture.svg     — Optional paper texture overlay (already present)
```

**Use for:** Favicon, social sharing images, favicon, any asset you want to reference by URL
**Reference in code:** `/my-image.jpg`, `/memories/photo-01.jpg`

### 2. `src/assets/images/` — Vite-processed assets

Files placed in `src/assets/` are processed by Vite during build (optimized, hashed, bundled).
Import them explicitly in your Vue components.

```
src/assets/images/
└── illustrations/       — For SVG illustrations, decorative art
```

**Use for:** Images imported in components, illustrations, decorative graphics
**Reference in code:** `import myImage from '@/assets/images/my-pic.jpg'`

### 3. Individual pages — How each page uses images

#### Memory Gallery (`src/pages/Memories.vue`)

Images are defined in `src/data/memories.ts`. Each memory has a `src` field:

- **Leave empty** (`src: ''`) → renders an elegant illustrated placeholder frame (no fabricated photos)
- **Set a path** (`src: '/memories/day-01.jpg'`) → renders the actual photo

**To add a real photo:**
1. Drop the image into `public/memories/` (create the folder if it doesn't exist)
2. Set `src: '/memories/your-image-name.jpg'` in the memory entry
3. Update `alt`, `caption`, `note`, and `date` fields

#### Art Studio (`src/pages/Studio.vue`)

Uses `GenerativeArt.vue` (canvas-based, no images) and `ArtCanvas.vue` (drawing surface, no images).

#### Birthday (`src/pages/Birthday.vue`)

Uses `FireworksCanvas.vue` (canvas-based animations) and `BirthdayReveal.vue` (SVG constellations). No external images needed.

#### Home (`src/pages/Home.vue`)

Uses SVG doodles (`StarDoodle`, `FlowerDoodle`) — no external images needed.

#### Letter (`src/pages/Letter.vue`)

Fully text-based — no external images needed.

#### Navigation (`src/components/AppNavigation.vue`)

Uses SVG icons from `lucide-vue-next` and `StarDoodle` — no external images needed.

## Quick reference

| Need | Where to put | How to reference |
|------|-------------|------------------|
| Favicon / OG image | `public/` | `/image.svg` |
| Memory gallery photos | `public/memories/` | `/memories/photo.jpg` |
| Component illustrations | `src/assets/images/` | `import img from '@/assets/images/...'` |
| Decorative doodles | Inline SVGs (StarDoodle, FlowerDoodle) | Components |
