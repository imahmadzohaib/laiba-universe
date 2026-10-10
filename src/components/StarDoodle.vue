<script setup lang="ts">
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps<{
  class?: string
  spin?: boolean
  pulse?: boolean
}>()
const { prefersReduced } = useReducedMotion()
</script>

<template>
  <svg
    :class="[
      'star-doodle',
      props.spin && !prefersReduced ? 'spin' : '',
      props.pulse && !prefersReduced ? 'pulse' : '',
      props.class,
    ]"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2.5l2.93 6.03 6.57.97-4.79 4.66 1.19 6.53-5.88-3.1-5.3 2.78 1.05-5.83-4.95-4.66h6.48z"
    />
  </svg>
</template>

<style scoped>
.star-doodle {
  filter: drop-shadow(0 1px 0 rgba(97, 44, 70, 0.08));
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes pulse {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}
</style>
