<script setup lang="ts">
import { ref } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { useReveal } from '@/composables/useReveal'
import { seo } from '@/data/content'
import { studioCopy, palettes } from '@/data/palettes'
import EditorialHeading from '@/components/EditorialHeading.vue'
import ArtCanvas from '@/components/ArtCanvas.vue'
import ColorStories from '@/components/ColorStories.vue'
import GenerativeArt from '@/components/GenerativeArt.vue'
import FlowerDoodle from '@/components/FlowerDoodle.vue'

useSeo(seo.studio)
useReveal()

const activePalette = ref(palettes[0].id)
const artRef = ref<InstanceType<typeof GenerativeArt> | null>(null)
const regenerateArt = () => artRef.value?.regenerate()
</script>

<template>
  <div>
    <section class="wrap pt-20 pb-6">
      <EditorialHeading
        :kicker="studioCopy.kicker"
        :title="studioCopy.heading"
        :lede="studioCopy.lede"
        centered
      />
    </section>

    <!-- Feature A: Canvas -->
    <section class="wrap py-12">
      <div class="reveal" style="--reveal-delay: 40ms">
        <p class="hand mb-2 text-burgundy">{{ studioCopy.canvasLabel }}</p>
        <ArtCanvas :active-palette="activePalette" />
      </div>
    </section>

    <!-- Feature B: Color stories -->
    <section class="wrap py-12">
      <div class="reveal" style="--reveal-delay: 80ms">
        <ColorStories v-model:active="activePalette" />
      </div>
    </section>

    <!-- Feature C: Generative art -->
    <section class="wrap py-12">
      <div class="reveal" style="--reveal-delay: 120ms">
        <h2 class="display-md mb-2 text-burgundy">{{ studioCopy.generativeTitle }}</h2>
        <p class="hand mb-4 text-center text-ink/60">{{ studioCopy.generativeLede }}</p>
        <GenerativeArt ref="artRef" :palette-id="activePalette" />
        <div class="mt-4 flex justify-center">
          <button @click="regenerateArt" class="btn btn-ghost" aria-label="Create another generative piece">
            {{ studioCopy.generateCta }}
          </button>
        </div>
      </div>
    </section>

    <!-- Feature D: dedication -->
    <section class="wrap py-16">
      <div
        class="reveal relative mx-auto max-w-xl rounded-md border border-burgundy/10 bg-cream/60 p-6 text-center with-grain md:p-8"
        style="--grain-opacity: 0.35"
      >
        <FlowerDoodle
          class="absolute top-0 left-1/2 h-8 w-8 -translate-x-1/2 text-rose/25 md:-top-5 md:h-10 md:w-10"
          :float="true"
        />
        <p class="hand mb-2 text-lg text-burgundy">{{ studioCopy.dedication1 }}</p>
        <p class="hand text-ink/70">{{ studioCopy.dedication2 }}</p>
      </div>
    </section>
  </div>
</template>
