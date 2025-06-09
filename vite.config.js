import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "index.html" // ✅ 경로에서 "public/" 제거
    }
  }
});
