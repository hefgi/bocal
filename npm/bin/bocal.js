#!/usr/bin/env node
// Launcher: execs the platform binary fetched by install.js into this dir.
const path = require("path");
const { spawnSync } = require("child_process");

const exeName = process.platform === "win32" ? "bocal.exe" : "bocal";
const exePath = path.join(__dirname, exeName);

const result = spawnSync(exePath, process.argv.slice(2), { stdio: "inherit" });

if (result.error) {
  if (result.error.code === "ENOENT") {
    console.error(
      "bocal: binary not found. Try reinstalling, or use `cargo install bocal`."
    );
  } else {
    console.error(`bocal: ${result.error.message}`);
  }
  process.exit(1);
}

process.exit(result.status === null ? 1 : result.status);
