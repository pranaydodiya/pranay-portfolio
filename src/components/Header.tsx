
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { about } = useData();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = ["hero", "about", "skills", "projects", "certifications", "contact"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Enhanced smooth scroll function with easing
  const smoothScrollTo = (targetId: string) => {
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      // Custom smooth scroll with easing
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start: number | null = null;
      
      const easeInOutQuart = (t: number): number => {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuart(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };
      
      requestAnimationFrame(animation);
    }
    closeMenu();
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-4 md:px-6 transition-all duration-500 backdrop-blur-md ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/95 py-2 shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => smoothScrollTo('#hero')}
            className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
          >
            {about.name.split(" ")[0]}
          </button>
          
          {/* Admin PD Button */}
          <Button 
            asChild 
            variant="outline" 
            size="sm" 
            className="w-8 h-8 p-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:scale-110 transition-transform duration-300"
          >
            <Link to="/login" className="flex items-center justify-center text-xs font-bold">
              PD
            </Link>
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => smoothScrollTo(link.href)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative group ${
                activeSection === link.href.substring(1)
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                activeSection === link.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </button>
          ))}

          <Button asChild variant="outline" size="sm" className="hover:scale-105 transition-transform duration-300 mx-2">
            <Link to="/blog">Blog</Link>
          </Button>

          <div className="ml-4 flex items-center space-x-3">
            <ThemeToggle />
            
            <Button asChild variant="outline" size="sm" className="hover:scale-105 transition-transform duration-300">
              <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>

            {isAuthenticated && (
              <div className="ml-2">
                <Button asChild variant="default" size="sm" className="hover:scale-105 transition-transform duration-300">
                  <Link to="/admin">Admin</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
          
          <button
            className="text-gray-700 dark:text-gray-300 focus:outline-none transition-transform duration-300 hover:scale-110"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl absolute top-full left-0 right-0 border-b border-gray-200/20 dark:border-gray-700/20 transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="flex flex-col py-4">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => smoothScrollTo(link.href)}
              className={`px-6 py-4 transition-all duration-300 text-left border-l-4 ${
                activeSection === link.href.substring(1)
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-transparent hover:border-blue-500"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.name}
            </button>
          ))}

          <div className="flex flex-col px-6 py-4 space-y-3 border-t border-gray-200 dark:border-gray-700 mt-2">
            <Button asChild variant="outline" size="sm" className="hover:scale-105 transition-transform duration-300">
              <Link to="/blog" onClick={closeMenu}>
                Blog
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="sm" className="hover:scale-105 transition-transform duration-300">
              <a href={about.resumeUrl} onClick={closeMenu} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>

            {isAuthenticated && (
              <Button asChild variant="default" size="sm" className="hover:scale-105 transition-transform duration-300">
                <Link to="/admin" onClick={closeMenu}>
                  Admin
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
