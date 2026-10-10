<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { useBirthdayDate } from '@/composables/useBirthdayDate'
import { useReducedMotion } from '@/composables/useReducedMotion'
import { seo, site } from '@/data/content'
import { finale } from '@/data/birthday'
import FireworksCanvas from '@/components/FireworksCanvas.vue'
import BirthdayReveal from '@/components/BirthdayReveal.vue'
import StarDoodle from '@/components/StarDoodle.vue'

useSeo(seo.birthday)
const { prefersReduced } = useReducedMotion()
const { status, countdown } = useBirthdayDate()

const wished = ref(false)
const fireworksRef = ref<InstanceType<typeof FireworksCanvas> | null>(null)

const isCelebration = computed(() => status.value !== 'before')
const bigNumber = computed(() => finale.bigNumber)

// Continuous gentle starfield background via canvas
let raf = 0
let stars: { x: number; y: number; s: number }[] = []
let bgCtx: CanvasRenderingContext2D | null = null
let bgCanvas: HTMLCanvasElement | null = null
const starsRef = ref<HTMLCanvasElement | null>(null)
let sw = 0
let sh = 0
let dpr = 1

function initStars() {
  bgCanvas = starsRef.value
  if (!bgCanvas) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  const r = bgCanvas.getBoundingClientRect()
  sw = r.width
  sh = r.height
  bgCanvas.width = Math.round(sw * dpr)
  bgCanvas.height = Math.round(sh * dpr)
  bgCtx = bgCanvas.getContext('2d')
  if (bgCtx) bgCtx.scale(dpr, dpr)
  stars = Array.from({ length: 260 }, () => ({
    x: Math.random() * sw,
    y: Math.random() * sh,
    s: Math.random() * 1.6 + 0.4,
  }))
  tickStars()
}

function tickStars() {
  if (!bgCtx || !bgCanvas) return
  // fade — deep midnight wash
  bgCtx.fillStyle = 'rgba(11, 15, 22, 0.18)'
  bgCtx.fillRect(0, 0, sw, sh)
  bgCtx.save()
  bgCtx.fillStyle = '#f3eef7'
  bgCtx.globalAlpha = 0.85
  for (const s of stars) {
    bgCtx.globalAlpha = 0.55 + Math.sin(performance.now() / 1800 + s.x * 0.02) * 0.35
    bgCtx.beginPath()
    bgCtx.arc(s.x, s.y, s.s, 0, Math.PI * 2)
    bgCtx.fill()
  }
  bgCtx.restore()
  raf = requestAnimationFrame(tickStars)
}

const handleWish = () => {
  if (!wished.value) {
    wished.value = true
    fireworksRef.value?.burst(4)
  }
}

onMounted(() => {
  initStars()
  window.addEventListener('resize', initStars)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', initStars)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div
    class="relative min-h-[100dvh] w-full overflow-hidden text-ivory"
    style="background: radial-gradient(ellipse at top, #101530 0%, #0b0f22 75%, #060914 100%);"
  >
    <!-- Animated starfield (fallback canvas, static CSS dots if JS off) -->
    <canvas
      ref="starsRef"
      class="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
    <div
      v-if="!prefersReduced"
      class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(ellipse at top, #060914 0%, #0b0f22 75%, #101530 100%);"
    />

    <!-- Horizon glow -->
    <div
      class="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-44 w-full max-w-[384px] rounded-full blur-3xl sm:h-52 sm:w-[420px]"
      style="background: radial-gradient(ellipse at bottom, #d6b77a22 0%, transparent 70%);"
    />

    <div class="relative z-10 mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center px-4 py-14 text-center sm:min-h-screen sm:py-20">
      <!-- Countdown / today banner -->
      <div v-if="!isCelebration" class="mb-8">
        <p class="hand mb-1 text-gold/80">{{ finale.countdownIntro }}</p>
        <div
          v-if="status === 'before'"
          class="flex items-center justify-center gap-4 font-mono text-3xl font-medium text-warmwhite/90 md:text-4xl"
          aria-live="polite"
        >
          <span>{{ String(countdown.days).padStart(2, '0') }}</span>
          <span>:</span>
          <span>{{ String(countdown.hours).padStart(2, '0') }}</span>
          <span>:</span>
          <span>{{ String(countdown.minutes).padStart(2, '0') }}</span>
          <span>:</span>
          <span>{{ String(countdown.seconds).padStart(2, '0') }}</span>
        </div>
        <p class="hand mt-1 text-xs text-ivory/60">{{ finale.countdownLabel }}</p>
      </div>
      <p v-else class="hand mb-6 text-gold/80">
        {{ status === 'today' ? finale.todayBanner : finale.afterBanner }}
      </p>

      <!-- Kicker -->
      <p class="kicker mb-4 text-gold/70">
        {{ finale.kicker }}
      </p>

      <!-- Big heading -->
      <h1 class="display-xl mb-4 text-warmwhite">
        {{ finale.heading }}
      </h1>

      <!-- Big number + month -->
      <div class="mb-10 flex items-center justify-center gap-5">
        <span
          class="block text-[4rem] font-extrabold text-warmwhite/95 md:text-[6rem] lg:text-[9rem]"
          aria-hidden="true"
        >
          {{ bigNumber }}
        </span>
        <span class="text-3xl font-medium text-gold/80 md:text-4xl">
          {{ finale.bigMonth }}
        </span>
      </div>

      <p class="lede mb-10 max-w-xl text-ivory/80">
        {{ finale.sub }}
      </p>

      <!-- Wish button -->
      <button
        v-if="!wished"
        @click="handleWish"
        class="btn btn-gold z-20 mb-6"
        aria-label="Make a wish"
      >
        {{ finale.wishCta }}
      </button>

      <!-- Fireworks + reveal (only after wishing) -->
      <div v-if="wished" class="mt-6 w-full">
        <FireworksCanvas
          ref="fireworksRef"
          :trigger="wished"
          :palette="status === 'today' ? 'petals' : 'midnight'"
        />

        <BirthdayReveal :wished="wished" />
      </div>

    </div>

    <!-- Closing signature at the bottom -->
    <footer class="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center sm:bottom-8">
      <StarDoodle class="mx-auto h-5 w-5 text-gold/40" />
      <p class="hand text-center text-xs text-ivory/45">
        {{ finale.closing1 }}
      </p>
      <p class="hand text-center text-xs text-ivory/35">
        {{ finale.closing2 }}
      </p>
      <p class="hand text-center text-xs text-ivory/30 mt-1">
        {{ site.signature }}
      </p>
    </footer>

    <!-- Back to home -->
    <nav class="absolute left-4 top-14 z-20 md:top-20">
      <RouterLink to="/" class="btn btn-outline-light py-1 px-3 text-sm">
        ← Back to home
      </RouterLink>
    </nav>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .btn { transition: none; }
}
</style>
