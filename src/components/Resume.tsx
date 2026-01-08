import { Download, FileText, Award, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const stats = [
  { icon: GraduationCap, label: "Education", value: "B.Tech" },
  { icon: Briefcase, label: "Projects", value: "2+" },
  { icon: Award, label: "GPA", value: "3.5+" },
];

const Resume = () => {
  return (
    <section id="resume" className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

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
            <FileText className="w-8 h-8 text-primary" />
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">My </span>
            <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive overview of my professional experience, skills, and education.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-3 gap-4 md:gap-6 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-4 md:p-6 text-center group hover:border-primary/30 transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xl md:text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="glass-card p-3 rounded-2xl animated-border">
            {/* Resume Preview */}
            <motion.div 
              className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-white/5 relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="src/assets/resume.png" 
                alt="Resume Preview" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Download Button */}
            <Button variant="hero" size="lg" className="w-full group" asChild>
              <a href="#" download>
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download Resume
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
