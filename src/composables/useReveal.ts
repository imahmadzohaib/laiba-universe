import { onMounted, onUnmounted, ref } from 'vue'

/**
 * IntersectionObserver-based scroll reveal.
 *
 * Usage: add `class="reveal"` to elements and a `data-reveal` root,
 * or call `observe(el)`. Elements get `.is-visible` once on screen.
 *
 * SAFETY: if IntersectionObserver is missing, every target is revealed
 * immediately so content is never stuck invisible.
 */
export function useReveal(options: { selector?: string; once?: boolean } = {}) {
  const { selector = '.reveal', once = true } = options
  const root = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  const reveal = (el: Element) => el.classList.add('is-visible')

  onMounted(() => {
    const scope = root.value ?? document
    const targets = Array.from(scope.querySelectorAll(selector))

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach(reveal)
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target)
            if (once) observer?.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('is-visible')
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((t) => observer?.observe(t))

    // Fallback: reveal all elements after 2s if IntersectionObserver
    // hasn't triggered (can happen on mobile with CSS columns)
    setTimeout(() => {
      targets.forEach((t) => {
        if (!t.classList.contains('is-visible')) reveal(t)
      })
    }, 2000)
  })

  onUnmounted(() => observer?.disconnect())

  return { root }
}
