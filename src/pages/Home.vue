<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { home, seo } from '@/data/content'
import StarDoodle from '@/components/StarDoodle.vue'
import FlowerDoodle from '@/components/FlowerDoodle.vue'
import DestinationCard from '@/components/DestinationCard.vue'
import { useSeo } from '@/composables/useSeo'
import { useReducedMotion } from '@/composables/useReducedMotion'

useSeo(seo.home)
const { prefersReduced } = useReducedMotion()

const heroReady = ref(false)
const phase1 = ref(false) // kicker + heading
const phase2 = ref(false) // body + illustration
const phase3 = ref(false) // CTAs + scroll hint

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (prefersReduced.value) {
    heroReady.value = true
    phase1.value = true
    phase2.value = true
    phase3.value = true
    return
  }
  heroReady.value = true
  timer = setInterval(() => {
    phase1.value = true
    setTimeout(() => (phase2.value = true), 400)
    setTimeout(() => (phase3.value = true), 1100)
    clearInterval(timer)
  }, 300)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div>
    <!-- ===== HERO ===== -->
    <section
      class="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-ivory md:min-h-[88vh]"
    >
      <div
        class="absolute inset-0 bg-[linear-gradient(160deg,rgba(247,241,232,0.9)_0%,rgba(239,229,214,0.6)_100%)]"
      />

      <!-- decorative doodles -->
      <div
        v-show="heroReady"
        class="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <FlowerDoodle
          class="absolute top-2 left-1/2 h-20 w-20 -translate-x-1/2 text-rose/25 sm:h-24 sm:w-24 sm:top-0 sm:-translate-y-6 md:left-[8%] md:top-[14%] md:-translate-x-0 md:h-28 md:w-28"
          :float="true"
        />
        <StarDoodle class="absolute h-4 w-4 text-gold/30" style="top: 16%; left: 72%" />
        <StarDoodle class="absolute h-3 w-3 text-lavender/30" style="top: 62%; left: 8%" />
        <StarDoodle class="absolute h-3.5 w-3.5 text-burgundy/20" style="top: 44%; left: 76%" />
      </div>

      <div
        v-show="heroReady"
        class="relative z-10 mx-auto max-w-2xl px-6 py-8 text-center"
      >
        <transition name="fade-up">
          <div v-show="phase1" key="kicker">
            <span class="kicker mb-5 block">{{ home.kicker }}</span>
            <h1 class="display-xl mb-4 text-burgundy">{{ home.heading }}</h1>
          </div>
        </transition>

        <transition name="fade-up" delay-300>
          <p v-show="phase2" class="lede mb-6">
            {{ home.body }}
          </p>
        </transition>

        <transition name="fade-up" delay-500>
          <div v-show="phase2" class="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-burgundy/10 bg-cream text-burgundy shadow-inner">
            <FlowerDoodle class="h-14 w-14 text-burgundy/70" :float="true" />
          </div>
        </transition>

        <transition name="fade-up" delay-700>
          <div
            v-show="phase3"
            class="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <RouterLink :to="home.primaryCta.to" class="btn btn-primary">
              <StarDoodle class="h-4 w-4" /> {{ home.primaryCta.label }}
            </RouterLink>
            <RouterLink :to="home.secondaryCta.to" class="btn btn-ghost">
              {{ home.secondaryCta.label }}
            </RouterLink>
          </div>
        </transition>
      </div>

      <!-- scroll hint -->
      <transition name="fade" delay-900>
        <div
          v-show="phase3"
          class="absolute bottom-7 left-1/2 -translate-x-1/2 text-center"
        >
          <span class="hand block text-xs text-ink/55 mb-1.5">keep scrolling</span>
          <StarDoodle class="mx-auto h-4 w-4 text-burgundy/45" />
        </div>
      </transition>
    </section>

    <!-- ===== INTRO ===== -->
    <section class="wrap py-16">
      <p class="lede text-center">{{ home.introLede }}</p>
    </section>

    <!-- ===== Destinations ===== -->
    <section class="wrap pb-16">
      <div
        v-for="(d, i) in home.destinations"
        :key="d.key"
        class="reveal mb-16 last:mb-0"
        :style="{ '--reveal-delay': `${i * 140}ms` }"
      >
        <DestinationCard :destination="d" :index="d.index" />
      </div>
    </section>

    <!-- ===== Closing note ===== -->
    <footer class="wrap pb-20 text-center">
      <p class="hand text-ink/60">{{ home.closingNote }}</p>
    </footer>
  </div>
</template>

<style scoped>
.fade-up-enter-active { transition: opacity .65s var(--ease-silk), transform .65s var(--ease-silk); }
.fade-up-leave-active { transition: opacity .35s var(--ease-silk), transform .35s var(--ease-silk); }
.fade-up-enter-from, .fade-up-leave-to { opacity: 0; transform: translateY(12px); }
.fade-enter-active, .fade-leave-active { transition: opacity .5s var(--ease-silk); }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* transition-group-style delay helper (Tailwind-style) — applied inline */
</style>
