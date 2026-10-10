<script setup lang="ts">
import type { Memory } from '@/data/memories'
import PlaceholderFrame from '@/components/PlaceholderFrame.vue'

const props = withDefaults(
  defineProps<{ memory: Memory }>(),
  {},
)
const emit = defineEmits<{
  (e: 'open', m: Memory): void
}>()
</script>

<template>
  <article
    :class="[
      'memory-card relative cursor-pointer rounded-xl border bg-cream/60 p-1 shadow-sm transition-all',
      'focus-visible:outline focus-focus',
    ]"
    :style="{ transform: `rotate(${props.memory.tilt}deg)` }"
    @click="emit('open', props.memory)"
    role="button"
    tabindex="0"
    :aria-label="`Open ${props.memory.caption}`"
    @keydown.enter.space="emit('open', props.memory)"
  >
    <div class="relative overflow-hidden rounded-lg">
      <PlaceholderFrame
        v-if="!props.memory.src"
        :memory="props.memory"
        class="block aspect-[4/3] w-full"
      />
      <video
        v-else-if="props.memory.media === 'video'"
        :src="props.memory.src"
        :alt="props.memory.alt"
        class="block aspect-[4/3] w-full object-cover contrast-110"
        muted
        loop
        playsinline
        preload="metadata"
      />
      <img
        v-else
        :src="props.memory.src"
        :alt="props.memory.alt"
        class="block aspect-[4/3] w-full object-cover contrast-110 h-auto"
        loading="eager"
        draggable="false"
      />
      <span
        class="pointer-events-none absolute bottom-2 right-2 rounded-full bg-ivory/90 px-2 py-0.5 text-xs hand text-burgundy/75 shadow"
        >{{ props.memory.date }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.memory-card:hover {
  transform: scale(1.03) rotate(0deg) !important;
  box-shadow: 0 24px 50px -12px rgba(97, 44, 70, 0.22);
}
.focus-focus {
  outline: 2px solid color-mix(in oklab, var(--color-burgundy) 70%, transparent);
  outline-offset: 3px;
  border-radius: 0.75rem;
}
</style>
