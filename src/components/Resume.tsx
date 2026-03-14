import { useState } from "react";
import { Download, FileText, Award, GraduationCap, Briefcase, Code2, Database, Server, ZoomIn } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import resumePic from "../assets/resume.png";
import ImageModal from "./ImageModal";

const stats = [
  { icon: GraduationCap, label: "Education", value: "B.Eng", sub: "Electronic Technology" },
  { icon: Briefcase, label: "Projects", value: "2+", sub: "Completed" },
  { icon: Award, label: "GPA", value: "3.5+", sub: "Cumulative" },
];

const highlights = [
  { icon: Code2, label: "Backend Dev" },
  { icon: Database, label: "RAG / LlamaIndex" },
  { icon: Server, label: "FastAPI" },
  { icon: Database, label: "Docker" },
];

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="resume" className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

      <div className="section-container relative z-10">
        {/* Section header */}
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

        {/* Main content — 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">

          {/* Left column — info & stats */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Quick overview */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">Quick Overview</span>
                <div className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Backend-focused developer with hands-on experience building AI-powered systems,
                REST APIs, and multi-user platforms. Currently pursuing a Bachelor's degree at{" "}
                <span className="text-foreground font-medium">KMUTNB</span>.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-card p-4 text-center group hover:border-primary/30 transition-all duration-300"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs font-medium text-foreground/80">{stat.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{stat.sub}</div>
                </motion.div>
              ))}
            </div>

            {/* Highlight badges */}
            <div>
              <p className="text-sm text-muted-foreground mb-3 font-medium">Core skills & tools</p>
              <div className="flex flex-wrap gap-2">
                {highlights.map((item, i) => (
                  <motion.span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium hover:bg-primary/20 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column — resume preview */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card p-3 rounded-2xl animated-border">
              {/* Image preview */}
              <motion.button
                className="aspect-[3/4] w-full bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center overflow-hidden border border-white/5 relative group cursor-zoom-in"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={resumePic}
                  alt="Resume Preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay — no backdrop-blur so image stays sharp */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-primary/30 border border-primary/40">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={resumePic}
        imageAlt="Resume Preview"
      />
    </section>
  );
};

export default Resume;
