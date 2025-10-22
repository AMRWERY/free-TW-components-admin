<template>
    <tr class="border-b" v-for="i in 10" :key="'skeleton-' + i">
        <td class="p-4">
            <div class="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
        </td>
        <td class="p-4">
            <div class="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
        </td>
        <td class="p-4">
            <div class="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
        </td>
        <td class="p-4">
            <div class="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
        </td>
        <td class="p-4">
            <div class="flex items-center gap-4">
                <div class="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </td>
    </tr>
</template>

<script lang="ts" setup>

</script>