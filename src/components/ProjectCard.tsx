import { Github, ExternalLink, Image, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  index?: number;
}

const ProjectCard = ({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  imageUrl,
  index = 0,
}: ProjectCardProps) => {
  return (
    <motion.div
      className="glass-card-hover overflow-hidden group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Project Screenshot */}
      <div className="aspect-video relative overflow-hidden">
        {imageUrl ? (
          <motion.img
            src={imageUrl}
            alt={`${title} screenshot`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Image className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

        {/* Hover overlay with live preview button */}
        {liveUrl && (
          <motion.div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center flex-col gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button variant="hero" size="default" className="group/btn" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                Live Preview
                <ArrowUpRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-5 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              className="tech-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* GitHub Button */}
        <Button variant="github" className="w-full group/github" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4 group-hover/github:rotate-12 transition-transform" />
            View on GitHub
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
