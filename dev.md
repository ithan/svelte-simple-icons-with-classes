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
- Generates a Svelte component for each icon
- Creates an index.ts file exporting all components

### Making Changes

If you're modifying the build script or component template:

1. Edit the scripts in the `scripts/` directory
2. Run `pnpm generate:icons` to regenerate components with your changes
3. Verify the generated components in `src/lib/icons/`

## Building the Package

To build the package for distribution:

```bash
pnpm build
```

This command:
1. Cleans previous build artifacts
2. Runs type checking
3. Compiles the Svelte components using `svelte-package`
4. Runs a cleanup script to ensure the package is ready for publishing

### Build Output

After building, the package structure will include:

- `index.js` - Main entry point
- `index.d.ts` - TypeScript definitions
- `icons/` - Directory containing all compiled icon components

## Testing Your Build

To test your build locally before publishing:

1. Build the package:

```bash
pnpm build
```

2. Create a local link:

```bash
cd package
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

**TypeScript errors**

If you encounter TypeScript errors during build:
- Run `pnpm check` to see detailed errors
- Ensure your component template in the generate script is correctly typed

**Build failures**

If the build process fails:
- Check for TypeScript errors
- Ensure you have the correct peer dependencies installed
- Check that the svelte-package tool is correctly configured