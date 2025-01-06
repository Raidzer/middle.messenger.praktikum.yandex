import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import path from "path";

const contextData = {
  title: "Проект чат",
  test: "test",
};

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, "src/partials"),
      context: contextData,
    }),
  ],
  server: {
    host: "127.0.0.1",
    open: true,
    port: 3000,
  },
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    outDir: "./build",
  },
  publicDir: "./static",
});
