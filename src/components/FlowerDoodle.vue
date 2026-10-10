<script setup lang="ts">
import { useReducedMotion } from '@/composables/useReducedMotion'
const props = defineProps<{ class?: string; float?: boolean }>()
const { prefersReduced } = useReducedMotion()
</script>

<template>
  <svg
    :class="[
      'flower-doodle',
      props.float && !prefersReduced ? 'float' : '',
      props.class,
    ]"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="3.5" />
    <path d="M16 4.5v5M16 22.5v5M4.5 16h5M22.5 16h5" />
    <path d="M8.5 8.5 11.5 11.5M20.5 20.5 23.5 23.5M20.5 8.5 23.5 11.5M8.5 20.5 11.5 23.5" />
  </svg>
</template>

<style scoped>
.flower-doodle {
  flex-shrink: 0;
  opacity: 0.85;
  filter: drop-shadow(0 2px 3px rgba(97, 44, 70, 0.08));
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateY(-6px) rotate(1deg);
  }
}
</style>
