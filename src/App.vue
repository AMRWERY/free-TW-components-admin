<template>
  <div>
    <div class="min-h-screen">

      <!-- main-layout  component -->
      <main-layout>
        <main class="flex-1 mx-auto">
          <router-view v-slot="{ Component, route }">
            <transition name="slide-fade">
              <div :key="route.path">
                <component :is="Component" :key="route.path" />
              </div>
            </transition>
          </router-view>
        </main>
      </main-layout>
    </div>

    <!-- dynamic-toast component -->
    <teleport to='body'>
      <div class="fixed z-[9999] pointer-events-none top-5 right-6 w-full max-w-md">
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>