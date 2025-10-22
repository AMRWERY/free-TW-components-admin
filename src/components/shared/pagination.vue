<template>
    <div>
        <ul class="flex space-x-5 justify-center mt-8">
            <li class="flex items-center justify-center shrink-0 bg-gray-100 w-9 h-9 rounded-md cursor-pointer"
                @click="changePage(currentPage - 1)" :class="{ 'cursor-not-allowed opacity-50': currentPage === 1 }">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-300" viewBox="0 0 55.753 55.753">
                    <path
                        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                        data-original="#000000" />
                </svg>
            </li>
            <li v-for="page in displayedPages" :key="page"
                class="flex items-center justify-center shrink-0 cursor-pointer text-base font-medium text-slate-900 px-[13px] h-9 rounded-md"
                :class="{ 'bg-blue-100': page === currentPage }" @click="changePage(page)">
                {{ page === "..." ? "..." : page }}
            </li>
            <li class="flex items-center justify-center shrink-0 bg-gray-200 w-9 h-9 rounded-md cursor-pointer"
                @click="changePage(currentPage + 1)"
                :class="{ 'cursor-not-allowed opacity-50': currentPage === totalPages }">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-gray-500 rotate-180"
                    viewBox="0 0 55.753 55.753">
                    <path
                        d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                        data-original="#000000" />
                </svg>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    items: any[];
    itemsPerPage: number;
}>();

const emit = defineEmits(["update:currentPage"]);

const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(props.items.length / props.itemsPerPage));

const displayedPages = computed(() => {
    const pages = [];
    const maxVisiblePages = 5; // Show up to 5 page numbers
    const halfVisible = Math.floor(maxVisiblePages / 2);
    if (totalPages.value <= maxVisiblePages) {
        for (let i = 1; i <= totalPages.value; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);
        const startPage = Math.max(2, currentPage.value - halfVisible);
        const endPage = Math.min(totalPages.value - 1, currentPage.value + halfVisible);
        if (startPage > 2) {
            pages.push("...");
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        if (endPage < totalPages.value - 1) {
            pages.push("...");
        }
        pages.push(totalPages.value);
    }
    return pages;
});

const changePage = (page: number | string) => {
    if (typeof page === "number" && page > 0 && page <= totalPages.value) {
        currentPage.value = page;
        emit("update:currentPage", page);
    }
};

watch(() => props.items, () => {
    currentPage.value = 1; // Reset to first page when items change
});
</script>