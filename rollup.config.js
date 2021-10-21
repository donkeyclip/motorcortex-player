import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import html from "rollup-plugin-html";
import postcss from "rollup-plugin-postcss";
import svg from "rollup-plugin-svg";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    external: ["@donkeyclip/motorcortex"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [
      json(),
      html({ fileName: "**/*.html" }),
      svg(),
      resolve(),
      commonjs(),
      babel(),
      postcss({ inject: false }),
    ],
  },
  {
    input: "src/index.js",
    external: ["@donkeyclip/motorcortex"],
    output: [
      {
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
      html({ include: "**/*.html" }),
      resolve({ mainFields: ["module", "main", "browser"] }),
      commonjs(),
      babel(),
      svg(),
      postcss({ inject: false }),
      terser(),
    ],
  },
];
