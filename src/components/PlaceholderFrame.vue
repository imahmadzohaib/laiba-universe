<script setup lang="ts">
import { computed } from 'vue'
import type { Memory } from '@/data/memories'
import StarDoodle from '@/components/StarDoodle.vue'

const props = defineProps<{ memory: Memory }>()

const tintClass = computed(() => {
  const t = props.memory.tint[0]
  const map = {
    rose: 'bg-gradient-to-br from-rose/5 to-cream',
    lavender: 'bg-gradient-to-br from-lavender/8 to-cream',
    gold: 'bg-gradient-to-br from-gold/10 to-cream',
    burgundy: 'bg-gradient-to-br from-burgundy/8 to-cream',
  }
  return map[t as keyof typeof map] || 'bg-gradient-to-br from-cream to-cream'
})

const washClass = computed(() => {
  const t = props.memory.tint[0]
  const map = {
    burgundy: 'wash-burgundy',
    gold: 'wash-gold',
    rose: 'wash-rose',
    lavender: 'wash-lavender',
  }
  return map[t as keyof typeof map] || 'wash-default'
})
</script>

<template>
  <div
    class="placeholder-frame relative flex h-full w-full items-center justify-center"
    :class="tintClass"
  >
    <div class="absolute inset-0 opacity-25" :class="washClass" />
    <div class="relative z-10 flex flex-col items-center gap-2 text-burgundy/70">
      <StarDoodle class="h-10 w-10" :spin="true" />
      <span class="hand text-xs opacity-70">a remembered moment</span>
    </div>
  </div>
</template>

<style scoped>
.placeholder-frame {
  background-image: radial-gradient(circle at 50% 50%, rgba(97, 44, 70, 0.025) 1px, transparent 1.5px);
  background-size: 18px 18px;
}
.wash-burgundy { background: radial-gradient(ellipse at center, rgba(97, 44, 70, 0.06), transparent 60%); }
.wash-gold { background: radial-gradient(ellipse at center, rgba(214, 183, 122, 0.08), transparent 60%); }
.wash-rose { background: radial-gradient(ellipse at center, rgba(214, 165, 172, 0.07), transparent 60%); }
.wash-lavender { background: radial-gradient(ellipse at center, rgba(184, 172, 212, 0.07), transparent 60%); }
.wash-default { background: none; }
</style>
