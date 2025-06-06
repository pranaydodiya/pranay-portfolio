
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useMediaQuery } from "@/hooks/use-media-query";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  
  useEffect(() => {
    // Check local storage first, then system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, [prefersDark]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <Toggle 
      variant="outline" 
      size="icon" 
      pressed={theme === "dark"} 
      onPressedChange={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full bg-background border-primary/20 transition-all duration-300 hover:scale-110"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-yellow-200 animate-in fade-in duration-300" />
      ) : (
        <Sun className="h-4 w-4 text-amber-500 animate-in fade-in duration-300" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
