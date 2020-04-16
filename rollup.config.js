import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    external: ["@kissmybutton/motorcortex"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [resolve(), commonjs(), babel()]
  },
  {
    input: "src/index.js",
    external: ["@kissmybutton/motorcortex"],
    output: [
      {
        globals: {
          "@kissmybutton/motorcortex": "MotorCortex"
        },
        name: pkg.name,
        file: pkg.browser,
        format: "umd"
      }
    ],
    plugins: [
      resolve({ mainFields: ["module", "main", "browser"] }),
      commonjs(),
      babel(),
      terser()
    ]
  }
];
