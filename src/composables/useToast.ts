import type { ToastOptions } from "@/types/toast-options";

const toastState = reactive<ToastOptions>({
  show: false,
  message: "",
  type: "info",
  icon: "",
  duration: 4000,
});

let timeoutId: number | undefined;

export function useToast() {
  const triggerToast = (options: Omit<ToastOptions, "show">) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    toastState.show = true;
    toastState.message = options.message;
    toastState.type = options.type;
    toastState.icon = options.icon || "";
    toastState.duration = options.duration || 3000;
    timeoutId = setTimeout(() => {
      toastState.show = false;
    }, toastState.duration);
  };

  return {
    toastState: readonly(toastState),
    showToast: computed(() => toastState.show),
    toastMessage: computed(() => toastState.message),
    toastType: computed(() => toastState.type),
    toastIcon: computed(() => toastState.icon),
    toastDuration: computed(() => toastState.duration),
    triggerToast,
  };
}
