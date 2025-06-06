
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SkillsAdmin from "@/components/admin/SkillsAdmin";
import ProjectsAdmin from "@/components/admin/ProjectsAdmin";
import CertificationsAdmin from "@/components/admin/CertificationsAdmin";
import AboutAdmin from "@/components/admin/AboutAdmin";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import BlogAdmin from "@/components/admin/BlogAdmin";
import { DataContextProvider } from "@/contexts/DataContext";
import { BlogContextProvider } from "@/contexts/BlogContext";
import { Moon, Sun, LogOut } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const { logout } = useAuth();

  const handleBackToSite = () => {
    window.location.href = "/";
  };

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <DataContextProvider>
      <BlogContextProvider>
        <div className="min-h-screen bg-background dark:bg-gray-900 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold gradient-text">Portfolio Admin</h1>
                <p className="text-muted-foreground dark:text-gray-400 mt-1">Manage your portfolio content and analytics</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </div>
                <Button onClick={handleLogout} variant="outline">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
                <Button onClick={handleBackToSite} variant="outline">
                  Back to Portfolio
                </Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="blog">Blog</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="analytics" className="space-y-4">
                  <AnalyticsDashboard />
                </TabsContent>
                
                <TabsContent value="blog" className="space-y-4">
                  <BlogAdmin />
                </TabsContent>
                
                <TabsContent value="about" className="space-y-4">
                  <AboutAdmin />
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-4">
                  <SkillsAdmin />
                </TabsContent>
                
                <TabsContent value="projects" className="space-y-4">
                  <ProjectsAdmin />
                </TabsContent>
                
                <TabsContent value="certifications" className="space-y-4">
                  <CertificationsAdmin />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </BlogContextProvider>
    </DataContextProvider>
  );
};

export default Admin;
