<template>
    <div>
        <div
            class="group cursor-pointer bg-white dark:bg-[#1a1a24] rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 dark:border-gray-800/50 hover:border-blue-200 dark:hover:border-blue-800/50">
            <!-- Icon - Centered -->
            <div class="flex justify-center mb-6">
                <div class="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white shadow-lg">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
            </div>

            <!-- Title - Centered -->
            <h3
                class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-center">
                {{ category.name }}
            </h3>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    category: {
        name: string
        count: number
        topComponent?: any
    }
}>()
</script>