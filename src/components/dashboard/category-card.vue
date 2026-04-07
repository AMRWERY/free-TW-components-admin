<template>
    <div class="group cursor-pointer bg-[#13131a] rounded-xl p-5 border border-white/5
        hover:border-cyan-500/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative">
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

        <!-- Icon -->
        <div class="flex justify-center mb-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </div>

        <!-- Name -->
        <h3 class="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors text-center truncate">
            {{ category.name }}
        </h3>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    category: {
        name: string
        count?: number
        topComponent?: any
    }
}>()
</script>
