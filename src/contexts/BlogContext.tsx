import React, { createContext, useContext, useState, useEffect } from "react";
import { BlogPost } from "@/data/blogPosts";

export type BlogStatus = "draft" | "published" | "scheduled";

export interface ExtendedBlogPost extends BlogPost {
  userId: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  views: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  scheduledAt?: string;
}

interface BlogContextType {
  blogs: ExtendedBlogPost[];
  getUserBlogs: (userId: string) => ExtendedBlogPost[];
  getBlogById: (id: string) => ExtendedBlogPost | undefined;
  getBlogBySlug: (slug: string) => ExtendedBlogPost | undefined;
  createBlog: (blog: Omit<ExtendedBlogPost, "id" | "createdAt" | "updatedAt" | "views">) => ExtendedBlogPost;
  updateBlog: (id: string, updates: Partial<ExtendedBlogPost>) => void;
  deleteBlog: (id: string) => void;
  publishBlog: (id: string) => void;
  unpublishBlog: (id: string) => void;
  incrementViews: (id: string) => void;
  getPublishedBlogs: () => ExtendedBlogPost[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<ExtendedBlogPost[]>([]);

  // Load blogs from localStorage on mount
  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  // Save blogs to localStorage whenever they change
  useEffect(() => {
    if (blogs.length > 0) {
      localStorage.setItem("blogs", JSON.stringify(blogs));
    }
  }, [blogs]);

  const getUserBlogs = (userId: string) => {
    return blogs.filter((blog) => blog.userId === userId);
  };

  const getBlogById = (id: string) => {
    return blogs.find((blog) => blog.id === id);
  };

  const getBlogBySlug = (slug: string) => {
    return blogs.find((blog) => blog.slug === slug);
  };

  const createBlog = (blogData: Omit<ExtendedBlogPost, "id" | "createdAt" | "updatedAt" | "views">) => {
    const newBlog: ExtendedBlogPost = {
      ...blogData,
      id: `blog_${Date.now()}`,
      slug: generateSlug(blogData.title),
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBlogs((prev) => [...prev, newBlog]);
    return newBlog;
  };

  const updateBlog = (id: string, updates: Partial<ExtendedBlogPost>) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id
          ? {
              ...blog,
              ...updates,
              slug: updates.title ? generateSlug(updates.title) : blog.slug,
              updatedAt: new Date().toISOString(),
            }
          : blog
      )
    );
  };

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  const publishBlog = (id: string) => {
    updateBlog(id, { status: "published" });
  };

  const unpublishBlog = (id: string) => {
    updateBlog(id, { status: "draft" });
  };

  const incrementViews = (id: string) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog.id === id ? { ...blog, views: blog.views + 1 } : blog
      )
    );
  };

  const getPublishedBlogs = () => {
    return blogs.filter((blog) => blog.status === "published");
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        getUserBlogs,
        getBlogById,
        getBlogBySlug,
        createBlog,
        updateBlog,
        deleteBlog,
        publishBlog,
        unpublishBlog,
        incrementViews,
        getPublishedBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
