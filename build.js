#!/usr/bin/env node
const { build } = require("estrella");

build({
  entry: "src/index.js",
  outfile: "build/main.js",
  format: "cjs",
});
