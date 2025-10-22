import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({}),
    AutoImport({
      imports: [
        // presets
        "vue",
        "vue-router",
        "pinia",
        // example type import
        {
          from: "vue-router",
          imports: ["RouteLocationRaw"],
          type: true,
        },
      ],
      dirs: ["./hooks", "src/composables", "src/stores", "src/stores/**"],
      dts: "src/auto-imports.d.ts", // generate typings here
      eslintrc: {
        enabled: true, // if you want ESLint support
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
