<template>
    <div>
        <div class="py-8 min-h-screen">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold">All Components</h2>
                <div class="flex gap-2">
                    <button
                        class="text-sm cursor-pointer relative px-6 py-2.5 overflow-hidden font-medium text-white bg-blue-600 rounded-lg shadow-sm group"
                        @click="openDialog('add')">
                        Add Component
                    </button>
                    <button
                        class="text-sm cursor-pointer relative px-3 py-2.5 overflow-hidden font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-lg shadow-sm group hover:bg-blue-50 transition-colors"
                        @click="refreshData" :disabled="isRefreshing" title="Refresh">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                            :class="{ 'animate-spin': isRefreshing }" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.001 8.001 0 01-15.356-2m15.356 2H15" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="mb-6 flex justify-end">
                <search-input v-model="searchQuery" @clear="handleClear" @search="handleSearch"
                    placeholder="Search for components..." class="max-w-sm" />
            </div>

            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-100 hover:border-gray-300">
                    <thead class="bg-gray-100 whitespace-nowrap">
                        <tr>
                            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">#</th>
                            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">Name</th>
                            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">Category</th>
                            <th class="p-4 text-left text-[13px] font-semibold text-slate-900">Copy Count</th>
                            <th class="p-4 text-left text-[13px] font-semibold text-slate-900"></th>
                        </tr>
                    </thead>
                    <tbody class="whitespace-nowrap">
                        <!-- Skeleton Loading State -->
                        <template v-if="isRefreshing">
                            <skeleton-table />
                        </template>

                        <!-- Actual Data -->
                        <template v-else>
                            <tr class="hover:bg-gray-50 cursor-pointer border-b"
                                v-for="(component, index) in paginatedComponents" :key="component.id">
                                <td class="p-4 text-[15px] text-slate-600 font-medium">
                                    {{ ((currentPage as any) - 1) * 20 + index + 1 }}
                                </td>
                                <td class="p-4 text-[15px] text-slate-600 font-medium">
                                    {{ component.name }}
                                </td>
                                <td class="p-4 text-[15px] text-slate-600 font-medium">
                                    {{ component.category }}
                                </td>
                                <td class="p-4 text-[15px] text-slate-600 font-medium">
                                    <span
                                        class="px-2 py-1 text-green-600 bg-blue-100 hover:bg-blue-400 hover:text-gray-100 rounded-full">
                                        {{ component.copy_count }}
                                    </span>
                                </td>
                                <td class="p-4">
                                    <div class="flex items-center justify-end gap-4">
                                        <!-- ✅ FIXED: Check against component.id instead of index -->
                                        <button class="mr-3 cursor-pointer" title="Edit"
                                            v-if="editingComponentId !== component.id"
                                            @click="openDialog('edit', component.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-5 h-5 fill-blue-500 hover:fill-blue-700"
                                                viewBox="0 0 348.882 348.882">
                                                <path
                                                    d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                                                    data-original="#000000" />
                                                <path
                                                    d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                                                    data-original="#000000" />
                                            </svg>
                                        </button>
                                        <button title="Delete" class="cursor-pointer"
                                            @click="openDeleteDialog(component.id)">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="w-5 h-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                                                <path
                                                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                                    data-original="#000000" />
                                                <path
                                                    d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
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
                <pagination :items="filteredComponents" :items-per-page="20" v-model:current-page="currentPage" />
            </div>

            <dynamic-dialog v-if="showDialog" :is-open="showDialog" :mode="dialogMode"
                :categories="componentStore.categories" :initial-data="editComponent" :loading="componentStore.loading"
                @close="closeDialog" @submit="handleDialogSubmit" />

            <delete-dialog v-if="showDeleteDialog" :is-open="showDeleteDialog" :component-name="deleteComponentName"
                @close="closeDeleteDialog" @delete="confirmDelete" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Component } from "@/types/components";

const { triggerToast } = useToast();
const componentStore = useComponentStore();

// ✅ CHANGED: Use component ID instead of index
const editingComponentId = ref<string | null>(null);
const currentPage = ref(1);
const showDialog = ref(false);
const dialogMode = ref<"add" | "edit">("add");
const isRefreshing = ref(false);
const showDeleteDialog = ref(false);
const deleteComponentId = ref<string | null>(null);
const deleteComponentName = ref<string>("");
const searchQuery = ref("");

const paginatedComponents = computed(() => {
    const start = (currentPage.value - 1) * 20;
    const end = start + 20;
    return filteredComponents.value.slice(start, end);
});

const components = computed(() => componentStore.components as Component[]);

// ✅ CHANGED: Find component by ID instead of index
const editComponent = computed((): { name: string; category: string; code: string; thumbnail?: string | null } | undefined => {
    if (editingComponentId.value !== null) {
        const component = components.value.find(c => c.id === editingComponentId.value);
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

// ✅ CHANGED: Accept component ID instead of index
const openDialog = (mode: "add" | "edit", componentId?: string) => {
    dialogMode.value = mode;
    if (mode === "edit" && componentId) {
        editingComponentId.value = componentId;
    } else {
        editingComponentId.value = null;
    }
    showDialog.value = true;
};

const closeDialog = () => {
    showDialog.value = false;
    editingComponentId.value = null;
};

// ✅ CHANGED: Use editingComponentId instead of editingIndex
const handleDialogSubmit = async (data: { name: string; category?: string; code?: string; thumbnail?: File | null | undefined }) => {
    try {
        if (dialogMode.value === "add") {
            if (!data.category) {
                throw new Error("Category is required");
            }
            const thumbnail = data.thumbnail !== undefined ? data.thumbnail : null;
            await componentStore.addComponent(data.category, data.name, data.code || "", thumbnail);
            triggerToast({
                message: "Component added successfully!",
                type: "success",
                icon: "/svg/check-circle-icon.svg",
            });
        } else if (dialogMode.value === "edit" && editingComponentId.value !== null) {
            // ✅ FIXED: Use editingComponentId directly
            await componentStore.updateComponent(editingComponentId.value, {
                category: data.category || "",
                name: data.name,
                code: data.code || "",
                thumbnail: data.thumbnail,
            });
            triggerToast({
                message: "Component updated successfully!",
                type: "success",
                icon: "/svg/check-circle-icon.svg",
            });
        }
    } catch (err: any) {
        triggerToast({
            message: `Error: ${err.message}`,
            type: "error",
            icon: "/svg/error-icon.svg",
        });
    }
    closeDialog();
};

const refreshData = async () => {
    isRefreshing.value = true;
    await componentStore.fetchComponents();
    isRefreshing.value = false;
    if (!componentStore.error) return;
};

// ✅ CHANGED: Accept component ID instead of index
const openDeleteDialog = (componentId: string) => {
    deleteComponentId.value = componentId;
    const component = components.value.find(c => c.id === componentId);
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

// ✅ CHANGED: Use deleteComponentId instead of deleteComponentIndex
const confirmDelete = async () => {
    if (deleteComponentId.value !== null) {
        await componentStore.deleteComponent(deleteComponentId.value);
        if (!componentStore.error) {
            triggerToast({
                message: "Component deleted successfully!",
                type: "success",
                icon: "/svg/check-circle-icon.svg",
            });
            await refreshData();
        } else {
            triggerToast({
                message: `Error deleting component: ${componentStore.error}`,
                type: "error",
                icon: "/svg/error-icon.svg",
            });
        }
        closeDeleteDialog();
    }
};

const filteredComponents = computed(() => {
    if (!searchQuery.value.trim()) {
        return components.value;
    }
    const query = searchQuery.value.toLowerCase().trim();
    return components.value.filter((component) =>
        component.name.toLowerCase().includes(query)
    );
});

watch(searchQuery, () => {
    currentPage.value = 1;
});

const handleSearch = (query: string) => {
    console.log('Search triggered:', query);
};

const handleClear = () => {
    currentPage.value = 1;
};

onMounted(async () => {
    if (!componentStore.components.length) {
        await componentStore.fetchComponents();
    }
    if (!componentStore.categories.length) {
        await componentStore.fetchCategories();
    }
});
</script>