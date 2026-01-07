import { Download, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const Resume = () => {
  return (
    <section id="resume" className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <><span className="text-white">My </span></>
            <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my professional experience, skills, and education.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="glass-card p-2 rounded-2xl">
            {/* Resume Preview */}
            <motion.div 
              className="aspect-[3/4] bg-muted rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-border/50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
            <img src="src/assets/resume.png" alt="Resume Preview" />
              
            </motion.div>

            {/* Download Button */}
            <Button variant="hero" size="lg" className="w-full" asChild>
              <a href="#" download>
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
