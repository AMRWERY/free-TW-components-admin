export interface ToastOptions {
  show: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
  icon?: string;
  duration?: number;
}
