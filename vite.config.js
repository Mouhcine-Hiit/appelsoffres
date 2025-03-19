import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/appelsoffres/", // Add this line to fix GitHub Pages issue
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://cors-anywhere.herokuapp.com/http://163.172.74.154:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

