
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { BlogPost as BlogPostType } from "@/contexts/BlogContext";

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

const BlogPost = ({ post, onBack }: BlogPostProps) => {
  // Simple markdown-to-JSX converter for basic formatting
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold mt-8 mb-4 first:mt-0">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold mt-4 mb-2">
            {line.slice(4)}
          </h3>
        );
      } else if (line.trim() === '') {
        elements.push(<br key={index} />);
      } else {
        elements.push(
          <p key={index} className="mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
    });
    
    return elements;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        onClick={onBack}
        variant="outline" 
        className="mb-6 hover:scale-105 transition-transform"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Button>
      
      <Card className="shadow-lg">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">{post.category}</Badge>
            {post.featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="prose prose-gray dark:prose-invert max-w-none">
          <div className="text-lg leading-relaxed">
            {renderContent(post.content)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPost;
