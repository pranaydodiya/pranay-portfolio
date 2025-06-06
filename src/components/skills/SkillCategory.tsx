
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Avatar } from "@/components/ui/avatar";
import { LucideIcon } from "lucide-react";

interface SkillCategoryProps {
  category: string;
  skills: any[];
  Icon: LucideIcon;
  color: string;
  getSkillIcon: (skillName: string) => string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const SkillCategory = ({ category, skills, Icon, color, getSkillIcon }: SkillCategoryProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="flex items-center mb-6">
        <Icon className={`mr-2 ${color}`} size={24} />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category}</h3>
      </div>
      
      <motion.div 
        className="flex flex-wrap gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {skills.map((skill) => (
          <TooltipProvider key={skill.id}>
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-600 shadow-sm">
                  <img 
                    src={getSkillIcon(skill.name)} 
                    alt={skill.name}
                    className="w-8 h-8 object-contain filter dark:brightness-110 dark:contrast-125"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://cdn.simpleicons.org/code/444';
                    }}
                  />
                </div>
                <span className="font-semibold text-base text-gray-800 dark:text-gray-100">{skill.name}</span>
              </div>
            </motion.div>
          </TooltipProvider>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SkillCategory;
