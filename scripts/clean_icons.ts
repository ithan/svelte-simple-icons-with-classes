/**
 * Clean icons script for removing all generated icon components
 * This script is cross-platform compatible (Windows/Linux)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory path in a cross-platform way
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Path to the icons directory
const iconsDir = path.join(rootDir, 'src', 'lib', 'icons');

/**
 * Removes the icons directory and its contents
 */
async function cleanIcons(): Promise<void> {
  console.log(`Cleaning icons directory: ${iconsDir}`);
  
  try {
    // Check if the directory exists before attempting to remove it
    const exists = await fs.stat(iconsDir).catch(() => null);
    
    if (exists) {
      console.log('Icons directory exists, removing...');
      await fs.rm(iconsDir, { recursive: true, force: true });
      console.log('Icons directory removed successfully');
    } else {
      console.log('Icons directory does not exist, nothing to clean');
    }
  } catch (error) {
    console.error('Error cleaning icons directory:', error);
    process.exit(1);
  }
}

// Execute the cleaning process
cleanIcons();
