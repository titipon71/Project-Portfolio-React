import { Github, ExternalLink, Image, ListChevronsUpDown } from "lucide-react";
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
      className="glass-card overflow-hidden group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Project Screenshot */}
      <div className="aspect-video bg-muted relative overflow-hidden">
        {imageUrl ? (
          <motion.img
            src={imageUrl}
            alt={`${title} screenshot`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}

        {/* Hover overlay with live preview button */}
        {
          <motion.div
            className="absolute inset-0 bg-background/80 flex items-center justify-center flex-col gap-2"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {liveUrl && (
              <Button variant="hero" size="sm" asChild>
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Preview
                </a>
              </Button>
            )}
          </motion.div>
        }
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
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
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* GitHub Button */}
        <Button variant="github" className="w-full" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
