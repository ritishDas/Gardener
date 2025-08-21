
---

# 🌱 Gardener

**Gardener** is a lightweight JavaScript utility for declaratively constructing and replacing DOM elements. It’s designed to help you "plant" structured UI components using a simple object schema—ideal for dynamic interfaces, component rendering, or scripting workflows.

---

## 🚀 Features

- Declarative DOM creation via structured objects
- Supports text insertion, attributes, event listeners, and nested children
- Clean separation of concerns with helper functions
- Replaces existing DOM nodes with newly constructed trees

---

## 📦 Installation

Just include the script in your project:

```html
<script src="gardener.js"></script>
```

Or import it into your module:

```js
import { gardener } from './gardener.js';
```

---

## 🌿 Usage

### Basic Example

```js
const target = document.querySelector('#root');

const tree = {
  t: 'div',
  cn: ['container'],
  txt: 'Hello, Gardener!',
  attr: { id: 'greeting' },
  onclick: () => alert('Clicked!'),
  children: [
    {
      t: 'span',
      cn: ['highlight'],
      txt: '🌼 Welcome to the DOM garden!'
    }
  ]
};

gardener(target, tree);
```

This replaces the `#root` element with a new `div` containing a `span`, complete with classes, text, and a click handler.

---

## 🧩 API Reference

### `fetchElement(param)`
Returns the first DOM element matching the selector.

### `appendElement(parent, child)`
Appends a child element to a parent.

### `createElement(type, classname)`
Creates a DOM element of the given type and applies class names.

### `insertText(element, text)`
Sets the inner text of an element.

### `gardener(original, Dom)`
Main function that:
- Creates a new element based on `Dom.t` and `Dom.cn`
- Inserts text (`Dom.txt`)
- Applies attributes (`Dom.attr`)
- Adds event listeners (`Dom.onclick`, `Dom.onsubmit`)
- Recursively appends children (`Dom.children`)
- Replaces the `original` element with the new tree

---

## 🛠️ Tips

- Class names should be passed as an array: `['btn', 'primary']`
- Attributes are applied directly (e.g., `{ id: 'main', href: '#' }`)
- Event handlers must be valid functions
- Nest children deeply to build complex structures

---

## 📚 License

MIT License. Free to use, modify, and distribute.

---
