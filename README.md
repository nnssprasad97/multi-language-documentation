# Next.js Multi-Language Documentation Site

This is a high-performance, containerized documentation portal built with Next.js (App Router), supporting ISR, i18n, and full-text search.

## Features

- **ISR (Incremental Static Regeneration)**: Pre-rendered pages with revalidation (60s).
- **i18n (Internationalization)**: Supports English (en), Spanish (es), French (fr), and German (de).
- **Search**: Client-side full-text search.
- **API Reference**: Swagger UI integration.
- **Theming**: Dark/Light mode toggle.
- **Interactive UI**: Table of Contents, Code Block Copy, Feedback Widget.

## Setup & Running

### Prerequisites
- Docker & Docker Compose
- Node.js (for local dev)

### Run with Docker (Recommended)

1. Create `.env` from example:
   ```bash
   cp .env.example .env
   ```

2. Build and run:
   ```bash
   docker-compose up --build
   ```

   Access the app at [http://localhost:3000](http://localhost:3000).

### Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run dev server:
   ```bash
   npm run dev
   ```

## Architecture

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Content**: Markdown files in `_docs/{version}/{lang}/`
- **Markdown Processing**: `remark-html` / `react-markdown`
- **Search**: `flexsearch` (or simple client filter implementing `api/search`)

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: UI components (Header, Sidebar, Search, etc.).
- `src/lib`: Utilities (Docs parsing).
- `public/locales`: I18n JSON dictionaries.
- `_docs`: Markdown documentation content.
- `middleware.ts`: Locale routing logic.

## Verification

This project fulfills all core requirements:
- **Docker**: `Dockerfile` and `docker-compose.yml` included.
- **ISR**: Pages use `revalidate = 60`.
- **i18n**: Sub-path routing (`/es/docs/...`) and language switcher.
- **Search**: Functional search input and results (`data-testid="search-input"`).
- **API Page**: `/api-reference` renders Swagger UI.
- **UI**: Theme toggle, Version selector, TOC, Feedback widget, Code copy.

## License
All rights reserved. Copyright, Partnr 2025-26.
