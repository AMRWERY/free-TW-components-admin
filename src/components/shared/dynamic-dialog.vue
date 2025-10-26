<template>
    <div>
        <Transition name="fade">
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
                        <form class="mx-auto max-w-screen-md" @submit.prevent="handleSubmit">
                            <div
                                class="overflow-y-auto max-h-[calc(400px-128px)] hide-scrollbar grid gap-4 sm:grid-cols-2">
                                <!-- Category Mode - Only Name Field -->
                                <div v-if="isCategoryMode" class="sm:col-span-2">
                                    <label for="category-name"
                                        class="mb-2 inline-block text-sm text-gray-800 sm:text-base">
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
                                        <label for="category"
                                            class="mb-2 inline-block text-sm text-gray-800 sm:text-base">
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
                                        <label for="component"
                                            class="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                            Component Code
                                        </label>
                                        <textarea id="component" name="component" v-model="formData.code"
                                            class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800"
                                            placeholder="Paste your component code here..."></textarea>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <div v-if="imagePreviewUrl"
                                            class="rounded object-cover shadow-xl relative xl:h-[9rem] lg:h-[8rem] h-[7rem]">
                                            <img :src="imagePreviewUrl" class="object-cover w-full h-full rounded"
                                                alt="Thumbnail Preview" />
                                            <button type="button" v-if="imagePreviewUrl" @click="removeImagePreview"
                                                class="absolute p-0.5 text-white bg-red-500 rounded-full -top-0 -end-0 hover:bg-red-600 flex items-center">
                                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M5.636 5.636a1 1 0 011.414 0L12 10.586l4.95-4.95a1 1 0 111.414 1.414L13.414 12l4.95 4.95a1 1 0 01-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 01-1.414-1.414L10.586 12 5.636 7.05a1 1 0 010-1.414z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div v-else
                                            class="p-4 border border-indigo-500 rounded shadow-md object-cover bg-gray-50 xl:h-[9rem] lg:h-[8rem] h-[7rem]">
                                            <label for="profile-img"
                                                class="flex flex-col items-center justify-center h-full gap-2 cursor-pointer">
                                                <svg class="text-indigo-600 w-12 h-12" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p class="font-medium text-center text-gray-600">
                                                    Choose img
                                                </p>
                                            </label>
                                        </div>
                                        <input id="profile-img" type="file" class="hidden" accept="image/*"
                                            @change="onFileChange" ref="fileInput" />
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
        </Transition>
    </div>
</template>

<script lang="ts" setup>
const { triggerToast } = useToast();

const props = defineProps<{
    isOpen: boolean;
    mode: "add" | "edit";
    categories: { id: string; name: string }[];
    initialData?: { name: string; category?: string; code?: string; thumbnail?: string | null };
    loading: boolean;
}>();

const emit = defineEmits<{
    (e: "close"): void;
    (e: "submit", data: { name: string; category?: string; code?: string; thumbnail?: File | null }): void;
}>();

const formData = ref({
    name: "",
    category: "",
    code: "",
    thumbnail: null as File | null,
    thumbnailUrl: "",
});

const imagePreviewUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null); // Reference to file input

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

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        if (file.size > 1024 * 1024) { // 1MB limit
            // console.error("Thumbnail file too large:", file.size);
            triggerToast({
                message: 'Please select an image smaller than 1MB',
                type: "error",
                icon: "/svg/error-icon.svg",
            });
            target.value = ""; // Clear input
            formData.value.thumbnail = file;
            imagePreviewUrl.value = null;
            return;
        }
        formData.value.thumbnail = file; // Set the File for submission
        imagePreviewUrl.value = URL.createObjectURL(file); // Set preview URL
    } else {
        formData.value.thumbnail = null;
        imagePreviewUrl.value = null;
    }
};

const removeImagePreview = () => {
    formData.value.thumbnail = null;
    if (imagePreviewUrl.value) {
        URL.revokeObjectURL(imagePreviewUrl.value); // Clean up memory
    }
    imagePreviewUrl.value = null;
    if (fileInput.value) {
        fileInput.value.value = "";
    }
};

const handleSubmit = () => {
    if (isCategoryMode.value) {
        emit("submit", { name: formData.value.name });
    } else {
        emit("submit", {
            name: formData.value.name,
            category: formData.value.category,
            code: formData.value.code,
            thumbnail: formData.value.thumbnail,
        });
    }
};

watch(
    () => props.initialData,
    (newData) => {
        if (newData) {
            formData.value = {
                name: newData.name || "",
                category: newData.category || "",
                code: newData.code || "",
                thumbnail: null,
                thumbnailUrl: newData.thumbnail || "",
            };
            imagePreviewUrl.value = newData.thumbnail || null; // Set preview for edit mode
        } else {
            formData.value = { name: "", category: "", code: "", thumbnail: null, thumbnailUrl: "" };
            imagePreviewUrl.value = null;
        }
        // Reset file input when initialData changes
        if (fileInput.value) {
            fileInput.value.value = "";
        }
    },
    { immediate: true }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>