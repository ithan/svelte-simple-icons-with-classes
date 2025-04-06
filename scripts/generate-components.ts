/**
 * @fileoverview Builder script for creating Svelte 5 components from Simple Icons library
 * This script generates individual Svelte components for each icon in the Simple Icons library,
 * and creates an index file that exports all components.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Import simple-icons safely
import * as simpleIconsModule from "simple-icons";

// Get the current file's directory path in a cross-platform way
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration constants
const format_file = "utf-8";
const root_dir: string = path.join(__dirname, "..");
const lib_dir: string = path.join(root_dir, "src/lib/");
const output_component_dir: string = path.join(lib_dir, "icons");
const index_export_path: string = path.join(lib_dir, "index.ts");

/**
 * Type definition for Simple Icons based on their published types
 */
interface SimpleIcon {
  title: string;
  slug: string;
  svg: string;
  path: string;
  source: string;
  hex: string;
  guidelines?: string;
  license?: {
    type: string;
    url: string;
  };
}

/**
 * Helper function to convert a string to upper camel case
 * @param str - The string to convert
 * @returns The upper camel case version of the string
 */
const upper_camel_case = (str: string): string => { 
  return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => match.toUpperCase())
      .replace(/\s+/g, "");
};

// Extract icons from the simple-icons package using a safer approach
// First cast the module to any to work around TypeScript limitations
const simpleIcons = simpleIconsModule as any;
const icons: Record<string, SimpleIcon> = {};

// Log the structure of simpleIcons to help debug
console.log("Available keys in simpleIcons module:", Object.keys(simpleIcons).slice(0, 5), "...");

// Check if the module has a default export
if (simpleIcons.default) {
  console.log("Using default export from simple-icons");
  const iconExports = simpleIcons.default;
  
  // Process each key in the default export
  for (const key in iconExports) {
    if (key.startsWith('si') && key !== 'siPrefix') {
      const slug = key.slice(2).toLowerCase();
      // Verify the object has the expected structure before adding
      const icon = iconExports[key];
      if (icon && icon.path && icon.title) {
        icons[slug] = icon;
      }
    }
  }
} else {
  // Try direct access if no default export
  console.log("Trying direct access to simple-icons module");
  for (const key in simpleIcons) {
    if (key.startsWith('si') && key !== 'siPrefix') {
      const slug = key.slice(2).toLowerCase();
      const icon = simpleIcons[key];
      if (icon && icon.path && icon.title) {
        icons[slug] = icon;
      }
    }
  }
}

// Get all icon slugs
const iconSlugs: string[] = Object.keys(icons);
console.log(`Found ${iconSlugs.length} icons`);

// Type for SVG attributes
interface SvgAttributes {
  [key: string]: string;
}

/**
 * Creates necessary directories if they don't exist
 */
function create_directories(): void {
  if (!fs.existsSync(lib_dir)) {
    fs.mkdirSync(lib_dir, { recursive: true });
  }

  if (!fs.existsSync(output_component_dir)) {
    fs.mkdirSync(output_component_dir, { recursive: true });
  }
}

/**
 * Converts an attributes object to an SVG attribute string
 * 
 * @param attrs - The attributes object to convert
 * @return The formatted attributes string
 */
function attrs_to_string(attrs: SvgAttributes): string {
  return Object.keys(attrs)
    .map((key) => {
      // Special handling for dynamic attributes (passed as Svelte props)
      if (key === "width" || key === "height" || key === "fill") {
        return `${key}={${attrs[key]}}`;
      }
      return `${key}="${attrs[key]}"`;
    })
    .join(" ");
}

/**
 * Creates a Svelte component for a given icon
 * 
 * @param icon_slug - The slug of the icon
 * @returns The component name
 */
function create_icon_component(icon_slug: string): string {
  const component_name: string = `Si${upper_camel_case(icon_slug)}`;
  const output_file_path: string = path.join(output_component_dir, `${component_name}.svelte`);
  
  // Default SVG attributes
  const default_attrs: SvgAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "size",
    height: "size",
    fill: "color",
    viewBox: "0 0 24 24",
  };

  const icon_data = icons[icon_slug];
  
  if (!icon_data) {
    throw new Error(`Icon data for ${icon_slug} not found in Simple Icons library`);
  }

  // Create the Svelte component with forwarded props using Svelte 5 syntax
  const component_content: string = `<script lang="ts">
  /**
   * ${component_name} icon from Simple Icons
   */
  interface Props {
    color?: string;
    size?: string | number;
    title?: string;
    class?: string;
    style?: string;
    [key: string]: any;
  }

  let { 
    color = 'currentColor', 
    size = 24, 
    title = "${icon_data.title}",
    class: className = '',
    style = '',
    ...rest
  }: Props = $props();
</script>

<svg 
  ${attrs_to_string(default_attrs)}
  class={className}
  style={style}
  {...rest}
>
  <title>{title}</title>
  <path d="${icon_data.path}" />
</svg>
`;

  fs.writeFileSync(output_file_path, component_content, format_file);
  return component_name;
}

/**
 * Creates the index.ts file that exports all icon components
 */
function create_index_file(): void {
  // Reset the index file
  fs.writeFileSync(index_export_path, "", format_file);
  
  // Add TypeScript type definition using Svelte 5 type patterns
  const type_definition: string = `/**
 * Type definition for Simple Icons components
 */

export type SiComponentProps = {
    color?: string;
    size?: string | number;
    title?: string;
    class?: string;
    style?: string;
    [key: string]: any;
}
`;
  
  fs.appendFileSync(index_export_path, type_definition, format_file);
  
  // Process each icon and create an export statement
  iconSlugs.forEach((icon_slug) => {
    const component_name: string = create_icon_component(icon_slug);
    const export_statement: string = `export { default as ${component_name} } from './icons/${component_name}.svelte';\n`;
    fs.appendFileSync(index_export_path, export_statement, format_file);
  });
}

/**
 * Main function to generate all icon components
 */
function build_icons(): void {
  try {
    create_directories();
    create_index_file();
    console.log(`Successfully generated ${iconSlugs.length} icon components!`);
  } catch (error) {
    console.error("Error generating icon components:", error);
    process.exit(1);
  }
}

// Execute the build process
build_icons();
