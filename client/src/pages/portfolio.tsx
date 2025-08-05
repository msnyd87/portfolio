import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Menu,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import profilePhoto from "@assets/linkedinphoto_1754259422656.jpeg";

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
    title: "Halfway - MBTI Dating App",
    description:
      "Dating app that matches people based on MBTI personality types. Has real-time chat and location features.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["React", "FastAPI", "PostgreSQL", "JavaScript"],
    projectUrl: "https://github.com/matthewsnyder263/type-halfway",
    githubUrl: "https://github.com/matthewsnyder263/type-halfway",
  },
  {
    id: 2,
    title: "WTO Alert Filter",
    description:
      "Python script that filters WTO trade notifications from Excel files to find animal-related alerts for USDA.",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["Python", "Pandas", "Excel", "Data Processing"],
    projectUrl: "https://github.com/matthewsnyder263/wto-alert-filter",
    githubUrl: "https://github.com/matthewsnyder263/wto-alert-filter",
  },
  {
    id: 3,
    title: "CarCar - Auto Management System",
    description:
      "Car dealership management system built with microservices. Tracks inventory, sales, and service appointments.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["React", "Django", "PostgreSQL", "Docker"],
    projectUrl: "https://github.com/matthewsnyder263/auto-mgt-sys",
    githubUrl: "https://github.com/matthewsnyder263/auto-mgt-sys",
  },
  {
    id: 4,
    title: "Task Management System",
    description:
      "Task management app with user auth, project organization, and team collaboration. Built with Django.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["Django", "Python", "SQLite", "HTML"],
    projectUrl: "https://github.com/matthewsnyder263/task-mgt-sys",
    githubUrl: "https://github.com/matthewsnyder263/task-mgt-sys",
  },
  {
    id: 5,
    title: "Scrumptious Recipes",
    description:
      "Recipe management app where users can create and save their own recipes. Built with Django.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["Django", "Python", "SQLite", "HTML"],
    projectUrl: "https://github.com/matthewsnyder263/recipes_django",
    githubUrl: "https://github.com/matthewsnyder263/recipes_django",
  },
  {
    id: 6,
    title: "Conference Management System",
    description:
      "Conference management system for tracking attendees and presentations. Django backend with React frontend.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    techStack: ["Django", "React", "PostgreSQL", "Docker"],
    projectUrl: "https://github.com/matthewsnyder263/fearless-frontend",
    githubUrl: "https://github.com/matthewsnyder263/fearless-frontend",
  },
];

const techStackColors: Record<string, string> = {
  React: "bg-blue-500/20 text-blue-300",
  "Node.js": "bg-green-500/20 text-green-300",
  MongoDB: "bg-green-600/20 text-green-300",
  TypeScript: "bg-blue-600/20 text-blue-300",
  "Next.js": "bg-slate-500/20 text-slate-300",
  Redis: "bg-red-500/20 text-red-300",
  "Socket.io": "bg-yellow-500/20 text-yellow-300",
  PostgreSQL: "bg-indigo-500/20 text-indigo-300",
  "Vue.js": "bg-green-400/20 text-green-300",
  Express: "bg-gray-500/20 text-gray-300",
  MySQL: "bg-blue-500/20 text-blue-300",
  Docker: "bg-blue-400/20 text-blue-300",
  Python: "bg-yellow-600/20 text-yellow-300",
  TensorFlow: "bg-orange-500/20 text-orange-300",
  FastAPI: "bg-green-500/20 text-green-300",
  "React Native": "bg-blue-500/20 text-blue-300",
  Expo: "bg-purple-500/20 text-purple-300",
  Firebase: "bg-orange-400/20 text-orange-300",
  PWA: "bg-purple-600/20 text-purple-300",
  Solidity: "bg-gray-600/20 text-gray-300",
  "Web3.js": "bg-yellow-500/20 text-yellow-300",
  Ethereum: "bg-purple-500/20 text-purple-300",
  MetaMask: "bg-orange-500/20 text-orange-300",
  Django: "bg-green-700/20 text-green-300",
  JavaScript: "bg-yellow-500/20 text-yellow-300",
  Pandas: "bg-blue-600/20 text-blue-300",
  Excel: "bg-green-600/20 text-green-300",
  "Data Processing": "bg-purple-500/20 text-purple-300",
  SQLite: "bg-gray-500/20 text-gray-300",
  HTML: "bg-orange-500/20 text-orange-300",
};

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_subject', 'New Portfolio Contact Form Submission');
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_template', 'table');

      const response = await fetch("https://formsubmit.co/msnyd87@gmail.com", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-slate-900 text-slate-50 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-blue-400">MS</div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
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
                onClick={() => scrollToSection("hero")}
                className="block w-full text-left text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-slate-300 hover:text-blue-400 transition-colors duration-300 py-2"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
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
                  src={profilePhoto}
                  alt="Matt Snyder - Developer Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Matt Snyder
              </h1>
              <h2 className="text-2xl md:text-3xl text-slate-300 mb-6">
                Full-Stack Developer
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                I’m a full-stack developer and analyst focused on building
                user-first tools with Python, JavaScript, React, and Django. I
                care about making things work simply and reliably, using data,
                automation, and thoughtful design to solve real-world problems.
                My background in operations and government gave me a strong
                appreciation for tools that improve efficiency and support
                informed decision-making.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                size="lg"
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-slate-600 bg-slate-100 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                size="lg"
              >
                Get In Touch
              </Button>
            </div>

            <div className="flex justify-center space-x-6 mt-12">
              <a
                href="https://github.com/matthewsnyder263/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 text-2xl transition-colors duration-300"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/matthew-snyder-565662230"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 text-2xl transition-colors duration-300"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Some projects I've built recently using different tech stacks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="bg-slate-900 border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
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
                  <h3 className="text-xl font-bold mb-3 text-slate-100">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className={`${techStackColors[tech] || "bg-slate-500/20 text-slate-300"} px-3 py-1 rounded-full text-sm`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                      onClick={() => window.open(project.projectUrl, "_blank")}
                    >
                      View Project
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                      onClick={() => window.open(project.githubUrl, "_blank")}
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
      <section id="contact" className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Ready to work together? Drop me a message and let's discuss your
              project.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-slate-100">
                  Let's Connect
                </h3>
                <p className="text-slate-400 mb-8">
                  I'm always interested in new opportunities and collaborations.
                  Whether you have a project in mind or just want to chat about
                  technology, feel free to reach out!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 font-semibold">Email</p>
                    <a
                      href="mailto:msnyd87@gmail.com"
                      className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      msnyd87@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 font-semibold">Phone</p>
                    <a
                      href="tel:+13238443638"
                      className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      +1 (323) 844-3638
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-300 font-semibold">Location</p>
                    <p className="text-slate-400">Sparks, NV</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-slate-700">
                <h4 className="text-lg font-semibold mb-4 text-slate-300">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/matthewsnyder263"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800 p-3 rounded-lg hover:bg-slate-700 transition-colors duration-300 group"
                  >
                    <Github className="h-6 w-6 text-slate-400 group-hover:text-blue-400" />
                  </a>
                  <a
                    href="https://linkedin.com/in/matthew-snyder-565662230"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800 p-3 rounded-lg hover:bg-slate-700 transition-colors duration-300 group"
                  >
                    <Linkedin className="h-6 w-6 text-slate-400 group-hover:text-blue-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-400"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-400"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-400 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-400 text-sm">
                      Thanks for your message! I'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-400 text-sm">
                      Something went wrong. Please try again or email me
                      directly.
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-slate-400">
                &copy; 2024 Matt Snyder. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
