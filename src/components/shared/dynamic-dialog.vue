<template>
    <div>
        <div v-if="props.isOpen"
            class="fixed inset-0 p-4 flex flex-wrap justify-end items-end w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
            <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-4 relative">
                <div class="flex items-center pb-3 border-b border-gray-300">
                    <h3 class="text-slate-900 text-xl font-semibold flex-1">
                        {{ props.mode === "add" ? "Add Component" : "Edit Component" }}
                    </h3>
                    <svg id="closeIcon" @click="$emit('close')" xmlns="http://www.w3.org/2000/svg"
                        class="w-3.5 h-3.5 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                        viewBox="0 0 320.591 320.591">
                        <path
                            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            data-original="#000000" />
                        <path
                            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            data-original="#000000" />
                    </svg>
                </div>

                <div class="mt-6">
                    <form class="mx-auto max-w-screen-md" @submit.prevent="$emit('submit', formData)">
                        <div class="overflow-y-auto max-h-[calc(400px-128px)] hide-scrollbar grid gap-4 sm:grid-cols-2">
                            <div class="sm:col-span-2">
                                <label for="category"
                                    class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Category</label>
                                <select name="category" v-model="formData.category"
                                    class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 hide-scrollbar">
                                    <option v-for="category in props.categories" :key="category.id"
                                        :value="category.name">
                                        {{ category.name.charAt(0).toUpperCase() + category.name.slice(1) }}
                                    </option>
                                </select>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="component-name"
                                    class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Component Name</label>
                                <input name="component-name" v-model="formData.name"
                                    class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800" />
                            </div>

                            <div class="sm:col-span-2">
                                <label for="component"
                                    class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Component Code</label>
                                <textarea name="component" v-model="formData.code"
                                    class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800"></textarea>
                            </div>
                        </div>

                        <div class="flex items-center justify-between mt-4">
                            <button type="submit"
                                class="block w-full rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                                :disabled="props.loading">
                                <span v-if="props.loading" class="flex items-center justify-center gap-2">
                                    <span v-if="props.mode === 'add'">Adding...</span>
                                    <span v-else>Updating...</span>
                                    <img src="/svg/spinner-icon.svg" alt="spinner-icon"
                                        class="w-5 h-5 text-white animate-spin" />
                                </span>
                                <span v-else>{{ props.mode === "add" ? "Submit" : "Save" }}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps<{
    isOpen: boolean;
    mode: "add" | "edit";
    categories: { id: string; name: string }[];
    initialData?: { name: string; category: string; code: string };
    loading: boolean;
}>();

defineEmits(["close", "submit"]);

const formData = ref({
    name: "",
    category: "",
    code: "",
});

watch(
    () => props.initialData,
    (newData) => {
        if (newData) {
            formData.value = { ...newData };
        } else {
            formData.value = { name: "", category: "", code: "" };
        }
    },
    { immediate: true }
);
</script>