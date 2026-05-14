// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages — Project Page unter suthernfriend/akte-penck-web.
// Erreichbar wird die Site auf https://suthernfriend.github.io/akte-penck-web/
export default defineConfig({
  site: "https://suthernfriend.github.io",
  base: "/akte-penck-web/",
  trailingSlash: "always",
  // Wir nutzen ausschliesslich <img>-Tags, keine Astro-<Image>-Transformationen.
  // passthroughImageService vermeidet die sharp-Dependency.
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
