<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const PASSWORD = '8887'
const STORAGE_KEY = 'laiba-universe-unlocked'

const input = ref('')
const error = ref(false)
const unlocked = ref(false)

onMounted(() => {
  unlocked.value = sessionStorage.getItem(STORAGE_KEY) === 'true'
})

function checkPassword() {
  if (input.value.trim() === PASSWORD) {
    sessionStorage.setItem(STORAGE_KEY, 'true')
    unlocked.value = true
  } else {
    error.value = true
    input.value = ''
  }
}

const remaining = computed(() => {
  const total = PASSWORD.length
  const entered = input.value.length
  return Math.max(0, total - entered)
})
</script>

<template>
  <div
    v-if="!unlocked"
    class="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--tw-midnight)]"
  >
    <div class="mx-4 max-w-sm rounded-xl border border-burgundy/20 bg-cream/60 p-8 shadow-xl backdrop-blur-sm">
      <p class="mb-6 text-center text-sm text-ink/60">
        Enter the password to enter Laiba's little universe
      </p>

      <form
        @submit.prevent="checkPassword"
        class="flex flex-col items-center gap-4"
      >
        <div class="relative">
          <input
            v-model="input"
            type="password"
            inputmode="numeric"
            pattern="[0-9]{4}"
            maxlength="4"
            autocomplete="one-time-code"
            class="peer w-20 border-b-2 border-burgundy/30 bg-transparent text-center text-2xl text-burgundy outline-none transition-colors focus:border-burgundy"
            :class="{ 'border-rose': error }"
            required
          />
          <div
            v-if="remaining > 0"
            class="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1"
          >
            <span
              v-for="i in remaining"
              :key="i"
              class="h-2 w-2 rounded-full bg-burgundy/30"
            ></span>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary w-full py-1"
        >
          Enter
        </button>

        <p
          v-if="error"
          class="text-xs text-rose"
          role="alert"
        >
          Wrong password. Try again.
        </p>
      </form>
    </div>
  </div>
  <slot v-else />
</template>
