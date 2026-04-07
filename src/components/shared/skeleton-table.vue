<template>
    <tr class="border-b border-white/5" v-for="i in 8" :key="'skeleton-' + i">
        <td v-for="(columnType, colIndex) in columnConfigs" :key="'col-' + colIndex" class="px-5 py-4">
            <div v-if="columnType === 'index'" class="h-3.5 bg-white/5 rounded-md animate-pulse w-6"></div>
            <div v-else-if="columnType === 'name'" class="h-3.5 bg-white/5 rounded-md animate-pulse"
                :style="{ width: `${100 + (i * 13) % 80}px` }"></div>
            <div v-else-if="columnType === 'short'" class="h-6 bg-white/[0.04] rounded-full animate-pulse w-24"></div>
            <div v-else-if="columnType === 'number'" class="h-5 bg-white/5 rounded-full animate-pulse w-16"></div>
            <div v-else-if="columnType === 'date'" class="h-3.5 bg-white/5 rounded-md animate-pulse w-24"></div>
            <div v-else-if="columnType === 'actions'" class="flex items-center justify-end gap-2">
                <div class="h-7 w-7 bg-white/5 rounded-lg animate-pulse"></div>
                <div class="h-7 w-7 bg-white/5 rounded-lg animate-pulse"></div>
            </div>
            <div v-else class="h-3.5 bg-white/5 rounded-md animate-pulse w-28"></div>
        </td>
    </tr>
</template>

<script lang="ts" setup>
import type { Props } from '@/types/skeleton-table'

const props = withDefaults(defineProps<Props>(), {
    columns: 5,
    config: () => [],
});

const columnConfigs = computed(() => {
    if (props.config && props.config.length > 0) return props.config;
    const config: ('index' | 'name' | 'short' | 'number' | 'date' | 'actions')[] = ['index'];
    const totalColumns = props.columns || 5;
    switch (totalColumns) {
        case 2: config.push('actions'); break;
        case 3: config.push('name', 'actions'); break;
        case 4: config.push('name', 'date', 'actions'); break;
        case 5: config.push('name', 'short', 'number', 'actions'); break;
        case 6: config.push('name', 'short', 'number', 'date', 'actions'); break;
        default:
            for (let i = 1; i < totalColumns - 1; i++) config.push('name');
            config.push('actions');
    }
    return config;
});
</script>
