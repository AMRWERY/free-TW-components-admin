<template>
    <div>
        <div
            class="group cursor-pointer bg-white dark:bg-[#1a1a24] rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-800/50 hover:border-blue-200">
            <div class="mb-6">
                <div
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4">
                    {{ component.category }}
                </div>
                <h3
                    class="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ component.title }}
                </h3>
            </div>

            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4 text-sm">
                    <span
                        class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {{ component.copy_count || 0 }}
                    </span>
                </div>
                <div
                    class="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700">
                    {{ component.name }}
                    <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    component: any
}>()
</script>