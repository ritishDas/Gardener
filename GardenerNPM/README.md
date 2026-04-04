# 🌱 Gardener

A full-stack web framework that combines Express.js backend with EJS templating and a unique DOM-to-JSON component system. Build web apps with a visual-first approach where you can convert any DOM element into reusable components with a single function call.

## 🚀 Quick Start

Create a new Gardener app:

```bash
pnpm create gardener app
```

Install dependencies and start development:

```bash
pnpm install
pnpm dev
```

Your app will be running with hot reload enabled!

## 🌟 Core Features

### Backend
- **Express.js**: Familiar Node.js backend with full Express capabilities
- **TypeScript Ready**: Built-in TypeScript support for type-safe development
- **Static Site Generation**: Export your dynamic app to static HTML with one API call

### Frontend
- **EJS Templating**: Server-side rendering with EJS views
- **Tailwind CSS**: Integrated with watch mode for rapid styling
- **Gardener Component System**: Unique DOM-to-JSON conversion for reusable components
- **Live Development Tools**: Browser-based route and component creation

### Developer Experience
- **Hot Reload**: Toggle with `Alt + H` for instant CSS updates
- **Visual Component Parser**: Convert DOM elements to JSON components in the browser
- **Browser-Based Routing**: Create new routes without touching your code
- **Image Optimization**: Automatic WebP conversion with smart sizing

## 📖 Complete Workflow

### 1. Backend Development

Write familiar Express.js code in TypeScript:

```typescript
// src/backend/server.ts
app.get('/api/posts', (req, res) => {
  res.json({ posts: [] });
});
```

### 2. Creating Pages & Routes

**Two ways to create routes:**

#### Browser Method (Recommended for Development)
1. Click the "**New Page**" button that appears in development mode
2. Enter your route path (e.g., `/about`, `/blog/post`)
3. Press Enter - the route and EJS file are created automatically!

#### Manual Method
Create an EJS file in `src/frontend/views/` and add the Express route manually.

### 3. Working with Components

Gardener has **two component types**:

#### A. EJS Partials (Traditional)
Static components that render once:
```ejs
<%- include('partials/header') %>
```

#### B. Gardener Components (Dynamic)
JSON-based components with the Gardener system:

**Creating a Component:**
1. Write your HTML structure in an EJS file or browser
2. In your JavaScript file, call:
   ```javascript
   import { parser } from '/static/gardenerDev.js';
   
   parser('.my-component-selector');
   ```
3. A window appears in the browser with the JSON representation
4. Name and save the component
5. The component is now reusable!

**Using a Component:**
```javascript
import { myComponent } from '/static/components/myComponent.js';
import { gardener, appendElement } from '/static/gardener.js';

// Render the component
const element = gardener(myComponent);
appendElement('#container', element);
```

**Component Structure:**
```javascript
// Gardener components are JSON objects
export const button = {
  t: 'button',              // tag
  cn: ['btn', 'primary'],   // classNames
  txt: 'Click me',          // text content
  attr: { id: 'submit' },   // attributes
  events: { click: handleClick }, // event handlers
  children: [...]           // nested components
};
```

### 4. Parameterized Components

Create dynamic components with parameters using `??`:

```javascript
// In your component definition, wrap dynamic parts with ??
const card = {
  t: 'div',
  cn: ['card'],
  children: [
    { t: 'h2', txt: '??title??' },
    { t: 'p', txt: '??description??' }
  ]
};

// Use with parameters
const myCard = gardener(card, { 
  title: 'Hello', 
  description: 'World' 
});
```

### 5. Template System

**Save Current Page as Template:**
- Click "**Save Template**" button in the browser
- This saves the current page structure as a template
- Used automatically for deeper routes (e.g., `/blog/` template for `/blog/post-1`)

### 6. Dynamic Routes & Parameters

For parameterized routes like `/post/:id`:

**Backend:**
```javascript
app.get('/post/:id', (req, res) => {
  res.render('post', { 
    id: req.params.id,
    title: 'My Post'
  });
});
```

**Frontend (EJS):**
```ejs
<h1>Post <%= id %></h1>
<p><%= title %></p>
```

**Query Parameters:**
```javascript
// Backend
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.render('search', { query });
});

// Frontend EJS
<p>Searching for: <%= query %></p>
```

### 7. Hot Reload for Styling

Press **`Alt + H`** to toggle hot reload mode:
- Automatically refreshes CSS changes
- No page reload needed
- Perfect for rapid styling iterations

### 8. Image Optimization

Use the built-in image optimizer:

```html
<img src="/static/image_800x600.webp" alt="Optimized">
```

Format: `/static/image_{width}x{height}.webp`

The server automatically:
- Converts to WebP format
- Resizes to specified dimensions
- Caches for performance

### 9. Static Site Generation

Generate a static version of your entire app:

```javascript
// Make a GET request
fetch('/createStatic')
```

Or visit `http://localhost:3000/createStatic` in your browser.

Your static site is generated in the `/build` directory!

## 🧩 API Reference

### Gardener Core (`/static/gardener.js`)

```javascript
import { 
  gardener,        // Convert JSON to DOM elements
  fetchElement,    // Query selector wrapper
  appendElement,   // Append child with error handling
  createElement,   // Create element with classes
  insertText,      // Set text content
  replaceElement   // Replace element in DOM
} from '/static/gardener.js';

// Create element from JSON
const el = gardener({
  t: 'div',
  cn: ['container'],
  attr: { id: 'main' },
  children: [...]
});
```

### Gardener Dev Tools (`/static/gardenerDev.js`)

```javascript
import { 
  parser,          // Convert DOM to JSON
  parserWindow,    // Show parser UI
  State,           // Reactive state management
  addEl            // Add event listener helper
} from '/static/gardenerDev.js';

// Reactive State
const count = new State(0);
count.registerCb((value) => {
  console.log('Count:', value);
});
count.setTo(1); // Triggers callback
```

### Navigation (`/static/components/nonui/navigation.js`)

```javascript
import { 
  nextPage,         // Navigate with animation
  nextPagehandler,  // Set up link handlers
  pageloader        // Handle page loader
} from '/static/components/nonui/navigation.js';
```

### API Utilities (`/static/components/nonui/api.js`)

```javascript
import { Fetch } from '/static/components/nonui/api.js';

// Make API requests
const response = await Fetch('/api/data', { key: 'value' }, 'POST');
const data = await response.json();
```

## 📁 Project Structure

```
your-app/
├── src/
│   ├── backend/
│   │   ├── server.ts           # Main server file
│   │   ├── routes/             # Express routes
│   │   └── controllers/        # Route controllers
│   └── frontend/
│       ├── views/              # EJS templates
│       │   └── partials/       # EJS partials
│       ├── static/             # Client-side JS
│       │   ├── gardener.js     # Core framework
│       │   ├── gardenerDev.js  # Dev tools
│       │   ├── components/     # Gardener components
│       │   └── pages/          # Page-specific JS
│       ├── template/           # Page templates
│       ├── style.css           # Compiled Tailwind
│       └── tailwind.css        # Tailwind source
├── build/                      # Static site output
└── package.json
```

## 🎯 Key Concepts

### 1. DOM-to-JSON Parser
The `parser()` function converts any DOM element into a JSON representation that can be saved as a reusable component. This allows you to:
- Build UI visually in the browser
- Extract components without manual coding
- Create a library of reusable elements

### 2. Component Composition
Components are composable JSON objects. Build complex UIs by nesting components:

```javascript
const page = {
  t: 'div',
  children: [
    header,
    mainContent,
    footer
  ]
};
```

### 3. Development vs Production
- **Development**: Full dev tools, component parser, hot reload
- **Production**: Minimal runtime, optimized assets, static export option

## 🔧 Configuration

Edit `src/frontend/static/gardenerConfig.js`:

```javascript
export const mode = 'dev'; // or 'production'
```

## 📚 Documentation

Visit [gardener.ritish.site](https://gardener.ritish.site) for full documentation and examples.

## 💡 Examples

### Creating a Blog Post Component

```javascript
// 1. Create HTML in your EJS file
<div class="post">
  <h2 class="title">?title?</h2>
  <p class="content">?content?</p>
</div>

<div class="post2">
 </div>

// 2. Parse it by calling 
parser('.post');

// 3. accept the component by giving a name in browser

// 4. Use it

replaceElement('.post2', component({title:'new component', content:'this is the new content'}))

```

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
