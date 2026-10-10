<script setup lang="ts">
import PasswordGate from '@/components/PasswordGate.vue'
import AppNavigation from '@/components/AppNavigation.vue'
import FooterBase from '@/components/FooterBase.vue'
import NextPageButton from '@/components/NextPageButton.vue'
</script>

<template>
  <PasswordGate>
    <div class="min-h-dvh flex flex-col text-[#25232b]">
      <header class="safe-area-top">
        <AppNavigation />
      </header>

      <main class="flex-1 pt-16">
        <transition name="page" mode="in-out">
          <router-view />
        </transition>
      </main>

      <NextPageButton />
      <FooterBase />
    </div>
  </PasswordGate>
</template>
