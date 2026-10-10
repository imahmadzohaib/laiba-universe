import { computed, onMounted, onUnmounted, ref } from 'vue'
import { birthday } from '@/data/birthday'

export type BirthdayStatus = 'before' | 'today' | 'after'

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/**
 * Date-aware birthday state based on the VISITOR'S LOCAL time.
 *
 *  - `status` is 'before' | 'today' | 'after'
 *  - On the birthday the finale is the primary state.
 *  - Before it, a non-negative countdown targets local midnight of the day.
 *  - After it, the finale stays celebratory (no negative countdown, never broken).
 *
 * The year is derived from the current date, so this keeps working every year.
 */
export function useBirthdayDate() {
  const now = ref<Date>(new Date())
  let timer: number | undefined

  onMounted(() => {
    now.value = new Date()
    timer = window.setInterval(() => {
      now.value = new Date()
    }, 1000)
  })

  onUnmounted(() => {
    if (timer) window.clearInterval(timer)
  })

  /** Local midnight at the start of the birthday in a given year. */
  const birthdayStart = (year: number) =>
    new Date(year, birthday.month - 1, birthday.day, 0, 0, 0, 0)

  const status = computed<BirthdayStatus>(() => {
    const n = now.value
    const start = birthdayStart(n.getFullYear())
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
    if (n < start) return 'before'
    if (n < end) return 'today'
    return 'after'
  })

  /** Next occurrence of the birthday (this year if still upcoming, else next year). */
  const nextBirthday = computed(() => {
    const n = now.value
    const thisYear = birthdayStart(n.getFullYear())
    if (n < new Date(thisYear.getTime() + 24 * 60 * 60 * 1000)) return thisYear
    return birthdayStart(n.getFullYear() + 1)
  })

  const countdown = computed<Countdown>(() => {
    let diff = Math.max(0, nextBirthday.value.getTime() - now.value.getTime())
    const days = Math.floor(diff / 86_400_000)
    diff -= days * 86_400_000
    const hours = Math.floor(diff / 3_600_000)
    diff -= hours * 3_600_000
    const minutes = Math.floor(diff / 60_000)
    diff -= minutes * 60_000
    const seconds = Math.floor(diff / 1000)
    return { days, hours, minutes, seconds }
  })

  const isCelebration = computed(() => status.value !== 'before')

  return { now, status, countdown, nextBirthday, isCelebration }
}
