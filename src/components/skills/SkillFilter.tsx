
import { motion } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface SkillFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const SkillFilter = ({ categories, selectedCategory, setSelectedCategory }: SkillFilterProps) => {
  return (
    <div className="mb-8">
      <ToggleGroup 
        type="single" 
        value={selectedCategory}
        onValueChange={(value) => {
          if (value) setSelectedCategory(value);
        }}
        className="justify-center mb-6 flex-wrap gap-2"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <ToggleGroupItem 
              value={category}
              className="capitalize"
              variant={selectedCategory === category ? "primary" : "soft"}
            >
              {category === "all" ? "All Skills" : category}
            </ToggleGroupItem>
          </motion.div>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default SkillFilter;
