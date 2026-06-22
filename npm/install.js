#!/usr/bin/env node
// Downloads the prebuilt `bocal` binary for the current platform from the
// matching GitHub release and places it next to the launcher in bin/.
//
// Release assets are expected to be named:
//   bocal-<version>-<target>.tar.gz   (e.g. bocal-0.1.0-aarch64-apple-darwin.tar.gz)
// containing a single executable `bocal` (or `bocal.exe` on Windows).

const fs = require("fs");
const path = require("path");
const os = require("os");
const https = require("https");
const { execFileSync } = require("child_process");

const pkg = require("./package.json");
const VERSION = pkg.version;
const REPO = "hefgi/bocal";

const TARGETS = {
  "darwin arm64": "aarch64-apple-darwin",
  "darwin x64": "x86_64-apple-darwin",
  "linux x64": "x86_64-unknown-linux-musl",
  "linux arm64": "aarch64-unknown-linux-musl",
};

// During early releases the prebuilt binaries may not be published yet. We
// warn rather than hard-fail so `npm install` succeeds; users can fall back to
// `cargo install bocal` or `brew install hefgi/tap/bocal` until assets land.
function fail(msg) {
  console.warn(`bocal install: ${msg}`);
  console.warn(
    "Prebuilt binary unavailable — install with `cargo install bocal` or `brew install hefgi/tap/bocal`."
  );
  process.exit(0);
}

function get(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "bocal-npm-installer" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          return resolve(get(res.headers.location, dest));
        }
        if (res.statusCode !== 200) {
          file.close();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", (err) => {
        file.close();
        reject(err);
      });
  });
}

async function main() {
  const key = `${process.platform} ${process.arch}`;
  const target = TARGETS[key];
  if (!target) fail(`unsupported platform: ${key}`);

  const binDir = path.join(__dirname, "bin");
  fs.mkdirSync(binDir, { recursive: true });
  const exeName = process.platform === "win32" ? "bocal.exe" : "bocal";
  const exePath = path.join(binDir, exeName);

  const asset = `bocal-${VERSION}-${target}.tar.gz`;
  const url = `https://github.com/${REPO}/releases/download/v${VERSION}/${asset}`;
  const tmp = path.join(os.tmpdir(), asset);

  try {
    await get(url, tmp);
    execFileSync("tar", ["-xzf", tmp, "-C", binDir], { stdio: "inherit" });
    if (process.platform !== "win32") fs.chmodSync(exePath, 0o755);
    fs.rmSync(tmp, { force: true });
  } catch (err) {
    fail(`failed to download prebuilt binary (${err.message})`);
  }
}

main();
