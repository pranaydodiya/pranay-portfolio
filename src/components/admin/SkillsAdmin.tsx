
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useData, Skill } from "@/contexts/DataContext";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SkillsAdmin = () => {
  const { skills, setSkills } = useData();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill>({
    id: "",
    name: "",
    level: 70,
    category: "Frontend",
  });

  // Main categories from resume
  const mainCategories = ["Frontend", "Backend", "Databases", "Tools & Other"];
  const existingCategories = Array.from(new Set(skills.map(skill => skill.category)));
  const allCategories = Array.from(new Set([...mainCategories, ...existingCategories])).sort();

  const handleAddNewClick = () => {
    setIsEditing(false);
    setCurrentSkill({
      id: String(Date.now()),
      name: "",
      level: 70,
      category: "Frontend",
    });
    setIsDialogOpen(true);
  };

  const handleEditClick = (skill: Skill) => {
    setIsEditing(true);
    setCurrentSkill({...skill});
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (skillId: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== skillId);
    setSkills(updatedSkills);
    
    toast({
      title: "Skill deleted",
      description: "The skill has been successfully deleted.",
    });
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentSkill(prev => ({
      ...prev,
      [name]: name === "level" ? Number(value) : value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setCurrentSkill(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleAddNewCategory = () => {
    const newCategory = prompt("Enter a new category name:");
    if (newCategory && newCategory.trim() !== "") {
      setCurrentSkill(prev => ({
        ...prev,
        category: newCategory.trim()
      }));
    }
  };

  const handleDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing skill
      const updatedSkills = skills.map(skill =>
        skill.id === currentSkill.id ? currentSkill : skill
      );
      setSkills(updatedSkills);
      
      toast({
        title: "Skill updated",
        description: "The skill has been successfully updated.",
      });
    } else {
      // Add new skill
      setSkills(prev => [...prev, currentSkill]);
      
      toast({
        title: "Skill added",
        description: "The new skill has been successfully added.",
      });
    }
    
    handleDialogClose();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium">Manage Skills</h3>
        <Button onClick={handleAddNewClick}>Add New Skill</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No skills found. Add your first skill to get started.
                  </TableCell>
                </TableRow>
              ) : (
                skills.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell>{skill.name}</TableCell>
                    <TableCell>{skill.category}</TableCell>
                    <TableCell>{skill.level}%</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(skill)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(skill.id)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Skill" : "Add New Skill"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleDialogSubmit} className="space-y-4 pt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Skill Name
              </label>
              <Input
                id="name"
                name="name"
                value={currentSkill.name}
                onChange={handleInputChange}
                required
                placeholder="React.js"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="flex gap-2">
                <Select
                  value={currentSkill.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="__new__" className="text-blue-500">
                      + Add new category
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" onClick={handleAddNewCategory}>
                  New
                </Button>
              </div>
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                Proficiency Level: {currentSkill.level}%
              </label>
              <Input
                id="level"
                name="level"
                type="range"
                min="0"
                max="100"
                value={currentSkill.level}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Save Changes" : "Add Skill"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SkillsAdmin;
