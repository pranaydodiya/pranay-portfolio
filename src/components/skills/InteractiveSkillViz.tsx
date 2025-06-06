
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const InteractiveSkillViz = () => {
  const { skills } = useData();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categories = ['all', ...Object.keys(skillsByCategory)];
  const displaySkills = selectedCategory === 'all' 
    ? skills 
    : skillsByCategory[selectedCategory] || [];

  // Create a circular layout for skills
  const getCircularPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold gradient-text mb-4">Interactive Skills Universe</h3>
        <p className="text-muted-foreground">Hover over skills to see details • Click categories to filter</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'All Skills' : category}
          </Badge>
        ))}
      </div>

      {/* Skills Visualization */}
      <div className="relative w-full h-96 mx-auto overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="-300 -200 600 400"
          className="absolute inset-0"
        >
          {/* Background circles */}
          <defs>
            <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.1)" />
            </radialGradient>
          </defs>
          
          <circle cx="0" cy="0" r="150" fill="url(#bgGradient)" className="animate-pulse" />
          <circle cx="0" cy="0" r="100" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" className="animate-spin" style={{ animationDuration: '20s' }} />
          <circle cx="0" cy="0" r="200" fill="none" stroke="rgba(147, 51, 234, 0.2)" strokeWidth="1" className="animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

          {/* Skill nodes */}
          <AnimatePresence>
            {displaySkills.map((skill, index) => {
              const position = getCircularPosition(index, displaySkills.length, 120);
              const isHovered = hoveredSkill === skill.name;
              
              return (
                <motion.g
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isHovered ? 1.5 : 1,
                    x: position.x,
                    y: position.y
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    delay: index * 0.05 
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="cursor-pointer"
                >
                  {/* Skill circle */}
                  <circle
                    r={isHovered ? "25" : "15"}
                    fill={`hsl(${(skill.level / 100) * 120}, 70%, 50%)`}
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  
                  {/* Skill level indicator */}
                  <circle
                    r={isHovered ? "20" : "12"}
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray={`${(skill.level / 100) * 75.4} 75.4`}
                    transform="rotate(-90)"
                    className="transition-all duration-300"
                  />
                  
                  {/* Skill icon/letter */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize={isHovered ? "12" : "8"}
                    fontWeight="bold"
                    className="transition-all duration-300"
                  >
                    {skill.name.charAt(0).toUpperCase()}
                  </text>
                </motion.g>
              );
            })}
          </AnimatePresence>
        </svg>

        {/* Skill details overlay */}
        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            >
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  {(() => {
                    const skill = displaySkills.find(s => s.name === hoveredSkill);
                    return skill ? (
                      <>
                        <h4 className="font-bold text-lg">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{skill.category}</p>
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <span className="text-sm font-medium">{skill.level}%</span>
                        </div>
                      </>
                    ) : null;
                  })()}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveSkillViz;
