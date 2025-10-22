<template>
    <div>
        <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <!-- Clear Button -->
            <button v-if="localSearchQuery && showClearButton" type="button" @click="clearSearch" @mousedown.prevent
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors group"
                :aria-label="`Clear search: ${localSearchQuery}`" title="Clear search">
                <svg class="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>

            <input ref="searchInput" :placeholder="placeholder" v-model="localSearchQuery"
                class="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                @focus="onFocus" @blur="onBlur" @keydown.enter="onEnter" @keydown.esc="clearSearch" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";

const props = defineProps<{
    modelValue: string;
    placeholder?: string;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
    clear: [];
    search: [query: string];
}>();

const localSearchQuery = ref(props.modelValue);
const searchInput = ref<HTMLInputElement>();
const showClearButton = ref(false);

watch(localSearchQuery, (newValue) => {
    emit('update:modelValue', newValue);
    if (newValue.trim()) {
        emit('search', newValue.trim());
    }
});

watch(
    () => props.modelValue,
    (newValue) => {
        localSearchQuery.value = newValue;
    }
);

const onFocus = () => {
    showClearButton.value = true;
    searchInput.value?.select();
};

const onBlur = async () => {
    // Delay to allow click on clear button (300ms is usually enough)
    await nextTick();
    setTimeout(() => {
        showClearButton.value = false;
    }, 200);
};

const onEnter = () => {
    // Trim and emit the search query when Enter is pressed
    const trimmedQuery = localSearchQuery.value.trim();
    if (trimmedQuery) {
        emit('search', trimmedQuery);
        // Optional: Focus remains on input for additional searches
        searchInput.value?.select();
    }
};

const clearSearch = async () => {
    localSearchQuery.value = '';
    emit('clear');
    await nextTick();
    searchInput.value?.focus();
};
</script>