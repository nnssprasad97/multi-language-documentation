# Multi-Language Documentation Portal

A high-performance, multi-language documentation portal built with Next.js 14+, Tailwind CSS, and Docker.

## Features

- **Performance**: High performance with Incremental Static Regeneration (ISR).
- **i18n**: Support for multiple languages (English, Spanish, French, German).
- **Versioning**: Documentation versioning (v1, v2, v3).
- **Search**: Client-side full-text search using FlexSearch.
- **API Reference**: Integrated Swagger UI for OpenAPI specifications.
- **Dark Mode**: Fully supported dark mode theme.
- **Responsive**: Mobile-friendly design with collapsible sidebar.

## Setup & Installation

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)

### Running with Docker (Recommended)

1.  **Build and Start**:
    ```bash
    docker-compose up --build
    ```
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

## Architecture

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Content**: Markdown-based (`_docs/` directory)
- **i18n**: Custom dictionary-based implementation compliant with App Router.
- **Search**: Client-side indexing with FlexSearch.

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions (markdown processing, dictionary loading).
- `public/locales`: i18n translation files.
- `_docs`: Documentation content (Markdown).
- `public/openapi.json`: API Specification.

## Environment Variables

See `.env.example` for required variables.
