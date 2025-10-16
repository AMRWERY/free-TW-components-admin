<template>
    <div>
        <transition name="bounce" mode="out-in">
            <div v-if="visible" :class="`relative w-full p-3 rounded-lg shadow-xl z-50 border-s-4 ${toastStyles}`"
                :style="{ backgroundColor: toastColor, borderColor: toastBorderColor }" role="alert">
                <!-- Progress bar container -->
                <div class="absolute bottom-0 w-full h-1 bg-white rounded-b-lg start-0 bg-opacity-20">
                    <div class="h-full transition-all ease-linear" :class="progressBarColor"
                        :style="progressBarStyle" />
                </div>
                <img v-if="toastIcon" :src="toastIcon" alt="toast icon"
                    class="inline w-6 h-6 p-0.5 shrink-0 mr-3 rounded-full items-center justify-center" />
                <span class="block text-lg mr-3" :class="textColor">{{ message }}</span>
                <img src="/svg/close-icon.svg" alt="close-icon" class="inline cursor-pointer ms-auto shrink-0 w-6 h-6"
                    @click="closeToast">
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    message: {
        type: String,
        required: true,
    },
    toastIcon: {
        type: String,
        default: '',
    },
    toastType: {
        type: String,
        default: '',
    },
    duration: {
        type: Number,
        default: 5000,
    },
});

const visible = ref(true);
const progressWidth = ref(100);
const emit = defineEmits(['toastClosed']);

const toastColor = computed(() => {
    switch (props.toastType) {
        case 'success': return 'rgba(34, 197, 94, 0.7)'; // Tailwind's green-500 equivalent with 70% opacity
        case 'error': return 'rgba(239, 68, 68, 0.7)';   // Tailwind's red-500 equivalent with 70% opacity
        case 'warning': return 'rgba(250, 204, 21, 0.7)'; // Tailwind's yellow-500 equivalent with 70% opacity
        default: return 'rgba(59, 130, 246, 0.7)';      // Tailwind's blue-500 equivalent with 70% opacity
    }
});

const toastBorderColor = computed(() => {
    switch (props.toastType) {
        case 'success': return 'rgba(22, 163, 74, 0.7)'; // Tailwind's green-700 equivalent with 70% opacity
        case 'error': return 'rgba(185, 28, 28, 0.7)';   // Tailwind's red-700 equivalent with 70% opacity
        case 'warning': return 'rgba(202, 138, 4, 0.7)'; // Tailwind's yellow-700 equivalent with 70% opacity
        default: return 'rgba(37, 99, 235, 0.7)';      // Tailwind's blue-700 equivalent with 70% opacity
    }
});

const toastStyles = computed(() => {
    // Define a consistent opacity for all toasts
    const opacitySuffix = '/70'; // Example: 70% opacity.

    let bgColorClass = '';
    let borderColorClass = '';

    switch (props.toastType) {
        case 'success':
            bgColorClass = `bg-green-500${opacitySuffix}`;
            borderColorClass = `border-green-700${opacitySuffix}`;
            break;
        case 'error':
            bgColorClass = `bg-red-500${opacitySuffix}`;
            borderColorClass = `border-red-700${opacitySuffix}`;
            break;
        case 'warning':
            bgColorClass = `bg-yellow-500${opacitySuffix}`;
            borderColorClass = `border-yellow-700${opacitySuffix}`;
            break;
        default:
            bgColorClass = `bg-blue-500${opacitySuffix}`;
            borderColorClass = `border-blue-700${opacitySuffix}`;
            break;
    }

    // Combine all classes
    return `${bgColorClass} ${borderColorClass} text-white font-semibold tracking-wide flex items-center shadow-md`; // Adjusted shadow as well
});

const textColor = computed(() => {
    switch (props.toastType) {
        case 'success': return 'text-white';
        case 'error': return 'text-white';
        case 'warning': return 'text-white';
        default: return 'text-white';
    }
});

const closeToast = () => {
    visible.value = false;
    emit('toastClosed');
};

setTimeout(() => {
    closeToast();
}, props.duration);

const progressBarColor = computed(() => {
    switch (props.toastType) {
        case 'success': return 'bg-green-300';
        case 'error': return 'bg-red-300';
        case 'warning': return 'bg-yellow-300';
        default: return 'bg-blue-300';
    }
});

const progressBarStyle = computed(() => ({
    width: `${progressWidth.value}%`,
    transitionDuration: `${props.duration}ms`,
}));

onMounted(() => {
    setTimeout(() => {
        progressWidth.value = 0;
    }, 50);
});
</script>

<style scoped>
.bounce-enter-from,
.bounce-leave-to {
    opacity: 0;
    transform: translateY(-30px) scale(0.8);
}

.bounce-enter-active,
.bounce-leave-active {
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes bounce-in {
    0% {
        transform: translateY(-30px) scale(0.8);
        opacity: 0;
    }

    60% {
        transform: translateY(10px) scale(1.05);
        opacity: 1;
    }

    100% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
}
</style>