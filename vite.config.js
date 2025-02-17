import { defineConfig } from "vite";
import handlebars from "./vite-plugin-handlebars-precompile";
import path from "path";

const contextData = {
  title: "Проект чат",
};

export default defineConfig({
  root: "src",
  plugins: [
    handlebars({
      partialDirectory: [path.resolve(__dirname, "components")],
      context: contextData,
    }),
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
