<template>
  <div class="bg-[#0a0a0f] min-h-screen dark:bg-[#0a0a0f]">
    <main-layout>
      <router-view v-slot="{ Component, route }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main-layout>

    <!-- Global Toast -->
    <teleport to="body">
      <div class="fixed z-[9999] pointer-events-none top-4 right-4 w-full max-w-sm">
        <div class="pointer-events-auto flex justify-end">
          <dynamic-toast v-if="showToast" :message="toastMessage" :toastType="toastType" :duration="toastDuration"
            :toastIcon="toastIcon" @toastClosed="showToast = false" />
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
const { showToast, toastMessage, toastType, toastIcon, toastDuration } = useToast()
</script>
