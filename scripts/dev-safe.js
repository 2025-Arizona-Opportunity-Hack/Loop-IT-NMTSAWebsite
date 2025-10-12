#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting NMTSA Website with cache safety...\n");

// Function to clean cache
function cleanCache() {
  console.log("🧹 Cleaning Next.js cache...");

  const pathsToClean = [".next", "node_modules/.cache", ".next/cache"];

  pathsToClean.forEach((cleanPath) => {
    if (fs.existsSync(cleanPath)) {
      fs.rmSync(cleanPath, { recursive: true, force: true });
      console.log(`   ✓ Cleaned ${cleanPath}`);
    }
  });
}

// Function to check for common cache corruption indicators
function checkForCorruption() {
  const corruptionIndicators = [
    ".next/static/chunks/webpack-*.js",
    ".next/cache/webpack",
  ];

  for (const indicator of corruptionIndicators) {
    if (fs.existsSync(indicator)) {
      console.log("⚠️  Cache corruption detected, cleaning...");
      cleanCache();
      return true;
    }
  }
  return false;
}

// Clean cache if requested or if corruption detected
if (process.argv.includes("--clean") || checkForCorruption()) {
  cleanCache();
}

console.log("🏗️  Starting Next.js development server...\n");

// Start Next.js dev server
const devProcess = spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  shell: true,
});

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down development server...");
  devProcess.kill("SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  devProcess.kill("SIGTERM");
  process.exit(0);
});

devProcess.on("error", (error) => {
  console.error("❌ Development server error:", error);

  // If error might be cache-related, clean and retry
  if (error.message.includes("ENOENT") || error.message.includes("chunk")) {
    console.log("🔄 Cache-related error detected, cleaning and retrying...");
    cleanCache();

    // Restart the process
    setTimeout(() => {
      const retryProcess = spawn("npx", ["next", "dev"], {
        stdio: "inherit",
        shell: true,
      });
    }, 2000);
  }
});

devProcess.on("exit", (code) => {
  if (code !== 0) {
    console.log(`\n⚠️  Development server exited with code ${code}`);

    // If exit code suggests cache issues, offer to clean
    if (code === 1) {
      console.log(
        "💡 If you're experiencing cache issues, run: npm run dev:clean"
      );
    }
  }
});
