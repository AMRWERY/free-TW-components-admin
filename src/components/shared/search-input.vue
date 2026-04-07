<template>
    <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        <input ref="searchInput" :placeholder="placeholder" v-model="localSearchQuery"
            class="w-full pl-9 pr-8 py-2 text-sm border border-white/10 rounded-lg bg-[#0d0d14] text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200"
            @focus="onFocus" @blur="onBlur" @keydown.enter="onEnter" @keydown.esc="clearSearch" />

        <button v-if="localSearchQuery && showClearButton" type="button" @click="clearSearch" @mousedown.prevent
            class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded text-gray-600 hover:text-gray-400 transition-colors"
            :aria-label="`Clear search`">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
</template>

<script lang="ts" setup>
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
    if (newValue.trim()) emit('search', newValue.trim());
});

watch(() => props.modelValue, (newValue) => {
    localSearchQuery.value = newValue;
});

const onFocus = () => {
    showClearButton.value = true;
    searchInput.value?.select();
};

const onBlur = async () => {
    await nextTick();
    setTimeout(() => { showClearButton.value = false; }, 200);
};

const onEnter = () => {
    const trimmedQuery = localSearchQuery.value.trim();
    if (trimmedQuery) {
        emit('search', trimmedQuery);
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
