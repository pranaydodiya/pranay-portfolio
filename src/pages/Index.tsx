
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import PortfolioChatbot from "@/components/PortfolioChatbot";
import AdvancedSearch from "@/components/AdvancedSearch";
import Timeline from "@/components/Timeline";
import { DataContextProvider } from "@/contexts/DataContext";
import { BlogContextProvider } from "@/contexts/BlogContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const { trackPageView, trackSectionView } = useAnalytics();

  useEffect(() => {
    // Track page view
    trackPageView();

    // Initialize theme on first load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    
    // Enhanced scroll handling with modern animations
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalScroll;
      setScrollProgress(currentProgress);
      
      // Modern section reveal animations
      const sections = document.querySelectorAll("section");
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        
        if (isVisible && !section.classList.contains("animate-fade-in")) {
          // Track section view
          const sectionId = section.id;
          if (sectionId) {
            trackSectionView(sectionId);
          }
          
          setTimeout(() => {
            section.classList.add("animate-fade-in");
            (section as HTMLElement).style.opacity = "1";
            (section as HTMLElement).style.transform = "translateY(0)";
          }, index * 100);
        }
      });

      // Enhanced card animations
      const animateElements = document.querySelectorAll(".animate-on-scroll, .scroll-reveal");
      animateElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
        
        if (isVisible && !element.classList.contains("animate-slide-up")) {
          setTimeout(() => {
            element.classList.add("animate-slide-up");
          }, index * 80);
        }
      });

      // Parallax effect for hero section
      const hero = document.querySelector("#hero") as HTMLElement;
      if (hero) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

    // Smooth scroll behavior for navigation links
    const smoothScrollToSection = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const targetSection = document.querySelector(target.hash);
        if (targetSection) {
          const headerHeight = 80;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add smooth scroll behavior to all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', smoothScrollToSection);
    });

    // Optimized scroll event handling with requestAnimationFrame
    let isScrolling = false;
    const throttledScroll = () => {
      if (!isScrolling) {
        requestAnimationFrame(() => {
          handleScroll();
          isScrolling = false;
        });
        isScrolling = true;
      }
    };

    window.addEventListener("scroll", throttledScroll);
    
    // Keyboard shortcut for search (Ctrl/Cmd + K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Initial animation trigger
    setTimeout(handleScroll, 200);
    
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener('keydown', handleKeyDown);
      navLinks.forEach(link => {
        link.removeEventListener('click', smoothScrollToSection);
      });
    };
  }, [trackPageView, trackSectionView]);

  return (
    <DataContextProvider>
      <BlogContextProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300 overflow-x-hidden relative">
          <ScrollAnimations />
          
          <Header />
          
          {/* Floating Search Button */}
          <Button
            onClick={() => setShowSearch(true)}
            className="fixed top-20 right-6 z-40 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border shadow-lg hover:shadow-xl transition-all duration-300"
            size="sm"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
            <kbd className="ml-2 text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">⌘K</kbd>
          </Button>
          
          <main className="relative z-10">
            <div id="hero" className="scroll-reveal">
              <Hero />
            </div>
            <div id="about" className="scroll-reveal">
              <About />
            </div>
            <div className="scroll-reveal">
              <Timeline />
            </div>
            <div id="skills" className="scroll-reveal">
              <Skills />
            </div>
            <div id="projects" className="scroll-reveal">
              <Projects />
            </div>
            <div id="certifications" className="scroll-reveal">
              <Certifications />
            </div>
            <div id="contact" className="scroll-reveal">
              <Contact />
            </div>
          </main>
          <Footer />
          
          {/* Portfolio Chatbot */}
          <PortfolioChatbot />
          
          {/* Advanced Search */}
          <AdvancedSearch 
            isOpen={showSearch} 
            onClose={() => setShowSearch(false)} 
          />
        </div>
      </BlogContextProvider>
    </DataContextProvider>
  );
};

export default Index;
