<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { palettes } from '@/data/palettes'

const props = defineProps<{ paletteId: string }>()

const svgRef = ref<SVGSVGElement | null>(null)
const palette = computed(() => palettes.find((p) => p.id === props.paletteId) ?? palettes[0])

const dots = ref<{ id: number; cx: number; cy: number; r: number }[]>([])
const blooms = ref<{ id: number; cx: number; cy: number; r: number }[]>([])

const random = (min: number, max: number) => Math.random() * (max - min) + min

const regenerate = () => {
  dots.value = Array.from({ length: 140 }, (_, i) => ({
    id: i,
    cx: random(0, 100),
    cy: random(0, 100),
    r: random(0.6, 2.4),
  }))
  blooms.value = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    cx: random(12, 88),
    cy: random(18, 82),
    r: random(14, 26),
  }))
}

onMounted(regenerate)
watch(() => props.paletteId, regenerate)
</script>

<template>
  <div class="palette-art relative overflow-hidden rounded-2xl border border-burgundy/10 bg-ivory p-1">
    <svg
      ref="svgRef"
      viewBox="0 0 100 60"
      class="block h-56 w-full"
      role="img"
      :aria-label="`Abstract artwork re-tinted by the ${palette.name} color story`"
    >
      <!-- base bloom shapes use palette colors -->
      <defs>
        <radialGradient v-for="c in palette.colors" :key="c" :id="`g-${c.replace('#', '')}`" cx="30%" cy="30%">
          <stop offset="0%" :stop-color="c" />
          <stop offset="100%" stop-color="transparent" />
        </radialGradient>
      </defs>

      <!-- background blooms -->
      <g fill="none" stroke="currentColor" stroke-width="0.3" stroke-opacity="0.08">
        <circle
          v-for="b in blooms"
          :key="b.id"
          :cx="b.cx"
          :cy="b.cy"
          :r="b.r"
        />
      </g>

      <!-- colored washes -->
      <g>
        <circle
          v-for="(b, i) in blooms"
          :key="`w-${b.id}`"
          :cx="b.cx"
          :cy="b.cy"
          :r="b.r + 4"
          :fill="`url(#g-${palette.colors[i % palette.colors.length].replace('#', '')})`"
          fill-opacity="0.18"
        />
      </g>

      <!-- star field -->
      <g fill="currentColor">
        <circle
          v-for="d in dots"
          :key="d.id"
          :cx="d.cx"
          :cy="d.cy"
          :r="d.r"
          :fill="palette.colors[palette.colors.length - 1]"
          fill-opacity="0.55"
        />
      </g>

      <!-- a single flowing path that traces the palette -->
      <path
        :d="`M 8 ${12 + (Math.random() * 4)} C 28 ${6 + Math.random() * 6}, 42 ${22 + Math.random() * 6}, 60 ${16 + Math.random() * 6} T 92 ${10 + Math.random() * 8}`"
        stroke="currentColor"
        stroke-width="0.8"
        stroke-linecap="round"
        stroke-opacity="0.35"
        fill="none"
      />
    </svg>
  </div>
</template>

<style scoped>
.palette-art {
  /* keep text color as stroke source */
  color: var(--color-ink);
}
</style>
