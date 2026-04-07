<template>
    <Transition name="dialog">
        <div v-if="props.isOpen"
            class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>

            <!-- Modal Panel -->
            <div class="relative w-full max-w-sm bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                <!-- Header -->
                <div class="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <h3 class="text-base font-semibold text-white">Confirm Delete</h3>
                    <button @click="$emit('close')"
                        class="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Body -->
                <div class="px-6 py-6 text-center">
                    <div class="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                        <svg class="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                    <p class="text-sm text-gray-400 mb-1">Are you sure you want to delete</p>
                    <p class="text-sm font-semibold text-white truncate px-4">{{ props.componentName }}</p>
                    <p class="text-xs text-gray-600 mt-2">This action cannot be undone.</p>
                </div>

                <!-- Actions -->
                <div class="flex gap-3 px-6 pb-6">
                    <button type="button" @click="$emit('close')"
                        class="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200">
                        Cancel
                    </button>
                    <button type="button" @click="$emit('delete')"
                        class="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-500 transition-all duration-200">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
const props = defineProps<{
    isOpen: boolean;
    componentName: string;
}>();

const emit = defineEmits(["close", "delete"]);
</script>

<style scoped>
.dialog-enter-active {
    transition: all 0.2s ease-out;
}
.dialog-leave-active {
    transition: all 0.15s ease-in;
}
.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
}
</style>
