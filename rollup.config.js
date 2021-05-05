import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json";
export default [
  {
    input: "src/index.js",
    external: ["@kissmybutton/motorcortex"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [resolve(), commonjs(), babel(),postcss({inject:false})],
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
      postcss({inject:false}),
    ],
  },
];
