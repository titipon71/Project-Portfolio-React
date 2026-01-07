import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { title } from "process";
import { i } from "node_modules/framer-motion/dist/types.d-DagZKalS";

const projectsData = [
  {
    title: "A Multi-User RAG Chatbot Platform with Room and Document Management (Backend Only)",
    description: "This project is a RAG-based chatbot system that allows multiple users to create chat rooms, manage documents, and interact with an AI-powered chatbot. It features user authentication, room creation, document uploads, and real-time chat functionality.",
    techStack: ["FastAPI", "Llamaindex", "Redis", "Olama","MariaDB","Docker","ChromaDB","Python"],
    githubUrl: "https://github.com/titipon71/RAG_project_FastAPI.git",
    liveUrl: "https://lukeenortaed.site/",
    imageUrl: "src/assets/Rag-banner.jpg"
  },
  {
    title: "Twebtoon - A Webtoon Platform",
    description: "A Twebtoon project based on the concept of a “Manga Browser/Reader” that uses Firebase as its real-time database and includes a home page, a list of recommended/latest updates, and a manga details page.",
    techStack: ["Flutter", "Firebase", "Dart", "Material Design"],
    githubUrl: "https://github.com/titipon71/Mini-Project-Flutter.git",
    imageUrl: "src/assets/twebtoon-banner.jpg"
  }
  
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work. Each project represents unique challenges 
            and solutions crafted with modern technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-300">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
