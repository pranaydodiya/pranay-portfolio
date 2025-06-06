
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useData, Project } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const ProjectsAdmin = () => {
  const { projects, setProjects } = useData();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>({
    id: "",
    title: "",
    description: "",
    technologies: [],
    image: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });

  const handleAddNewClick = () => {
    setIsEditing(false);
    setCurrentProject({
      id: String(Date.now()),
      title: "",
      description: "",
      technologies: [],
      image: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
    });
    setIsDialogOpen(true);
  };

  const handleEditClick = (project: Project) => {
    setIsEditing(true);
    setCurrentProject({...project});
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (projectId: string) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    setProjects(updatedProjects);
    
    toast({
      title: "Project deleted",
      description: "The project has been successfully deleted.",
    });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim());
    setCurrentProject(prev => ({
      ...prev,
      technologies
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setCurrentProject(prev => ({
      ...prev,
      featured: checked
    }));
  };

  const handleDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing project
      const updatedProjects = projects.map(project =>
        project.id === currentProject.id ? currentProject : project
      );
      setProjects(updatedProjects);
      
      toast({
        title: "Project updated",
        description: "The project has been successfully updated.",
      });
    } else {
      // Add new project
      setProjects(prev => [...prev, currentProject]);
      
      toast({
        title: "Project added",
        description: "The new project has been successfully added.",
      });
    }
    
    handleDialogClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Manage Projects</h3>
        <Button onClick={handleAddNewClick}>Add New Project</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No projects found. Add your first project to get started.
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      {project.technologies.slice(0, 3).join(", ")}
                      {project.technologies.length > 3 && "..."}
                    </TableCell>
                    <TableCell>
                      {project.featured ? (
                        <span className="text-green-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(project)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(project.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Project" : "Add New Project"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleDialogSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={currentProject.title}
                  onChange={handleInputChange}
                  required
                  placeholder="E-commerce Website"
                />
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="featured" 
                    checked={currentProject.featured}
                    onCheckedChange={handleSwitchChange}
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    Featured Project
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={currentProject.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="A brief description of your project..."
              />
            </div>

            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-1">
                Technologies (comma-separated)
              </label>
              <Input
                id="technologies"
                name="technologies"
                value={currentProject.technologies.join(", ")}
                onChange={handleTechnologiesChange}
                required
                placeholder="React.js, Node.js, MongoDB"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <Input
                id="image"
                name="image"
                value={currentProject.image}
                onChange={handleInputChange}
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Live Demo URL
                </label>
                <Input
                  id="liveUrl"
                  name="liveUrl"
                  value={currentProject.liveUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Repository URL
                </label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={currentProject.githubUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Save Changes" : "Add Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsAdmin;
