import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactMessageSchema } from "@shared/schema";
import type { InsertContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink,
  ChevronDown
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  projectUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "A comprehensive admin dashboard for managing products, orders, and analytics with real-time updates.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["React", "Node.js", "MongoDB", "TypeScript"],
    projectUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Social Media Platform",
    description: "A modern social platform with real-time messaging, content sharing, and advanced privacy controls.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["Next.js", "Redis", "Socket.io", "PostgreSQL"],
    projectUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A collaborative task management tool with drag-and-drop functionality and team collaboration features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["Vue.js", "Express", "MySQL", "Docker"],
    projectUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "AI Analytics Dashboard",
    description: "An intelligent analytics platform using machine learning to provide insights and predictive analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["Python", "React", "TensorFlow", "FastAPI"],
    projectUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Mobile Web App",
    description: "A progressive web application with offline capabilities and native mobile experience.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["React Native", "Expo", "Firebase", "PWA"],
    projectUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    title: "Blockchain DApp",
    description: "A decentralized application for secure transactions and smart contract interactions.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["Solidity", "Web3.js", "Ethereum", "MetaMask"],
    projectUrl: "#",
    githubUrl: "#"
  }
];

const techStackColors: Record<string, string> = {
  "React": "bg-blue-500/20 text-blue-300",
  "Node.js": "bg-green-500/20 text-green-300",
  "MongoDB": "bg-green-600/20 text-green-300",
  "TypeScript": "bg-blue-600/20 text-blue-300",
  "Next.js": "bg-slate-500/20 text-slate-300",
  "Redis": "bg-red-500/20 text-red-300",
  "Socket.io": "bg-yellow-500/20 text-yellow-300",
  "PostgreSQL": "bg-indigo-500/20 text-indigo-300",
  "Vue.js": "bg-green-400/20 text-green-300",
  "Express": "bg-gray-500/20 text-gray-300",
  "MySQL": "bg-blue-500/20 text-blue-300",
  "Docker": "bg-blue-400/20 text-blue-300",
  "Python": "bg-yellow-600/20 text-yellow-300",
  "TensorFlow": "bg-orange-500/20 text-orange-300",
  "FastAPI": "bg-green-500/20 text-green-300",
  "React Native": "bg-blue-500/20 text-blue-300",
  "Expo": "bg-purple-500/20 text-purple-300",
  "Firebase": "bg-orange-400/20 text-orange-300",
  "PWA": "bg-purple-600/20 text-purple-300",
  "Solidity": "bg-gray-600/20 text-gray-300",
  "Web3.js": "bg-yellow-500/20 text-yellow-300",
  "Ethereum": "bg-purple-500/20 text-purple-300",
  "MetaMask": "bg-orange-500/20 text-orange-300"
};

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message sent!",
        description: data.message,
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-slate-900 text-slate-50 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-blue-400">AC</div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
              >
                Contact
              </button>
            </div>
            <button 
              className="md:hidden text-slate-300 hover:text-blue-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="block w-full text-left text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
            alt="Modern developer workspace" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-slate-900/90"></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-in fade-in duration-1000">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-blue-400/30">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256" 
                  alt="Alex Chen - Developer Profile" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Alex Chen
              </h1>
              <h2 className="text-2xl md:text-3xl text-slate-300 mb-6">
                Full Stack Developer & UI/UX Designer
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Passionate about creating beautiful, functional web applications that solve real-world problems. 
                Specializing in React, Node.js, and modern web technologies with 5+ years of experience.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                size="lg"
              >
                View My Work
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-slate-600 text-slate-300 px-8 py-3 rounded-lg font-semibold hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                size="lg"
              >
                Get In Touch
              </Button>
            </div>

            <div className="flex justify-center space-x-6 mt-12">
              <a href="#" className="text-slate-400 hover:text-blue-400 text-2xl transition-colors duration-300">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 text-2xl transition-colors duration-300">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 text-2xl transition-colors duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 text-2xl transition-colors duration-300">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A collection of my recent work showcasing various technologies and problem-solving approaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Card 
                key={project.id} 
                className="bg-slate-900 border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-slate-100">{project.title}</h3>
                  <p className="text-slate-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary"
                        className={`${techStackColors[tech] || 'bg-slate-500/20 text-slate-300'} px-3 py-1 rounded-full text-sm`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                      onClick={() => window.open(project.projectUrl, '_blank')}
                    >
                      View Project
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline"
              className="border-blue-500 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
              size="lg"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Mail className="text-blue-400 h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-slate-300 font-semibold">Email</p>
                        <p className="text-slate-400">alex.chen.dev@email.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Phone className="text-blue-400 h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-slate-300 font-semibold">Phone</p>
                        <p className="text-slate-400">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <MapPin className="text-blue-400 h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-slate-300 font-semibold">Location</p>
                        <p className="text-slate-400">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all duration-300">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-slate-300">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your Name"
                                {...field}
                                className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-slate-300">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                {...field}
                                className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-slate-300">Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell me about your project..."
                                rows={6}
                                {...field}
                                className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        disabled={contactMutation.isPending}
                        size="lg"
                      >
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-slate-400">&copy; 2024 Alex Chen. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
