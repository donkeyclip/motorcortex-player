import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import html from "rollup-plugin-html";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import svg from "rollup-plugin-svg";
import svgo from "rollup-plugin-svgo";
import pkg from "./package.json";
import analyze from "rollup-plugin-analyzer";
import cleanup from "rollup-plugin-cleanup";
import visualizer from "rollup-plugin-visualizer";

const ANALYZE = true;

export default [
  {
    input: "src/index.js",
    external: ["@kissmybutton/motorcortex"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel(),
      postcss({ inject: false, minimize: true }),
      html({
        include: "**/*.html",
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          minifyJS: true,
        },
      }),
      svgo(),
      svg(),
      visualizer(),
      cleanup({ comments: "none" }),
      ANALYZE && analyze(),
    ],
  },
  {
    input: "src/index.js",
    external: ["@kissmybutton/motorcortex"],
    output: [
      {
        globals: {
          "@kissmybutton/motorcortex": "MotorCortex",
        },
        name: pkg.name,
        file: pkg.browser,
        format: "umd",
      },
    ],
    plugins: [
      resolve({ mainFields: ["module", "main", "browser"] }),
      commonjs(),
      babel(),
      terser(),
      postcss({ inject: false, minimize: true }),
      html({
        include: "**/*.html",
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          minifyJS: true,
        },
      }),
      svgo(),
      svg(),
      visualizer(),
      cleanup({ comments: "none" }),
      ANALYZE && analyze(),
    ],
  },
];
