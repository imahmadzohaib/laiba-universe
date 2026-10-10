<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = withDefaults(
  defineProps<{
    kicker?: string
    title: string
    subtitle?: string
    lede?: string
    centered?: boolean
    delay?: string
    size?: 'xl' | 'lg' | 'md'
  }>(),
  {
    centered: false,
    delay: '0ms',
    size: 'lg',
  },
)
useReveal()
const { prefersReduced } = useReducedMotion()

const displayClass = {
  xl: 'display-xl',
  lg: 'display-lg',
  md: 'display-md',
}[props.size]
</script>

<template>
  <header
    class="editorial-heading reveal"
    :style="{ '--reveal-delay': delay }"
    :class="{ 'text-center': centered }"
  >
    <div
      v-if="kicker"
      class="kicker mb-3"
      :class="{ 'justify-center': centered }"
    >
      {{ kicker }}
    </div>

    <h1
      class="tracking-tight leading-[0.92] mb-3"
      :class="displayClass"
    >
      {{ title }}
    </h1>

    <div
      v-if="subtitle"
      class="serif-statement mb-5"
      :class="{ 'mx-auto max-w-xl text-center': centered }"
    >
      {{ subtitle }}
    </div>

    <p
      v-if="lede"
      class="lede"
      :class="{ 'mx-auto max-w-xl': centered }"
    >
      {{ lede }}
    </p>

    <transition name="fade">
      <div v-show="prefersReduced" class="sr-only">
        {{ title }}
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
</style>
