/**
 * Clean script for removing generated files and directories
 * This script is cross-platform compatible (Windows/Linux)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory path in a cross-platform way
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Paths to clean up
 */
const pathsToClean = [
  path.join(rootDir, 'index.js'),
  path.join(rootDir, 'index.d.ts'),
  path.join(rootDir, 'package'),
  path.join(rootDir, 'icons'),
  path.join(rootDir, 'dist'),
  path.join(rootDir, 'src', 'lib', 'icons'),  // Add icons directory inside src/lib
  path.join(rootDir, 'src', 'lib', 'index.ts')  // Also clean the index.ts file
];

/**
 * Removes a file or directory recursively
 * @param filePath - Path to file or directory to remove
 */
async function removePath(filePath: string): Promise<void> {
  try {
    // Check if the path exists before attempting to remove it
    const stats = await fs.stat(filePath).catch(() => null);
    if (!stats) {
      console.log(`Path does not exist, skipping: ${filePath}`);
      return;
    }

    // If it's a directory, use recursive removal
    if (stats.isDirectory()) {
      console.log(`Removing directory: ${filePath}`);
      await fs.rm(filePath, { recursive: true, force: true });
    } else {
      // Otherwise remove as a file
      console.log(`Removing file: ${filePath}`);
      await fs.unlink(filePath);
    }
  } catch (error) {
    console.error(`Error removing path ${filePath}:`, error);
    throw error;
  }
}

/**
 * Main function to clean all paths
 */
async function cleanPaths(): Promise<void> {
  console.log('Starting cleanup process...');
  
  try {
    // Process all paths in parallel for efficiency
    await Promise.all(pathsToClean.map(removePath));
    console.log('Cleanup completed successfully!');
  } catch (error) {
    console.error('Cleanup failed:', error);
    process.exit(1);
  }
}

// Execute the cleaning process
cleanPaths();
