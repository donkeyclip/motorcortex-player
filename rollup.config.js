import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import html from "rollup-plugin-html";
import postcss from "rollup-plugin-postcss";
import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import svgo from "rollup-plugin-svgo";
export default [
  {
    input: "src/index.js",
    external: ["@donkeyclip/motorcortex"],
    output: [{ dir: pkg.module, format: "es" }],
    plugins: [
      json(),
      svgo({ multipass: true }),
      html({ fileName: "**/*.html" }),
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
      svgo({ multipass: true }),
      html({ include: "**/*.html" }),
      resolve({ mainFields: ["module", "main", "browser"] }),
      commonjs(),
      babel(),
      postcss({ inject: false }),
      cleanup({ comments: "none" }),
      terser(),
    ],
  },
];
