<template>
    <div>
        <div class="bg-white py-6 sm:py-8 lg:py-12">
            <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div class="mb-10 md:mb-16">
                    <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                        Add Category
                    </h2>
                </div>

                <form class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2" @submit.prevent="handleSubmit">
                    <div class="sm:col-span-2">
                        <label for="category-name" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                            Category Name
                        </label>
                        <input name="category-name" v-model="categoryName"
                            class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800" />
                    </div>

                    <div class="flex items-center justify-between sm:col-span-2">
                        <button type="submit"
                            class="block w-full rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                            :disabled="categoryStore.loading">
                            <span v-if="categoryStore.loading" class="flex items-center justify-center gap-2">
                                Adding...
                                <img src="/svg/spinner-icon.svg" alt="spinner-icon"
                                    class="w-5 h-5 text-white animate-spin">
                            </span>
                            <span v-else>Submit</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { useToast } from '@/composables/useToast'

const { triggerToast } = useToast();
const categoryStore = useCategoryStore();
const categoryName = ref("");

const handleSubmit = async () => {
    if (!categoryName.value.trim()) {
        triggerToast({
            message: 'Please enter a category name.',
            type: 'warning',
            icon: '/svg/warning-icon.svg',
        });
        return;
    }
    await categoryStore.addCategory(categoryName.value.trim());
    if (!categoryStore.error) {
        triggerToast({
            message: 'Category added successfully!',
            type: 'success',
            icon: '/svg/check-circle-icon.svg',
        });
        categoryName.value = "";
    } else {
        triggerToast({
            message: `Error: ${categoryStore.error}`,
            type: 'error',
            icon: '/svg/error-icon.svg',
        });
    }
};
</script>