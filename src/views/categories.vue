<template>
  <div class="pb-16">

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-2">
      <div>
        <h1 class="text-2xl font-bold text-white">Categories</h1>
        <p class="text-sm text-gray-500 mt-1">Manage component categories</p>
      </div>
      <div class="flex items-center gap-2">
        <search-input v-model="searchQuery" @clear="handleClear" @search="handleSearch"
          placeholder="Search categories..." class="w-64" />

        <button
          class="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-200 flex-shrink-0"
          @click="refreshData" :disabled="isRefreshing" title="Refresh">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" :class="{ 'animate-spin': isRefreshing }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.001 8.001 0 01-15.356-2m15.356 2H15" />
          </svg>
        </button>

        <button
          class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors duration-200 flex-shrink-0"
          @click="openDialog('add')">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-[#13131a] border border-white/5 rounded-xl overflow-hidden">

      <!-- Results info -->
      <div v-if="!isRefreshing" class="px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <p class="text-xs text-gray-500">
          <span class="text-gray-300 font-medium">{{ filteredCategories.length }}</span> categor{{ filteredCategories.length !== 1 ? 'ies' : 'y' }}
          <template v-if="searchQuery"> matching "<span class="text-cyan-400">{{ searchQuery }}</span>"</template>
        </p>
        <p v-if="filteredCategories.length > 0" class="text-xs text-gray-600">
          Page {{ currentPage }} of {{ Math.ceil(filteredCategories.length / 20) || 1 }}
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-white/5">
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">#</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <template v-if="isRefreshing">
              <skeleton-table :columns="3" />
            </template>

            <template v-else-if="paginatedCategories.length">
              <tr v-for="(category, index) in paginatedCategories" :key="category.id"
                class="hover:bg-white/[0.02] transition-colors group">
                <td class="px-5 py-4 text-sm text-gray-600 tabular-nums">
                  {{ ((currentPage as any) - 1) * 20 + index + 1 }}
                </td>
                <td class="px-5 py-4">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/5 flex items-center justify-center flex-shrink-0">
                      <svg class="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-200 group-hover:text-white transition-colors capitalize">
                      {{ category.name }}
                    </span>
                  </div>
                </td>
                <td class="px-5 py-4">
                  <div class="flex items-center justify-end gap-1">
                    <button v-if="editingCategoryId !== category.id"
                      class="p-1.5 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-200"
                      title="Edit" @click="openDialog('edit', category.id)">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      class="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                      title="Delete" @click="openDeleteDialog(category.id)">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </template>

            <!-- Empty state -->
            <template v-else>
              <tr>
                <td colspan="3" class="px-5 py-16 text-center">
                  <div class="flex flex-col items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                      <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <p class="text-sm text-gray-500">
                      {{ searchQuery ? 'No categories match your search.' : 'No categories yet. Add one to get started.' }}
                    </p>
                    <button v-if="!searchQuery"
                      class="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                      @click="openDialog('add')">
                      Add your first category →
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredCategories.length > 20" class="px-5 py-3 border-t border-white/5">
        <pagination :items="filteredCategories" :items-per-page="20" v-model:current-page="currentPage" />
      </div>
    </div>

    <dynamic-dialog v-if="showDialog" :is-open="showDialog" :mode="dialogMode" :categories="[]"
      :initial-data="editCategory" :loading="categoryStore.loading" @close="closeDialog"
      @submit="handleDialogSubmit" />

    <delete-dialog v-if="showDeleteDialog" :is-open="showDeleteDialog" :component-name="deleteCategoryName"
      @close="closeDeleteDialog" @delete="confirmDelete" />
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

watch(currentPage, (val) => {
  const currentQueryPage = Number(route.query.page) || 1;
  if (val !== currentQueryPage) {
    router.replace({ query: { ...route.query, page: val } });
  }
});

watch(
  () => route.query.page,
  (val) => {
    const page = Number(val) || 1;
    if (page !== currentPage.value) currentPage.value = page;
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
  return filteredCategories.value.slice(start, start + 20);
});

const categories = computed(() => categoryStore.categories as Category[]);

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) return categories.value;
  const query = searchQuery.value.toLowerCase().trim();
  return categories.value.filter((c) => c.name.toLowerCase().includes(query));
});

const editCategory = computed(
  (): { name: string; category?: string; code?: string } | undefined => {
    if (editingCategoryId.value !== null) {
      const category = categories.value.find((c) => c.id === editingCategoryId.value);
      if (category) return { name: category.name };
    }
    return undefined;
  }
);

const openDialog = (mode: "add" | "edit", categoryId?: string) => {
  dialogMode.value = mode;
  editingCategoryId.value = mode === "edit" && categoryId ? categoryId : null;
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  editingCategoryId.value = null;
};

const handleDialogSubmit = async (data: { name: string }) => {
  try {
    if (dialogMode.value === "add") {
      await categoryStore.addCategory(data.name);
      triggerToast({ message: "Category added successfully!", type: "success", icon: "/svg/check-circle-icon.svg" });
    } else if (dialogMode.value === "edit" && editingCategoryId.value !== null) {
      await categoryStore.updateCategory(editingCategoryId.value, data.name);
      triggerToast({ message: "Category updated successfully!", type: "success", icon: "/svg/check-circle-icon.svg" });
    }
  } catch (err: any) {
    triggerToast({ message: `Error: ${err.message}`, type: "error", icon: "/svg/error-icon.svg" });
  }
  closeDialog();
};

const refreshData = async () => {
  isRefreshing.value = true;
  try {
    await categoryStore.fetchCategories();
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
    try {
      await categoryStore.deleteCategory(deleteCategoryId.value);
      triggerToast({ message: "Category deleted successfully!", type: "success", icon: "/svg/check-circle-icon.svg" });
    } catch (err: any) {
      triggerToast({ message: `Error deleting category: ${err.message}`, type: "error", icon: "/svg/error-icon.svg" });
    }
    closeDeleteDialog();
  }
};

watch(searchQuery, () => { currentPage.value = 1; });

const handleSearch = (_query: string) => {};
const handleClear = () => { currentPage.value = 1; };

onMounted(async () => {
  if (!categoryStore.categories.length) {
    isRefreshing.value = true;
    await categoryStore.fetchCategories();
    isRefreshing.value = false;
  }
});
</script>
