<script setup lang="ts">
import { computed } from 'vue'
import { palettes } from '@/data/palettes'

const props = withDefaults(defineProps<{ active: string }>(), { active: 'petals' })
const emit = defineEmits<{ (e: 'update:active', v: string): void }>()

const active = computed(() => props.active)
</script>

<template>
  <div class="color-stories">
    <h3 class="display-md mb-2 text-burgundy">Color stories</h3>
    <p class="hand mb-5 text-ink/60">
      Select a palette to re-tint the artwork below.
    </p>

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <button
        v-for="p in palettes"
        :key="p.id"
        @click="emit('update:active', p.id)"
        :aria-pressed="active === p.id"
        class="group relative flex flex-col items-center gap-2 rounded-md border border-burgundy/10 bg-ivory p-3 text-center shadow-sm transition-all"
        :class="
          active === p.id
            ? 'border-burgundy/40 ring-2 ring-burgundy/15'
            : 'hover:border-burgundy/30 hover:shadow-md'
        "
      >
        <div class="flex h-7 items-center gap-1">
          <span
            v-for="c in p.colors"
            :key="c"
            :class="[
              'block h-6 w-6 rounded-full ring-1 ring-white',
              active === p.id ? 'ring-2 ring-burgundy' : '',
            ]"
            :style="{ background: c }"
          />
        </div>
        <span class="hand text-sm text-burgundy">{{ p.name }}</span>
        <span class="sr-only">{{ p.description }}</span>
      </button>
    </div>

    <!-- featured abstract artwork re-tinted by active palette -->
    <div class="mt-8">
      <PaletteArt :palette-id="active" />
    </div>
  </div>
</template>

<script lang="ts">
import PaletteArt from '@/components/PaletteArt.vue'
export default { components: { PaletteArt } }
</script>
