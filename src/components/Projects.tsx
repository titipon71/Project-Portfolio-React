import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Rocket } from "lucide-react";
import ragbanner from "../assets/Rag-banner.jpg";
import webtoon from "../assets/twebtoon-banner.jpg";

const projectsData = [
  {
    title: "A Multi-User RAG Chatbot Platform with Room and Document Management (Backend Only)",
    description: "This project is a RAG-based chatbot system that allows multiple users to create chat rooms, manage documents, and interact with an AI-powered chatbot. It features user authentication, room creation, document uploads, and real-time chat functionality.",
    techStack: ["FastAPI", "Llamaindex", "Redis", "Olama","MariaDB","Docker","ChromaDB","Python"],
    githubUrl: "https://github.com/titipon71/RAG_project_FastAPI.git",
    liveUrl: "https://lukeenortaed.site/",
    imageUrl: ragbanner
  },
  {
    title: "Twebtoon - A Webtoon Platform",
    description: "A Twebtoon project based on the concept of a “Manga Browser/Reader” that uses Firebase as its real-time database and includes a home page, a list of recommended/latest updates, and a manga details page.",
    techStack: ["Flutter", "Firebase", "Dart", "Material Design"],
    githubUrl: "https://github.com/titipon71/Mini-Project-Flutter.git",
    imageUrl: webtoon
  }
  
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />

      <div className="section-container relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 mb-6"
          >
            <Rocket className="w-8 h-8 text-primary" />
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A selection of my recent work. Each project represents unique challenges 
            and solutions crafted with modern technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
