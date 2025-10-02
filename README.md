This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Tools & Packages Used:
----------------------
1. zod :- Form data validation.
2. Tiptap :- Rich text editor.
3. dompurify :- To prevent XSS (Cross-Site Scripting) attacks.
4. jsdom :- For DOM support during server-side rendering (Next.js SSR).
5. lodash :- For helping filter logic to prevent immediate triggers. When the user types in the search input.
6. bcrypt :- For password-hashing.
7. auth.js :- For helping simplify authentication and authorization with using socieal media account.
8. jose :- Providing support for JSON Web Tokens (JWT).
9. RTK Query :- Handle HTTP request. simplifies API data retrieval and caching.
10. recharts :- To help build charts in the admin dashboard.
11. react-cropper: To use for image cropping (popular Cropper.js library)