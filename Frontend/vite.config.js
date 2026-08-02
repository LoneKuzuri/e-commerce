import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Where Strapi is running during development.
const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: Number(process.env.PORT) || 3000,
    // Optional same-origin setup: set VITE_API_BASE_URL=/ and requests to
    // /api + /uploads are proxied to Strapi, which avoids CORS in development.
    proxy: {
      "/api": { target: STRAPI_URL, changeOrigin: true },
      "/uploads": { target: STRAPI_URL, changeOrigin: true },
    },
  },
});
