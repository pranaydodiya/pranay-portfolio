
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, Briefcase, GraduationCap, Code, Trophy } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'education' | 'work' | 'project' | 'achievement' | 'certification';
  tags: string[];
  featured?: boolean;
}

const Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<(HTMLDivElement | null)[]>([]);

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      title: 'Started Coding Journey',
      description: 'Began learning programming with Python and discovered my passion for software development.',
      date: '2022-01',
      type: 'education',
      tags: ['Python', 'Learning'],
      featured: true
    },
    {
      id: '2',
      title: 'First Web Development Project',
      description: 'Built my first website using HTML, CSS, and JavaScript. A simple portfolio to showcase my learning progress.',
      date: '2022-06',
      type: 'project',
      tags: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: '3',
      title: 'React.js Mastery',
      description: 'Deep dive into React.js ecosystem, learning hooks, state management, and modern development practices.',
      date: '2022-11',
      type: 'education',
      tags: ['React', 'Frontend'],
      featured: true
    },
    {
      id: '4',
      title: 'Full-Stack Development',
      description: 'Expanded skills to backend development with Node.js, Express.js, and MongoDB. Built complete MERN applications.',
      date: '2023-03',
      type: 'education',
      tags: ['MERN', 'Backend', 'Database']
    },
    {
      id: '5',
      title: 'HackerRank Software Engineer Intern Certification',
      description: 'Earned certification demonstrating problem-solving and programming skills.',
      date: '2023-08',
      type: 'certification',
      tags: ['Certification', 'Problem Solving'],
      featured: true
    },
    {
      id: '6',
      title: 'College SIH Hackathon Winner',
      description: 'Won the Smart India Hackathon at college level with an innovative solution.',
      date: '2023-09',
      type: 'achievement',
      tags: ['Hackathon', 'Innovation', 'Teamwork'],
      featured: true
    },
    {
      id: '7',
      title: 'Flipkart Grid 6.0 Qualifier',
      description: 'Qualified for Level 2 of Flipkart Grid 6.0, competing with thousands of developers.',
      date: '2023-11',
      type: 'achievement',
      tags: ['Competition', 'E-commerce'],
      featured: true
    },
    {
      id: '8',
      title: 'Accenture Technology Apprenticeship',
      description: 'Completed comprehensive technology apprenticeship program with Accenture.',
      date: '2024-02',
      type: 'work',
      tags: ['Apprenticeship', 'Enterprise']
    },
    {
      id: '9',
      title: 'Advanced Portfolio Development',
      description: 'Built this comprehensive portfolio with modern technologies, 3D elements, and advanced features.',
      date: '2024-05',
      type: 'project',
      tags: ['Portfolio', 'Three.js', 'Advanced'],
      featured: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'education': return <GraduationCap className="w-5 h-5" />;
      case 'work': return <Briefcase className="w-5 h-5" />;
      case 'project': return <Code className="w-5 h-5" />;
      case 'achievement': return <Trophy className="w-5 h-5" />;
      case 'certification': return <Award className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education': return 'bg-blue-500';
      case 'work': return 'bg-green-500';
      case 'project': return 'bg-purple-500';
      case 'achievement': return 'bg-yellow-500';
      case 'certification': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  useEffect(() => {
    if (!timelineRef.current) return;

    // Animate timeline events on scroll
    eventsRef.current.forEach((event, index) => {
      if (event) {
        gsap.fromTo(event, 
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            scale: 0.8
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: event,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Animate the timeline line
    gsap.fromTo(".timeline-line", 
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="timeline" className="section-padding bg-gradient-to-b from-background to-blue-50 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            My Coding Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From my first line of code to building complex applications - here's my development timeline
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500 timeline-line origin-top"
               style={{ height: '100%' }}>
          </div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                ref={el => eventsRef.current[index] = el}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className={`hover-card ${event.featured ? 'ring-2 ring-blue-500/20' : ''}`}>
                    <CardContent className="p-6">
                      <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        {event.featured && (
                          <Badge variant="secondary" className="text-xs">
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short' 
                          })}
                        </Badge>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                      
                      <div className={`flex flex-wrap gap-1 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        {event.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-full ${getTypeColor(event.type)} flex items-center justify-center text-white shadow-lg transform transition-transform hover:scale-110`}>
                    {getIcon(event.type)}
                  </div>
                </div>

                {/* Empty space for layout */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
