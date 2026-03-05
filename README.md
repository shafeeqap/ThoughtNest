## Next.js Blog Platform
A fast, SEO-friendly blog platform built with Next.js, focused on performance,
clean architecture, and scalability.

## Why this project?
This project was built to practice real-world product thinking, not just UI.
It focuses on SEO, performance, and content management without relying on
third-party CMS tools.

## Key Features
- Static & dynamic blog pages (SEO optimized)
- Admin-only post management
- Clean URL routing using slugs
- Optimized images and fast load times

## Tech Stack:

1. Next.js (App Router)
2. TypeScript
3. Tailwind CSS
4. MongoDB
5. zod: Form data validation
6. Tiptap: Rich text editor
7. dompurify: To prevent XSS (Cross-Site Scripting) attacks
8. jsdom: For DOM support during server-side rendering (Next.js SSR)
9. lodash: For helping filter logic to prevent immediate triggers. When the user  types in the search input
10. bcrypt: For password-hashing
11. auth.js: For helping simplify authentication and authorization with using socieal media account
12. jose: Providing support for JSON Web Tokens (JWT)
13. RTK Query: Handle HTTP request. simplifies API data retrieval and caching
14. recharts: To help build charts in the admin dashboard
15. react-cropper: To use for image cropping popular Cropper.js library
16. cloudinary


## Getting Started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

