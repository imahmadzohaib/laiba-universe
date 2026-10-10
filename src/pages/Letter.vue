<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { useReveal } from '@/composables/useReveal'
import { useReducedMotion } from '@/composables/useReducedMotion'
import { seo, letter } from '@/data/content'
import EditorialHeading from '@/components/EditorialHeading.vue'
import StarDoodle from '@/components/StarDoodle.vue'
import FlowerDoodle from '@/components/FlowerDoodle.vue'

useSeo(seo.letter)
useReveal()
const { prefersReduced } = useReducedMotion()

const opened = ref(false)
const visibleGroups = ref(0)

const paragraphGroups = computed(() => letter.paragraphs.map((p, i) => ({ id: i, text: p })))

const reveal = async () => {
  opened.value = true
  visibleGroups.value = 0
  // reveal paragraphs in short readable groups
  const delay = prefersReduced.value ? 0 : 120
  for (let i = 0; i < paragraphGroups.value.length; i++) {
    await new Promise((r) => setTimeout(r, delay))
    visibleGroups.value = i + 1
  }
}
</script>

<template>
  <div>
    <section class="wrap pt-20 pb-8">
      <EditorialHeading
        :kicker="letter.label"
        :title="letter.heading"
        centered
      />
    </section>

    <!-- Envelope -->
    <section class="wrap pb-16">
      <div class="reveal" style="--reveal-delay: 60ms">
        <!-- Sealed -->
        <div v-if="!opened" class="mx-auto max-w-md">
          <div
            class="envelope relative mx-auto mb-6 flex h-56 w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-burgundy/20 bg-cream p-6 text-center shadow-md transition-transform hover:scale-[1.02] md:p-8"
            @click="reveal"
            role="button"
            tabindex="0"
            aria-label="Open your letter"
            @keydown.enter.space="reveal"
          >
            <div
              class="envelope-flap absolute inset-x-0 top-[76px] h-8 -z-0 origin-bottom rotate-[110deg] border-l-4 border-r-4 border-burgundy/30 bg-burgundy/10 -translate-x-[20px] md:-translate-y-1 md:translate-x-0"
            />
            <StarDoodle class="h-10 w-10 text-burgundy/25" />
            <p class="hand text-center text-sm text-ink/60">{{ letter.label }}</p>
            <p class="hand text-xs text-ink/40">click to open</p>
          </div>
        </div>

        <!-- Revealed letter -->
        <transition name="letter-fade" appear>
          <div
            v-if="opened"
            class="letter-paper relative mx-auto mb-6 max-w-xl rounded-xl border border-burgundy/15 bg-ivory p-6 shadow-md md:p-8"
          >
            <div class="letter-body space-y-5">
              <p class="hand-sm text-burgundy">{{ letter.salutation }}</p>
              <p class="hand-sm text-burgundy">{{ letter.opening }}</p>

              <transition-group name="paragraph" tag="div">
                <p
                  v-for="(g, i) in paragraphGroups"
                  :key="g.id"
                  v-show="visibleGroups >= i + 1"
                  class="paragraph text-ink/85"
                >
                  {{ g.text }}
                </p>
              </transition-group>

              <p class="hand-sm text-burgundy">{{ letter.signoff }}</p>
              <p class="hand-sm text-burgundy">{{ letter.signature }}</p>
            </div>

            <!-- drifting doodles -->
            <FlowerDoodle
              class="absolute top-6 left-1/2 h-5 w-5 -translate-x-1/2 text-rose/30"
              :float="true"
            />
            <StarDoodle class="absolute bottom-8 right-6 h-4 w-4 text-gold/40" :spin="true" />
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<style scoped>
.envelope-flap {
  background: linear-gradient(
    135deg,
    color-mix(in oklab, var(--color-burgundy) 55%, transparent) 0%,
    color-mix(in oklab, var(--color-burgundy) 70%, transparent) 100%
  );
}
.letter-body {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  line-height: 1.7;
}
.paragraph-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.paragraph-enter-active {
  transition: opacity .35s var(--ease-silk), transform .35s var(--ease-silk);
}
.paragraph-enter-to {
  opacity: 1;
  transform: none;
}
.letter-fade-enter-active { transition: opacity .45s var(--ease-silk), transform .45s var(--ease-silk); }
.letter-fade-leave-active { transition: opacity .3s ease; }
.letter-fade-enter-from,
.letter-fade-leave-to { opacity: 0; transform: scale(0.98); }
</style>
