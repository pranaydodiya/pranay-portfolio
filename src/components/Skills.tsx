import { useEffect, useRef, useState } from "react";
import { useData } from "@/contexts/DataContext";
import { motion } from "framer-motion";
import SkillCategory from "./skills/SkillCategory";
import SkillFilter from "./skills/SkillFilter";
import SkillAvatar from "./skills/SkillAvatar";
import InteractiveSkillViz from "./skills/InteractiveSkillViz";
import { mainCategories, mapSkillsToCategories } from "./skills/SkillCategoryConfig";
import { getSkillIcon } from "@/utils/skillIcons";

const Skills = () => {
  const { skills } = useData();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'traditional' | 'interactive'>('traditional');
  
  // Map skills to main categories
  const skillsByMainCategory = mapSkillsToCategories(skills);
  
  const categories = ["all", ...Object.keys(mainCategories)];

  // Filter skills based on selected category
  const displayedCategories = selectedCategory === "all" 
    ? Object.keys(mainCategories) 
    : [selectedCategory];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          
          // Add staggered animation to skill categories
          const categories = entry.target.querySelectorAll(".skill-category");
          categories.forEach((category, index) => {
            setTimeout(() => {
              category.classList.add("animate-slide-up");
            }, index * 200);
          });
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="section-padding px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-0 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 opacity-30 animate-pulse-glow"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-float">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-portfolio-blue to-portfolio-purple rounded-full mb-8 animate-pulse-glow"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl text-lg leading-relaxed animate-slide-up">
            I specialize in building modern, responsive web applications with a focus on performance and user experience.
          </p>
          
          <SkillAvatar />

          {/* View mode toggle */}
          <div className="mt-6 flex gap-2">
            <button
              onClick={() => setViewMode('traditional')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'traditional' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Traditional View
            </button>
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-4 py-2 rounded-lg transition-all ${
                viewMode === 'interactive' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Interactive View
            </button>
          </div>
        </motion.div>

        {viewMode === 'traditional' ? (
          <>
            <div className="animate-on-scroll">
              <SkillFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            <div className="space-y-16">
              {displayedCategories.map((category, index) => {
                const { icon, color } = mainCategories[category];
                return (
                  <div 
                    key={category} 
                    className="skill-category animate-on-scroll opacity-0"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <SkillCategory
                      category={category}
                      skills={skillsByMainCategory[category]}
                      Icon={icon}
                      color={color}
                      getSkillIcon={getSkillIcon}
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="animate-on-scroll">
            <InteractiveSkillViz />
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
