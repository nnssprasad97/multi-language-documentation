# Multi-Language Documentation Portal

A high-performance, multi-language documentation portal built with Next.js 14+, Tailwind CSS, and Docker.


## Features

- **Performance**: High performance with Incremental Static Regeneration (ISR).
- **i18n**: Support for multiple languages (English, Spanish, French, German).
- **Versioning**: Documentation versioning (v1, v2, v3).
- **Search**: Client-side full-text search using FlexSearch (indexes titles, content, and descriptions).
- **API Reference**: Integrated Swagger UI for OpenAPI specifications.
- **Dark Mode**: Fully supported dark mode theme.
- **Responsive**: Mobile-friendly design with collapsible sidebar.

## Setup & Installation

### Prerequisites

- Docker and Docker Compose (tested with Docker Desktop 4.27+)
- Node.js 18.17+ (tested with v20.11.0)

### Running with Docker (Recommended)

1.  **Build and Start**:
    ```bash
    docker-compose up --build
    ```
    - Service: `web`
    - Port: `3000`

2.  **Access**:
    Open [http://localhost:3000](http://localhost:3000)

### Local Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Run Tests**:
    ```bash
    npm test
    npm run lint
    ```

## Verification

### i18n & Routing
- Try accessing different locales:
  - [http://localhost:3000/en/docs/v1/introduction](http://localhost:3000/en/docs/v1/introduction)
  - [http://localhost:3000/fr/docs/v1/introduction](http://localhost:3000/fr/docs/v1/introduction)
  - [http://localhost:3000/es/docs/v1/introduction](http://localhost:3000/es/docs/v1/introduction)

### ISR (Incremental Static Regeneration)
Pages use `revalidate = 60` to ensure content is updated without a full rebuild.
```typescript
// src/app/[lang]/docs/[version]/[...slug]/page.tsx
export const revalidate = 60;
```

### Search
The search bar uses FlexSearch to index documentation content on the client side. It indexes:
- Page Titles
- Content sections
- Descriptions

### API Reference
Located at `/api-reference`. It renders the OpenAPI specification found in `public/openapi.json`.

## Architecture

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Content**: Markdown-based (`_docs/` directory)
- **i18n**: Custom dictionary-based implementation compliant with App Router.
- **Search**: Client-side indexing with FlexSearch.

## Tech Stack Rationale

-   **Next.js App Router**: Chosen for its robust server-side rendering (SSR) capabilities, which are crucial for SEO and initial load performance of documentation sites. The App Router's nested layouts perfectly match the documentation sidebar structure.
-   **FlexSearch**: Selected for its speed and low memory footprint. A client-side search eliminates the need for a dedicated search backend (like Elasticsearch) for this scale of documentation, keeping deployment simple.
-   **Swagger UI**: Integrated directly to provide interactive API documentation without requiring users to leave the portal.

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions (markdown processing, dictionary loading).
- `public/locales`: i18n translation files.
- `_docs`: Documentation content (Markdown).
- `public/openapi.json`: API Specification.
- `__tests__`: Unit tests.

## Environment Variables

See `.env.example` for required variables.
