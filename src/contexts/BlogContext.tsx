
import React, { createContext, useContext, useState, useEffect } from "react";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string[];
  category: string;
  featured: boolean;
  readTime: number;
  slug: string;
}

interface BlogContextType {
  posts: BlogPost[];
  loading: boolean;
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  addPost: (post: Omit<BlogPost, 'id' | 'publishedAt' | 'readTime'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPostBySlug: (slug: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "My Journey from Beginner to Full Stack Developer",
    content: `# My Journey from Beginner to Full Stack Developer

When I first started coding, I never imagined I'd be building complex web applications with modern technologies. Here's my story...

## The Beginning

It all started in 2022 when I wrote my first "Hello World" in Python. The feeling of creating something from nothing was incredible.

## Learning React

Moving to React was a game-changer. The component-based architecture made so much sense...

## Backend Development

Understanding servers, databases, and APIs opened up a whole new world of possibilities...

## Current Projects

Today, I'm working on exciting projects that combine all these skills...`,
    excerpt: "A personal reflection on my coding journey from first Hello World to building full-stack applications.",
    author: "Pranay Dodiya",
    publishedAt: "2024-05-15",
    tags: ["Personal", "Journey", "Learning", "Full Stack"],
    category: "Personal",
    featured: true,
    readTime: 5,
    slug: "my-coding-journey"
  },
  {
    id: "2",
    title: "Building Interactive 3D Portfolio with Three.js",
    content: `# Building Interactive 3D Portfolio with Three.js

Learn how to add stunning 3D elements to your portfolio using React Three Fiber...

## Why 3D?

In today's competitive market, standing out is crucial...

## Getting Started with React Three Fiber

React Three Fiber makes Three.js accessible to React developers...

## Performance Considerations

3D elements can be heavy, here's how to optimize...`,
    excerpt: "A comprehensive guide to adding 3D elements to your portfolio using React Three Fiber and Three.js.",
    author: "Pranay Dodiya",
    publishedAt: "2024-05-10",
    tags: ["Three.js", "React", "3D", "Portfolio", "Tutorial"],
    category: "Tutorial",
    featured: true,
    readTime: 8,
    slug: "3d-portfolio-threejs"
  },
  {
    id: "3",
    title: "Advanced React Patterns for Better Code Organization",
    content: `# Advanced React Patterns for Better Code Organization

As your React applications grow, proper code organization becomes crucial...

## Component Composition

Breaking down complex components into smaller, reusable pieces...

## Custom Hooks

Creating reusable logic with custom hooks...

## Context API Best Practices

When and how to use React Context effectively...`,
    excerpt: "Learn advanced React patterns to write cleaner, more maintainable code in your applications.",
    author: "Pranay Dodiya",
    publishedAt: "2024-05-05",
    tags: ["React", "Patterns", "Code Organization", "Best Practices"],
    category: "Tutorial",
    featured: false,
    readTime: 12,
    slug: "advanced-react-patterns"
  }
];

export const BlogContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const savedPosts = localStorage.getItem("portfolio_blog_posts");
    return savedPosts ? JSON.parse(savedPosts) : defaultPosts;
  });
  
  const [loading, setLoading] = useState(true);

  // Save posts to localStorage when they change
  useEffect(() => {
    localStorage.setItem("portfolio_blog_posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const addPost = (postData: Omit<BlogPost, 'id' | 'publishedAt' | 'readTime'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: calculateReadTime(postData.content),
      slug: postData.slug || createSlug(postData.title)
    };
    
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: string, postData: Partial<BlogPost>) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { 
            ...post, 
            ...postData,
            readTime: postData.content ? calculateReadTime(postData.content) : post.readTime,
            slug: postData.title ? createSlug(postData.title) : post.slug
          }
        : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPostBySlug = (slug: string) => {
    return posts.find(post => post.slug === slug);
  };

  const value = {
    posts,
    loading,
    setPosts,
    addPost,
    updatePost,
    deletePost,
    getPostBySlug
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogContextProvider");
  }
  return context;
};
