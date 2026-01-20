# Gardener

A small development toolkit and micro-framework to "grow" DOM elements from declarative JSON objects and to convert DOM elements to JSON. The project includes:
- A dev server (Express + EJS) with endpoints to dynamically create pages/components and on-the-fly image resizing (Sharp).
- A tiny frontend library (gardener.js) to build DOM using a JS object syntax and parse existing DOM elements back to JSON.
- A PostgreSQL starter


---

## Features

- gardener: declarative DOM builder (gardener.js)
- parser: convert real DOM elements into JSON objects
- Dynamic image resizing and caching via /img/:name/:width/:height (Sharp)
- Endpoints to add components/pages at runtime (dev convenience)
- Tailwind CSS for quick styling; EJS templating for simple server-rendered pages

---

## Requirements

- Node.js (v16+ recommended)
- pnpm (recommended) or npm
- Optional: Git

---

## Quickstart (Dev)

1. Clone and install

```bash
git clone https://github.com/ritishDas/Gardener.git
cd Gardener
pnpm install
```


3. Initialize database & run server (development)

- Start the dev server (it runs the TypeScript server via tsx and watches Tailwind):

```bash
pnpm run dev
```

- Server listens on: http://localhost:3000


## API Reference

Base URL: http://localhost:3000

1. GET /  
   - Renders the home EJS view.


3. GET /img/:name/:width/:height  
   - Dynamic image resizing endpoint.
   - Parameters:
     - name: filename under `src/frontend/assets` (e.g., `w.webp` or `logo.jpg`)
     - width: integer width (px)
     - height: integer height (px)
   - Example:
     - <code>GET /img/w.webp/500/500</code>
   - Behavior:
     - Validates width/height
     - Reads `src/frontend/assets/:name`
     - Produces a WebP with requested size into `src/backend/.cache/` and serves it
     - Uses sharp for resizing and conversion
     - Returns: image binary (webp) or 400/500 on error

4. POST /addcomponent
   - Adds a new frontend component file to the project (development convenience).
   - Body (JSON):
     - path: string — path under `src/frontend/` where file will be written (e.g., `"components/MyComp.js"`)
     - component: string — JS code content to write (controller wraps this content into a gardener export)
   - Example request:

```http
POST /addcomponent
Content-Type: application/json

{
  "path": "components/MyComp.js",
  "component": "{ t: 'div', txt: 'Hello from MyComp' }"
}
```

   - Response: JSON { success: true } or { success: false, msg }

   - Security note: This endpoint writes files to the repository — use only in trusted dev environments.

5. POST /addpage
   - Creates a new EJS page from the template and appends a route to `src/backend/routes/gardener.route.ts`.
   - Body (JSON):
     - page: string — path you want to mount (e.g., `/my-new-page` or `/foo/bar`)
   - Example:

```http
POST /addpage
Content-Type: application/json

{ "page": "/newpage" }
```

   - The controller:
     - Copies `src/backend/frontendtemplate.ejs` to `src/frontend/views/<page_name>.ejs` (slashes replaced)
     - Appends a `router.route("...").get((req,res)=>res.render("..."))` line to gardener.route.ts
   - Response: { success: true } or { success: false, msg }

   - Security note: This also mutates server-side routes; intended for local dev only.

---

## Frontend: gardener.js (developer API)

File: `src/frontend/gardener.js`. Primary exported/available functions in browser:

- gardener(obj)
  - Create DOM element(s) from a JSON description.
  - Example:

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

- parser(elementOrHtmlString, isParent = true)
  - Convert an existing DOM element into a JSON object that matches gardener's format.
  - Example:

```js
const json = parser(document.querySelector('.hero'));
console.log(JSON.stringify(json, null, 2));
```

- parserWindow(text)
  - In dev mode: opens a UI window to preview parsed JSON and offers a quick "add component" flow (press Y to add).

- imagePreloader(images)
  - Preloads images by appending hidden <img> tags for caching/early load.

- Helper utilities:
  - fetchElement(selector), appendElement(parent, child), createElement(type, classname), replaceElement(original, newElem)

Dev convenience:
- Hot reload toggle: Press Ctrl+H toggles hot reload behaviour and stores in localStorage (hotreload).
- When in `config.mode === 'dev'`, the UI will render controls for creating pages/components.

---

## Development workflow examples

- Add a simple component from browser (developer UX):
  1. Use parser() on an element -> parserWindow will show JSON.
  2. Press 'Y' to open a small form to give the component file name.
  3. The client triggers POST /addcomponent with `{ path: "components/MyComp.js", component: "<json>" }`.
  4. Server writes the file to `src/frontend/components/MyComp.js`.

- Add a page:
  - POST to /addpage with `{ "page": "/my-page" }`. This:
    - Creates `src/frontend/views/my-page.ejs` from template.
    - Appends route to `src/backend/routes/gardener.route.ts`.
    - After creating, navigate to http://localhost:3000/my-page

---

## Image resizing usage example

Using the dynamic image endpoint:

- Browser usage in HTML:

```html
<img src="/img/w.webp/500/500" alt="example" />
```

- Direct curl:

```bash
curl -o resized.webp "http://localhost:3000/img/w.webp/300/200"
```

Files are expected under `src/frontend/assets/:name`. Generated WebP files are stored under `src/backend/.cache/`.

---

## Security & Notes

- The endpoints /addcomponent and /addpage write files and edit route files dynamically. They are convenience features intended for local development only. Do NOT expose this server to untrusted networks without authentication and sanitization.
- The image endpoint trusts filenames under `src/frontend/assets`. Sanitize inputs if used beyond trusted local development.

---

## Troubleshooting

- Server not starting:
  - Ensure `.env` is present and DB credentials are correct.
  - Check that Postgres is running and accessible.
  - Look at server logs printed when running `pnpm run dev` (tsx will show errors).

- Seed script errors:
  - Run `pnpm exec tsx src/backend/seed.ts` and check error output. If permission/extension errors occur, create the extension manually:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

- Tailwind not building:
  - Dev command runs the tailwind CLI; ensure `pnpm install` succeeded and tailwind binary is available from node_modules.

---

## Contributing

- This is a small personal/dev tool — contributions are welcome:
  - Open issues for bugs/features.
  - PRs for features or documentation improvements.

If you add features that further secure the dynamic endpoints, please document their usage in this README.

---

## License

MIT — see LICENSE file (if present) or consider this repository MIT-licensed by the author.

---

