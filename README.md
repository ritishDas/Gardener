# Gardener Web Application Template

A modern full-stack web application template created with **create-gardener**. This project provides a production-ready setup with TypeScript, Express.js backend, EJS templating, and Tailwind CSS for styling.

## 🚀 Features

- **TypeScript Backend** - Type-safe Express.js server with modern ES modules
- **EJS Templating** - Server-side rendering with EJS view engine
- **Tailwind CSS** - Utility-first CSS framework with JIT compilation
- **Hot Reload Development** - Live reload for both backend and frontend during development
- **Production Ready** - Optimized build process with minification
- **Testing Setup** - Jest configuration for unit and integration tests
- **Image Processing** - Sharp integration for image optimization
- **Validation** - Zod schema validation
- **Environment Configuration** - dotenv support for environment variables

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (preferred) or npm

## 🛠️ Installation

```bash
# Install dependencies
pnpm install
# or
npm install
```

## 🏃 Getting Started

### Development Mode

Start the development server with hot reload:

```bash
pnpm dev
# or
npm run dev
```

This will:
- Start the TypeScript backend server with watch mode on port 3000 (or PORT from .env)
- Run Tailwind CSS in watch mode for live style updates

### Production Build

Build the application for production:

```bash
pnpm build
# or
npm run build
```

This will:
1. Compile and minify Tailwind CSS
2. Transpile TypeScript to JavaScript
3. Copy frontend assets to the build directory
4. Generate production configuration

### Start Production Server

```bash
pnpm start
# or
npm start
```

Runs the compiled production build from the `build` directory.

** Refer to docs.md for full docs **

## 🧪 Testing

Run tests with Jest:

```bash
pnpm test
# or
npm test
```

## 📁 Project Structure

```
.
├── src/
│   ├── backend/          # Backend TypeScript code
│   │   ├── controllers/  # Route controllers
│   │   ├── routes/       # Express routes
│   │   ├── libs/         # Utility libraries
│   │   └── server.ts     # Main server file
│   └── frontend/         # Frontend assets
│       ├── views/        # EJS templates
│       ├── static/       # Static files (CSS, JS, images)
│       ├── assets/       # Source assets
│       ├── template/     # Frontend templates
│       └── tailwind.css  # Tailwind source file
├── build/                # Production build output
├── buildHelper.js        # Build utility script
├── jest.config.js        # Jest configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies
└── .env                  # Environment variables
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

### TypeScript

The project uses strict TypeScript configuration with:
- ES modules (`"module": "nodenext"`)
- Strict type checking
- Source maps for debugging
- Declaration files generation

### Tailwind CSS

Tailwind CSS v4 is configured with:
- JIT (Just-In-Time) compilation
- Minification in production builds
- Custom styles in `src/frontend/tailwind.css`

## 📦 Dependencies

### Production
- **express** - Fast, minimalist web framework
- **ejs** - Embedded JavaScript templating
- **tailwindcss** - Utility-first CSS framework
- **sharp** - High-performance image processing
- **zod** - TypeScript-first schema validation
- **dotenv** - Environment variable management

### Development
- **typescript** - TypeScript compiler
- **tsx** - TypeScript execution and REPL
- **jest** - Testing framework
- **concurrently** - Run multiple commands concurrently
- **cross-env** - Cross-platform environment variables

## 🔧 Build Process

The `buildHelper.js` script handles:
1. Copying frontend files to the build directory
2. Generating production configuration (`gardenerConfig.js`)
3. Cleaning up unnecessary template files

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm test` | Run Jest tests |

## 🤝 Contributing

This is a template project created by create-gardener. Feel free to modify it according to your needs.

## 📄 License

MIT

## 👤 Author

ritishDas

## 🔗 Links

- [Gardener Homepage](https://gardener.ritish.site)
- [GitHub Repository](https://github.com/ritishDas/gardener)

---

Created with [create-gardener](https://www.npmjs.com/package/create-gardener) 🌱
