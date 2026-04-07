<template>
    <Transition name="dialog">
        <div v-if="props.isOpen"
            class="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-4">
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')"></div>

            <!-- Modal Panel -->
            <div class="relative w-full max-w-lg bg-[#13131a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                <!-- Header -->
                <div class="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <h3 class="text-base font-semibold text-white">
                        {{ getDialogTitle() }}
                    </h3>
                    <button @click="$emit('close')"
                        class="w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-200">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Body -->
                <div class="px-6 py-5">
                    <form @submit.prevent="handleSubmit" class="space-y-4">
                        <div class="overflow-y-auto max-h-[60vh] hide-scrollbar space-y-4 pr-1">

                            <!-- Category Mode - Name only -->
                            <div v-if="isCategoryMode">
                                <label for="category-name" class="block text-xs font-medium text-gray-400 mb-1.5">
                                    Category Name
                                </label>
                                <input id="category-name" v-model="formData.name"
                                    class="w-full px-3 py-2.5 rounded-lg bg-[#0d0d14] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                    :placeholder="props.mode === 'add' ? 'e.g. Buttons' : 'Update category name'"
                                    required />
                            </div>

                            <!-- Component Mode - Full Form -->
                            <template v-else>
                                <!-- Category select -->
                                <div>
                                    <label for="category" class="block text-xs font-medium text-gray-400 mb-1.5">
                                        Category
                                    </label>
                                    <select id="category" v-model="formData.category"
                                        class="w-full px-3 py-2.5 rounded-lg bg-[#0d0d14] border border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors hide-scrollbar"
                                        :class="formData.category ? 'text-white' : 'text-gray-600'"
                                        required>
                                        <option value="" disabled>Select a category</option>
                                        <option v-for="category in props.categories" :key="category.id"
                                            :value="category.name" class="bg-[#13131a] text-white">
                                            {{ category.name.charAt(0).toUpperCase() + category.name.slice(1) }}
                                        </option>
                                    </select>
                                </div>

                                <!-- Component name -->
                                <div>
                                    <label for="component-name" class="block text-xs font-medium text-gray-400 mb-1.5">
                                        Component Name
                                    </label>
                                    <input id="component-name" v-model="formData.name"
                                        class="w-full px-3 py-2.5 rounded-lg bg-[#0d0d14] border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                                        placeholder="e.g. Primary Button" required />
                                </div>

                                <!-- Component code -->
                                <div>
                                    <label for="component-code" class="block text-xs font-medium text-gray-400 mb-1.5">
                                        Component Code
                                    </label>
                                    <textarea id="component-code" v-model="formData.code"
                                        class="w-full h-48 px-3 py-2.5 rounded-lg bg-[#0d0d14] border border-white/10 text-white placeholder-gray-600 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 transition-colors resize-none"
                                        placeholder="Paste your HTML/Tailwind code here..."></textarea>
                                </div>

                                <!-- Thumbnail upload -->
                                <div>
                                    <label class="block text-xs font-medium text-gray-400 mb-1.5">
                                        Thumbnail <span class="text-gray-600">(max 1MB)</span>
                                    </label>
                                    <div v-if="imagePreviewUrl" class="relative rounded-lg overflow-hidden border border-white/10 h-36">
                                        <img :src="imagePreviewUrl" class="object-cover w-full h-full" alt="Thumbnail Preview" />
                                        <button type="button" @click="removeImagePreview"
                                            class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors shadow-lg">
                                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <label v-else for="profile-img"
                                        class="flex flex-col items-center justify-center h-36 rounded-lg border border-dashed border-white/10 bg-[#0d0d14] hover:border-cyan-500/40 hover:bg-cyan-500/5 cursor-pointer transition-all duration-200">
                                        <svg class="w-8 h-8 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p class="text-xs text-gray-500">Click to upload image</p>
                                        <p class="text-xs text-gray-700 mt-1">PNG, JPG up to 1MB</p>
                                    </label>
                                    <input id="profile-img" type="file" class="hidden" accept="image/*"
                                        @change="onFileChange" ref="fileInput" />
                                </div>
                            </template>
                        </div>

                        <!-- Submit -->
                        <div class="pt-2">
                            <button type="submit"
                                class="w-full py-2.5 px-6 rounded-lg text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                :disabled="props.loading || isSubmitDisabled">
                                <span v-if="props.loading" class="flex items-center justify-center gap-2">
                                    <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {{ props.mode === 'add' ? 'Adding...' : 'Saving...' }}
                                </span>
                                <span v-else>{{ getSubmitButtonText() }}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Transition>
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
const fileInput = ref<HTMLInputElement | null>(null);

const isCategoryMode = computed(() => props.categories.length === 0);

const isSubmitDisabled = computed(() => {
    if (isCategoryMode.value) return !formData.value.name.trim();
    return !formData.value.name.trim() || !formData.value.category.trim();
});

const getDialogTitle = () => {
    if (isCategoryMode.value) return props.mode === "add" ? "Add Category" : "Edit Category";
    return props.mode === "add" ? "Add Component" : "Edit Component";
};

const getSubmitButtonText = () => {
    if (isCategoryMode.value) return props.mode === "add" ? "Add Category" : "Save Changes";
    return props.mode === "add" ? "Add Component" : "Save Changes";
};

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        if (file.size > 1024 * 1024) {
            triggerToast({ message: 'Please select an image smaller than 1MB', type: "error", icon: "/svg/error-icon.svg" });
            target.value = "";
            formData.value.thumbnail = null;
            imagePreviewUrl.value = null;
            return;
        }
        formData.value.thumbnail = file;
        imagePreviewUrl.value = URL.createObjectURL(file);
    } else {
        formData.value.thumbnail = null;
        imagePreviewUrl.value = null;
    }
};

const removeImagePreview = () => {
    formData.value.thumbnail = null;
    if (imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value);
    imagePreviewUrl.value = null;
    if (fileInput.value) fileInput.value.value = "";
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
            imagePreviewUrl.value = newData.thumbnail || null;
        } else {
            formData.value = { name: "", category: "", code: "", thumbnail: null, thumbnailUrl: "" };
            imagePreviewUrl.value = null;
        }
        if (fileInput.value) fileInput.value.value = "";
    },
    { immediate: true }
);
</script>

<style scoped>
.dialog-enter-active {
    transition: all 0.2s ease-out;
}
.dialog-leave-active {
    transition: all 0.15s ease-in;
}
.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
}
.dialog-enter-from .relative,
.dialog-leave-to .relative {
    transform: scale(0.97) translateY(8px);
}
</style>
