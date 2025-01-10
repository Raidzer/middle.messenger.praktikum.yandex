import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import path from "path";

const contextData = {
  title: "Проект чат",
};

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: [
        path.resolve(__dirname, "src/partials"),
        path.resolve(__dirname, "src/components"),
      ],
      context: contextData,
    }),
  ],
  server: {
    host: "127.0.0.1",
    open: true,
    port: 3000,
  },
  css: {
    postcss: "./postcss.config.сjs",
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
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
    outDir: "./build",
  },
  publicDir: "./static",
});
