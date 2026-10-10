<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, X, Music } from 'lucide-vue-next'
import { nav } from '@/data/content'
import StarDoodle from '@/components/StarDoodle.vue'

const route = useRoute()
const router = useRouter()
const mobileOpen = ref(false)
const musicOn = ref(false)

const isActive = (path: string) =>
  path === '/' ? route.path === '/' : route.path.startsWith(path)

const closeMenu = () => (mobileOpen.value = false)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeMenu()
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
router.afterEach(closeMenu)
</script>

<template>
  <nav
    class="fixed inset-x-0 top-0 z-40 border-b border-burgundy/10 bg-ivory"
  >
    <div class="wrap flex h-14 items-center justify-between">
      <!-- Brand -->
      <router-link
        to="/"
        class="flex items-center gap-2 text-burgundy transition-colors hover:text-rose"
        @click="closeMenu"
      >
        <StarDoodle class="h-5 w-5 shrink-0" />
        <span class="font-serif hand text-lg leading-none">Laiba</span>
        <span class="sr-only">Laiba's Little Universe</span>
      </router-link>

      <!-- Desktop menu -->
      <div class="hidden items-center gap-2.5 text-sm md:flex">
        <router-link
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          :class="[
            'nav-link relative py-2.5',
            isActive(item.to) ? 'active text-burgundy' : 'text-ink/65 hover:text-burgundy',
          ]"
          >{{ item.label }}
        </router-link>
        <button
          type="button"
          class="nav-link relative py-2.5 text-ink/60 hover:text-burgundy"
          :aria-label="musicOn ? 'Pause music' : 'Play music'"
          :title="musicOn ? 'Pause music' : 'Play music'"
          @click="musicOn = !musicOn"
        >
          <Music class="h-4 w-4" />
        </button>
      </div>

      <!-- Mobile toggle -->
      <button
        type="button"
        class="md:hidden rounded-full p-2 text-ink/70 hover:text-burgundy focus-visible:ring-burgundy"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation"
        @click="mobileOpen = !mobileOpen"
      >
        <Menu v-if="!mobileOpen" class="h-5 w-5" />
        <X v-else class="h-5 w-5" />
      </button>
    </div>

    <!-- Mobile panel -->
    <transition name="slide">
      <div
        v-if="mobileOpen"
        id="mobile-menu"
        class="border-t border-burgundy/10 bg-ivory md:hidden backdrop-blur-sm"
      >
        <div class="wrap flex flex-col gap-1 py-3">
          <router-link
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="py-3 text-center text-base"
            :class="[
              'transition-colors',
              isActive(item.to)
                ? 'font-medium text-burgundy'
                : 'text-ink/70 hover:text-burgundy',
            ]"
            @click="closeMenu"
            >{{ item.label }}
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 6px;
  height: 1px;
  background: color-mix(in oklab, var(--color-burgundy) 78%, transparent);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.45s var(--ease-silk);
}
.nav-link.active::after,
.nav-link:hover::after,
.nav-link:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left;
}
.slide-enter-active {
  transition: height 0.45s var(--ease-silk), opacity 0.45s var(--ease-silk);
}
.slide-leave-active {
  transition: height 0.45s var(--ease-silk), opacity 0.45s var(--ease-silk);
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
