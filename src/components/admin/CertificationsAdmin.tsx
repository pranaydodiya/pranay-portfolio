
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useData, Certification, Achievement } from "@/contexts/DataContext";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const CertificationsAdmin = () => {
  const { certifications, achievements, setCertifications, setAchievements } = useData();
  const { toast } = useToast();

  // State for certifications form
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [currentCertification, setCurrentCertification] = useState<Certification>({
    id: "",
    title: "",
    issuer: "",
    date: "",
    url: "",
  });

  // State for achievements form
  const [isAchievementDialogOpen, setIsAchievementDialogOpen] = useState(false);
  const [isEditingAchievement, setIsEditingAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement>({
    id: "",
    title: "",
    description: "",
  });

  // Handlers for certifications
  const handleAddCertClick = () => {
    setIsEditingCert(false);
    setCurrentCertification({
      id: String(Date.now()),
      title: "",
      issuer: "",
      date: "",
      url: "",
    });
    setIsCertDialogOpen(true);
  };

  const handleEditCertClick = (cert: Certification) => {
    setIsEditingCert(true);
    setCurrentCertification({...cert});
    setIsCertDialogOpen(true);
  };

  const handleDeleteCertClick = (certId: string) => {
    const updatedCertifications = certifications.filter(cert => cert.id !== certId);
    setCertifications(updatedCertifications);
    
    toast({
      title: "Certification deleted",
      description: "The certification has been successfully deleted.",
    });
  };

  const handleCertDialogClose = () => {
    setIsCertDialogOpen(false);
  };

  const handleCertInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentCertification(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCertDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditingCert) {
      // Update existing certification
      const updatedCertifications = certifications.map(cert =>
        cert.id === currentCertification.id ? currentCertification : cert
      );
      setCertifications(updatedCertifications);
      
      toast({
        title: "Certification updated",
        description: "The certification has been successfully updated.",
      });
    } else {
      // Add new certification
      setCertifications(prev => [...prev, currentCertification]);
      
      toast({
        title: "Certification added",
        description: "The new certification has been successfully added.",
      });
    }
    
    handleCertDialogClose();
  };

  // Handlers for achievements
  const handleAddAchievementClick = () => {
    setIsEditingAchievement(false);
    setCurrentAchievement({
      id: String(Date.now()),
      title: "",
      description: "",
    });
    setIsAchievementDialogOpen(true);
  };

  const handleEditAchievementClick = (achievement: Achievement) => {
    setIsEditingAchievement(true);
    setCurrentAchievement({...achievement});
    setIsAchievementDialogOpen(true);
  };

  const handleDeleteAchievementClick = (achievementId: string) => {
    const updatedAchievements = achievements.filter(achievement => achievement.id !== achievementId);
    setAchievements(updatedAchievements);
    
    toast({
      title: "Achievement deleted",
      description: "The achievement has been successfully deleted.",
    });
  };

  const handleAchievementDialogClose = () => {
    setIsAchievementDialogOpen(false);
  };

  const handleAchievementInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentAchievement(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAchievementDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditingAchievement) {
      // Update existing achievement
      const updatedAchievements = achievements.map(achievement =>
        achievement.id === currentAchievement.id ? currentAchievement : achievement
      );
      setAchievements(updatedAchievements);
      
      toast({
        title: "Achievement updated",
        description: "The achievement has been successfully updated.",
      });
    } else {
      // Add new achievement
      setAchievements(prev => [...prev, currentAchievement]);
      
      toast({
        title: "Achievement added",
        description: "The new achievement has been successfully added.",
      });
    }
    
    handleAchievementDialogClose();
  };

  return (
    <div>
      <Tabs defaultValue="certifications" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="certifications" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium">Manage Certifications</h3>
            <Button onClick={handleAddCertClick}>Add Certification</Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Issuer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certifications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        No certifications found. Add your first certification.
                      </TableCell>
                    </TableRow>
                  ) : (
                    certifications.map((cert) => (
                      <TableRow key={cert.id}>
                        <TableCell className="font-medium">{cert.title}</TableCell>
                        <TableCell>{cert.issuer}</TableCell>
                        <TableCell>{cert.date}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditCertClick(cert)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteCertClick(cert.id)}>
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

          {/* Certification Dialog */}
          <Dialog open={isCertDialogOpen} onOpenChange={setIsCertDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditingCert ? "Edit Certification" : "Add New Certification"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCertDialogSubmit} className="space-y-4 pt-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Certification Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={currentCertification.title}
                    onChange={handleCertInputChange}
                    required
                    placeholder="AWS Certified Developer"
                  />
                </div>
                
                <div>
                  <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-1">
                    Issuer
                  </label>
                  <Input
                    id="issuer"
                    name="issuer"
                    value={currentCertification.issuer}
                    onChange={handleCertInputChange}
                    required
                    placeholder="Amazon Web Services"
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input
                    id="date"
                    name="date"
                    value={currentCertification.date}
                    onChange={handleCertInputChange}
                    required
                    placeholder="2023"
                  />
                </div>
                
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                    URL (Optional)
                  </label>
                  <Input
                    id="url"
                    name="url"
                    value={currentCertification.url || ""}
                    onChange={handleCertInputChange}
                    placeholder="https://example.com/certification"
                  />
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                  <Button type="button" variant="outline" onClick={handleCertDialogClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditingCert ? "Save Changes" : "Add Certification"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium">Manage Achievements</h3>
            <Button onClick={handleAddAchievementClick}>Add Achievement</Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {achievements.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                        No achievements found. Add your first achievement.
                      </TableCell>
                    </TableRow>
                  ) : (
                    achievements.map((achievement) => (
                      <TableRow key={achievement.id}>
                        <TableCell className="font-medium">{achievement.title}</TableCell>
                        <TableCell>{achievement.description}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditAchievementClick(achievement)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteAchievementClick(achievement.id)}>
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

          {/* Achievement Dialog */}
          <Dialog open={isAchievementDialogOpen} onOpenChange={setIsAchievementDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditingAchievement ? "Edit Achievement" : "Add New Achievement"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleAchievementDialogSubmit} className="space-y-4 pt-4">
                <div>
                  <label htmlFor="achievementTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Achievement Title
                  </label>
                  <Input
                    id="achievementTitle"
                    name="title"
                    value={currentAchievement.title}
                    onChange={handleAchievementInputChange}
                    required
                    placeholder="First Place in Hackathon"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    value={currentAchievement.description}
                    onChange={handleAchievementInputChange}
                    required
                    rows={3}
                    placeholder="Brief description of the achievement"
                  />
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                  <Button type="button" variant="outline" onClick={handleAchievementDialogClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {isEditingAchievement ? "Save Changes" : "Add Achievement"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CertificationsAdmin;
