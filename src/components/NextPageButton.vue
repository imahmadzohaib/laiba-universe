<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const pageOrder = ['/', '/memories', '/studio', '/letter', '/birthday']

const nextPath = computed(() => {
  const index = pageOrder.indexOf(route.path)
  if (index === -1 || index === pageOrder.length - 1) return null
  return pageOrder[index + 1]
})

const nextLabel = computed(() => {
  const names: Record<string, string> = {
    '/': 'Memories',
    '/memories': 'Art Studio',
    '/studio': 'Letter',
    '/letter': 'Birthday',
  }
  return names[route.path] ?? 'Next'
})

const goNext = () => {
  if (nextPath.value) router.push(nextPath.value)
}
</script>

<template>
  <div v-if="nextPath" class="wrap pb-16 text-center">
    <button
      @click="goNext"
      class="btn btn-ghost inline-flex items-center gap-2"
      aria-label="Next page"
    >
      Continue to <span class="font-medium">{{ nextLabel }}</span>
      <ArrowRight class="h-4 w-4" />
    </button>
  </div>
</template>
