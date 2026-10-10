<script setup lang="ts">
import { useRoute } from 'vue-router'
import { nav } from '@/data/content'
import StarDoodle from '@/components/StarDoodle.vue'

const route = useRoute()
const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="mt-16 border-t border-burgundy/10 bg-cream/50 pb-6 pt-8"
    v-if="route.path !== '/'"
  >
    <div class="wrap flex flex-col items-center gap-4">
      <nav aria-label="Footer navigation" class="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink/60">
        <router-link
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="link-underline text-ink/65 hover:text-burgundy"
          >{{ item.label }}
        </router-link>
      </nav>
      <div class="flex items-center gap-2 text-xs text-ink/50 hand">
        <StarDoodle class="h-3.5 w-3.5" />
        <span>A little universe, © {{ year }}.</span>
      </div>
    </div>
  </footer>

  <!-- Minimal home footer: just a signature -->
  <footer v-else class="mt-24 border-t border-burgundy/10 pb-8 pt-6">
    <div class="wrap flex flex-col items-center gap-3">
      <p class="hand text-center text-ink/60">
        Made with a little thought, a lot of care and a wish for your happiest year yet.
      </p>
      <StarDoodle class="h-5 w-5 text-rose/40" />
    </div>
  </footer>
</template>
