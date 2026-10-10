<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { brushColors, studioCopy } from '@/data/palettes'

type Tool = 'soft' | 'pencil' | 'water'

const props = withDefaults(defineProps<{ activePalette?: string }>(), {
  activePalette: 'petals',
})
void props.activePalette

const canvasRef = ref<HTMLCanvasElement | null>(null)
const dpr = ref(1)
const size = ref(8)
const tool = ref<Tool>('soft')
const color = ref(brushColors[0].value)
const isDrawing = ref(false)
const lastPoint = ref<{ x: number; y: number } | null>(null)
let ctx: CanvasRenderingContext2D | null = null

const resize = () => {
  const c = canvasRef.value
  if (!c) return
  dpr.value = Math.min(window.devicePixelRatio || 1, 2)
  const rect = c.getBoundingClientRect()
  c.width = Math.round(rect.width * dpr.value)
  c.height = Math.round(rect.height * dpr.value)
  const cctx = c.getContext('2d')
  if (cctx) {
    cctx.setTransform(dpr.value, 0, 0, dpr.value, 0, 0)
    ctx = cctx
  }
}

const brushSize = () => {
  switch (tool.value) {
    case 'pencil':
      return size.value
    case 'water':
      return size.value * 2.2
    default:
      return size.value * 1.6
  }
}

const start = (e: PointerEvent) => {
  isDrawing.value = true
  lastPoint.value = { x: e.offsetX, y: e.offsetY }
}

const drawSegment = (x0: number, y0: number, x1: number, y1: number) => {
  if (!ctx) return
  const b = brushSize()
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  if (tool.value === 'pencil') {
    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = color.value
    ctx.lineWidth = b
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.stroke()
  } else if (tool.value === 'soft') {
    // Soft airbrush: radial gradient stamp along the path
    ctx.globalCompositeOperation = 'source-over'
    const steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0) / Math.max(1, b / 2))
    for (let i = 0; i <= steps; i++) {
      const t = steps === 0 ? 0 : i / steps
      const x = x0 + (x1 - x0) * t
      const y = y0 + (y1 - y0) * t
      const grad = ctx.createRadialGradient(x, y, 0, x, y, b)
      grad.addColorStop(0, color.value)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.globalAlpha = 0.6
      ctx.beginPath()
      ctx.arc(x, y, b, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  } else {
    // watercolor: softer, lower opacity
    ctx.globalCompositeOperation = 'source-over'
    const grad = ctx.createRadialGradient(x1, y1, 0, x1, y1, b)
    grad.addColorStop(0, color.value)
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.globalAlpha = 0.45
    ctx.beginPath()
    ctx.arc(x1, y1, b, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }
}

const draw = (e: PointerEvent) => {
  if (!isDrawing.value || !lastPoint.value) return
  drawSegment(lastPoint.value.x, lastPoint.value.y, e.offsetX, e.offsetY)
  lastPoint.value = { x: e.offsetX, y: e.offsetY }
}

const stop = () => {
  isDrawing.value = true
  lastPoint.value = null
}

const clearCanvas = () => {
  if (window.confirm('Clear this little canvas? This can’t be undone.')) {
    ctx?.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height)
  }
}
const download = () => {
  const c = canvasRef.value
  if (!c) return
  const a = document.createElement('a')
  a.href = c.toDataURL('image/png')
  a.download = `laiba-studio-${Date.now()}.png`
  a.click()
}
const undo = () => ctx?.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height)

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  const c = canvasRef.value
  if (c) {
    c.addEventListener('pointerdown', start)
    c.addEventListener('pointermove', draw)
    c.addEventListener('pointerup', stop)
    c.addEventListener('pointerleave', stop)
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  const c = canvasRef.value
  c?.removeEventListener('pointerdown', start)
  c?.removeEventListener('pointermove', draw)
  c?.removeEventListener('pointerup', stop)
  c?.removeEventListener('pointerleave', stop)
})
</script>

<template>
  <div class="art-studio flex flex-col gap-4">
    <!-- Toolbar -->
    <div
      class="toolbar flex flex-wrap items-center gap-3 rounded-md border border-burgundy/10 bg-cream/60 px-3 py-2"
    >
      <span class="text-xs uppercase tracking-wider text-ink/50">{{ studioCopy.canvasLabel }}</span>

      <!-- color swatches -->
      <div class="flex items-center gap-1.5" role="radiogroup" aria-label="Brush color">
        <button
          v-for="tc in brushColors"
          :key="tc.name"
          :title="tc.name"
          :aria-label="tc.name"
          :aria-pressed="color === tc.value"
          @click="color = tc.value"
          :class="[
            'h-8 w-8 rounded-full border-2 transition-all',
            color === tc.value
              ? 'border-burgundy shadow'
              : 'border-transparent hover:border-burgundy/40',
          ]"
          :style="{ background: tc.value }"
        />
      </div>

      <div class="h-5 w-px bg-burgundy/20" />

      <!-- tools -->
      <div class="flex items-center gap-1" role="radiogroup" aria-label="Brush tool">
        <button
          v-for="t in (['soft', 'pencil', 'water'] as Tool[])"
          :key="t"
          @click="tool = t"
          :title="t"
          :class="[
            'rounded-full px-3 py-1 text-xs font-medium capitalize transition-all',
            tool === t
              ? 'bg-burgundy text-ivory'
              : 'text-ink/60 hover:bg-burgundy/10',
          ]"
        >
          {{ t }}
        </button>
      </div>

      <!-- size -->
      <div class="flex items-center gap-1.5">
        <label class="sr-only" for="brush-size">Brush size</label>
        <input
          id="brush-size"
          type="range"
          min="3"
          max="28"
          step="1"
          :value="size"
          @input="size = +($event.target as HTMLInputElement).value"
          class="w-32 accent-burgundy sm:w-24"
        />
        <span class="text-xs text-ink/55 w-9">{{ size }}px</span>
      </div>

      <!-- actions -->
      <div class="ml-auto flex items-center gap-1.5">
        <button @click="undo" class="btn btn-ghost !h-8 !px-3 text-xs" aria-label="Undo">Undo</button>
        <button @click="clearCanvas" class="btn btn-ghost !h-8 !px-3 text-xs" aria-label="Clear">Clear</button>
        <button @click="download" class="btn btn-primary !h-8 !px-3 text-xs" aria-label="Save / download">Save</button>
      </div>
    </div>

    <!-- Canvas -->
    <div class="relative flex-1 overflow-hidden rounded-md border border-burgundy/10 bg-[repeating-linear-gradient(45deg,_rgba(97,44,70,0.03)_0_2px,_transparent_2px_4px)] bg-[size:24px_24px] shadow-inner">
      <canvas ref="canvasRef" class="block h-full w-full cursor-crosshair" style="touch-action: none" />
    </div>
  </div>
</template>

<style scoped>
.art-studio { min-height: 340px; }
</style>
