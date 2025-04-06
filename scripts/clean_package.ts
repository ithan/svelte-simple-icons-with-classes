/**
 * Clean package script
 * After build, copy the files in ./package to the root directory, excluding the package.json file.
 * This script is cross-platform compatible (Windows/Linux)
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

// Get the current file's directory path in a cross-platform way
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Path to the generated package directory
const pkgDir = path.join(rootDir, ".svelte-kit", "__package__");

/**
 * Copies package files to the root directory, excluding package.json
 */
async function copyPackageFiles(): Promise<void> {
  try {
    console.log(`Copying files from ${pkgDir} to ${rootDir}...`);
    
    // Check if the package directory exists
    const exists = await fs.stat(pkgDir).catch(() => null);
    
    if (!exists) {
      throw new Error(`Package directory not found: ${pkgDir}`);
    }
    
    // Copy all files except package.json
    await fs.cp(pkgDir, rootDir, {
      recursive: true,
      filter: (src: string) => !src.includes("package.json"),
    });
    
    console.log("Package files copied successfully!");
  } catch (error) {
    console.error("Error copying package files:", error);
    process.exit(1);
  }
}

// Execute the copy operation
copyPackageFiles();
