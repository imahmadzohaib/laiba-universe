<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSeo } from '@/composables/useSeo'
import { useReveal } from '@/composables/useReveal'
import { seo } from '@/data/content'
import { memories, galleryIntro } from '@/data/memories'
import EditorialHeading from '@/components/EditorialHeading.vue'
import MemoryCard from '@/components/MemoryCard.vue'
import MemoryLightbox from '@/components/MemoryLightbox.vue'

useSeo(seo.memories)
useReveal()

const lightboxOpen = ref(false)
const currentIndex = ref(0)

const openAt = (i: number) => {
  currentIndex.value = i
  lightboxOpen.value = true
}
const close = () => (lightboxOpen.value = false)
const navTo = (i: number) => {
  currentIndex.value = i
  // Lightbox keeps same mount; just updates startIndex
}

onMounted(() => {
  // Reveal grid items progressively
  const items = document.querySelectorAll('.memory-card')
  items.forEach((item, i) => {
    const el = item as HTMLElement
    el.style.transitionDelay = `${i * 60}ms`
    el.classList.add('reveal')
  })
})
</script>

<template>
  <div>
    <section class="wrap pt-20 pb-12">
      <EditorialHeading
        :kicker="galleryIntro.kicker"
        :title="galleryIntro.heading"
        :lede="galleryIntro.lede"
        centered
      />
    </section>

    <!-- Asymmetrical editorial gallery -->
    <section class="wrap pb-16">
      <div class="columns-1 gap-6 space-y-6 sm:columns-2">
        <div
          v-for="(m, i) in memories"
          :key="m.id"
          class="reveal mb-4 inline-block w-full break-inside-avoid sm:mb-6"
          :style="{ '--reveal-delay': `${i * 40}ms` }"
        >
          <MemoryCard :memory="m" @open="openAt(i)" />
        </div>
      </div>
    </section>

    <!-- closing note -->
    <section class="wrap pb-20 text-center">
      <p class="hand text-ink/55">{{ galleryIntro.closingNote }}</p>
    </section>

    <!-- Lightbox -->
    <MemoryLightbox
      v-if="lightboxOpen"
      :memories="memories"
      :start-index="currentIndex"
      :open="lightboxOpen"
      @close="close"
      @index="navTo"
    />
  </div>
</template>
