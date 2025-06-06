
import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { DataContextProvider } from "@/contexts/DataContext";
import { BlogContextProvider, useBlog } from "@/contexts/BlogContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPost from "@/components/blog/BlogPost";

const BlogPostContent = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, loading } = useBlog();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <BlogPost 
          post={post} 
          onBack={() => window.history.back()} 
        />
      </main>
      <Footer />
    </div>
  );
};

const BlogPostPage = () => {
  return (
    <DataContextProvider>
      <BlogContextProvider>
        <BlogPostContent />
      </BlogContextProvider>
    </DataContextProvider>
  );
};

export default BlogPostPage;
