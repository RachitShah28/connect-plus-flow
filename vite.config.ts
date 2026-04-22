import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],

  server: {
    allowedHosts: ["impale-crumpet-ravioli.ngrok-free.dev"],
  },

  build: {
    // Raise the warning limit so CI stays clean; actual chunks are split below
    chunkSizeWarningLimit: 600,

    // Split CSS per-chunk so lazy sections don't bloat initial CSS
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React runtime — always loaded first
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "vendor-react";
          }

          // TanStack router — needed for navigation, keep separate from React
          if (id.includes("node_modules/@tanstack/")) {
            return "vendor-tanstack";
          }

          // Radix UI primitives — large but only needed for interactive UI
          if (id.includes("node_modules/@radix-ui/")) {
            return "vendor-radix";
          }

          // Animation library — heavy, lazy-loaded by feature sections
          if (id.includes("node_modules/framer-motion/")) {
            return "vendor-framer-motion";
          }

          // Icon library — large SVG set, split out to avoid blocking paint
          if (id.includes("node_modules/lucide-react/")) {
            return "vendor-lucide";
          }

          // Charting — only used in specific components
          if (id.includes("node_modules/recharts/")) {
            return "vendor-recharts";
          }

          // DemoModal + emailService — only needed when user opens the modal
          if (
            id.includes("src/components/site/DemoModal") ||
            id.includes("src/lib/emailService")
          ) {
            return "feature-demo-modal";
          }
        },
      },
    },
  },
});