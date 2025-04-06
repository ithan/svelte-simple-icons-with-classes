# Development Guide for svelte-simple-icons-with-classes

This guide covers how to set up, develop, build, and test the `svelte-simple-icons-with-classes` package.

## Prerequisites

Before you begin, ensure you have:

- Node.js v20 or later
- pnpm v9 or later
- Git

## Initial Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/svelte-simple-icons-with-classes.git
cd svelte-simple-icons-with-classes
```

2. Install dependencies:

```bash
pnpm install
```

## Development Workflow

### Generating Icon Components

The package automatically generates Svelte components from the simple-icons library. To regenerate the components:

```bash
pnpm generate:icons
```

This script:
- Cleans the existing icons directory
- Reads from the simple-icons library
- Generates a Svelte component for each icon using TypeScript
- Creates an index.ts file exporting all components with proper type definitions

### Scripts Overview

The build system is implemented in TypeScript with cross-platform compatibility:

- `clean.ts` - Removes all generated files including icons and distribution files
- `clean_icons.ts` - Removes only the generated icon components
- `generate-components.ts` - Generates Svelte components from the simple-icons library
- `build.ts` - Orchestrates the entire build process
- `clean_package.ts` - Handles post-build package preparation

### Making Changes

If you're modifying the build scripts or component templates:

1. Edit the TypeScript scripts in the `scripts/` directory
2. Run `pnpm typecheck` to verify type correctness
3. Run `pnpm generate:icons` to regenerate components with your changes
4. Verify the generated components in `src/lib/icons/`

## Building the Package

To build the package for distribution:

```bash
pnpm build
```

This command:
1. Cleans previous build artifacts
2. Generates icon components
3. Runs type checking
4. Compiles the Svelte components using `svelte-package`
5. Runs a cleanup script to ensure the package is ready for publishing

### Build Output

After building, the package structure will include:

- `index.js` - Main entry point
- `index.d.ts` - TypeScript definitions
- `icons/` - Directory containing all compiled icon components

## TypeScript Type Checking

To check TypeScript types without building:

```bash
pnpm typecheck
```

For continuous type checking during development:

```bash
pnpm check:watch
```

## Testing Your Build

To test your build locally before publishing:

1. Build the package:

```bash
pnpm build
```

2. Create a local link:

```bash
pnpm link --global
```

3. In your test project:

```bash
pnpm link --global svelte-simple-icons-with-classes
```

4. Import and use components in your test project:

```svelte
<script>
  import { SiSvelte } from 'svelte-simple-icons-with-classes';
  // Or import individual icons
  import SiGithub from 'svelte-simple-icons-with-classes/icons/SiGithub.svelte';
</script>

<SiSvelte />
<SiGithub />
```

## Cross-Platform Development

All build scripts are designed to work on both Windows and Unix-based systems:

- Path handling is normalized across platforms
- No shell-specific commands are used
- File operations use Node.js APIs for consistent behavior

## Versioning and Publishing

This package uses changesets for versioning:

1. Make your changes
2. Run `pnpm changeset` to create a changeset
3. Commit the changeset files
4. When ready to release:
   - Run `pnpm version` to update versions
   - Run `pnpm build` to build the package
   - Run `pnpm release` to publish to npm

## Troubleshooting

### Common Issues

**Missing icon exports**

If you notice missing icons after generation:
- Ensure you have the latest simple-icons version specified in devDependencies
- Check the console output from the `generate:icons` script for errors
- Look for any TypeScript errors in the icon generation process

**TypeScript errors**

If you encounter TypeScript errors during build:
- Run `pnpm check` to see detailed errors
- Ensure your component template in the generate script is correctly typed
- Check that all script imports are properly typed

**Build failures**

If the build process fails:
- Check for TypeScript errors
- Ensure you have the correct peer dependencies installed
- On Windows, check that path separators are correctly handled
- Verify that the necessary directories exist or are created during the build process