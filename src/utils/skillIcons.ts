
export const getSkillIcon = (skillName: string): string => {
  const name = skillName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Try to match to common technology icons
  const iconMap: Record<string, string> = {
    "html": "html5",
    "css": "css3",
    "js": "javascript",
    "javascript": "javascript",
    "react": "react",
    "reactjs": "react",
    "node": "nodedotjs",
    "nodejs": "nodedotjs",
    "express": "express",
    "expressjs": "express",
    "php": "php",
    "java": "java",
    "c": "c",
    "cpp": "cplusplus",
    "mongodb": "mongodb",
    "mysql": "mysql",
    "postgresql": "postgresql",
    "firebase": "firebase",
    "github": "github",
    "git": "git",
    "tailwind": "tailwindcss",
    "tailwindcss": "tailwindcss",
    "bootstrap": "bootstrap",
    "redux": "redux",
    "typescript": "typescript",
    "ts": "typescript",
    "api": "swagger",
    "restapi": "swagger",
    "restfulapi": "swagger",
    "seo": "googlesearchconsole",
    "devops": "docker",
  };

  const iconName = iconMap[name] || name;
  return `https://cdn.simpleicons.org/${iconName}/444`;
};
