<template>
    <div>
        <div class="bg-white py-6 sm:py-8 lg:py-12">
            <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div class="mb-10 md:mb-16">
                    <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Add Component</h2>
                </div>

                <form class="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2" @submit.prevent="handleSubmit">
                    <div class="sm:col-span-2">
                        <label for="category"
                            class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Category</label>
                        <select name="category" v-model="selectedCategory"
                            class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 hide-scrollbar">
                            <option v-for="category in componentStore.categories" :key="category.id"
                                :value="category.name">
                                {{ category.name.charAt(0).toUpperCase() + category.name.slice(1) }}
                            </option>
                        </select>
                    </div>

                    <div class="sm:col-span-2">
                        <label for="component-name"
                            class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Component Name</label>
                        <input name="component-name" v-model="componentName"
                            class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800" />
                    </div>

                    <div class="sm:col-span-2">
                        <label for="component" class="mb-2 inline-block text-sm text-gray-800 sm:text-base">Component
                            Code</label>
                        <textarea name="component" v-model="componentCode"
                            class="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800"></textarea>
                    </div>

                    <div class="flex items-center justify-between sm:col-span-2">
                        <button type="submit"
                            class="block w-full rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                            :disabled="componentStore.loading">
                            <span v-if="componentStore.loading" class="flex items-center justify-center gap-2">
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
import { ref, onMounted } from 'vue';
import { useComponentStore } from '@/stores/componentStore';
import { useToast } from '@/composables/useToast'

const { triggerToast } = useToast();

const componentStore = useComponentStore();

const selectedCategory = ref('');
const componentName = ref('');
const componentCode = ref('');

onMounted(async () => {
    await componentStore.fetchCategories();
});

const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!selectedCategory.value || !componentName.value || !componentCode.value) {
        triggerToast({
            message: 'Please fill in all fields',
            type: 'warning',
            icon: '/svg/warning-icon.svg',
        });
        return;
    }
    await componentStore.addComponent(selectedCategory.value, componentName.value, componentCode.value);
    if (!componentStore.error) {
        triggerToast({
            message: 'Component added successfully!',
            type: 'success',
            icon: '/svg/check-circle-icon.svg',
        });
        selectedCategory.value = '';
        componentName.value = '';
        componentCode.value = '';
    } else {
        triggerToast({
            message: `Error: ${componentStore.error}`,
            type: 'error',
            icon: '/svg/error-icon.svg',
        });
    }
};
</script>