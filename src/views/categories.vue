<template>
  <div>
    <div class="py-8 min-h-screen">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">All Categories</h2>
        <div class="flex gap-2">
          <search-input v-model="searchQuery" @clear="handleClear" @search="handleSearch"
            placeholder="Search for Categories..." class="max-w-sm" />

          <button
            class="text-sm cursor-pointer relative px-3 py-2.5 overflow-hidden font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-lg shadow-sm group hover:bg-blue-50 transition-colors"
            @click="refreshData" :disabled="isRefreshing" title="Refresh">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" :class="{ 'animate-spin': isRefreshing }"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.001 8.001 0 01-15.356-2m15.356 2H15" />
            </svg>
          </button>

          <button
            class="text-sm cursor-pointer relative px-6 py-2.5 overflow-hidden font-medium text-white bg-blue-600 rounded-lg shadow-sm group"
            @click="openDialog('add')">
            Add Category
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-100 hover:border-gray-300">
          <thead class="bg-gray-100 whitespace-nowrap">
            <tr>
              <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
                #
              </th>
              <th class="p-4 text-left text-[13px] font-semibold text-slate-900">
                Name
              </th>
              <th class="p-4 text-left text-[13px] font-semibold text-slate-900"></th>
            </tr>
          </thead>
          <tbody class="whitespace-nowrap">
            <template v-if="isRefreshing">
              <!-- skeleton-table component -->
              <skeleton-table :columns="3" />
            </template>

            <!-- Actual Data -->
            <template v-else>
              <tr class="hover:bg-gray-50 cursor-pointer border-b" v-for="(category, index) in paginatedCategories"
                :key="category.id">
                <td class="p-4 text-[15px] text-slate-600 font-medium">
                  {{ ((currentPage as any) - 1) * 20 + index + 1 }}
                </td>
                <td class="p-4 text-[15px] text-slate-600 font-medium">
                  {{ category.name }}
                </td>
                <td class="p-4">
                  <div class="flex items-center justify-end gap-4">
                    <button class="mr-3 cursor-pointer" title="Edit" v-if="editingCategoryId !== category.id"
                      @click="openDialog('edit', category.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-blue-500 hover:fill-blue-700"
                        viewBox="0 0 348.882 348.882">
                        <path
                          d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                          data-original="#000000" />
                        <path
                          d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                          data-original="#000000" />
                      </svg>
                    </button>
                    <button title="Delete" class="cursor-pointer" @click="openDeleteDialog(category.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-red-500 hover:fill-red-700"
                        viewBox="0 0 24 24">
                        <path
                          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                          data-original="#000000" />
                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                          data-original="#000000" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end">
        <!-- pagination component -->
        <pagination :items="filteredCategories" :items-per-page="20" v-model:current-page="currentPage" />
      </div>

      <!-- dynamic-dialog component -->
      <dynamic-dialog v-if="showDialog" :is-open="showDialog" :mode="dialogMode" :categories="[]"
        :initial-data="editCategory" :loading="categoryStore.loading" @close="closeDialog"
        @submit="handleDialogSubmit" />

      <!-- delete-dialog component -->
      <delete-dialog v-if="showDeleteDialog" :is-open="showDeleteDialog" :component-name="deleteCategoryName"
        @close="closeDeleteDialog" @delete="confirmDelete" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Category } from "@/types/categories";

const { triggerToast } = useToast();
const categoryStore = useCategoryStore();
const route = useRoute();
const router = useRouter();

const editingCategoryId = ref<string | null>(null);
const currentPage = ref(Number(route.query.page) || 1);

// Sync URL with currentPage (use replace to avoid polluting browser history)
watch(currentPage, (val) => {
  const currentQueryPage = Number(route.query.page) || 1;
  if (val !== currentQueryPage) {
    router.replace({ query: { ...route.query, page: val } });
  }
});

// Sync currentPage with URL (for back/forward navigation)
watch(
  () => route.query.page,
  (val) => {
    const page = Number(val) || 1;
    if (page !== currentPage.value) {
      currentPage.value = page;
    }
  }
);
const searchQuery = ref("");
const showDialog = ref(false);
const dialogMode = ref<"add" | "edit">("add");
const isRefreshing = ref(false);
const showDeleteDialog = ref(false);
const deleteCategoryId = ref<string | null>(null);
const deleteCategoryName = ref<string>("");

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * 20;
  const end = start + 20;
  return filteredCategories.value.slice(start, end);
});

const categories = computed(() => categoryStore.categories as Category[]);

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return categories.value;
  }
  const query = searchQuery.value.toLowerCase().trim();
  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(query)
  );
});

const editCategory = computed(
  (): { name: string; category?: string; code?: string } | undefined => {
    if (editingCategoryId.value !== null) {
      const category = categories.value.find(
        (c) => c.id === editingCategoryId.value
      );
      if (category) {
        return {
          name: category.name,
          // category and code are optional/empty for category mode
        };
      }
    }
    return undefined;
  }
);

const openDialog = (mode: "add" | "edit", categoryId?: string) => {
  dialogMode.value = mode;
  if (mode === "edit" && categoryId) {
    editingCategoryId.value = categoryId;
  } else {
    editingCategoryId.value = null;
  }
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  editingCategoryId.value = null;
};

const handleDialogSubmit = async (data: { name: string }) => {
  if (dialogMode.value === "add") {
    await categoryStore.addCategory(data.name);
    if (!categoryStore.error) {
      triggerToast({
        message: "Category added successfully!",
        type: "success",
        icon: "/svg/check-circle-icon.svg",
      });
    } else {
      triggerToast({
        message: `Error: ${categoryStore.error}`,
        type: "error",
        icon: "/svg/error-icon.svg",
      });
    }
  } else if (dialogMode.value === "edit" && editingCategoryId.value !== null) {
    await categoryStore.updateCategory(editingCategoryId.value, data.name);
    if (!categoryStore.error) {
      triggerToast({
        message: "Category updated successfully!",
        type: "success",
        icon: "/svg/check-circle-icon.svg",
      });
    } else {
      triggerToast({
        message: `Error: ${categoryStore.error}`,
        type: "error",
        icon: "/svg/error-icon.svg",
      });
    }
  }
  closeDialog();
  await refreshData();
};

const refreshData = async () => {
  isRefreshing.value = true;
  try {
    await categoryStore.fetchCategories();
    if (!categoryStore.error) return;
  } finally {
    isRefreshing.value = false;
  }
};

const openDeleteDialog = (categoryId: string) => {
  deleteCategoryId.value = categoryId;
  const category = categories.value.find((c) => c.id === categoryId);
  if (category) {
    deleteCategoryName.value = category.name;
    showDeleteDialog.value = true;
  }
};

const closeDeleteDialog = () => {
  showDeleteDialog.value = false;
  deleteCategoryId.value = null;
  deleteCategoryName.value = "";
};

const confirmDelete = async () => {
  if (deleteCategoryId.value !== null) {
    await categoryStore.deleteCategory(deleteCategoryId.value);
    if (!categoryStore.error) {
      triggerToast({
        message: "Category deleted successfully!",
        type: "success",
        icon: "/svg/check-circle-icon.svg",
      });
      await refreshData();
    } else {
      triggerToast({
        message: `Error deleting category: ${categoryStore.error}`,
        type: "error",
        icon: "/svg/error-icon.svg",
      });
    }
    closeDeleteDialog();
  }
};

watch(searchQuery, () => {
  currentPage.value = 1;
});

const handleSearch = (query: string) => {
  console.log("Category search triggered:", query);
};

const handleClear = () => {
  currentPage.value = 1;
};

onMounted(async () => {
  if (!categoryStore.categories.length) {
    isRefreshing.value = true;
    await categoryStore.fetchCategories();
    isRefreshing.value = false;
  }
});
</script>