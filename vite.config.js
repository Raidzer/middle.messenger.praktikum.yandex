import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import path from "path";

const contextData = {
  title: "Проект чат",
};

export default defineConfig({
  root:'src',
  plugins: [
    handlebars({
      partialDirectory: [
        path.resolve(__dirname, "partials"),
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
        index: path.resolve(__dirname, "index.html"),
        login: path.resolve(__dirname, "pages/login/login.html"),
        changePassword: path.resolve(
          __dirname,
          "pages/changePassword/changePassword.html"
        ),
        changeProfile: path.resolve(
          __dirname,
          "pages/changeProfile/changeProfile.html"
        ),
        error404: path.resolve(__dirname, "pages/error404/error404.html"),
        error500: path.resolve(__dirname, "pages/error500/error500.html"),
        message: path.resolve(__dirname, "pages/message/message.html"),
        register: path.resolve(__dirname, "pages/register/register.html"),
        userProfile: path.resolve(
          __dirname,
          "pages/userProfile/userProfile.html"
        ),
      },
    },
    outDir: "../build",
  },
  publicDir: "../static",
});
