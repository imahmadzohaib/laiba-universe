/**
 * Curated color stories for the Art Studio.
 * Selecting a palette re-tints the featured abstract artwork
 * and the studio drawing palette.
 */
export interface Palette {
  id: string
  name: string
  description: string
  /** Ordered from soft → deep; used for swatches and artwork stops. */
  colors: string[]
}

export const palettes: Palette[] = [
  {
    id: 'petals',
    name: 'Petals After Rain',
    description: 'The hush just after a storm, when color feels washed clean and new.',
    colors: ['#F7F1E8', '#E7C6CB', '#D6A5AC', '#B86D80', '#612C46'],
  },
  {
    id: 'sunset',
    name: 'A Quiet Sunset',
    description: 'Warmth folding slowly into dusk, unhurried and golden at the edges.',
    colors: ['#F7F1E8', '#F0D7A8', '#D6B77A', '#CE8E86', '#7A3A52'],
  },
  {
    id: 'lavender',
    name: 'Lavender Dreams',
    description: 'A soft, drifting afternoon spent somewhere between awake and daydream.',
    colors: ['#F3EEF7', '#D9CFEA', '#B8ACD4', '#9A86BE', '#5B4A7E'],
  },
  {
    id: 'golden',
    name: 'Golden Hour',
    description: 'That one perfect light that makes everything look a little like a painting.',
    colors: ['#FBF4E6', '#F2D79E', '#D6B77A', '#C98F5A', '#8A5A3C'],
  },
  {
    id: 'midnight',
    name: 'Midnight Bloom',
    description: 'Flowers that only open after dark, under a sky full of quiet gold.',
    colors: ['#1B2140', '#3A3270', '#8E6FB0', '#D6A5AC', '#D6B77A'],
  },
]

/** Studio brush palette — the colors offered on the drawing canvas. */
export const brushColors: { name: string; value: string }[] = [
  { name: 'Dusty rose', value: '#D6A5AC' },
  { name: 'Muted lavender', value: '#B8ACD4' },
  { name: 'Deep burgundy', value: '#612C46' },
  { name: 'Champagne gold', value: '#D6B77A' },
  { name: 'Paper cream', value: '#EFE5D6' },
  { name: 'Ink', value: '#25232B' },
]

export const studioCopy = {
  kicker: 'The Art Studio',
  heading: 'For the artist in you.',
  lede: 'A little space for imagination, imperfect lines, unexpected colors and everything that makes creating beautiful.',
  canvasLabel: 'Every little mark makes something new.',
  colorStoriesTitle: 'Color stories',
  generativeTitle: 'A piece that paints itself',
  generativeLede: 'Move your cursor across it. Each one is a little different — like a bloom spreading on wet paper.',
  generateCta: 'Create Another Piece',
  dedication1: 'Keep making things that only you could make.',
  dedication2: 'The world has room for your imagination.',
}
