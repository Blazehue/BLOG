import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import blog5 from "@/assets/blog-5.jpg";
import blog6 from "@/assets/blog-6.jpg";
import author1 from "@/assets/author-1.jpg";
import author2 from "@/assets/author-2.jpg";
import author3 from "@/assets/author-3.jpg";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Minimalist Design in Modern Web",
    excerpt: "Exploring how less is more in contemporary web design. Learn the principles of minimalism and how to apply them effectively in your projects.",
    content: `Minimalist design has become increasingly popular in web development, and for good reason. By stripping away unnecessary elements, we create cleaner, more focused user experiences that guide visitors naturally through our content.

The philosophy behind minimalism isn't just about aesthetics—it's about intention. Every element on a page should serve a purpose, whether that's conveying information, facilitating navigation, or driving action.

In this article, we'll explore the core principles of minimalist design and how you can apply them to create stunning, effective websites. We'll look at typography, color theory, white space, and the subtle details that make minimalist designs truly shine.

Key principles include:
- Strategic use of white space
- Limited color palettes
- Clear visual hierarchy
- Purposeful typography
- Focused content

Remember, minimalism doesn't mean boring. It means intentional. Every choice matters when you're working with fewer elements.`,
    image: blog1,
    author: {
      name: "Sarah Johnson",
      avatar: author1
    },
    date: "2024-03-15",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Understanding TypeScript Generics",
    excerpt: "A deep dive into one of TypeScript's most powerful features. Master generics to write more reusable and type-safe code.",
    content: `TypeScript generics are a powerful feature that allows you to write flexible, reusable code while maintaining type safety. They're essential for building scalable applications and libraries.

At their core, generics allow you to create components that work with multiple types rather than a single one. This means you can write functions, classes, and interfaces that are adaptable to different data types while still providing compile-time type checking.

The syntax might seem intimidating at first, but once you understand the fundamentals, you'll find generics invaluable. Let's explore common patterns and practical examples.`,
    image: blog2,
    author: {
      name: "Michael Chen",
      avatar: author2
    },
    date: "2024-03-12",
    readTime: "8 min read"
  },
  {
    id: "3",
    title: "Building Scalable React Applications",
    excerpt: "Best practices and patterns for structuring large-scale React projects. Learn how to organize your codebase for long-term maintainability.",
    content: `As React applications grow, maintaining a clean, organized codebase becomes crucial. This guide covers architectural patterns and best practices that will help your project scale gracefully.

We'll discuss component organization, state management strategies, performance optimization, and testing approaches that work well in large applications. The goal is to create a foundation that supports growth without becoming unwieldy.`,
    image: blog3,
    author: {
      name: "Emma Davis",
      avatar: author3
    },
    date: "2024-03-10",
    readTime: "10 min read"
  },
  {
    id: "4",
    title: "The Future of CSS: What's Coming Next",
    excerpt: "Exploring upcoming CSS features that will change how we style the web. Get ready for container queries, cascade layers, and more.",
    content: `CSS continues to evolve with exciting new features on the horizon. Container queries, cascade layers, and new color functions are just some of the innovations that will transform web styling.

These features address long-standing pain points in CSS and open up new possibilities for responsive, maintainable designs. Let's explore what's coming and how you can prepare.`,
    image: blog4,
    author: {
      name: "Alex Turner",
      avatar: author1
    },
    date: "2024-03-08",
    readTime: "6 min read"
  },
  {
    id: "5",
    title: "Mastering Async JavaScript",
    excerpt: "From callbacks to async/await, understanding asynchronous programming in JavaScript. Build better applications with proper async handling.",
    content: `Asynchronous programming is fundamental to JavaScript, but it can be challenging to master. This comprehensive guide takes you from callbacks through promises to modern async/await syntax.

We'll cover error handling, concurrent operations, and common pitfalls to avoid. By the end, you'll have a solid understanding of async patterns and best practices.`,
    image: blog5,
    author: {
      name: "James Wilson",
      avatar: author2
    },
    date: "2024-03-05",
    readTime: "12 min read"
  },
  {
    id: "6",
    title: "Effective Git Workflows for Teams",
    excerpt: "Collaboration strategies and branching models that keep your team productive. Learn how to manage code with confidence.",
    content: `Git is powerful, but without proper workflows, team collaboration can become chaotic. This guide presents proven strategies for managing branches, handling conflicts, and maintaining a clean history.

We'll explore different branching models, code review practices, and how to choose the right workflow for your team size and project needs.`,
    image: blog6,
    author: {
      name: "Lisa Anderson",
      avatar: author3
    },
    date: "2024-03-01",
    readTime: "7 min read"
  }
];
