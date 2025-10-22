<template>
    <tr class="border-b" v-for="i in 10" :key="'skeleton-' + i">
        <td v-for="(columnType, colIndex) in columnConfigs" :key="'col-' + colIndex" class="p-4">
            <!-- Index Column (#) -->
            <div v-if="columnType === 'index'" class="h-4 bg-gray-200 rounded animate-pulse w-8"></div>

            <!-- Name/Text Column -->
            <div v-else-if="columnType === 'name'" class="h-4 bg-gray-200 rounded animate-pulse w-48"></div>

            <!-- Short Text Column -->
            <div v-else-if="columnType === 'short'" class="h-4 bg-gray-200 rounded animate-pulse w-32"></div>

            <!-- Number Column -->
            <div v-else-if="columnType === 'number'" class="h-4 bg-gray-200 rounded animate-pulse w-16"></div>

            <!-- Date Column -->
            <div v-else-if="columnType === 'date'" class="h-4 bg-gray-200 rounded animate-pulse w-28"></div>

            <!-- Actions Column -->
            <div v-else-if="columnType === 'actions'" class="flex items-center gap-4 w-full justify-end">
                <div class="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
                <div class="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
            </div>

            <!-- Default Text Column -->
            <div v-else class="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
        </td>
    </tr>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { Props } from '@/types/skeleton-table'

const props = withDefaults(defineProps<Props>(), {
    columns: 5,
    config: () => [],
});

// Generate column configuration based on props
const columnConfigs = computed(() => {
    // If custom config provided, use it
    if (props.config && props.config.length > 0) {
        return props.config;
    }
    // Always start with index column
    const config: ('index' | 'name' | 'short' | 'number' | 'date' | 'actions')[] = ['index'];
    // Generate config based on TOTAL columns needed (including index)
    const totalColumns = props.columns || 5;
    switch (totalColumns) {
        case 2: // Minimal: # + Actions
            config.push('actions');
            break;
        case 3: // # + Name + Actions
            config.push('name', 'actions');
            break;
        case 4: // Categories: # + Name + Date + Actions
            config.push('name', 'date', 'actions');
            break;
        case 5: // Components: # + Name + Short + Number + Actions
            config.push('name', 'short', 'number', 'actions');
            break;
        case 6: // # + Name + Short + Number + Date + Actions
            config.push('name', 'short', 'number', 'date', 'actions');
            break;
        default: // Any other number, fill with name columns + actions
            for (let i = 1; i < totalColumns - 1; i++) {
                config.push('name');
            }
            config.push('actions');
            break;
    }
    return config;
});
</script>