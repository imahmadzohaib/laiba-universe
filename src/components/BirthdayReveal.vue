<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { finale } from '@/data/birthday'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = withDefaults(
  defineProps<{
    /** visitor clicked "Make a Wish"? */
    wished: boolean
  }>(),
  { wished: false },
)
const { prefersReduced } = useReducedMotion()

const showWish = ref(false)
const showConstellation = ref(false)
const showMessage = ref(false)
const showClosing = ref(false)

let t: ReturnType<typeof setTimeout> | undefined

const runCelebration = () => {
  showWish.value = false
  showConstellation.value = false
  showMessage.value = false
  showClosing.value = false
  if (prefersReduced.value) {
    showWish.value = true
    showConstellation.value = true
    showMessage.value = true
    showClosing.value = true
    return
  }
  t = setTimeout(() => {
    showWish.value = true
    setTimeout(() => (showConstellation.value = true), 600)
    setTimeout(() => (showMessage.value = true), 1200)
    setTimeout(() => (showClosing.value = true), 1900)
  }, 400)
}

onMounted(() => {
  if (props.wished) runCelebration()
})
onBeforeUnmount(() => {
  if (t) clearTimeout(t)
})
watch(
  () => props.wished,
  (v) => { if (v) runCelebration() },
)
</script>

<template>
  <div class="birthday-reveal relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden md:min-h-[82vh]">
    <!-- Wish glow -->
    <transition name="br-fade" appear>
      <div
        v-if="showWish"
        class="z-10 mb-10 rounded-full bg-[radial-gradient(circle,#d6b77a44_0%,transparent_70%)] px-8 py-5 text-center"
      >
        <p class="text-2xl font-medium text-warmwhite md:text-3xl">
          {{ finale.wishHint }}
        </p>
      </div>
    </transition>

    <!-- Constellation ring -->
    <transition name="br-fade" appear>
      <svg
        v-if="showConstellation"
        class="absolute inset-0 z-0 h-full w-full text-gold/30"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" stroke-width="0.5" stroke-opacity="0.35" fill="none">
          <circle cx="50" cy="20" r="0.7" />
          <circle cx="65" cy="30" r="0.7" />
          <circle cx="78" cy="42" r="0.7" />
          <circle cx="80" cy="58" r="0.7" />
          <circle cx="70" cy="74" r="0.7" />
          <circle cx="50" cy="80" r="0.7" />
          <circle cx="30" cy="74" r="0.7" />
          <circle cx="20" cy="58" r="0.7" />
          <circle cx="22" cy="42" r="0.7" />
          <circle cx="35" cy="30" r="0.7" />
          <polygon points="50,20 65,30 78,42 80,58 70,74 50,80 30,74 20,58 22,42 35,30" fill="currentColor" fill-opacity="0.05" />
        </g>
        <circle cx="50" cy="50" r="3.5" fill="currentColor" fill-opacity="0.6" />
      </svg>
    </transition>

    <!-- Birthday message -->
    <transition name="br-zoom" appear>
      <div v-if="showMessage" class="z-20 mb-6 text-center">
        <p class="hand text-xl text-warmwhite md:text-2xl">
          {{ finale.wishResult }}
        </p>
      </div>
    </transition>

    <!-- Closing -->
    <transition name="br-zoom" appear>
      <div v-if="showClosing" class="z-20 mb-12 max-w-xl text-center">
        <p class="hand mb-2 text-center text-warmwhite/90">
          {{ finale.closing1 }}
        </p>
        <p class="hand text-center text-warmwhite/80">
          {{ finale.closing2 }}
        </p>
      </div>
    </transition>

  </div>
</template>

<style scoped>
.br-fade-enter-active { transition: opacity .5s var(--ease-silk), transform .5s var(--ease-silk); }
.br-fade-leave-active { transition: opacity .35s var(--ease-silk), transform .35s var(--ease-silk); }
.br-fade-enter-from,
.br-fade-leave-to { opacity: 0; transform: scale(0.96); }
.br-zoom-enter-active { transition: opacity .6s var(--ease-silk), transform .6s var(--ease-silk); }
.br-zoom-leave-active { transition: opacity .35s ease; }
.br-zoom-enter-from,
.br-zoom-leave-to { opacity: 0; transform: scale(0.9); }
</style>
