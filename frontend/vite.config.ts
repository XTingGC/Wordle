import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: "./config/test/setup.js",
    include: ['**/*.test.tsx'],
    globals: true
  },
} as UserConfig);
