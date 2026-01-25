# Gardener 🌱

**Gardener** is a small development toolkit and micro-framework for building websites with **declarative DOM JSON**, server-rendered templates, and a **custom static site generation pipeline**.

It is designed for developers who want:

* full control over HTML structure
* minimal abstractions
* a fast local dev experience
* a deterministic static output for production

Gardener sits somewhere between a tiny framework and a build system.

---

## What Gardener Includes

### Core

* 🌿 **gardener.js** — declarative DOM builder using JSON objects
* 🔁 **parser** — convert real DOM elements back into gardener-compatible JSON
* 📄 **EJS** for simple server-rendered views
* 🎨 **Tailwind CSS** for fast styling

### Dev Server

* Express-based development server
* Hot reload toggle (Ctrl + H)
* Endpoints to create pages and components at runtime (dev convenience)

### Images

* Deterministic image optimization endpoint
* Sharp-powered resize + WebP conversion
* Filesystem cache reused during static builds

### Static Site Generation (SSG)

* Render EJS views into HTML
* Convert route-encoded filenames into nested directories
* Merge frontend assets and image cache
* Clean temporary build artifacts
* Produce a deployable static directory

---

## Project Structure

```
src/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── libs/
│   ├── cache/              # generated image cache (build artifact)
│   └── server.ts
│
├── frontend/
│   ├── views/              # EJS templates (source)
│   ├── assets/             # original images
│   ├── components/
│   ├── gardener.js
│   └── styles/
│
├── frontendStatic/          # final static output (generated)
└── tempfrontend/            # temporary build output (deleted after build)
```

---

## Requirements

* Node.js v16+ (v18+ recommended)
* pnpm (recommended) or npm
* Optional: PostgreSQL

---

## Quickstart (Development)

### 1. Install

```bash
git clone https://github.com/ritishDas/Gardener.git
cd Gardener
pnpm install
```

### 2. Run dev server

```bash
pnpm run dev
```

* Server runs at **[http://localhost:3000](http://localhost:3000)**
* Tailwind watcher and TypeScript server run together

---

## Image Optimization & Caching

Gardener provides a **deterministic image optimization endpoint**.

### Route

```
GET /cache/:name
```

### Filename format

```
<basename>_<width>x<height>.webp
```

### Example

```http
GET /cache/hero_500x300.webp
```

HTML usage:

```html
<img src="/cache/hero_500x300.webp" alt="hero" />
```

---

### How it works

1. Parses filename to extract:

   * base name
   * width
   * height
2. Checks cache:

   ```
   src/backend/cache/
   ```
3. If cached → return immediately
4. If not cached:

   * Finds source image in:

     ```
     src/frontend/assets/
     ```
   * Resizes and converts to WebP (Sharp)
   * Stores result in cache
5. Serves the optimized image

---

### Static Build Integration

During static generation:

* All cached images under:

  ```
  src/backend/cache/
  ```

  are copied into:

  ```
  src/frontendStatic/
  ```

Static HTML can safely reference:

```html
<img src="/cache/hero_500x300.webp" />
```

No runtime image processing is required in production.

---

## Static Site Generation

Gardener includes a custom static build pipeline.

### What it does

1. Renders EJS views into HTML
2. Writes temporary files using route-encoded filenames
   (example: `_blog_posts_hello.html`)
3. Converts them into directory-based routes:

   ```
   blog/posts/hello/index.html
   ```
4. Copies frontend assets
5. Copies image cache
6. Deletes temporary build directory

### Output

```
src/frontendStatic/
├── index.html
├── blog/
│   └── posts/
│       └── hello/
│           └── index.html
├── assets/
└── cache/
```

This directory is ready for:

* static hosting
* CDN deployment
* Nginx / Caddy / Netlify / Vercel

---

## Frontend API — `gardener.js`

File: `src/frontend/gardener.js`

### `gardener(obj)`

Create DOM elements from JSON.

```js
const el = gardener({
  t: 'div',
  cn: ['card', 'p-4'],
  children: [
    { t: 'h2', txt: 'Title' },
    { t: 'p', txt: 'Content' }
  ]
});

document.body.appendChild(el);
```

---

### `parser(elementOrHtml, isParent = true)`

Convert DOM into gardener JSON.

```js
const json = parser(document.querySelector('.hero'));
console.log(json);
```

---

### `parserWindow(text)`

Dev-only UI:

* Preview parsed JSON
* Press **Y** to create a component file

---

### Utilities

* `imagePreloader(images)`
* `fetchElement(selector)`
* `appendElement(parent, child)`
* `replaceElement(original, newElem)`
* `createElement(type, classname)`

---

## Dev-Only Endpoints ⚠️

### `POST /addcomponent`

Creates a frontend component file.

```json
{
  "path": "components/MyComp.js",
  "component": "{ t: 'div', txt: 'Hello' }"
}
```

Writes directly to the filesystem.

---

### `POST /addpage`

Creates an EJS page and registers a route.

```json
{ "page": "/my-page" }
```

* Generates a new EJS file
* Appends a route to the backend router

---

## Security Notes

⚠️ **Important**

* `/addcomponent` and `/addpage` mutate files and routes
* Intended for **local development only**
* Do NOT expose publicly without authentication and sanitization

---

## Troubleshooting

* **Server not starting**

  * Check `.env`
  * Ensure PostgreSQL is running (if enabled)
  * Inspect logs from `pnpm run dev`

* **Images not loading**

  * Ensure source image exists in `src/frontend/assets`
  * Filename must match `<name>_<width>x<height>.webp`

* **Tailwind not updating**

  * Ensure `pnpm install` completed successfully

---

## Contributing

This is a small personal/dev-focused toolkit.

Contributions are welcome:

* bug fixes
* documentation improvements
* build pipeline enhancements
* security hardening

---

## License

MIT

