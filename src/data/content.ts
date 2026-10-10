/**
 * ============================================================
 *  CENTRAL CONTENT CONFIG — personalize everything here.
 *  Change Laiba's name, copy, letter and labels in one place;
 *  no component logic needs editing.
 * ============================================================
 */

export const site = {
  name: 'Laiba',
  title: 'A Little Universe of Her Own',
  supporting: 'Some people make the world feel a little more beautiful simply by being in it.',
  signature: 'Made especially for Laiba, with care.',
} as const

export interface NavItem {
  label: string
  to: string
}

export const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Memories', to: '/memories' },
  { label: 'Art Studio', to: '/studio' },
  { label: 'Letter', to: '/letter' },
  { label: 'Birthday', to: '/birthday' },
]

export interface Destination {
  key: string
  index: string
  eyebrow: string
  title: string
  blurb: string
  to: string
}

export const home = {
  kicker: 'For the girl who makes ordinary moments feel like art',
  heading: 'Laiba, in a world of her own.',
  body: 'Today deserves something a little more beautiful. So I made you a little corner of the internet, filled with colors, memories and a few words just for you.',
  dateLabel: '10 October · Your day, your universe',
  primaryCta: { label: 'Enter Your Little Universe', to: '/memories' },
  secondaryCta: { label: 'A Little Surprise', to: '/birthday' },
  introLede:
    'Five small rooms, each with its own light. Wander them in any order — there is no wrong way to spend a day made for you.',
  destinations: [
    {
      key: 'gallery',
      index: 'I',
      eyebrow: 'The Gallery',
      title: 'Little moments worth keeping.',
      blurb: 'A quiet exhibition of the ordinary days that turned out to matter most.',
      to: '/memories',
    },
    {
      key: 'studio',
      index: 'II',
      eyebrow: 'The Art Studio',
      title: 'A place for colors, creativity and imagination.',
      blurb: 'Pick up a brush, pour out a palette, and let your hands think for a while.',
      to: '/studio',
    },
    {
      key: 'letter',
      index: 'III',
      eyebrow: 'The Letter',
      title: 'A few words from the heart.',
      blurb: 'Something I wanted you to know, sealed and waiting to be opened.',
      to: '/letter',
    },
  ] as Destination[],
  closingNote: 'Made with a little thought, a lot of care and a wish for your happiest year yet.',
} as const

export const letter = {
  label: 'Something I wanted you to know.',
  heading: 'A few words, just for you.',
  openCta: 'Open Your Letter',
  replay: 'Read it again',
  salutation: 'Dear Laiba,',
  opening: 'Happy Birthday!',
  paragraphs: [
    'I hope this new chapter of your life brings you beautiful surprises, peaceful days, genuine happiness and countless reasons to smile.',
    'I hope you never lose the part of you that sees beauty in little things, finds meaning in colors and gives your imagination the freedom to wander.',
    'May you always find the courage to follow the things that make your heart feel alive. May your creativity keep growing, your dreams find their way into the world and your efforts bring you the happiness you deserve.',
    'And whenever life feels a little overwhelming, I hope you remember that you do not need to have everything figured out. You are allowed to grow at your own pace, change your mind, start again and become someone new with every passing season.',
    'Thank you for being someone worth celebrating. I hope this birthday is the beginning of a chapter filled with beautiful moments, meaningful connections and things that make you genuinely happy.',
    'Keep creating. Keep dreaming. Keep being yourself.',
    'Happy Birthday, Laiba. May life be as beautiful as the things you imagine.',
    'I got stuck in a meeting last night, so please accept my apologies for being late. I hope you’re doing really well. Every time I think of you, I can’t help but smile. You’ve been mean to me, you still are and I guess you always will be. But honestly, that’s part of what makes you special. Stay happy and keep smiling, always!',
    'Cake ki tension nhi leni, wo ma kaat ky khaa lo ga aaj. Happy Birthday',
  ],
  signoff: 'With warmest wishes,',
  signature: 'Someone who wanted to make your day a little more special.',
} as const

export interface RouteSeo {
  title: string
  description: string
}

export const seo: Record<string, RouteSeo> = {
  home: {
    title: "Laiba's Little Universe | A Birthday Experience",
    description:
      'A little corner of the internet made for Laiba — colors, memories and a few words, just for her.',
  },
  memories: {
    title: 'The Memory Gallery | Laiba’s Little Universe',
    description: 'Little moments, lasting colors — a curated gallery of ordinary days worth keeping.',
  },
  studio: {
    title: 'The Art Studio | Laiba’s Little Universe',
    description: 'An interactive studio of brushes, color stories and generative art, made for the artist in you.',
  },
  letter: {
    title: 'A Letter for Laiba | Laiba’s Little Universe',
    description: 'A few quiet words, sealed in an envelope and waiting to be opened.',
  },
  birthday: {
    title: 'Happy Birthday, Laiba | A Cinematic Finale',
    description: 'A sky full of fireworks and a wish, beneath a star-filled night. Happy Birthday, Laiba.',
  },
  notFound: {
    title: 'Lost in the stars | Laiba’s Little Universe',
    description: 'This little corner drifted off the map.',
  },
}

