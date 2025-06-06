
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";

const Certifications = () => {
  const { certifications, achievements } = useData();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="certifications" 
      ref={sectionRef}
      className="section-padding px-4 bg-gray-50 dark:bg-gray-900 opacity-0 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="gradient-text">Certifications</span> & Achievements
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-portfolio-blue to-portfolio-purple rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Certifications */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center lg:text-left text-gray-900 dark:text-white">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((certification, index) => (
                <Card 
                  key={certification.id} 
                  className="animate-slide-in opacity-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between flex-wrap gap-2">
                      <h4 className="font-medium text-lg text-gray-900 dark:text-white">{certification.title}</h4>
                      <Badge variant="outline" className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">
                        {certification.date}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{certification.issuer}</p>
                    {certification.url && (
                      <div className="mt-4">
                        <Button asChild variant="link" size="sm" className="p-0 h-auto text-portfolio-blue dark:text-blue-400 hover:text-portfolio-purple dark:hover:text-purple-400">
                          <a href={certification.url} target="_blank" rel="noopener noreferrer">
                            View Certificate →
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center lg:text-left text-gray-900 dark:text-white">Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <Card 
                  key={achievement.id}
                  className="animate-slide-in opacity-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                  style={{ animationDelay: `${index * 0.1 + 0.2}s`, animationFillMode: 'forwards' }}
                >
                  <CardContent className="p-6">
                    <h4 className="font-medium text-lg text-gray-900 dark:text-white">{achievement.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{achievement.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
