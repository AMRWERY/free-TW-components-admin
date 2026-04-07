<template>
    <div class="group cursor-pointer bg-[#13131a] rounded-xl p-5 border border-white/5
        hover:border-blue-500/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

        <!-- Category Badge -->
        <div class="mb-3">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {{ component.category }}
            </span>
        </div>

        <!-- Title -->
        <h3 class="text-base font-bold text-white mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors leading-snug">
            {{ component.name }}
        </h3>

        <!-- Footer -->
        <div class="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
            <span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {{ component.copy_count || 0 }} copies
            </span>
            <span class="text-xs text-gray-600 group-hover:text-gray-400 transition-colors flex items-center gap-1">
                View
                <svg class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    component: any
}>()
</script>
