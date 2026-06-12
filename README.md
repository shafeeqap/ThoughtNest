## ThoughtNest 📝

A modern full-stack blogging platform built with Next.js, TypeScript, and MongoDB.

ThoughtNest allows users to create, manage, and discover blog content through a clean and responsive interface. The platform includes secure authentication, a rich text editor, image management, advanced search capabilities, and an administrative dashboard with analytics.

    ⚠️ This project is currently in progress and actively being improved.


## Why this project?
This project was built to practice real-world product thinking, not just UI.
It focuses on SEO, performance, and content management without relying on
third-party CMS tools.

🚀 Features

### User Features
- Static & dynamic blog pages (SEO optimized)
- Browse and discover blogs
- Search articles with optimized filtering
- View blog details and related content
- Secure authentication using social login providers
- Responsive design for desktop, tablet, and mobile devices

### Author Features
- Create and publish blog posts
- Rich text editing experience
- Upload and crop featured images
- Edit and manage published content
- Draft and publishing workflow

### Admin Features
- Dashboard with analytics and charts
- User management
- Blog management
- Content moderation
- Performance insights and statistics

🛠️ Tech Stack

### Frontend
Next.js (App Router)

Used for building the application with:

- Server Components
- Client Components
- Route-based architecture
- Server-side rendering (SSR)
- Static generation where applicable

TypeScript

Provides:

- Strong type safety
- Better developer experience
- Improved maintainability
- Reduced runtime errors

Tailwind CSS

Used for:

- Utility-first styling
- Responsive layouts
- Faster UI development
- Consistent design system

### Backend & Database
- MongoDB

Used as the primary database for storing:
- Users
- Blog posts
- Categories
- Comments
- Analytics data

📦 Libraries & Tools

### Zod

Schema validation library used for:

- Form validation
- API request validation
- Type-safe data validation

Benefits:

- Runtime validation
- TypeScript integration
- Improved data integrity

### Tiptap

Rich text editor used for creating blog content.

Features:

- Modern editing experience
- Extensible architecture
- Formatting support
- Image embedding support
- Custom editor functionalit

### DOMPurify

Used to sanitize user-generated HTML content.

Purpose:

- Prevent Cross-Site Scripting (XSS) attacks
- Ensure safe rendering of rich text content

### JSDOM

Provides DOM APIs during server-side rendering.

Used alongside DOMPurify because:

- Next.js server environment does not include browser DOM APIs
- Enables secure HTML sanitization on the server

### Lodash

Used for utility functions and optimized search behavior.

Example:

- Debouncing search input
- Preventing API requests on every keystroke
- Improving application performance

### Bcrypt

Used for password hashing.

Benefits:

- Secure password storage
- Salt generation
- Protection against password leakage

### Auth.js

Authentication framework used for:

- User authentication
- Session management
- OAuth login providers

Supports:

- Google Authentication
- Facebook Authentication
- Other OAuth providers

Benefits:

- Simplified authentication flow
- Secure session handling
- Better developer experience

### Jose

Used for JWT (JSON Web Token) operations.

Features:

- JWT creation
- JWT verification
- Token signing
- Secure authentication workflows

### RTK Query

Data fetching and caching solution.

Used for:

- API requests
- Data caching
- Loading states
- Error handling
- Cache invalidation

Benefits:

- Reduced boilerplate
- Better performance
- Simplified state management

### Recharts

Used in the admin dashboard for visualizing data.

Examples:

- Blog statistics
- User growth
- Content analytics
- Dashboard insights

### React Cropper

Image cropping component based on Cropper.js.

Used for:

- Profile image cropping
- Featured image optimization
- Better image presentation

### Cloudinary

Cloud-based media management platform.

Used for:

- Image storage
- Image optimization
- Automatic transformations
- CDN delivery

Benefits:

- Faster image loading
- Reduced server storage requirements
- Optimized image delivery

🔒 Security Measures

ThoughtNest implements several security practices:

- Password hashing using Bcrypt
- JWT authentication using Jose
- OAuth authentication via Auth.js
- XSS protection using DOMPurify
- Input validation using Zod
- Secure server-side data handling

```bash
📁 Project Structure
src/
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── services/
├── redux/
├── types/
├── utils/
└── middleware.ts
```

⚙️ Installation

Clone the repository
```bash
git clone https://github.com/shafeeqap/ThoughtNest.git
```
Navigate to the project
```bash
cd thoughtnest
```
Install dependencies
```bash
npm install
```
Create environment variables
```bash
MONGODB_URI=

AUTH_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

JWT_SECRET=
```
Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

📊 Future Enhancements

- Comment system
- Blog reactions and likes
- Bookmark functionality
- Reading history
- AI-assisted content suggestions
- Newsletter subscription
- SEO analytics dashboard
- Role-based permissions

🎯 Learning Outcomes

This project helped strengthen knowledge in:

- Next.js App Router
- Full-stack TypeScript development
- Authentication and authorization
- Secure web application development
- Rich text editor integration
- Cloud media management
- API state management
- Dashboard analytics
- Performance optimization

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Developed by Aboobacker Shafeeq

- Full Stack Developer (MERN & Next.js)

- GitHub: https://github.com/shafeeqap
- LinkedIn: https://linkedin.com/in/shafeeq-ap/