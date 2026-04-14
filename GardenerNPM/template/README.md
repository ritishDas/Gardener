# Gardener — DOM-First Mini Framework

Gardener is a lightweight web framework built on top of Express and EJS. It enables building web applications without React or heavy frontend frameworks by using a DOM-first approach with reusable components.

---

## What it does

Gardener lets you:

- Build UI using plain HTML, CSS, and JavaScript
- Convert DOM elements into reusable components
- Serve lightweight pages with minimal runtime overhead

---

## Why it exists

Modern frameworks introduce significant abstraction and bundle size overhead.

Gardener focuses on:

- Minimal runtime (~300 lines core)
- Direct DOM control
- Simplicity over abstraction

---

## Example

Define a component using JSON:

```
{
  "t": "div",
  "cn": ["flex", "justify-center", "items-center", "target"],
  "children": [
    {
      "t": "span",
      "cn": ["text-xl", "font-bold"],
      "txt": "Hello World"
    },
    {
      "t": "button",
      "txt": "click",
      "events": {
        "click": "() => console.log('button clicked')"
      }
    }
  ]
}
```

You don’t need to write JSON manually.

Instead:

1. Write standard HTML
2. Select an element (id/class)
3. Run the parser → generates reusable component

---

## Key Features

- Lightweight (~300 lines core, bundled with esbuild)
- No frontend framework dependency
- Reusable components (DOM → JSON)
- Server-side rendering via EJS
- Hot reloading
- Image optimization (Sharp + caching)
- Static build support
- One-command page creation

---

## Architecture

Gardener follows a simple request → render → enhance flow:

- Express handles routing and backend logic
- EJS renders templates into HTML
- Frontend library enhances DOM with:
  - component system
  - state handling
  - dev tooling

---

## Components

### Two types:

1. Static Components

- EJS partials
- Require full page reload

2. Dynamic Components

- Generated from DOM → JSON
- Reusable and parameterized

Example parameter:

<span>?title?</span>

This creates a dynamic variable "title".

---

## Image Optimization

- Uses Sharp for processing
- Cached images served via:

/static/[image_name]_[width]x[height].webp

---

## Hot Reloading

- Backend watches file changes
- Generates hash updates
- Frontend polls reload endpoint
- Full page reload triggered on change

---

## Tech Stack

- TypeScript
- Express
- EJS
- esbuild
- Sharp

---

## Setup

npm create gardener <project-name>

---

## Positioning

Gardener is designed for:

- Developers who prefer control over abstraction
- Lightweight applications
- Learning how frameworks work internally

---

## Future Work

- Partial DOM updates (instead of full reload)
- Better state management primitives
- Devtools / debugging layer

---
## 🤝 Contributing

Contributions are welcome! Visit the [GitHub repository](https://github.com/ritishDas/gardener).

## 📄 License

MIT License - See LICENSE file for details.

## 👤 Author

**ritishDas**

- GitHub: [@ritishDas](https://github.com/ritishDas)
- Website: [gardener.ritish.site](https://gardener.ritish.site)

---

Built with ❤️ for developers who want to move fast without breaking things.

