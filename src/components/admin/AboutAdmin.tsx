
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useData, AboutInfo } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";

const AboutAdmin = () => {
  const { about, setAbout } = useData();
  const { toast } = useToast();

  // Initialize with default values or existing about data
  const [formData, setFormData] = useState<AboutInfo>({
    name: about?.name || "",
    role: about?.role || "",
    bio: about?.bio || "",
    resumeUrl: about?.resumeUrl || "",
    contactEmail: about?.contactEmail || "",
    socialLinks: {
      github: about?.socialLinks?.github || "",
      linkedin: about?.socialLinks?.linkedin || "",
      leetcode: about?.socialLinks?.leetcode || "",
      hackerrank: about?.socialLinks?.hackerrank || "",
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'socialLinks') {
        setFormData(prev => {
          return {
            ...prev,
            socialLinks: {
              ...prev.socialLinks,
              [child]: value
            }
          };
        });
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAbout(formData);
    
    toast({
      title: "About information updated",
      description: "Your about information has been successfully updated.",
      variant: "default"  // Changed from "success" to "default"
    });
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      resumeUrl: value
    }));
    
    // Show toast when resume URL is added
    if (value && value !== about?.resumeUrl) {
      toast({
        title: "Resume URL added",
        description: "Make sure the URL is directly downloadable for best results.",
      });
    }
  };

  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role/Position
                </label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                required
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Resume URL
              </label>
              <Input
                id="resumeUrl"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleResumeChange}
                placeholder="https://example.com/resume.pdf"
                className="dark:bg-gray-700 dark:text-white"
              />
              <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                Add a direct link to your downloadable PDF resume
              </p>
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Email
              </label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="dark:bg-gray-700 dark:text-white"
              />
            </div>

            <h3 className="font-medium text-lg mt-6 mb-2 dark:text-white">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="socialLinks.github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub
                </label>
                <Input
                  id="socialLinks.github"
                  name="socialLinks.github"
                  value={formData.socialLinks.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="socialLinks.linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  LinkedIn
                </label>
                <Input
                  id="socialLinks.linkedin"
                  name="socialLinks.linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="socialLinks.leetcode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  LeetCode
                </label>
                <Input
                  id="socialLinks.leetcode"
                  name="socialLinks.leetcode"
                  value={formData.socialLinks.leetcode}
                  onChange={handleChange}
                  placeholder="https://leetcode.com/username"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="socialLinks.hackerrank" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  HackerRank
                </label>
                <Input
                  id="socialLinks.hackerrank"
                  name="socialLinks.hackerrank"
                  value={formData.socialLinks.hackerrank}
                  onChange={handleChange}
                  placeholder="https://hackerrank.com/username"
                  className="dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutAdmin;
