# Modern Content Platform

A robust content management system frontend built with Next.js 16 and Cosmic CMS, designed to showcase your blog posts, authors, and categories in a unified, professional interface.

## Features

- **Performance-First Architecture**: Built on Next.js 16 App Router
- **Type-Safe Content**: Full TypeScript integration matching your Cosmic content model
- **Modern Styling**: Utility-first styling with Tailwind CSS
- **Rich Media**: Optimized image delivery using imgix
- **Content Relationships**: Seamless navigation between posts, authors, and categories

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=693497d066bea41d1799ca08&clone_repository=6934b511f73ed19789bac3d2)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic (Headless CMS)
- **Markdown**: React Markdown
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1.  Clone the repository
2.  Install dependencies:
    ```bash
    bun install
    ```
3.  Set up environment variables in `.env.local` (or use the Cosmic dashboard):
    ```
    COSMIC_BUCKET_SLUG=your-bucket-slug
    COSMIC_READ_KEY=your-read-key
    ```
4.  Run the development server:
    ```bash
    bun run dev
    ```

## Cosmic Integration

This project is pre-configured to fetch content from your Cosmic bucket. The content model assumes:

- **Posts**: Articles with title, excerpt, content, hero image, and relationships
- **Authors**: Profiles with name, bio, and avatar
- **Categories**: Topics with title and description

## Deployment

### Vercel

1.  Push your code to a Git repository
2.  Import the project into Vercel
3.  Add your `COSMIC_BUCKET_SLUG` and `COSMIC_READ_KEY` environment variables
4.  Deploy

### Netlify

1.  Connect your Git repository
2.  Set build command to `next build` and publish directory to `.next`
3.  Add environment variables
4.  Deploy
<!-- README_END -->