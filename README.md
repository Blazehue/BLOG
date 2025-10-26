# 📝 BLOG - Editorial Magazine Style Platform(Still a prototype more features to be added!)

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A beautiful, modern blog platform with an editorial magazine aesthetic featuring authentication, dark mode, and full CRUD capabilities.

[View Demo](#) · [Report Bug](https://github.com/Blazehue/BLOG/issues) · [Request Feature](https://github.com/Blazehue/BLOG/issues)

</div>

---

## ✨ Features

### 🎨 Design & UI
- **Editorial Magazine Layout** - Clean, modern design inspired by high-end publications
- **Amber Minimal Theme** - Beautiful color palette with HSL-based theming
- **Dark Mode Support** - Seamless theme switching with persistent preferences
- **Afacad Flux Typography** - Modern, readable font for content
- **Fully Responsive** - Mobile-first design that works on all devices
- **Rounded Corners** - Smooth, modern UI elements with consistent border radius

### 🔐 Authentication System
- User registration with password strength validation
- Secure login with "Remember Me" functionality
- Protected routes for authenticated users
- User profile management
- Avatar support with fallback initials
- Session persistence with localStorage

### 📚 Blog Management
- **Create & Edit Posts** - Rich blog editor with auto-save
- **Draft System** - Save posts as drafts before publishing
- **Categories & Tags** - Organize content effectively
- **Cover Images** - Upload and display featured images
- **View Counter** - Track post engagement
- **Search & Filter** - Find posts by status, search, and sort
- **Slug Generation** - SEO-friendly URLs

### 👤 User Features
- **Personal Dashboard** - View stats and recent activity
- **My Blogs** - Manage all your posts in one place
- **Settings Page** - Customize profile, account, and preferences
- **Blog Analytics** - Track views, published posts, and drafts

### 🛠️ Technical Features
- **React 18** with TypeScript for type safety
- **Context API** for state management
- **React Router v6** for navigation
- **shadcn/ui** component library
- **Tailwind CSS** for styling
- **Vite** for blazing-fast development
- **ESLint** for code quality

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16.x or higher
- **npm** or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Blazehue/BLOG.git
   cd BLOG
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
BLOG/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Header.tsx    # Navigation header
│   │   ├── Footer.tsx    # Footer component
│   │   ├── BlogCard.tsx  # Blog post card
│   │   ├── theme-provider.tsx  # Dark mode provider
│   │   └── ProtectedRoute.tsx  # Auth guard
│   ├── contexts/         # React Context providers
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── BlogContext.tsx     # Blog post management
│   ├── pages/            # Application pages
│   │   ├── Index.tsx           # Home page
│   │   ├── BlogPost.tsx        # Single post view
│   │   ├── Login.tsx           # Login page
│   │   ├── Register.tsx        # Registration page
│   │   ├── Dashboard.tsx       # User dashboard
│   │   ├── MyBlogs.tsx         # Blog management
│   │   ├── CreateBlog.tsx      # Create new post
│   │   ├── EditBlog.tsx        # Edit existing post
│   │   ├── Settings.tsx        # User settings
│   │   └── NotFound.tsx        # 404 page
│   ├── data/             # Sample data
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── package.json
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

---

## 🎯 Usage

### Creating an Account

1. Navigate to the **Sign Up** page
2. Fill in your details (username, email, full name, password)
3. Password strength indicator helps you create a secure password
4. Accept terms and conditions
5. Click **Create Account**

### Writing a Blog Post

1. **Login** to your account
2. Click **Dashboard** or **My Blogs** from the header
3. Click **Create Blog Post**
4. Add a **cover image** (optional)
5. Write your **title**, **excerpt**, and **content**
6. Select a **category** and add **tags**
7. Choose to **Save Draft** or **Publish**

### Managing Posts

- View all posts in **My Blogs**
- Filter by status (All, Published, Drafts, Scheduled)
- Search posts by title
- Sort by date, title, or views
- Edit or delete posts from the action menu

### Dark Mode

Click the sun/moon icon in the header to toggle between light and dark themes. Your preference is saved automatically.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library with hooks and concurrent features |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | High-quality accessible components |
| **React Router** | Client-side routing |
| **Lucide Icons** | Beautiful icon library |
| **date-fns** | Date formatting and manipulation |
| **next-themes** | Dark mode implementation |

---

## 🎨 Design System

### Colors

The project uses an **amber-minimal** color palette with HSL format:

- **Primary**: `40 96% 65%` (Amber)
- **Background**: `0 0% 100%` (Light) / `0 0% 8%` (Dark)
- **Foreground**: `0 0% 10%` (Light) / `0 0% 95%` (Dark)

### Typography

- **Sans-serif**: Afacad Flux (400, 500, 600, 700)
- **Serif**: Source Serif 4 (for headings)
- **Monospace**: JetBrains Mono (for code)

### Border Radius

- `sm`: `calc(0.75rem - 4px)`
- `md`: `calc(0.75rem - 2px)`
- `lg`: `0.75rem`
- `xl`: `calc(0.75rem + 4px)`
- `2xl`: `1rem`
- `3xl`: `1.5rem`

---

## 📝 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Optional: Add your configuration here
VITE_APP_NAME=BLOG
```

### Tailwind Configuration

Customize colors, fonts, and spacing in `tailwind.config.ts`.

### Theme Configuration

Modify CSS variables in `src/index.css` to change the theme colors.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Write clean, self-documenting code
- Test thoroughly before submitting PR
- Follow the existing code style

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first framework
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Vite](https://vitejs.dev/) for the blazing-fast build tool
- [React](https://react.dev/) team for the excellent library

---

## 📧 Contact

**Blazehue** - [@Blazehue](https://github.com/Blazehue)

Project Link: [https://github.com/Blazehue/BLOG](https://github.com/Blazehue/BLOG)

---

## 🗺️ Roadmap

- [ ] Backend API integration
- [ ] Comment system
- [ ] Like/reaction system
- [ ] User profiles (public view)
- [ ] Rich text editor (Markdown/WYSIWYG)
- [ ] Image uploads to cloud storage
- [ ] Email notifications
- [ ] Social sharing
- [ ] RSS feed
- [ ] Search with full-text indexing
- [ ] Categories page
- [ ] Tags page
- [ ] Author pages
- [ ] Analytics dashboard with charts

---

<div align="center">

Made with ❤️ by [Blazehue](https://github.com/Blazehue)
Rest API functionalities to be added soon.
⭐ Star this repo if you find it helpful!

</div>
