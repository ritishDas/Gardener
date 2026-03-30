# Gardener Documentation

## Table of Contents

1. [Overview](#overview)
2. [Core Functions](#core-functions)
3. [Gardener Object Schema](#gardener-object-schema)
4. [Development Tools](#development-tools)
5. [State Management](#state-management)
6. [Image Optimization](#image-optimization)
7. [Examples](#examples)

---

## Overview

**Gardener** is a lightweight DOM manipulation library that converts JSON objects into DOM elements and vice versa. It provides a simple, declarative way to build UI components without the overhead of large frameworks.

### Features

- 🌱 **JSON to DOM Conversion** - Create DOM elements from simple JSON objects
- 🔄 **DOM to JSON Parsing** - Convert existing DOM elements back to JSON
- ⚡ **SVG Support** - Built-in support for SVG elements
- 🎯 **Event Handling** - Declarative event binding
- 🔥 **Hot Reload** - Development mode with auto-refresh
- 💾 **State Management** - Simple reactive state system
- 🛠️ **Dev Tools** - Component extraction and template saving

---

## Core Functions

### `gardener(Dom)`

The main function that converts a Gardener JSON object into a real DOM element.

**Parameters:**
- `Dom` (Object|HTMLElement): A Gardener object schema or existing DOM element

**Returns:** HTMLElement

**Example:**
```javascript
import { gardener } from '/static/gardener.js';

const element = gardener({
  t: 'div',
  cn: ['container', 'flex'],
  txt: 'Hello World',
  attr: {
    id: 'main',
    'data-value': '123'
  },
  events: {
    click: () => console.log('Clicked!')
  }
});
```

### `fetchElement(selector)`

Query selector wrapper to fetch DOM elements.

**Parameters:**
- `selector` (string): CSS selector string

**Returns:** HTMLElement | null

**Example:**
```javascript
const header = fetchElement('#header');
const buttons = fetchElement('.btn');
```

### `appendElement(parent, child)`

Append a child element to a parent element.

**Parameters:**
- `parent` (string|HTMLElement): Parent element or selector
- `child` (HTMLElement): Child element to append

**Example:**
```javascript
appendElement('#container', myElement);
appendElement(parentEl, childEl);
```

### `createElement(type, classname)`

Create a new DOM element with optional classes.

**Parameters:**
- `type` (string): HTML tag name
- `classname` (Array): Array of CSS class names (optional)

**Returns:** HTMLElement

**Example:**
```javascript
const div = createElement('div', ['card', 'shadow']);
const button = createElement('button');
```

### `insertText(element, text)`

Set the text content of an element.

**Parameters:**
- `element` (HTMLElement): Target element
- `text` (string): Text content

**Example:**
```javascript
insertText(myDiv, 'Hello World');
```

### `replaceElement(original, New)`

Replace an existing element with a new one.

**Parameters:**
- `original` (string|HTMLElement): Element to replace or selector
- `New` (HTMLElement): New element

**Example:**
```javascript
replaceElement('#old-header', newHeader);
```

---

## Gardener Object Schema

A Gardener object is a JSON representation of a DOM element with the following properties:

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `t` | string | **Required.** HTML tag name (e.g., 'div', 'button', 'svg') |
| `cn` | Array<string> | CSS class names |
| `txt` | string | Text content (for text nodes) |
| `attr` | Object | HTML attributes (id, data-*, aria-*, etc.) |
| `events` | Object | Event listeners (key: event name, value: handler function) |
| `children` | Array | Array of child Gardener objects |

### Example Schema

```javascript
{
  t: 'div',                           // Tag name
  cn: ['card', 'rounded', 'shadow'],  // Classes
  txt: 'Card Title',                  // Text content
  attr: {                             // Attributes
    id: 'card-1',
    'data-id': '123',
    'aria-label': 'Card component'
  },
  events: {                           // Event handlers
    click: handleClick,
    mouseenter: handleHover
  },
  children: [                         // Child elements
    {
      t: 'p',
      txt: 'Card description'
    },
    {
      t: 'button',
      cn: ['btn'],
      txt: 'Click me'
    }
  ]
}
```

### SVG Support

Gardener automatically detects and properly creates SVG elements:

```javascript
gardener({
  t: 'svg',
  cn: ['icon'],
  attr: {
    viewBox: '0 0 24 24',
    width: '24',
    height: '24'
  },
  children: [
    {
      t: 'path',
      attr: {
        d: 'M12 2L2 7l10 5 10-5-10-5z',
        fill: 'currentColor'
      }
    }
  ]
});
```

**Supported SVG elements:** svg, path, circle, rect, line, polygon, polyline, g, defs, clipPath, use

---

## Development Tools

### Parser Functions (Dev Mode Only)

#### `parser(element, isParent)`

Convert existing DOM elements back to Gardener JSON format.

**Parameters:**
- `element` (string|HTMLElement): Element to parse or selector
- `isParent` (boolean): Whether to show parser window (default: true)

**Returns:** Gardener object

**Example:**
```javascript
import { parser } from '/static/gardenerDev.js';

// Parse an element and show parser window
parser('#my-component');

// Parse without showing window
const obj = parser(myElement, false);
```

#### `parserWindow(text)`

Display a modal window with parsed JSON and options to copy or save as component.

**Features:**
- Copy JSON to clipboard
- Save as reusable component
- Syntax highlighting

### Component Management

#### `addComponent(txt, path)`

Save a Gardener object as a reusable component file.

**Example:**
```javascript
// This is called automatically through the parser window UI
// Components are saved to: src/frontend/static/components/
```

### Page Management

#### Development UI Features

When running in development mode (`NODE_ENV=development`), Gardener provides:

1. **Floating Action Button (GR)** - Bottom right corner
   - Hover to reveal options
   - Create new pages
   - Save current page as template

2. **Hot Reload Toggle** - Bottom of screen
   - Press `Alt + H` to toggle
   - Auto-refresh on file changes
   - State persists in localStorage

3. **New Page Dialog**
   - Enter route path (e.g., `/about`, `/blog/post`)
   - Automatically creates route and view files

4. **Save Template**
   - Saves current page HTML to template directory
   - Preserves structure for reuse

---

## State Management

### `State` Class

A simple reactive state management system.

#### Constructor

```javascript
import { State } from '/static/gardenerDev.js';

const counter = new State(0);
const user = new State({ name: 'John', age: 30 });
```

#### Methods

##### `registerCb(callback)`

Register a callback to be called when state changes.

**Parameters:**
- `callback` (Function): Function called with new value

**Example:**
```javascript
const count = new State(0);

count.registerCb((value) => {
  console.log('Count changed:', value);
  updateUI(value);
});
```

##### `setTo(value)`

Update the state value and trigger all callbacks.

**Parameters:**
- `value` (any): New state value

**Example:**
```javascript
count.setTo(5);  // Triggers all registered callbacks
user.setTo({ name: 'Jane', age: 25 });
```

##### `unregisterCb(callback)`

Remove a callback from the state.

**Parameters:**
- `callback` (Function): Callback function to remove

**Example:**
```javascript
const updateHandler = (val) => console.log(val);
count.registerCb(updateHandler);
count.unregisterCb(updateHandler);  // Remove the callback
```

### State Management Example

```javascript
import { State } from '/static/gardenerDev.js';
import { gardener, appendElement } from '/static/gardener.js';

// Create state
const todos = new State([]);

// Create UI component
function TodoList() {
  return gardener({
    t: 'ul',
    attr: { id: 'todo-list' },
    cn: ['list']
  });
}

// Register state change handler
todos.registerCb((items) => {
  const list = fetchElement('#todo-list');
  list.innerHTML = '';
  
  items.forEach(item => {
    const li = gardener({
      t: 'li',
      txt: item.text,
      cn: ['todo-item']
    });
    appendElement(list, li);
  });
});

// Update state
todos.setTo([
  { text: 'Learn Gardener', done: false },
  { text: 'Build an app', done: false }
]);
```

---

## Image Optimization

Gardener includes automatic image optimization using Sharp.

### How It Works

Place original images in:
```
/src/frontend/assets/
```

Reference optimized images in your HTML:
```html
<img src="/static/cache/photo_800x600.webp">
```

The server will automatically:
- ✅ Resize to specified dimensions
- ✅ Convert to WebP format
- ✅ Cache the result
- ✅ Serve optimized version

### Image URL Format

```
/static/cache/{filename}_{width}x{height}.webp
```

**Examples:**
```html
<img src="/static/cache/hero_1920x1080.webp">
<img src="/static/cache/thumbnail_300x300.webp">
<img src="/static/cache/banner_1200x400.webp">
```

---

## Examples

### Simple Button Component

```javascript
import { gardener } from '/static/gardener.js';

function Button({ text, onClick }) {
  return gardener({
    t: 'button',
    cn: ['btn', 'btn-primary'],
    txt: text,
    events: {
      click: onClick
    }
  });
}

// Usage
const myButton = Button({
  text: 'Click Me',
  onClick: () => alert('Clicked!')
});

appendElement('#app', myButton);
```

### Card Component with Children

```javascript
function Card({ title, content, actions }) {
  return gardener({
    t: 'div',
    cn: ['card', 'shadow-lg', 'rounded-lg', 'p-6'],
    children: [
      {
        t: 'h2',
        cn: ['text-2xl', 'font-bold', 'mb-4'],
        txt: title
      },
      {
        t: 'p',
        cn: ['text-gray-700', 'mb-4'],
        txt: content
      },
      {
        t: 'div',
        cn: ['flex', 'gap-2'],
        children: actions.map(action => ({
          t: 'button',
          cn: ['btn', action.style],
          txt: action.label,
          events: {
            click: action.onClick
          }
        }))
      }
    ]
  });
}

// Usage
const card = Card({
  title: 'Welcome',
  content: 'This is a card component built with Gardener',
  actions: [
    { label: 'Accept', style: 'btn-success', onClick: () => {} },
    { label: 'Decline', style: 'btn-danger', onClick: () => {} }
  ]
});
```

### Dynamic List with State

```javascript
import { State, gardener, appendElement } from '/static/gardenerDev.js';

const items = new State(['Apple', 'Banana', 'Cherry']);

function List() {
  const ul = gardener({
    t: 'ul',
    cn: ['list'],
    attr: { id: 'fruit-list' }
  });
  
  items.registerCb((fruits) => {
    ul.innerHTML = '';
    fruits.forEach(fruit => {
      const li = gardener({
        t: 'li',
        cn: ['list-item'],
        txt: fruit
      });
      appendElement(ul, li);
    });
  });
  
  return ul;
}

// Add a new item
function addItem(item) {
  items.setTo([...items.value, item]);
}

// Usage
appendElement('#app', List());
addItem('Date');  // Updates the list automatically
```

### Form with Validation

```javascript
function LoginForm() {
  return gardener({
    t: 'form',
    cn: ['form', 'max-w-md', 'mx-auto', 'p-6'],
    events: {
      submit: (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        handleLogin(data);
      }
    },
    children: [
      {
        t: 'div',
        cn: ['mb-4'],
        children: [
          {
            t: 'label',
            cn: ['block', 'mb-2'],
            txt: 'Email',
            attr: { for: 'email' }
          },
          {
            t: 'input',
            cn: ['input', 'w-full'],
            attr: {
              type: 'email',
              name: 'email',
              id: 'email',
              required: ''
            }
          }
        ]
      },
      {
        t: 'div',
        cn: ['mb-4'],
        children: [
          {
            t: 'label',
            cn: ['block', 'mb-2'],
            txt: 'Password',
            attr: { for: 'password' }
          },
          {
            t: 'input',
            cn: ['input', 'w-full'],
            attr: {
              type: 'password',
              name: 'password',
              id: 'password',
              required: ''
            }
          }
        ]
      },
      {
        t: 'button',
        cn: ['btn', 'btn-primary', 'w-full'],
        txt: 'Login',
        attr: { type: 'submit' }
      }
    ]
  });
}
```

### SVG Icon Component

```javascript
function Icon({ name, size = 24, color = 'currentColor' }) {
  const icons = {
    home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  };

  return gardener({
    t: 'svg',
    cn: ['icon'],
    attr: {
      width: size.toString(),
      height: size.toString(),
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    },
    children: [
      {
        t: 'path',
        attr: {
          d: icons[name] || icons.home
        }
      }
    ]
  });
}

// Usage
appendElement('#nav', Icon({ name: 'home', size: 32 }));
```

### Modal Component

```javascript
function Modal({ title, content, onClose }) {
  return gardener({
    t: 'div',
    cn: ['fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center'],
    events: {
      click: (e) => {
        if (e.target === e.currentTarget) onClose();
      }
    },
    children: [
      {
        t: 'div',
        cn: ['absolute', 'inset-0', 'bg-black', 'opacity-50']
      },
      {
        t: 'div',
        cn: ['bg-white', 'rounded-lg', 'shadow-xl', 'z-10', 'max-w-md', 'w-full', 'p-6'],
        children: [
          {
            t: 'div',
            cn: ['flex', 'justify-between', 'items-center', 'mb-4'],
            children: [
              {
                t: 'h3',
                cn: ['text-xl', 'font-bold'],
                txt: title
              },
              {
                t: 'button',
                cn: ['text-gray-500', 'hover:text-gray-700'],
                txt: '×',
                events: {
                  click: onClose
                }
              }
            ]
          },
          {
            t: 'div',
            cn: ['mb-4'],
            txt: content
          }
        ]
      }
    ]
  });
}

// Usage
function showModal() {
  const modal = Modal({
    title: 'Confirmation',
    content: 'Are you sure you want to proceed?',
    onClose: () => modal.remove()
  });
  appendElement(body, modal);
}
```

---

## Best Practices

1. **Component Structure** - Keep components small and focused
2. **State Management** - Use State class for reactive data
3. **Event Handlers** - Define handlers outside gardener objects when possible
4. **CSS Classes** - Use Tailwind CSS utility classes for styling
5. **Reusability** - Extract common patterns into reusable components
6. **Development** - Use parser to convert existing HTML to Gardener format
7. **Performance** - Avoid deeply nested structures when possible

---

## Development vs Production

### Development Mode (`NODE_ENV=development`)
- Hot reload enabled
- Dev tools UI visible
- Parser window available
- Component extraction tools
- Page creation tools

### Production Mode (`NODE_ENV=production`)
- All dev tools disabled
- Optimized bundle
- No parser overhead
- Clean UI without dev buttons

---

## Tips & Tricks

### Using Parser for Migration

Convert existing HTML to Gardener format:
1. Inspect element in browser
2. Open console
3. Run: `parser('#my-element')`
4. Copy JSON from parser window
5. Use in your components

### Hot Reload Workflow

1. Press `Alt + H` to enable hot reload
2. Make changes to your code
3. Save file
4. Page auto-refreshes after 1 second

### Component Organization

```
src/frontend/static/
├── components/
│   ├── Button.js
│   ├── Card.js
│   ├── Modal.js
│   └── Nav.js
├── gardener.js
└── gardenerDev.js
```

Import and use:
```javascript
import { Button } from '/static/components/Button.js';
import { gardener, appendElement } from '/static/gardener.js';
```

---

For more information, visit [Gardener Homepage](https://gardener.ritish.site)
