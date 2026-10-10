<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { palettes } from '@/data/palettes'

const props = withDefaults(defineProps<{ paletteId: string }>(), { paletteId: 'petals' })
const canvasRef = ref<HTMLCanvasElement | null>(null)

type Petal = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; phase: number }
type Bloom = { x: number; y: number }

let raf = 0
let ctx: CanvasRenderingContext2D | null = null
let dpr = 1
let w = 0
let h = 0
const petals: Petal[] = []
const blooms: Bloom[] = []
const cursor = ref<{ x: number; y: number }>({ x: 0.5, y: 0.5 })
const cursorActive = ref(false)
let cursorTimer: number | undefined

const palette = computed(() => palettes.find((p) => p.id === props.paletteId) ?? palettes[0])

const regenerate = () => {
  petals.length = 0
  blooms.length = 0
  for (let i = 0; i < 140; i++) {
    petals.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.55) * 0.18,
      r: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.4 + 0.15,
      phase: Math.random() * Math.PI * 2,
    })
  }
  for (let i = 0; i < 5; i++) blooms.push({ x: Math.random() * w, y: Math.random() * h })
}

const resize = () => {
  const c = canvasRef.value
  if (!c) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  const rect = c.getBoundingClientRect()
  w = rect.width
  h = rect.height
  c.width = Math.round(w * dpr)
  c.height = Math.round(h * dpr)
  ctx = c.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
  regenerate()
}

const tick = () => {
  if (!ctx) return
  const c = ctx // capture for closure narrowing
  c.clearRect(0, 0, w, h)

  const mx = cursor.value.x * w
  const my = cursor.value.y * h

  // watercolor-style blooms reacting to cursor
  c.save()
  c.globalCompositeOperation = 'screen'
  blooms.forEach((b, i) => {
    const r = 18 + (cursorActive.value ? 5 : 0)
    const grad = c.createRadialGradient(
      b.x + (mx - b.x) * 0.04,
      b.y + (my - b.y) * 0.04,
      0,
      b.x,
      b.y,
      r,
    )
    const col = palette.value.colors[i % palette.value.colors.length]
    grad.addColorStop(0, col)
    grad.addColorStop(1, 'transparent')
    c.fillStyle = grad
    c.globalAlpha = 0.35
    c.beginPath()
    c.arc(b.x, b.y, r, 0, Math.PI * 2)
    c.fill()
  })
  c.restore()

  // floating particles
  c.save()
  c.globalCompositeOperation = 'lighter'
  petals.forEach((p, i) => {
    const col = palette.value.colors[i % palette.value.colors.length]
    c.fillStyle = col
    c.globalAlpha = Math.min(0.85, p.alpha + Math.sin(performance.now() / 1000 + p.phase) * 0.08)
    c.beginPath()
    c.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    c.fill()
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0) p.x = w
    if (p.x > w) p.x = 0
    if (p.y < 0) p.y = h
    if (p.y > h) p.y = 0
  })
  c.restore()

  raf = requestAnimationFrame(tick)
}

const onMove = (e: MouseEvent | TouchEvent) => {
  const rect = canvasRef.value!.getBoundingClientRect()
  let clientX: number
  let clientY: number
  if ('touches' in e) {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else {
    clientX = e.clientX
    clientY = e.clientY
  }
  cursor.value = { x: (clientX - rect.left) / rect.width, y: (clientY - rect.top) / rect.height }
  cursorActive.value = true
  if (cursorTimer) window.clearTimeout(cursorTimer)
  cursorTimer = window.setTimeout(() => (cursorActive.value = false), 800)
}

onMounted(() => {
  window.addEventListener('resize', resize)
  resize()
  canvasRef.value?.addEventListener('mousemove', onMove)
  canvasRef.value?.addEventListener('touchmove', onMove, { passive: true })
  canvasRef.value?.addEventListener('mouseenter', () => { cursorActive.value = true })
  raf = window.requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(raf)
  window.clearTimeout(cursorTimer)
})

watch(() => props.paletteId, resize)

defineExpose({ regenerate })
</script>

<template>
  <div class="generative-art relative overflow-hidden rounded-2xl border border-burgundy/10 bg-[radial-gradient(ellipse_at_top,_#101530,_#f3eee5)]">
    <canvas ref="canvasRef" class="block h-72 w-full" style="touch-action: none" />
  </div>
  <p class="hand mt-3 text-center text-ink/55">
    Move your cursor. Each one is a little different — like a bloom spreading on wet paper.
  </p>
</template>

<style scoped>
.generative-art {
  color: var(--color-ink);
}
</style>
