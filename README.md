<div align="center">
  <img alt="svelte simple icons" src="./docs/svg/svelte-simple-icons.svg" width="150" />

# svelte-simple-icons-with-classes

This package provides the [Simple Icons 14.12.1](https://github.com/simple-icons/simple-icons/releases/tag/14.12.1) packaged as a set of [Svelte 5](https://svelte.dev/) components with improved class handling.

> This is a fork of [@icons-pack/svelte-simple-icons](https://github.com/icons-pack/svelte-simple-icons) updated for Svelte 5 compatibility and enhanced class support.

  <a href="https://www.npmjs.com/package/svelte-simple-icons-with-classes" target="_blank">
    <img src="https://img.shields.io/npm/v/svelte-simple-icons-with-classes?color=CB061D&style=flat-square" alt="npm version" />
  </a>
  <a href="https://github.com/YOUR_USERNAME/svelte-simple-icons-with-classes/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/npm/l/svelte-simple-icons-with-classes?color=008660&style=flat-square" alt="licence" />
  </a>
</div>

## Installation

Install the package in your project directory with:

```sh
# with npm
npm install svelte-simple-icons-with-classes

# with yarn
yarn add svelte-simple-icons-with-classes

# with pnpm
pnpm add svelte-simple-icons-with-classes
```

## Usage

All icons are imported from a single file, where [ICON SLUG] is replaced by a capitalized [slug](https://github.com/simple-icons/simple-icons/blob/master/slugs.md) with a `Si` prefix.

## Basic example

```svelte
<script lang="ts">
  // Import specific icons by their slug
  import { SiReact, SiSvelte, SiDocker } from "svelte-simple-icons-with-classes";
</script>

<SiSvelte color="#FF3E00" size={90} />
<SiReact color="#61DAFB" size={50} />
<SiDocker />
```

## Changing title

```svelte
<script lang="ts">
  import { SiSvelte } from "svelte-simple-icons-with-classes";
</script>

<!-- title default is "Svelte" -->
<SiSvelte title="My custom title" />
```

## Custom styles

```svelte
<script lang="ts">
  import { SiSvelte } from "svelte-simple-icons-with-classes";
</script>

<SiSvelte class="my-icon" />

<style>
  :global(.my-icon) {
    width: 35px;
    height: 35px;
  }
</style>
```

## Type Definition for Dynamic Icons in Svelte 5 Components

For dynamic icon components using Svelte 5's syntax:

```svelte
<script lang="ts">
  import type { SiComponentType } from 'svelte-simple-icons-with-classes';
  
  let { 
    icon,
    text,
    onClick = () => console.log('do something')
  } = $props<{
    icon: SiComponentType;
    text: string;
    onClick?: () => void;
  }>();
</script>

<button onclick={onClick}>
  {@render icon({
    title: text,
    size: 24,
    class: "icon"
  })}
  {text}
</button>

<style>
  button {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    white-space: nowrap;
    transition: border-color 0.25s;
    box-shadow: none;
    text-shadow: none;
  }
  
  :global(.icon) {
    margin: 4px 4px 0 0;
  }
</style>
```

## Faster Compilations

If you only need a few icons, you can import them individually from the icons directory:

```svelte
<script lang="ts">
  import SiSvelte from "svelte-simple-icons-with-classes/icons/SiSvelte.svelte";
  import SiGithub from "svelte-simple-icons-with-classes/icons/SiGithub.svelte";
</script>

<SiGithub />
<SiSvelte />
```

## Svelte 5 Compatibility

This library takes advantage of Svelte 5's new features:

- Uses the `$props()` rune instead of the older `export let` syntax
- Handles class forwarding properly with Svelte 5's class handling
- Compatible with Svelte 5's rendering system
- Properly typed for TypeScript usage

## TypeScript Support

This package is fully written in TypeScript and provides:

- Type-safe component imports
- TypeScript definitions for all components
- Type declarations for props and events
- Support for TypeScript projects using Svelte 5

## Cross-Platform Compatibility

All build scripts work seamlessly across both Windows and Unix-based systems:

- Build process works on Windows, macOS, and Linux
- Scripts handle path differences automatically
- No dependency on platform-specific shell commands

## Differences from the original

Key differences from the original `@icons-pack/svelte-simple-icons`:

1. Uses Svelte 5's runes system for props and reactivity
2. Updated event handling to match Svelte 5 patterns 
3. Fully migrated to TypeScript with complete type definitions
4. Better class and style prop forwarding
5. Uses `snake_case` for variable and function names according to the Svelte 5 style guide
6. Cross-platform build process for Windows and Unix systems

## License

This project is licensed under the [MIT License](./LICENSE).