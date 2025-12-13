# Gardener

Gardener is a front-end library for creating and manipulating DOM elements using a declarative JavaScript object syntax. It includes a development server with features like hot-reloading and on-the-fly component creation from existing HTML. The server also provides dynamic image resizing and caching.

## Features

- **Declarative UI:** Build user interfaces by defining DOM elements as JavaScript objects.
- **HTML to JS Parser:** Convert existing HTML elements into the Gardener's JavaScript object format.
- **Development Server:** An Express.js server with hot-reloading for a smooth development experience.
- **Dynamic Image Resizing:** The server can resize and serve images on-the-fly with caching for performance.
- **In-browser Component Creation:** Create new components directly from the browser.

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd gardener
    ```
3.  Install the dependencies using pnpm:
    ```bash
    pnpm install
    ```

## Usage

1.  Start the development server:
    ```bash
    pnpm dev
    ```
2.  Open your browser and navigate to `http://localhost:3000`.

## How It Works

### Gardener Library (`gardener.js`)

The core of the client-side functionality is the `gardener` function, which takes a JavaScript object representing a DOM element and returns an actual HTML element.

Example of a Gardener object:

```javascript
{
  t: 'div', // tag name
  cn: ['container', 'p-4'], // class names
  attr: { id: 'my-div' }, // attributes
  txt: 'Hello, Gardener!', // text content
  children: [ // child elements
    {
      t: 'button',
      txt: 'Click me'
    }
  ]
}
```

### Server (`server.js`)

The Express.js server provides the following functionalities:

-   Serves the static files (`index.html`, `gardener.js`, etc.).
-   An endpoint to dynamically create component files from the browser.
-   An endpoint for resizing and serving images from the `assets` directory. For example, a request to `/img/my-image.png/100/100` will return a 100x100 WebP version of `my-image.png`.
