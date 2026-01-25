#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// --- ESM __dirname fix ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CLI args ---
const projectName = process.argv[2];

if (!projectName) {
  console.log(`
🌱 create-gardener

Usage:
  create-gardener <project-name>

Example:
  create-gardener my-app
`);
  process.exit(1);
}

// --- Target dir ---
const targetDir = path.resolve(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
  console.error(`❌ Directory "${projectName}" already exists`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });
console.log(`✅ Created ${projectName}`);

// --- Copy template ---
const templateDir = path.join(__dirname, "template");

if (!fs.existsSync(templateDir)) {
  console.error("❌ Template folder not found");
  process.exit(1);
}

copyDir(templateDir, targetDir);

console.log(`
🌿 Project ready!

Next steps:
  cd ${projectName}
  pnpm install
  pnpm dev
`);


// ---------- helpers ----------
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

