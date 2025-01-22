import postcssNesting from "postcss-nesting";
import autoprefixer from "autoprefixer";
import postcssSimpleVars from "postcss-simple-vars";

export default {
  plugins: [postcssNesting, autoprefixer, postcssSimpleVars],
};
