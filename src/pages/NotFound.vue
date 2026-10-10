<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'
import { seo } from '@/data/content'
import StarDoodle from '@/components/StarDoodle.vue'
import FlowerDoodle from '@/components/FlowerDoodle.vue'

useSeo(seo.notFound)
</script>

<template>
  <div class="flex min-h-[80vh] items-center justify-center">
    <div class="wrap pb-10 text-center">
      <div class="mb-6 flex justify-center">
        <FlowerDoodle class="h-16 w-16 text-burgundy/30" :float="true" />
        <StarDoodle class="h-10 w-10 text-gold/50" :spin="true" />
      </div>
      <h1 class="display-lg mb-3 text-burgundy">404 — Lost in the stars.</h1>
      <p class="lede mb-6 max-w-md">
        The page you’re looking for drifted off the map. It might have been a
        memory, a brushstroke, or a wish that slipped between the constellations.
      </p>
      <RouterLink to="/" class="btn btn-primary">
        Return to the Universe
      </RouterLink>
    </div>
  </div>
</template>
