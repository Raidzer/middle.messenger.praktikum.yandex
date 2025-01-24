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
      partialDirectory: [
        path.resolve(__dirname, "components"),
      ],
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
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "src/index.html"),
        login: path.resolve(__dirname, "src/pages/login/login.html"),
        changePassword: path.resolve(
          __dirname,
          "src/pages/changePassword/changePassword.html"
        ),
        changeProfile: path.resolve(
          __dirname,
          "src/pages/changeProfile/changeProfile.html"
        ),
        error404: path.resolve(__dirname, "src/pages/error404/error404.html"),
        error500: path.resolve(__dirname, "src/pages/error500/error500.html"),
        message: path.resolve(__dirname, "src/pages/message/message.html"),
        register: path.resolve(__dirname, "src/pages/register/register.html"),
        userProfile: path.resolve(
          __dirname,
          "src/pages/userProfile/userProfile.html"
        ),
      },
    },
    outDir: "../build",
  },
  publicDir: "../static",
});
