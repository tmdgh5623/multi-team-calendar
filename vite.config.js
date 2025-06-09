import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",                    // ✅ 추가
  build: {
    outDir: "dist",             // ✅ 출력 폴더
    rollupOptions: {
      input: "index.html",      // ✅ 진입점 명시
    },
  },
});
