<script setup lang="ts">
import type { Destination } from '@/data/content'
import StarDoodle from '@/components/StarDoodle.vue'

const props = defineProps<{ destination: Destination; index: string }>()
</script>

<template>
  <article
    class="group relative"
  >
    <RouterLink
      :to="props.destination.to"
      class="block no-underline outline-none focus-visible:ring-burgundy"
    >
      <div
        class="relative flex flex-col items-center gap-4 rounded-2xl border border-burgundy/10 bg-cream/50 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:border-burgundy/20 group-hover:shadow-md"
      >
        <!-- Decorative index badge -->
        <span
          class="hand text-burgundy/50 text-xs tracking-widest"
          aria-hidden="true"
          >{{ props.index }}</span
        >

        <!-- Leading visual -->
        <div
          class="flex h-24 w-24 items-center justify-center rounded-full border border-burgundy/15 bg-cream text-burgundy shadow-inner"
        >
          <StarDoodle class="h-10 w-10" :spin="true" />
        </div>

        <div class="mt-1">
          <span class="kicker">{{ props.destination.eyebrow }}</span>
        </div>

        <h2
          class="display-md text-burgundy transition-colors group-hover:text-rose"
        >
          {{ props.destination.title }}
        </h2>

        <p class="lede mt-1 max-w-sm">
          {{ props.destination.blurb }}
        </p>
      </div>
    </RouterLink>
  </article>
</template>
