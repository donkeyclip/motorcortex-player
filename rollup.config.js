import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import html from "rollup-plugin-html";
import postcss from "rollup-plugin-postcss";
import svg from "rollup-plugin-svg";
import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import autoprefixer from "autoprefixer";

import analyze from "rollup-plugin-analyzer";
const ANALYZE = false;
export default [
  {
    input: "src/index.js",
    external: ["@donkeyclip/motorcortex"],
    output: [
      {
        file: pkg.module,
        format: "es",
        plugins: [terser()], // Added minification for the ES module
      },
      {
        name: pkg.name,
        file: pkg.browser,
        format: "umd", // Changed format to umd
        globals: {
          "@donkeyclip/motorcortex": "MotorCortex",
        },
      },
    ],
    plugins: [
      json(),
      html({
        fileName: "**/*.html",
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          minifyJS: true,
          removeComments: true,
          collapseInlineTagWhitespace: true,
          minifyCSS: true,
        },
      }),
      svg(),
      resolve(),
      commonjs(),
      babel(),
      postcss({ inject: false, minimize: true }),
    ],
  },
  {
    input: "src/index.js",
    external: ["@donkeyclip/motorcortex"],
    output: [
      {
        inlineDynamicImports: true,
        globals: {
          "@donkeyclip/motorcortex": "MotorCortex",
        },
        name: pkg.name,
        file: pkg.browser,
        format: "umd",
      },
    ],
    plugins: [
      json(),
      svg(),
      html({
        include: "**/*.html",
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          minifyJS: true,
          removeComments: true,
          collapseInlineTagWhitespace: true,
          minifyCSS: true,
        },
      }),
      resolve({ mainFields: ["module", "main", "browser"] }),
      commonjs(),
      babel(),
      postcss({ inject: false, minimize: true, plugins: [autoprefixer()] }),
      cleanup({ comments: "none" }),
      terser(),
      ANALYZE && analyze({ summaryOnly: true }),
    ],
  },
];
