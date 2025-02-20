import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  plugins: [

  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  css: {
    postcss: "../postcss.config.сjs",
  },
  build: {
    outDir: "../build",
  },
  publicDir: "../static",
});
