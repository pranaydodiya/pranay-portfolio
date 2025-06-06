
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface AboutInfo {
  name: string;
  role: string;
  bio: string;
  resumeUrl: string;
  contactEmail: string;
  socialLinks: {
    github: string;
    linkedin: string;
    leetcode: string;
    hackerrank: string;
  };
}

interface DataContextType {
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  about: AboutInfo;
  loading: boolean;
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setCertifications: React.Dispatch<React.SetStateAction<Certification[]>>;
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  setAbout: React.Dispatch<React.SetStateAction<AboutInfo>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Default data
const defaultAbout: AboutInfo = {
  name: "Pranay Dodiya",
  role: "Full Stack Developer",
  bio: "I am a passionate Full Stack Developer with experience in building web applications using modern technologies. I specialize in React.js, Node.js, and database management with MongoDB and MySQL. I'm also experienced in working with Gen AI projects.",
  resumeUrl: "#",
  contactEmail: "pranaydodiya2005@gmail.com",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    leetcode: "https://leetcode.com",
    hackerrank: "https://www.hackerrank.com"
  }
};

const defaultSkills: Skill[] = [
  { id: "1", name: "React.js", level: 90, category: "Frontend" },
  { id: "2", name: "Node.js", level: 85, category: "Backend" },
  { id: "3", name: "Express.js", level: 85, category: "Backend" },
  { id: "4", name: "MongoDB", level: 80, category: "Database" },
  { id: "5", name: "MySQL", level: 75, category: "Database" },
  { id: "6", name: "Firebase", level: 70, category: "Database" },
  { id: "7", name: "Redux", level: 80, category: "Frontend" },
  { id: "8", name: "Tailwind CSS", level: 90, category: "Frontend" },
  { id: "9", name: "Java", level: 65, category: "Programming" },
  { id: "10", name: "C++", level: 70, category: "Programming" },
  { id: "11", name: "PHP", level: 60, category: "Backend" },
  { id: "12", name: "Gen AI", level: 75, category: "AI" }
];

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Uber Full-Stack Clone",
    description: "A scalable ride-sharing platform built with React.js, Node.js, Express.js, MongoDB, and Google Maps API. Features include real-time ride tracking, dynamic pricing, and Stripe payment integration.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Google Maps API", "Stripe", "JWT"],
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2940&auto=format&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: "2",
    title: "E-commerce MERN Store",
    description: "Developed a feature-rich MERN stack e-commerce platform with full user and admin functionalities. Implemented product management, cart system, and payment processing via Stripe API.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2940&auto=format&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: "3",
    title: "Online Learning Platform",
    description: "A comprehensive learning platform allowing users to upload courses, take quizzes, and track progress. Built a robust backend with Node.js and MongoDB, ensuring fast content delivery.",
    technologies: ["Node.js", "MongoDB", "Express.js", "React.js", "JWT"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2574&auto=format&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  },
  {
    id: "4",
    title: "GenAI Chatbot Assistant",
    description: "Developed an AI-powered chatbot capable of natural language understanding and task automation. Integrated with various APIs for enhanced functionality and user experience.",
    technologies: ["Python", "TensorFlow", "React.js", "FastAPI", "OpenAI"],
    image: "https://images.unsplash.com/photo-1677442135156-e0fdfb4d696a?q=80&w=2940&auto=format&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: false
  }
];

const defaultCertifications: Certification[] = [
  {
    id: "1",
    title: "Software Engineer Intern",
    issuer: "HackerRank",
    date: "2023",
    url: "#"
  },
  {
    id: "2",
    title: "MERN Stack Development",
    issuer: "Udemy",
    date: "2023",
    url: "#"
  },
  {
    id: "3",
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata Forage",
    date: "2022",
    url: "#"
  },
  {
    id: "4",
    title: "Technology Apprenticeship Job Simulation",
    issuer: "Accenture",
    date: "2022",
    url: "#"
  }
];

const defaultAchievements: Achievement[] = [
  {
    id: "1",
    title: "CodeChef Starter147d AIR 75",
    description: "Achieved All India Rank 75 in CodeChef Starter competition"
  },
  {
    id: "2",
    title: "LeetCode Weekly140 Rank 200",
    description: "Ranked 200 in LeetCode Weekly Challenge"
  },
  {
    id: "3",
    title: "Winner of College SIH Hackathon",
    description: "First prize in Smart India Hackathon internal competition"
  },
  {
    id: "4",
    title: "State-Level Table Tennis Player",
    description: "Represented district in state-level table tennis championship"
  },
  {
    id: "5",
    title: "Flipkart Grid 6.0 Level 2 Qualified",
    description: "Selected for Level 2 of Flipkart Grid competition"
  }
];

export const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [skills, setSkills] = useState<Skill[]>(() => {
    const savedSkills = localStorage.getItem("portfolio_skills");
    return savedSkills ? JSON.parse(savedSkills) : defaultSkills;
  });
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("portfolio_projects");
    return savedProjects ? JSON.parse(savedProjects) : defaultProjects;
  });
  
  const [certifications, setCertifications] = useState<Certification[]>(() => {
    const savedCertifications = localStorage.getItem("portfolio_certifications");
    return savedCertifications ? JSON.parse(savedCertifications) : defaultCertifications;
  });
  
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const savedAchievements = localStorage.getItem("portfolio_achievements");
    return savedAchievements ? JSON.parse(savedAchievements) : defaultAchievements;
  });
  
  const [about, setAbout] = useState<AboutInfo>(() => {
    const savedAbout = localStorage.getItem("portfolio_about");
    return savedAbout ? JSON.parse(savedAbout) : defaultAbout;
  });
  
  const [loading, setLoading] = useState(true);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("portfolio_skills", JSON.stringify(skills));
  }, [skills]);
  
  useEffect(() => {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  }, [projects]);
  
  useEffect(() => {
    localStorage.setItem("portfolio_certifications", JSON.stringify(certifications));
  }, [certifications]);
  
  useEffect(() => {
    localStorage.setItem("portfolio_achievements", JSON.stringify(achievements));
  }, [achievements]);
  
  useEffect(() => {
    localStorage.setItem("portfolio_about", JSON.stringify(about));
  }, [about]);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  const value = {
    skills,
    projects,
    certifications,
    achievements,
    about,
    loading,
    setSkills,
    setProjects,
    setCertifications,
    setAchievements,
    setAbout
  };
  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataContextProvider");
  }
  return context;
};
