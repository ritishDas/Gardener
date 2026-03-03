
# 🌱 Gardener

**Gardener** is a lightweight, DOM-first front-end library for building and manipulating HTML/SVG elements using a clean, declarative JavaScript object syntax.

No virtual DOM.
No JSX.
No compilation step.
No magic.

Everything is explicit and inspectable directly in the browser.
[See it on npm](https://www.npmjs.com/package/create-gardener)
---

## ✨ Philosophy

Gardener follows a **DOM-first, deterministic approach**:

* No Virtual DOM
* No JSX
* No compilation / bundler required
* No runtime abstraction layers
* Everything renders directly to the real DOM
* Works natively in the browser (ES modules)

If you can inspect it in DevTools, you can understand it.

---

## 🚀 Features

* Declarative object-based DOM creation
* Automatic SVG namespace handling
* Development server support
* Hot Reload (dev mode)
* HTML → Component parser
* Dynamic image resizing & caching
* Static site generation
* Lightweight reactive `State` system
* Zero build step required

---

# 📦 Installation

Simply include the module:

```html
<script type="module" src="/gardener.js"></script>
```

No bundler required.

---

# 🌿 Core API

## 1️⃣ `gardener()` — Declarative Element Builder

```js
gardener({
  t: 'div',
  cn: ['p-6', 'flex', 'gap-4'],
  attr: { id: 'hero', role: 'banner' },
  txt: 'Welcome',
  events: {
    click: () => console.log('clicked!')
  },
  children: [
    { t: 'span', txt: 'Nested child' }
  ]
})
```

### Supported Keys

| Key        | Description                      |
| ---------- | -------------------------------- |
| `t`        | Tag name (HTML or SVG)           |
| `cn`       | Array of class names             |
| `attr`     | Attributes / properties object   |
| `txt`      | Text content                     |
| `events`   | `{ eventName: handler }`         |
| `children` | Array of nested gardener objects |

---

## 2️⃣ DOM Helpers

```js
fetchElement(selector)
appendElement(parent, child)
replaceElement(oldElement, newElement)
createElement(type, classes)
insertText(element, text)
addEL(parent, event, handler)
```

Example:

```js
const el = gardener({ t: 'h1', txt: 'Hello' });
appendElement('body', el);
```

---

# 🔄 SVG Support

Gardener automatically uses the correct SVG namespace for:

```
svg, path, circle, rect, line, polygon, polyline, g, defs, clipPath, use
```

Example:

```js
gardener({
  t: 'svg',
  attr: { width: 100, height: 100 },
  children: [
    { t: 'circle', attr: { cx: 50, cy: 50, r: 40, fill: 'red' } }
  ]
})
```

---

# 🧠 State Management

A minimal reactive system.

```js
const count = new State(0);

count.registerCb(value => {
  console.log("New value:", value);
});

count.setTo(1);
```

### API

* `new State(initialValue)`
* `.registerCb(callback)`
* `.setTo(newValue)`

No proxies. No diffing. Just callbacks.

---

# 🔥 Development Mode

Configure runtime behavior:

```js
const config = {
  mode: 'dev',           // 'dev' | 'prod'
  componentdir: 'static/components',
  hotreload: false
}
```

## Dev Mode Includes:

* Floating "+" page creator
* Component parser
* Hot reload toggle
* Static site builder

---

# ♻️ Hot Reload

* State stored in `localStorage`
* Reloads page ~1 second after change
* Toggle with:

```
Alt + H
```

Or use the built-in checkbox (dev mode only).

---

# 🧩 Component Parser

Turn existing HTML into reusable JS components.

### Step 1 — Write HTML

```html
<div id="user-card">
  Hello, ?name?
</div>
```

### Step 2 — Run in console

```js
parser('#user-card')
```

### Step 3 — Generated File

```js
export default function thisfun({ name }) {
  return gardener({
    t: "div",
    txt: "Hello, " + name
  })
}
```

---

## 🧾 Parameter Syntax

Use:

```
?variable?
```

Gardener extracts variables and generates a function with those parameters.

---

# 🖼 Image Optimization

Place originals in:

```
/src/frontend/assets/
```

Use:

```html
<img src="/static/cache/photo_800x600.webp">
```

Server will:

* Resize
* Convert to WebP
* Cache automatically

---

# 📄 Create New Pages (Dev Mode)

1. Click floating `+`
2. Enter route (e.g., `/about`)
3. Page auto-generated
4. Browser redirects

Template used:

```
/src/backend/frontendtemplate.ejs
```

---

# 🏗 Static Site Generation

Visit:

```
/createstatic
```

Build output:

```
/src/frontendStatic
```

---

# 🧩 How It Works

Gardener:

1. Converts object → real DOM
2. Applies attributes safely
3. Handles properties vs attributes
4. Recursively renders children
5. Avoids virtual DOM entirely

The browser is the rendering engine.

---

# 🎯 When To Use Gardener

Good for:

* Lightweight SPAs
* Internal tools
* Static + hybrid sites
* Dev tooling
* Projects where you want full DOM control
* No-build-step environments

Not designed to replace React/Vue — designed to avoid them when unnecessary.

---

# 🛠 Example App

```js
import { gardener, appendElement } from './gardener.js';

const app = gardener({
  t: 'div',
  cn: ['app'],
  children: [
    { t: 'h1', txt: 'Hello World' },
    {
      t: 'button',
      txt: 'Click Me',
      events: {
        click: () => alert('Hi!')
      }
    }
  ]
});

appendElement('body', app);
```

---

# 📁 Project Structure (Suggested)

```
/src
  /frontend
  /backend
  /frontendStatic
/static
  /components
gardener.js
```

---


# 📜 License

MIT (recommended)

---

# 🌿 Why Gardener?

Because sometimes you don't need a forest.

Just a garden.

