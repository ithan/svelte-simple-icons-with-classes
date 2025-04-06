/**
 * Build script that coordinates the entire build process
 * This script is cross-platform compatible (Windows/Linux)
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory path in a cross-platform way
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Execute a command and return a promise that resolves when the command completes
 * @param command - The command to execute
 * @param args - Array of arguments to pass to the command
 * @param cwd - Current working directory for the command
 * @returns Promise that resolves on completion or rejects on error
 */
function executeCommand(command: string, args: string[], cwd: string = rootDir): Promise<void> {
  return new Promise((resolve, reject) => {
    // Use shell on Windows for better command resolution
    const isWindows = process.platform === 'win32';
    
    console.log(`Executing: ${command} ${args.join(' ')}`);
    
    const childProcess = spawn(
      isWindows ? 'cmd' : command,
      isWindows ? ['/c', command, ...args] : args,
      { 
        cwd,
        stdio: 'inherit',
        shell: isWindows
      }
    );
    
    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    childProcess.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Main build function that orchestrates the build process
 */
async function buildProject(): Promise<void> {
  try {
    console.log('Starting build process...');
    
    // Clean everything including generated icons
    console.log('Running clean script...');
    await executeCommand('pnpm', ['clean']);
    
    // Generate icon components 
    console.log('Generating icon components...');
    await executeCommand('pnpm', ['generate:icons']);
    
    // Run type checking after icons are generated
    console.log('Running type checking...');
    await executeCommand('pnpm', ['check']);
    
    // Run svelte-package
    console.log('Building package with svelte-package...');
    await executeCommand('pnpm', ['svelte-package']);
    
    // Run clean_package script
    console.log('Running clean_package script...');
    await executeCommand('pnpm', ['tsx', './scripts/clean_package.ts']);
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Execute the build process
buildProject();
