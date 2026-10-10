/**
 * ============================================================
 *  MEMORY GALLERY DATA
 *  ----------------------------------------------------------
 *  HOW TO ADD REAL PHOTOS:
 *   1. Drop the image into /src/assets/images (or /public).
 *   2. Set `src` to its path, e.g. src: '/memories/day-01.jpg'
 *      (files in /public are served from '/').
 *   3. Write a real `caption`, `note` and `date`.
 *  Leave `src` empty ('') to show an elegant illustrated frame
 *  instead — no fabricated photos of Laiba are ever shown.
 * ============================================================
 */

export type Orientation = 'portrait' | 'landscape' | 'square'
export type FrameStyle = 'polaroid' | 'framed' | 'taped'
export type MediaType = 'image' | 'video'

export interface Memory {
  id: string
  /** Real image path, or '' to render an illustrated placeholder. */
  src: string
  alt: string
  caption: string
  /** Short handwritten annotation. */
  note: string
  date: string
  orientation: Orientation
  frame: FrameStyle
  /** 'image' or 'video'. Video renders with <video> instead of <img>. */
  media?: MediaType
  /** Two token names used to tint the illustrated placeholder. */
  tint: [string, string]
  /** Decorative tilt in degrees. */
  tilt: number
}

export const galleryIntro = {
  kicker: 'The Memory Gallery',
  heading: 'Little moments, lasting colors.',
  lede: 'Not every beautiful thing needs a frame. Some things simply deserve a place to stay.',
  closingNote:
    'Maybe we did not realize how beautiful those little moments were while they were happening.',
}

export const memories: Memory[] = [
  {
    id: 'm1',
    src: '/memories/img1.jpeg',
    alt: 'A sunny day captured in soft afternoon light',
    caption: 'Golden hour, just like that.',
    note: 'this one stayed with me',
    date: 'A warm afternoon',
    orientation: 'portrait',
    frame: 'polaroid',
    tint: ['rose', 'cream'],
    tilt: -3,
  },
  {
    id: 'm2',
    src: '/memories/img2.mp4',
    alt: 'A short video clip of laughter and movement',
    caption: 'Some memories feel like sunshine.',
    note: 'golden, every time',
    date: 'Sometime in spring',
    orientation: 'landscape',
    frame: 'framed',
    media: 'video',
    tint: ['lavender', 'ivory'],
    tilt: 1.5,
  },
  {
    id: 'm3',
    src: '/memories/img3.jpeg',
    alt: 'A quiet moment, still and thoughtful',
    caption: 'A little piece of a beautiful day.',
    note: 'kept, not framed',
    date: 'A quiet evening',
    orientation: 'square',
    frame: 'taped',
    tint: ['gold', 'cream'],
    tilt: -1.5,
  },
  {
    id: 'm4',
    src: '/memories/img4.jpeg',
    alt: 'An ordinary Tuesday that became extraordinary',
    caption: 'The ordinary moments become extraordinary later.',
    note: 'we didn’t know yet',
    date: 'An unremarkable Tuesday',
    orientation: 'portrait',
    frame: 'framed',
    tint: ['burgundy', 'rose'],
    tilt: 2.5,
  },
  {
    id: 'm5',
    src: '/memories/img5.jpeg',
    alt: 'Late-year light streaming through windows',
    caption: 'Light finds its way into everything you do.',
    note: 'always has',
    date: 'Late in the year',
    orientation: 'landscape',
    frame: 'polaroid',
    tint: ['lavender', 'gold'],
    tilt: -2,
  },
  {
    id: 'm6',
    src: '/memories/img6.jpeg',
    alt: 'A perfect nothing-day, saved for later',
    caption: 'A good day, saved for later.',
    note: 'for the next rainy one',
    date: 'A perfect nothing-day',
    orientation: 'square',
    frame: 'taped',
    tint: ['rose', 'lavender'],
    tilt: 1,
  },
]
