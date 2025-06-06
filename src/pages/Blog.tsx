import { DataContextProvider } from "@/contexts/DataContext";
import { BlogContextProvider, useBlog } from "@/contexts/BlogContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BlogContent = () => {
  const { posts, loading } = useBlog();
  const navigate = useNavigate();

  const handleBlogCardClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
          <h1 className="text-4xl font-bold gradient-text">Blog</h1>
          <p className="text-muted-foreground mt-2">
            Thoughts, tutorials, and insights about web development
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={() => handleBlogCardClick(post.slug)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Blog = () => {
  return (
    <DataContextProvider>
      <BlogContextProvider>
        <BlogContent />
      </BlogContextProvider>
    </DataContextProvider>
  );
};

export default Blog;
