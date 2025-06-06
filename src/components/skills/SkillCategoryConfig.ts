
import { Code2, Server, Database, Workflow } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CategoryConfig {
  icon: LucideIcon;
  color: string;
}

interface MainCategories {
  [key: string]: CategoryConfig;
}

export const mainCategories: MainCategories = {
  "Frontend": { icon: Code2, color: "text-blue-500 dark:text-blue-400" },
  "Backend": { icon: Server, color: "text-green-500 dark:text-green-400" },
  "Databases": { icon: Database, color: "text-amber-500 dark:text-amber-400" },
  "Tools & Other": { icon: Workflow, color: "text-purple-500 dark:text-purple-400" }
};

export const mapSkillsToCategories = (skills: any[]) => {
  return {
    "Frontend": skills.filter(skill => 
      ["HTML", "CSS", "JavaScript", "React.js", "Redux", "Bootstrap", "Tailwind CSS"].includes(skill.name) ||
      skill.category === "Frontend"),
    "Backend": skills.filter(skill => 
      ["Node.js", "Express.js", "PHP", "Java", "C++"].includes(skill.name) ||
      skill.category === "Backend"),
    "Databases": skills.filter(skill => 
      ["MongoDB", "MySQL", "PostgreSQL", "Firebase"].includes(skill.name) ||
      skill.category === "Database"),
    "Tools & Other": skills.filter(skill => 
      ["GitHub", "SEO", "DevOps", "API Integration", "RESTful APIs"].includes(skill.name) ||
      (skill.category !== "Frontend" && skill.category !== "Backend" && skill.category !== "Database"))
  };
};
