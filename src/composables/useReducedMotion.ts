import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Reactive wrapper around prefers-reduced-motion.
 * Components use this to swap animations for static states.
 */
export function useReducedMotion() {
  const prefersReduced = ref(false)
  let mq: MediaQueryList | null = null

  const update = () => {
    if (mq) prefersReduced.value = mq.matches
  }

  onMounted(() => {
    mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    update()
    mq.addEventListener('change', update)
  })

  onUnmounted(() => {
    mq?.removeEventListener('change', update)
  })

  return { prefersReduced }
}
