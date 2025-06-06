
import { useEffect, useRef } from "react";
import { useData } from "@/contexts/DataContext";

const About = () => {
  const { about } = useData();
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
      id="about" 
      ref={sectionRef}
      className="section-padding px-4 bg-white dark:bg-gray-900 opacity-0 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-portfolio-blue to-portfolio-purple rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Education Column */}
          <div className="md:col-span-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Education</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <h4 className="font-medium text-lg text-gray-900 dark:text-white">Birla Vishvakarma Mahavidyalaya, Gujarat</h4>
                  <p className="text-gray-700 dark:text-gray-300">B.Tech - Information Technology (2022-2026)</p>
                  <p className="text-portfolio-blue font-medium mt-1">SPI: 8.05</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <h4 className="font-medium text-lg text-gray-900 dark:text-white">Jawahar Navodaya Vidyalaya (CBSE)</h4>
                  <p className="text-gray-700 dark:text-gray-300">Higher Secondary: 84% (Class XII)</p>
                  <p className="text-gray-700 dark:text-gray-300">Secondary: 80% (Class X)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Column */}
          <div className="md:col-span-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Experience</h3>
              
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div className="flex justify-between items-start flex-wrap">
                    <h4 className="font-medium text-lg text-gray-900 dark:text-white">Pixnil Technologies</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Jun 2024 - Jul 2024</p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">Full Stack Web Developer</p>
                  <ul className="mt-3 text-gray-600 dark:text-gray-400 space-y-2 list-disc pl-5">
                    <li>Developed and maintained scalable web applications using React.js, Redux, and Tailwind CSS</li>
                    <li>Designed and optimized RESTful APIs, ensuring seamless integration with MongoDB and MySQL databases</li>
                    <li>Implemented performance optimizations, reducing API response time by 30%</li>
                    <li>Collaborated with cross-functional teams to debug and enhance existing features</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div className="flex justify-between items-start flex-wrap">
                    <h4 className="font-medium text-lg text-gray-900 dark:text-white">HackerRank</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mar 2024</p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">Software Engineering Intern</p>
                  <ul className="mt-3 text-gray-600 dark:text-gray-400 space-y-2 list-disc pl-5">
                    <li>Completed an intensive software engineering program focusing on system design, API development, and scalable software solutions</li>
                    <li>Developed and optimized algorithms for problem-solving and competitive programming</li>
                    <li>Gained hands-on experience in backend development using Node.js and Express.js</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
