# SpaceControl🚀 for Figma

SpaceControl eliminates the tedious manual calculation and resizing when you need to fit multiple elements within a specific width with consistent spacing. Instead of manually calculating `(target width - padding) ÷ number of items`, the plugin does the math and applies the changes instantly.

## How to use

1.  **Select your elements** - Choose the rectangles, frames, or other resizable objects you want to distribute
2.  **Launch SpaceControl** - Find it in Plugins → Development → SpaceControl
3.  **Enter your parameters:**
    - **Target width**: The total width available (e.g., 800px)
    - **Number of items**: Must match your selection count
    - **Padding**: Space between items in pixels (optional, defaults to 0)
4.  **Click Resize!** - Watch your elements automatically resize and position

## Example

Say you have 3 input fields to fit in an 800px container with 20px spacing between them:

- Calculation: 800px - (2 × 20px padding) = 760px available
- Result: Each field becomes 760px ÷ 3 = 253.33px wide

SpaceControl🚀 handles this automagically
![SpaceControl🚀 Screenshot](https://github.com/EARoa/SpaceControl/blob/main/assets/spacecontrol.png?raw=true)

## Features

- **Real-time preview** - See calculations before applying changes
- **Input validation** - Helpful error messages for invalid configurations
- **Smart positioning** - Elements are arranged left-to-right based on their current positions
- **Flexible spacing** - Set any padding value, including 0 for no gaps
- **Responsive UI** - Clean interface that adapts to different plugin window sizes

## Requirements

- Elements must be resizable (rectangles, frames, components, etc.)
- Selection count must match the "number of items" field
- Total padding cannot exceed the target width

## Installation

### For Development

1.  Clone or download this plugin
2.  Install dependencies: `npm install`
3.  Build the plugin: `npm run build`
4.  Import via Figma → Plugins → Development → Import plugin from manifest
5.  Select the `manifest.json` file

## Development

This plugin is built with TypeScript and follows Figma's plugin development standards.

**Commands:**

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Automatically rebuild on file changes
- `npm run lint` - Check code quality
- `npm run lint:fix` - Auto-fix linting issues

**File Structure:**

```
SpaceControl/
├── code.ts          # Main plugin logic
├── ui.html          # Plugin interface
├── manifest.json    # Plugin configuration
└── package.json     # Dependencies and scripts
```
