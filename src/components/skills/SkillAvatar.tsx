
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SkillAvatar = () => {
  return (
    <motion.div 
      className="mt-8"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Avatar className="h-24 w-24 border-2 border-primary/20 shadow-lg">
        <AvatarImage 
          src="https://avatars.githubusercontent.com/u/pranaydodiya" 
          alt="Pranay Dodiya"
          onError={(e) => {
            // Fallback to UI Avatars if GitHub avatar fails
            (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Pranay+Dodiya&background=random&size=200&bold=true";
          }}
        />
        <AvatarFallback className="bg-primary/10 text-xl font-bold">PD</AvatarFallback>
      </Avatar>
    </motion.div>
  );
};

export default SkillAvatar;
