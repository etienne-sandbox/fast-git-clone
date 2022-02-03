#!/usr/bin/env node
const { build } = require("estrella");

build({
  entry: "src/index.js",
  outfile: "build/index.js",
  format: "cjs",
});
