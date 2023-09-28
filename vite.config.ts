// Plugins
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080/.netlify/functions",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "group-articles": [
            "./src/views/articles/Articles.vue",
            "./src/views/articles/Article.vue",
          ],
          "group-clubInfo": [
            "./src/views/club-info/Welcome.vue",
            "./src/views/club-info/Contact.vue",
            "./src/views/club-info/Management.vue",
            "./src/views/club-info/PartyManagement.vue",
            "./src/views/club-info/Confidant.vue",
            "./src/views/club-info/Trainers.vue",
            "./src/views/club-info/Trainings.vue",
            "./src/views/club-info/BecomingAMember.vue",
            "./src/views/club-info/SportingAccident.vue",
            "./src/views/club-info/VisionAndOperation.vue",
          ],
          "group-contests": [
            "./src/views/contests/Contests.vue",
            "./src/views/contests/Results.vue",
            "./src/views/contests/Registrations.vue",
          ],
          "group-info-athletes": [
            "./src/views/info-athletes/Calendars.vue",
            "./src/views/info-athletes/Records.vue",
            "./src/views/info-athletes/PerformanceFee.vue",
            "./src/views/info-athletes/YouthWork.vue",
          ],
          "group-web-shop": [
            "./src/views/web-shop/RecreationalClothing.vue",
            "./src/views/web-shop/CompetitionClothing.vue",
          ],
          "group-multimedia": ["./src/views/multimedia/Multimedia.vue"],
          "group-sponsors": ["./src/views/sponsors/Sponsors.vue"],
          "group-nature-run": [
            "./src/views/nature-run/NatureRunRegistration.vue",
            "./src/views/nature-run/NatureRunSuccess.vue",
          ],
          "group-not-found": ["./src/views/NotFound.vue"],
        },
      },
    },
  },
});
