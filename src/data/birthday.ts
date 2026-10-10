/**
 * Birthday date + finale copy.
 *
 * TIMEZONE NOTE: all date logic uses the VISITOR'S LOCAL date
 * (new Date() in the browser). The year is never hardcoded — the
 * countdown always targets the next occurrence of month/day, and
 * after the day has passed the finale simply stays celebratory.
 */
export const birthday = {
  /** 1-based month (10 = October) and day of month. */
  month: 10,
  day: 10,
  name: 'Laiba',
} as const

export const finale = {
  kicker: 'The universe has a little something to celebrate.',
  heading: 'Happy Birthday, Laiba!',
  sub: 'May your next chapter be full of beautiful beginnings, unexpected happiness and dreams that find their way into color.',
  bigNumber: '10',
  bigMonth: 'October',
  wishCta: 'Make a Wish',
  wishHint: 'Close your eyes, if only for a second.',
  wishResult: 'May this year surprise you in the most beautiful ways.',
  replay: 'Celebrate again',
  closing1: "Here's to another year of becoming, creating and discovering beautiful things.",
  closing2: 'Keep a little magic with you, wherever life takes you.',
  countdownIntro: 'The sky is getting ready.',
  countdownLabel: 'until your day begins',
  todayBanner: 'It’s today. The whole sky is yours.',
  afterBanner: 'The celebration never really ends.',
} as const
