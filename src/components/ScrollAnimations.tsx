
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimations = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Enhanced scroll reveal animations using GSAP ScrollTrigger
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    revealElements.forEach((element, index) => {
      gsap.fromTo(element, 
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.1
        }
      );
    });

    // Animate cards and elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.05
        }
      );
    });

    // Enhanced scroll progress tracking
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsVisible(currentScrollY > 100);

      // Floating animation based on scroll position
      const floatingElements = document.querySelectorAll('.float-on-scroll');
      floatingElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(currentScrollY * parseFloat(speed as string));
        gsap.set(element, { y: yPos });
      });
    };

    // Throttled scroll event
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Enhanced Scroll Progress Bar */}
      <div 
        className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transition-all duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          width: `${Math.min(100, (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`,
          boxShadow: `0 0 20px rgba(99, 102, 241, ${isVisible ? 0.8 : 0})`,
        }}
      />

      {/* Enhanced Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl float-on-scroll animate-pulse"
          data-speed="0.3"
          style={{ top: '20%', left: '10%' }}
        />
        <div 
          className="absolute w-48 h-48 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl float-on-scroll animate-pulse"
          data-speed="0.5"
          style={{ top: '60%', right: '15%' }}
        />
        <div 
          className="absolute w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl float-on-scroll animate-pulse"
          data-speed="0.7"
          style={{ bottom: '30%', left: '20%' }}
        />
      </div>

      {/* Enhanced Scroll Indicator */}
      {isVisible && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="flex flex-col space-y-3">
            {['hero', 'about', 'skills', 'projects', 'certifications', 'contact'].map((section, index) => (
              <div
                key={section}
                className="w-2 h-8 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-500 transition-all duration-300 hover:scale-110"
                onClick={() => {
                  const element = document.getElementById(section);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <div 
                  className="w-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ 
                    height: `${Math.min(100, Math.max(0, 
                      (scrollY - (window.innerHeight * index * 0.8)) / (window.innerHeight * 0.8) * 100
                    ))}%` 
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ScrollAnimations;
