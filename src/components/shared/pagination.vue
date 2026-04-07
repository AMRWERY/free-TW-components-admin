<template>
    <div>
        <ul class="flex items-center gap-1 justify-center mt-6">
            <!-- Prev -->
            <li>
                <button
                    class="flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200 text-gray-500"
                    :class="currentPage === 1
                        ? 'border-white/5 bg-transparent cursor-not-allowed opacity-30'
                        : 'border-white/10 bg-[#1a1a24] hover:border-cyan-500/30 hover:text-cyan-400 cursor-pointer'"
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </li>

            <!-- Pages -->
            <li v-for="page in displayedPages" :key="page">
                <button
                    class="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium border transition-all duration-200"
                    :class="page === currentPage
                        ? 'bg-cyan-600 border-cyan-600 text-white cursor-default'
                        : page === '...'
                            ? 'border-transparent text-gray-600 cursor-default'
                            : 'border-white/10 bg-[#1a1a24] text-gray-400 hover:border-cyan-500/30 hover:text-cyan-400 cursor-pointer'"
                    @click="changePage(page)">
                    {{ page }}
                </button>
            </li>

            <!-- Next -->
            <li>
                <button
                    class="flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200 text-gray-500"
                    :class="currentPage === totalPages
                        ? 'border-white/5 bg-transparent cursor-not-allowed opacity-30'
                        : 'border-white/10 bg-[#1a1a24] hover:border-cyan-500/30 hover:text-cyan-400 cursor-pointer'"
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    items: any[];
    itemsPerPage: number;
    currentPage: number;
}>();

const emit = defineEmits(["update:currentPage"]);

const totalPages = computed(() => Math.ceil(props.items.length / props.itemsPerPage));

const displayedPages = computed(() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    if (totalPages.value <= maxVisiblePages) {
        for (let i = 1; i <= totalPages.value; i++) pages.push(i);
    } else {
        pages.push(1);
        const startPage = Math.max(2, props.currentPage - halfVisible);
        const endPage = Math.min(totalPages.value - 1, props.currentPage + halfVisible);
        if (startPage > 2) pages.push("...");
        for (let i = startPage; i <= endPage; i++) pages.push(i);
        if (endPage < totalPages.value - 1) pages.push("...");
        pages.push(totalPages.value);
    }
    return pages;
});

const changePage = (page: number | string) => {
    if (typeof page === "number" && page > 0 && page <= totalPages.value) {
        emit("update:currentPage", page);
    }
};
</script>
