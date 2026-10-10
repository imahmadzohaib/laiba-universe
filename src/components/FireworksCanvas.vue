<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    /** fire when true */
    trigger: boolean
    /** color palette id — controls firework hues */
    palette: string
  }>(),
  { trigger: false, palette: 'midnight' },
)

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let ctx: CanvasRenderingContext2D | null = null
let dpr = 1
let cw = 0
let ch = 0
let particles: Particle[] = []

const paletteColors = {
  petals: ['#D6B77A', '#D6A5AC', '#B8ACD4', '#FFFFFF', '#F7F1E8'],
  sunset: ['#F2D79C', '#D6B77A', '#CE8E86', '#7A3A5C', '#FFFFFF'],
  lavender: ['#B8ACD4', '#9A86BE', '#D6A5AC', '#F3EEF7', '#FFFFFF'],
  golden: ['#F2D79C', '#D6B77A', '#C98F5A', '#8A5A3C', '#FFFFFF'],
  midnight: ['#D6B77A', '#D6A5AC', '#B8ACD4', '#FFFFFF', '#FBF7F0'],
}

const colors = (id: string) => paletteColors[id as keyof typeof paletteColors] ?? paletteColors.midnight

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  alpha: number
  size: number
  color: string
  gravity: number
}

function rand(min: number, max: number) { return Math.random() * (max - min) + min }
function randInt(min: number, max: number) { return Math.floor(rand(min, max)) }

function launchFirework() {
  const cols = colors(props.palette)
  const x = rand(cw * 0.15, cw * 0.85)
  const y = rand(ch * 0.35, ch * 0.75)
  const n = randInt(24, 42)
  const baseSpeed = rand(2.6, 4.2)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const speed = baseSpeed * (0.7 + Math.random() * 0.5)
    particles.push({
      x, y,
      vx: Math.cos(a) * speed + rand(-0.4, 0.4),
      vy: Math.sin(a) * speed + rand(-0.4, 0.4) - 0.3,
      life: 1,
      alpha: 1,
      size: rand(1.4, 3.2),
      color: cols[randInt(0, cols.length)],
      gravity: 0.04 + Math.random() * 0.03,
    })
  }
  // trail particles
  for (let i = 0; i < 6; i++) {
    particles.push({
      x, y,
      vx: rand(-0.5, 0.5),
      vy: -rand(2, 4),
      life: 1,
      alpha: 0.45,
      size: rand(1, 2.0),
      color: cols[cols.length - 1],
      gravity: 0.06,
    })
  }
}

function burst(count = 2) {
  for (let i = 0; i < count; i++) {
    // stagger launches slightly
    setTimeout(launchFirework, i * 180 + Math.random() * 300)
  }
}

function resize() {
  const c = canvasRef.value
  if (!c) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  const r = c.getBoundingClientRect()
  cw = Math.round(r.width)
  ch = Math.round(r.height)
  c.width = Math.round(cw * dpr)
  c.height = Math.round(ch * dpr)
  ctx = c.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)
}

function tick() {
  if (!ctx) return
  // fade trail
  ctx.fillStyle = 'rgba(17, 24, 45, 0.22)'
  ctx.fillRect(0, 0, cw, ch)
  // sort older to newer for proper layering, and cull dead
  particles = particles.filter(p => p.life > 0)
  for (const p of particles) {
    p.vx *= 0.97
    p.vy *= 0.97
    p.vy += p.gravity
    p.x += p.vx
    p.y += p.vy
    p.life -= 0.006 + p.gravity * 0.03
    p.alpha = p.life
    // sparkle occasionally
    ctx.globalAlpha = p.alpha
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
  raf = requestAnimationFrame(tick)
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(raf)
  celebrationTimers.forEach(clearTimeout)
})

let celebrationStarted = false
let celebrationTimers: ReturnType<typeof setTimeout>[] = []

function startCelebration() {
  if (props.trigger && !celebrationStarted) {
    celebrationStarted = true
    // Fire initial burst
    burst(randInt(3, 5))
    // Schedule additional bursts over ~10 seconds for a sustained celebration
    const waveCount = 6
    for (let i = 1; i <= waveCount; i++) {
      celebrationTimers.push(
        setTimeout(() => burst(randInt(2, 4)), 1400 + i * 1300)
      )
    }
  }
}

onMounted(() => {
  resize()
  startCelebration()
  window.addEventListener('resize', resize)
  raf = requestAnimationFrame(tick)
})

defineExpose({ launchFirework, burst })
</script>

<template>
  <div class="fireworks-wrap relative overflow-hidden rounded-2xl">
    <canvas ref="canvasRef" class="block h-full w-full" />
  </div>
</template>

<style scoped>
.fireworks-wrap {
  /* deep midnight field as the canvas backdrop */
  background: radial-gradient(ellipse at top, #101530 0%, #0b0f22 75%, #060914 100%);
}
</style>
