
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, X, Filter } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useBlog } from '@/contexts/BlogContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  type: 'project' | 'skill' | 'blog' | 'certification';
  content: string;
  tags?: string[];
  url?: string;
}

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const { projects, skills, certifications } = useData();
  const { posts } = useBlog();
  const { t } = useLanguage();

  const filters = ['project', 'skill', 'blog', 'certification'];

  // Create searchable content
  const searchableContent: SearchResult[] = [
    ...projects.map(project => ({
      id: project.id,
      title: project.title,
      type: 'project' as const,
      content: project.description,
      tags: project.technologies,
      url: `#projects`
    })),
    ...skills.map(skill => ({
      id: skill.name,
      title: skill.name,
      type: 'skill' as const,
      content: skill.category,
      tags: [skill.category],
      url: `#skills`
    })),
    ...posts.map(post => ({
      id: post.id,
      title: post.title,
      type: 'blog' as const,
      content: post.excerpt,
      tags: post.tags,
      url: `/blog/${post.slug}`
    })),
    ...certifications.map(cert => ({
      id: cert.id,
      title: cert.title,
      type: 'certification' as const,
      content: cert.issuer,
      tags: [cert.issuer],
      url: `#certifications`
    }))
  ];

  // Search function
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = searchableContent.filter(item => {
      const matchesQuery = 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()));

      const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(item.type);

      return matchesQuery && matchesFilter;
    });

    setResults(filtered.slice(0, 10)); // Limit to 10 results
  }, [query, selectedFilters]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.url?.startsWith('#')) {
      // Scroll to section
      const element = document.querySelector(result.url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (result.url) {
      // Navigate to URL
      window.open(result.url, '_blank');
    }
    onClose();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project': return '🚀';
      case 'skill': return '⚡';
      case 'blog': return '📝';
      case 'certification': return '🏆';
      default: return '📄';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        className="w-full max-w-2xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="shadow-2xl">
          <CardContent className="p-0">
            {/* Search Header */}
            <div className="p-4 border-b flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className="border-0 focus-visible:ring-0 text-lg"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-3 border-b bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex flex-wrap gap-2">
                    {filters.map(filter => (
                      <Badge
                        key={filter}
                        variant={selectedFilters.includes(filter) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleFilter(filter)}
                      >
                        {getTypeIcon(filter)} {filter}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <div className="p-2">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{getTypeIcon(result.type)}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{result.title}</h4>
                          <p className="text-sm text-muted-foreground truncate">{result.content}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {result.type}
                            </Badge>
                            {result.tags?.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No results found for "{query}"</p>
                  <p className="text-sm mt-1">Try different keywords or adjust filters</p>
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start typing to search...</p>
                  <p className="text-sm mt-1">Projects • Skills • Blog Posts • Certifications</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdvancedSearch;
