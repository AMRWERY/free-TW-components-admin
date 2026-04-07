<template>
  <div class="pb-16">

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-2">
      <div>
        <h1 class="text-2xl font-bold text-white">Components</h1>
        <p class="text-sm text-gray-500 mt-1">Manage all your UI components</p>
      </div>
      <div class="flex items-center gap-2">
        <search-input v-model="searchQuery" @clear="handleClear" @search="handleSearch"
          placeholder="Search components..." class="w-64" />

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
          Add Component
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-[#13131a] border border-white/5 rounded-xl overflow-hidden">

      <!-- Results info -->
      <div v-if="!isRefreshing" class="px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <p class="text-xs text-gray-500">
          <span class="text-gray-300 font-medium">{{ filteredComponents.length }}</span> component{{ filteredComponents.length !== 1 ? 's' : '' }}
          <template v-if="searchQuery"> matching "<span class="text-cyan-400">{{ searchQuery }}</span>"</template>
        </p>
        <p v-if="filteredComponents.length > 0" class="text-xs text-gray-600">
          Page {{ currentPage }} of {{ Math.ceil(filteredComponents.length / 20) || 1 }}
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="border-b border-white/5">
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-12">#</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Copies</th>
              <th class="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <template v-if="isRefreshing">
              <skeleton-table />
            </template>

            <template v-else-if="paginatedComponents.length">
              <tr v-for="(component, index) in paginatedComponents" :key="component.id"
                class="hover:bg-white/[0.02] transition-colors group">
                <td class="px-5 py-4 text-sm text-gray-600 tabular-nums">
                  {{ ((currentPage as any) - 1) * 20 + index + 1 }}
                </td>
                <td class="px-5 py-4">
                  <span class="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {{ component.name }}
                  </span>
                </td>
                <td class="px-5 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/15">
                    {{ component.category }}
                  </span>
                </td>
                <td class="px-5 py-4">
                  <span class="inline-flex items-center gap-1 text-sm font-medium text-emerald-400">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {{ component.copy_count ?? 0 }}
                  </span>
                </td>
                <td class="px-5 py-4">
                  <div class="flex items-center justify-end gap-1">
                    <button v-if="editingComponentId !== component.id"
                      class="p-1.5 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-200"
                      title="Edit" @click="openDialog('edit', component.id)">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      class="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                      title="Delete" @click="openDeleteDialog(component.id)">
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
                <td colspan="5" class="px-5 py-16 text-center">
                  <div class="flex flex-col items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                      <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </div>
                    <p class="text-sm text-gray-500">
                      {{ searchQuery ? 'No components match your search.' : 'No components yet. Add one to get started.' }}
                    </p>
                    <button v-if="!searchQuery"
                      class="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                      @click="openDialog('add')">
                      Add your first component →
                    </button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredComponents.length > 20" class="px-5 py-3 border-t border-white/5">
        <pagination :items="filteredComponents" :items-per-page="20" v-model:current-page="currentPage" />
      </div>
    </div>

    <dynamic-dialog v-if="showDialog" :is-open="showDialog" :mode="dialogMode" :categories="componentStore.categories"
      :initial-data="editComponent" :loading="componentStore.loading" @close="closeDialog"
      @submit="handleDialogSubmit" />

    <delete-dialog v-if="showDeleteDialog" :is-open="showDeleteDialog" :component-name="deleteComponentName"
      @close="closeDeleteDialog" @delete="confirmDelete" />
  </div>
</template>

<script lang="ts" setup>
import type { Component } from "@/types/components";

const { triggerToast } = useToast();
const componentStore = useComponentStore();
const route = useRoute();
const router = useRouter();

const editingComponentId = ref<string | null>(null);
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

const showDialog = ref(false);
const dialogMode = ref<"add" | "edit">("add");
const isRefreshing = ref(false);
const showDeleteDialog = ref(false);
const deleteComponentId = ref<string | null>(null);
const deleteComponentName = ref<string>("");
const searchQuery = ref("");

const paginatedComponents = computed(() => {
  const start = (currentPage.value - 1) * 20;
  return filteredComponents.value.slice(start, start + 20);
});

const components = computed(() => componentStore.components as Component[]);

const editComponent = computed(():
  | { name: string; category: string; code: string; thumbnail?: string | null }
  | undefined => {
  if (editingComponentId.value !== null) {
    const component = components.value.find((c) => c.id === editingComponentId.value);
    if (component) {
      return {
        name: component.name,
        category: component.category,
        code: component.code || "",
        thumbnail: component.thumbnail || null,
      };
    }
  }
  return undefined;
});

const openDialog = (mode: "add" | "edit", componentId?: string) => {
  dialogMode.value = mode;
  editingComponentId.value = mode === "edit" && componentId ? componentId : null;
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  editingComponentId.value = null;
};

const handleDialogSubmit = async (data: {
  name: string;
  category?: string;
  code?: string;
  thumbnail?: File | null | undefined;
}) => {
  try {
    if (dialogMode.value === "add") {
      if (!data.category) throw new Error("Category is required");
      await componentStore.addComponent(data.category, data.name, data.code || "", data.thumbnail ?? null);
      triggerToast({ message: "Component added successfully!", type: "success", icon: "/svg/check-circle-icon.svg" });
    } else if (dialogMode.value === "edit" && editingComponentId.value !== null) {
      await componentStore.updateComponent(editingComponentId.value, {
        category: data.category || "",
        name: data.name,
        code: data.code || "",
        thumbnail: data.thumbnail,
      });
      triggerToast({ message: "Component updated successfully!", type: "success", icon: "/svg/check-circle-icon.svg" });
    }
  } catch (err: any) {
    triggerToast({ message: `Error: ${err.message}`, type: "error", icon: "/svg/error-icon.svg" });
  }
  closeDialog();
};

const refreshData = async () => {
  isRefreshing.value = true;
  await componentStore.fetchComponents();
  isRefreshing.value = false;
};

const openDeleteDialog = (componentId: string) => {
  deleteComponentId.value = componentId;
  const component = components.value.find((c) => c.id === componentId);
  if (component) {
    deleteComponentName.value = component.name;
    showDeleteDialog.value = true;
  }
};

const closeDeleteDialog = () => {
  showDeleteDialog.value = false;
  deleteComponentId.value = null;
  deleteComponentName.value = "";
};

const confirmDelete = async () => {
  if (deleteComponentId.value !== null) {
    await componentStore.deleteComponent(deleteComponentId.value);
    if (!componentStore.error) {
      triggerToast({ message: "Component deleted successfully!", type: "success", icon: "/svg/check-circle-icon.svg" });
      await refreshData();
    } else {
      triggerToast({ message: `Error deleting component: ${componentStore.error}`, type: "error", icon: "/svg/error-icon.svg" });
    }
    closeDeleteDialog();
  }
};

const filteredComponents = computed(() => {
  if (!searchQuery.value.trim()) return components.value;
  const query = searchQuery.value.toLowerCase().trim();
  return components.value.filter((c) => c.name.toLowerCase().includes(query));
});

watch(searchQuery, () => { currentPage.value = 1; });

const handleSearch = (_query: string) => {};
const handleClear = () => { currentPage.value = 1; };

onMounted(async () => {
  if (!componentStore.components.length) {
    isRefreshing.value = true;
    await componentStore.fetchComponents();
    isRefreshing.value = false;
  }
  if (!componentStore.categories.length) {
    await componentStore.fetchCategories();
  }
});
</script>
