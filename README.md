# react-tw-breakpointer

A development utility React component that displays the current Tailwind CSS breakpoint and viewport dimensions in a customizable overlay. Perfect for responsive design development and debugging.

![npm version](https://img.shields.io/npm/v/react-tw-breakpointer)
![bundle size](https://img.shields.io/bundlephobia/minzip/react-tw-breakpointer)
![license](https://img.shields.io/npm/l/react-tw-breakpointer)
![CI](https://github.com/ccbbccbb/react-tw-breakpointer/workflows/CI/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Tree Shakeable](https://img.shields.io/badge/Tree%20Shakeable-Yes-brightgreen)

## Features

- **Live Breakpoint Display** - Shows current Tailwind breakpoint (xs, sm, md, lg, xl, 2xl)
- **Viewport Dimensions** - Displays real-time width and height
- **Color-Coded Indicators** - Each breakpoint has a unique color for quick identification
- **Keyboard Toggle** - Press 't' (configurable) to show/hide
- **Production Safe** - Automatically hidden in production builds
- **Zero Dependencies** - Only requires React as a peer dependency
- **Highly Configurable** - Customize position, visibility, font, and more
- **TypeScript Support** - Full type definitions included
- **SSR Safe** - Works with Next.js and other SSR frameworks

## Installation

```bash
# bun (recommended)
bun add react-tw-breakpointer

# npm
npm install react-tw-breakpointer

# yarn
yarn add react-tw-breakpointer

# pnpm
pnpm add react-tw-breakpointer
```

### Optional: JetBrains Mono Font

For the best visual experience, we recommend installing JetBrains Mono:

```bash
bun add @fontsource/jetbrains-mono
```

Then import it in your app:

```tsx
// In your app's entry point or layout
import "@fontsource/jetbrains-mono/variable.css";
```

## Quick Start

```tsx
import { BreakPointer } from "react-tw-breakpointer";

function App() {
  return (
    <>
      {/* Your app content */}
      <BreakPointer />
    </>
  );
}
```

## Usage Examples

### Basic Usage

```tsx
import { BreakPointer } from "react-tw-breakpointer";

function MyApp() {
  return (
    <div>
      {/* Component is automatically hidden in production */}
      <BreakPointer />
    </div>
  );
}
```

### Custom Configuration

```tsx
<BreakPointer
  initiallyVisible={false}
  toggleKey="b"
  position="top-right"
  zIndex={10000}
  showDimensions={true}
/>
```

### Next.js App Router

```tsx
// app/layout.tsx
import "@fontsource/jetbrains-mono/variable.css";
import { BreakPointer } from "react-tw-breakpointer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NODE_ENV === "development" && <BreakPointer />}
      </body>
    </html>
  );
}
```

**Note**: In App Router, `process.env.NODE_ENV` is available on the server, so the component is conditionally rendered server-side. This is more efficient than client-side conditional rendering since the component bundle isn't even sent to production users.

### Next.js Pages Router

```tsx
// pages/_app.tsx
import "@fontsource/jetbrains-mono/variable.css";
import { BreakPointer } from "react-tw-breakpointer";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <BreakPointer />
    </>
  );
}
```

### Vite React App

```tsx
// main.tsx or App.tsx
import "@fontsource/jetbrains-mono/variable.css";
import { BreakPointer } from "react-tw-breakpointer";

function App() {
  return (
    <>
      {/* Your app */}
      <BreakPointer position="bottom-left" />
    </>
  );
}
```

## Props

| Prop               | Type                  | Default              | Description                               |
| ------------------ | --------------------- | -------------------- | ----------------------------------------- |
| `initiallyVisible` | `boolean`             | `true`               | Whether the component is visible on mount |
| `toggleKey`        | `string`              | `'t'`                | Keyboard key to toggle visibility         |
| `position`         | `Position`            | `'bottom-center'`    | Position of the overlay on screen         |
| `zIndex`           | `number`              | `9999`               | z-index of the overlay                    |
| `hideInProduction` | `boolean`             | `true`               | Automatically hide in production builds   |
| `showDimensions`   | `boolean`             | `true`               | Show viewport width and height            |
| `className`        | `string`              | `undefined`          | Additional CSS classes                    |
| `style`            | `React.CSSProperties` | `undefined`          | Additional inline styles                  |
| `fontFamily`       | `string`              | JetBrains Mono stack | Custom font family                        |

### Position Options

- `'bottom-center'` (default)
- `'top-center'`
- `'top-left'`
- `'top-right'`
- `'bottom-left'`
- `'bottom-right'`

## Breakpoint Reference

The component displays the following Tailwind CSS breakpoints:

| Breakpoint | Min Width | Color                  | Label     |
| ---------- | --------- | ---------------------- | --------- |
| xs         | 0px       | Red (#ec2427)          | 1/6 " xs  |
| sm         | 640px     | Orange (#f36525)       | 2/6 " sm  |
| md         | 768px     | Yellow (#edb41f)       | 3/6 " md  |
| lg         | 1024px    | Light Yellow (#f7ee49) | 4/6 " lg  |
| xl         | 1280px    | Blue (#4686c5)         | 5/6 " xl  |
| 2xl        | 1536px    | Green (#45b64a)        | 6/6 " 2xl |

## Requirements

- React 18 or higher
- React DOM 18 or higher
- Tailwind CSS 4.0 or higher (for breakpoint visibility classes)

## Browser Support

Works in all modern browsers that support:

- ES6+
- CSS Grid/Flexbox
- ResizeObserver API

## Performance

- **Zero runtime dependencies** beyond React
- **< 5KB minified + gzipped**
- **Tree-shakeable** - only import what you use
- **No performance impact in production** - component doesn't render

## TypeScript

Full TypeScript support with exported types:

```tsx
import { BreakPointer, BreakPointerProps } from "react-tw-breakpointer";

const config: BreakPointerProps = {
  position: "top-right",
  toggleKey: "b",
  zIndex: 10000,
};

<BreakPointer {...config} />;
```

## FAQ

### Why isn't the component showing?

1. Check if you're in production mode (`NODE_ENV=production`)
2. Try pressing the toggle key (default: 't')
3. Ensure Tailwind CSS is properly configured
4. Check z-index conflicts with other overlays

### Can I use this without Tailwind CSS?

Currently, the component relies on Tailwind's responsive utility classes for breakpoint detection. A non-Tailwind version is planned for a future release.

### How do I change the colors?

You can override the colors using the `className` or `style` props, though this may affect the breakpoint visibility logic. Custom color schemes are planned for v2.

### Does it work with custom Tailwind breakpoints?

The component uses standard Tailwind breakpoints. Support for custom breakpoints is on the roadmap.

### How does production hiding work in different frameworks?

- **Next.js App Router**: The component is conditionally rendered server-side, so it's never sent to production clients
- **Next.js Pages Router**: The component renders on the client but returns null in production
- **Vite/CRA**: The component renders on the client but returns null in production
- **Server Components**: Use `process.env.NODE_ENV === "development"` for optimal performance

## Roadmap

- [ ] Support for custom breakpoints
- [ ] Non-Tailwind CSS version
- [ ] Custom color schemes
- [ ] Draggable positioning
- [ ] Keyboard shortcuts for position changes
- [ ] Display orientation info
- [ ] Pixel density display
- [ ] Save preferences to localStorage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Install dependencies (`bun install`)
4. Make your changes
5. Run tests and linting (`bun run check`)
6. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
7. Push to the branch (`git push origin feature/AmazingFeature`)
8. Open a Pull Request

### Development

```bash
# Install dependencies
bun install

# Run development build with watch mode
bun run dev

# Build for production
bun run build

# Type check
bun run type-check

# Lint and format
bun run lint

# Check all (types, lint, format)
bun run check
```

## License

MIT © ccbbccbb

## Acknowledgments

- Inspired by development tools that make responsive design easier
- JetBrains for the excellent JetBrains Mono font
- The Tailwind CSS team for their fantastic framework

## Original Inspiration

This package was inspired by and based on the following original component I created for my own use:

```tsx
import React, { useEffect, useState } from "react";

const BreakPointer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "y" || event.key === "Y") {
        setIsVisible((prev) => !prev);
      }
    };

    updateViewport();
    document.addEventListener("keydown", handleKeyPress);
    window.addEventListener("resize", updateViewport);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  if (process.env.NODE_ENV === "production") return null;
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-2 left-1/2 z-[9999] -translate-x-1/2 rounded border-2 border-black text-xs">
      <span className="block items-center bg-[#ec2427] px-2 py-1 font-mono font-semibold tracking-tighter text-white sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
        1/6 • xs • {viewport.width}px &lt; 640px
      </span>
      <span className="hidden items-center bg-[#f36525] px-2 py-1 font-mono font-semibold tracking-tighter text-white sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        2/6 • sm • {viewport.width}px &lt; 768px
      </span>
      <span className="hidden items-center bg-[#edb41f] px-2 py-1 font-mono font-semibold tracking-tighter text-white md:block lg:hidden xl:hidden 2xl:hidden">
        3/6 • md • {viewport.width}px &lt; 1024px
      </span>
      <span className="hidden items-center bg-[#f7ee49] px-2 py-1 font-mono font-semibold tracking-tighter text-black lg:block xl:hidden 2xl:hidden">
        4/6 • lg • {viewport.width}px &lt; 1280px
      </span>
      <span className="hidden items-center bg-[#4686c5] px-2 py-1 font-mono font-semibold tracking-tighter text-white xl:block 2xl:hidden">
        5/6 • xl • {viewport.width}px &lt; 1536px
      </span>
      <span className="hidden items-center bg-[#45b64a] px-2 py-1 font-mono font-semibold tracking-tighter text-white 2xl:block">
        6/6 • 2xl • {viewport.width}px ≥ 1536px
      </span>
    </div>
  );
};

export default BreakPointer;
```
