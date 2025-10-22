<template>
    <div>
        <div v-if="props.isOpen"
            class="fixed inset-0 p-4 flex flex-wrap justify-end items-end w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
            <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-4 relative">
                <div class="flex items-center pb-3 border-b border-gray-300">
                    <h3 class="text-slate-900 text-xl font-semibold flex-1">
                        {{ getDialogTitle() }}
                    </h3>
                    <button @click="$emit('close')">
                        <svg class="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div class="mt-6">
                    <form class="mx-auto max-w-screen-md" @submit.prevent="$emit('submit', formData)">
                        <div class="overflow-y-auto max-h-[calc(400px-128px)] hide-scrollbar grid gap-4 sm:grid-cols-2">

                            <!-- Category Mode - Only Name Field -->
                            <div v-if="isCategoryMode" class="sm:col-span-2">
                                <label for="category-name" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                    Category Name
                                </label>
                                <input id="category-name" name="category-name" v-model="formData.name"
                                    class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800"
                                    :placeholder="props.mode === 'add' ? 'Enter category name' : 'Update category name'"
                                    required />
                            </div>

                            <!-- Component Mode - Full Form -->
                            <template v-else>
                                <div class="sm:col-span-2">
                                    <label for="category" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                        Category
                                    </label>
                                    <select id="category" name="category" v-model="formData.category"
                                        class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 hide-scrollbar"
                                        required>
                                        <option value="">Select a category</option>
                                        <option v-for="category in props.categories" :key="category.id"
                                            :value="category.name">
                                            {{ category.name.charAt(0).toUpperCase() + category.name.slice(1) }}
                                        </option>
                                    </select>
                                </div>

                                <div class="sm:col-span-2">
                                    <label for="component-name"
                                        class="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                        Component Name
                                    </label>
                                    <input id="component-name" name="component-name" v-model="formData.name"
                                        class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800"
                                        placeholder="Enter component name" required />
                                </div>

                                <div class="sm:col-span-2">
                                    <label for="component" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                        Component Code
                                    </label>
                                    <textarea id="component" name="component" v-model="formData.code"
                                        class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800"
                                        placeholder="Paste your component code here..."></textarea>
                                </div>
                            </template>

                        </div>

                        <div class="flex items-center justify-between mt-4">
                            <button type="submit"
                                class="block w-full rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                                :disabled="props.loading || isSubmitDisabled">
                                <span v-if="props.loading" class="flex items-center justify-center gap-2">
                                    <span v-if="props.mode === 'add'">Adding...</span>
                                    <span v-else>Updating...</span>
                                    <img src="/svg/spinner-icon.svg" alt="spinner-icon"
                                        class="w-5 h-5 text-white animate-spin" />
                                </span>
                                <span v-else>{{ getSubmitButtonText() }}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";

const props = defineProps<{
    isOpen: boolean;
    mode: "add" | "edit";
    categories: { id: string; name: string }[];
    initialData?: { name: string; category?: string; code?: string };
    loading: boolean;
}>();

defineEmits(["close", "submit"]);

const formData = ref({
    name: "",
    category: "",
    code: "",
});

// Computed: Check if this is category mode (no categories prop needed, simpler form)
const isCategoryMode = computed(() => props.categories.length === 0);

const isSubmitDisabled = computed(() => {
    if (isCategoryMode.value) {
        return !formData.value.name.trim();
    }
    return !formData.value.name.trim() || !formData.value.category.trim();
});

const getDialogTitle = () => {
    if (isCategoryMode.value) {
        return props.mode === "add" ? "Add Category" : "Edit Category";
    }
    return props.mode === "add" ? "Add Component" : "Edit Component";
};

const getSubmitButtonText = () => {
    if (isCategoryMode.value) {
        return props.mode === "add" ? "Submit" : "Save";
    }
    return props.mode === "add" ? "Submit" : "Save";
};

watch(
    () => props.initialData,
    (newData) => {
        if (newData) {
            formData.value = {
                name: newData.name || "",
                category: newData.category || "",
                code: newData.code || ""
            };
        } else {
            formData.value = { name: "", category: "", code: "" };
        }
    },
    { immediate: true }
);
</script>