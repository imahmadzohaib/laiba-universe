<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { Memory } from '@/data/memories'
import PlaceholderFrame from '@/components/PlaceholderFrame.vue'

const props = defineProps<{
  memories: Memory[]
  startIndex: number
  open: boolean
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'index', i: number): void
}>()

const dialogRef = ref<HTMLElement | null>(null)

const current = computed(() => props.memories[props.startIndex] ?? props.memories[0])
const hasPrev = computed(() => props.startIndex > 0)
const hasNext = computed(() => props.startIndex < props.memories.length - 1)

const goPrev = () => { if (hasPrev.value) emit('index', props.startIndex - 1) }
const goNext = () => { if (hasNext.value) emit('index', props.startIndex + 1) }
const close = () => emit('close')

const onKeydown = (e: KeyboardEvent) => {
  if (!props.open) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowLeft') goPrev()
  if (e.key === 'ArrowRight') goNext()
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))

watch(
  () => props.open,
  (v) => {
    if (v) {
      document.body.style.overflow = 'clip'
      nextTick(() => dialogRef.value?.focus())
    } else {
      document.body.style.overflow = ''
    }
  },
)
</script>

<template>
  <teleport to="body">
    <transition name="lb-fade">
      <div
        v-if="open"
        class="lb-backdrop fixed inset-0 z-[99] flex items-center justify-center p-4"
        @click.self="close"
      >
        <transition name="lb-zoom">
          <article
            ref="dialogRef"
            :key="current.id"
            tabindex="-1"
            class="lb-content relative mx-auto max-w-2xl rounded-xl border border-burgundy/20 bg-ivory shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Memory"
          >
            <button
              class="absolute top-3 right-3 rounded-full p-1 text-ink/50 hover:text-burgundy focus-visible:ring-burgundy"
              aria-label="Close"
              @click="close"
            >
              <X class="h-5 w-5" />
            </button>

            <div class="relative">
              <PlaceholderFrame
                v-if="!current.src"
                :memory="current"
                class="aspect-[4/3] w-full rounded-t-xl object-cover"
              />
              <video
                v-else-if="current.media === 'video'"
                :src="current.src"
                :alt="current.alt"
                class="aspect-[4/3] w-full rounded-t-xl object-cover"
                muted
                loop
                playsinline
                preload="metadata"
              />
              <img
                v-else
                :src="current.src"
                :alt="current.alt"
                class="aspect-[4/3] w-full rounded-t-xl object-cover"
                loading="eager"
                draggable="false"
              />
              <span v-if="current.media === 'video'" class="absolute top-2 right-2 rounded-full bg-ivory/90 px-2 py-0.5 text-xs hand text-burgundy/75 shadow">VIDEO</span>
            </div>

            <div class="p-6 text-center">
              <p class="hand mb-1 text-burgundy/80">{{ current.date }}</p>
              <p class="caption">{{ current.caption }}</p>
              <p v-if="current.note" class="mt-2 hand-sm text-ink/70">
                {{ current.note }}
              </p>
            </div>

            <!-- navigation -->
            <nav
              class="absolute inset-y-1/2 -translate-y-1/2 flex w-full justify-between px-2"
              aria-label="Navigate memories"
            >
              <button
                v-if="hasPrev"
                class="rounded-full bg-ivory/80 p-2 text-ink/60 hover:text-burgundy focus-visible:ring-burgundy"
                aria-label="Previous"
                @click="goPrev"
              >
                <ChevronLeft class="h-5 w-5" />
              </button>
              <button
                v-if="hasNext"
                class="rounded-full bg-ivory/80 p-2 text-ink/60 hover:text-burgundy focus-visible:ring-burgundy"
                aria-label="Next"
                @click="goNext"
              >
                <ChevronRight class="h-5 w-5" />
              </button>
            </nav>
          </article>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.lb-backdrop {
  background: radial-gradient(ellipse at center, rgba(17, 24, 45, 0.8) 0%, rgba(17, 24, 45, 0.92) 100%);
}
.lb-fade-enter-active,
.lb-fade-leave-active { animation: lb-fade 0.35s var(--ease-silk); }
.lb-fade-enter-from,
.lb-fade-leave-to { opacity: 0; }
.lb-zoom-enter-active { animation: lb-zoom-in 0.45s var(--ease-silk); }
.lb-zoom-leave-active { animation: lb-zoom-out 0.35s var(--ease-silk); }
.lb-zoom-enter-from,
.lb-zoom-leave-to { opacity: 0; transform: scale(0.96); }

@keyframes lb-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes lb-zoom-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
@keyframes lb-zoom-out { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.96); } }
</style>
