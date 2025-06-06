import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, X } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { skills, projects, certifications, achievements, about } = useData();
  const { trackChatbotInteraction } = useAnalytics();
  const { t } = useLanguage();

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Hide welcome tooltip after 8 seconds or when chatbot is opened
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeTooltip(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Hide tooltip when chatbot is opened
  useEffect(() => {
    if (isOpen) {
      setShowWelcomeTooltip(false);
    }
  }, [isOpen]);

  // Always initialize with welcome message when opened
  useEffect(() => {
    if (isOpen) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: `Hi! I'm Pranay's AI assistant. I can answer questions about his portfolio, skills, projects, experience, and achievements. Try asking me something like:\n\n• "What are your strongest skills?"\n• "Tell me about your projects"\n• "What certifications do you have?"\n• "Do you have any AI experience?"`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    // Skills related questions
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('technology') || lowerQuestion.includes('tech stack')) {
      const topSkills = skills.filter(skill => skill.level >= 80).map(s => s.name);
      return `My strongest skills are ${topSkills.join(', ')}. I'm proficient in full-stack development with React.js, Node.js, Express.js, and databases like MongoDB and MySQL. I also have experience with Gen AI projects and modern web technologies like Tailwind CSS and Redux.`;
    }

    // Projects related questions
    if (lowerQuestion.includes('project') || lowerQuestion.includes('portfolio') || lowerQuestion.includes('work')) {
      return `I've built several impressive projects including:\n\n• **Uber Full-Stack Clone** - A scalable ride-sharing platform with real-time tracking and Stripe payments\n• **E-commerce MERN Store** - Full-featured online store with admin panel\n• **Online Learning Platform** - Course management with quizzes and progress tracking\n• **GenAI Chatbot Assistant** - AI-powered chatbot with natural language understanding\n\nAll projects use modern tech stacks like React.js, Node.js, MongoDB, and various APIs.`;
    }

    // AI/GenAI related questions
    if (lowerQuestion.includes('ai') || lowerQuestion.includes('artificial intelligence') || lowerQuestion.includes('machine learning')) {
      return `Yes! I have experience with Gen AI projects. I've built a GenAI Chatbot Assistant with natural language understanding and task automation capabilities. I've integrated various APIs including OpenAI and have worked with technologies like Python, TensorFlow, and FastAPI for AI applications.`;
    }

    // Certifications and achievements
    if (lowerQuestion.includes('certification') || lowerQuestion.includes('achievement') || lowerQuestion.includes('award')) {
      const certList = certifications.map(c => `• ${c.title} (${c.issuer})`).join('\n');
      const achievementList = achievements.slice(0, 3).map(a => `• ${a.title}`).join('\n');
      return `**Certifications:**\n${certList}\n\n**Key Achievements:**\n${achievementList}\n\nI'm also a state-level table tennis player and have won coding competitions!`;
    }

    // Experience/internship related
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('internship') || lowerQuestion.includes('hackerrank')) {
      return `I have a Software Engineer Intern certification from HackerRank and have completed various technology apprenticeship programs including one with Accenture. I've also participated in hackathons, winning my college's SIH Hackathon and qualifying for Flipkart Grid 6.0 Level 2.`;
    }

    // Contact/collaboration
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('hire') || lowerQuestion.includes('collaborate') || lowerQuestion.includes('email')) {
      return `You can reach me at ${about.contactEmail}. I'm always open to discussing new opportunities, collaborations, or interesting projects. Feel free to connect with me on LinkedIn or check out my GitHub for more of my work!`;
    }

    // Education/background
    if (lowerQuestion.includes('education') || lowerQuestion.includes('background') || lowerQuestion.includes('about')) {
      return `I'm ${about.name}, a ${about.role} passionate about building modern web applications. ${about.bio} I enjoy solving complex problems and creating user-friendly solutions with clean, efficient code.`;
    }

    // Full stack development
    if (lowerQuestion.includes('full stack') || lowerQuestion.includes('frontend') || lowerQuestion.includes('backend')) {
      return `I'm a full-stack developer proficient in the MERN stack (MongoDB, Express.js, React.js, Node.js). For frontend, I use React.js with modern tools like Redux, Tailwind CSS, and TypeScript. For backend, I work with Node.js, Express.js, and various databases. I also integrate third-party services like Stripe for payments and Google Maps API.`;
    }

    // Database related
    if (lowerQuestion.includes('database') || lowerQuestion.includes('mongodb') || lowerQuestion.includes('mysql')) {
      const dbSkills = skills.filter(s => s.category === 'Database').map(s => s.name);
      return `I work with multiple databases including ${dbSkills.join(', ')}. I'm most experienced with MongoDB for NoSQL applications and MySQL for relational data. I also have experience with Firebase for real-time applications.`;
    }

    // Default response
    return `That's an interesting question! I'd be happy to discuss more details about my experience, projects, or skills. Feel free to ask about specific technologies, projects, or areas you'd like to know more about. You can also contact me directly at ${about.contactEmail} for detailed discussions!`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Track chatbot interaction
    trackChatbotInteraction(input);
    
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(input),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What are your strongest skills?",
    "Tell me about your projects",
    "Do you have AI experience?",
    "What's your tech stack?"
  ];

  return (
    <>
      {/* Welcome Tooltip - Always show when not opened */}
      {showWelcomeTooltip && !isOpen && (
        <div className="fixed bottom-24 right-6 z-40 animate-slide-in-right">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs relative">
            <div className="text-sm font-medium">
              {t('chatbot.welcome')}
            </div>
            <div className="text-xs opacity-90 mt-1">
              Skills, projects, experience, and more...
            </div>
            {/* Arrow pointing to chat button */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 transform rotate-45"></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWelcomeTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 p-0 text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
            showWelcomeTooltip ? 'animate-pulse-glow' : ''
          }`}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] z-50 animate-scale-in">
          <Card className="h-full flex flex-col shadow-2xl border-0 bg-white dark:bg-gray-900">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <div>
                  <CardTitle className="text-lg">Portfolio Assistant</CardTitle>
                  <p className="text-xs opacity-90">Ask me anything about Pranay!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="ml-auto text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{ maxHeight: '320px' }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                        <div className="text-sm whitespace-pre-line">{message.content}</div>
                        {message.type === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-1">
                    {suggestedQuestions.map((question, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        onClick={() => setInput(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about Pranay's portfolio..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default PortfolioChatbot;
