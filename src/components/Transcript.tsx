import { useState } from "react";
import { ZoomIn, GraduationCap, BookOpen, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import ImageModal from "./ImageModal";
import TranscriptImg from "../assets/Transcript.png";

const transcriptPages = [
  { id: 1, title: "Academic Transcript", image: TranscriptImg },
];

const academicStats = [
  { icon: Calendar, label: "Year", value: "3rd", sub: "In Progress" },
  { icon: BookOpen, label: "Credits", value: "64", sub: "Completed" },
];

const Transcript = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < transcriptPages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  return (
    <section id="transcript" className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[120px] translate-x-1/2" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2" />

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
            <GraduationCap className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Academic </span>
            <span className="gradient-text">Transcript</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My academic records and achievements from King Mongkut's University of Technology North Bangkok.
          </p>
        </motion.div>

        {/* Main content — 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">

          {/* Left column — academic info */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Program details */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">Program Details</span>
                <div className="h-px flex-1 bg-gradient-to-l from-primary/50 to-transparent" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Enrolled in the{" "}
                <span className="text-foreground font-medium">
                  Bachelor's Degree in Electronics and Computer Technology
                </span>{" "}
                (ECT) at{" "}
                <span className="text-foreground font-medium">KMUTNB</span>,
                building a strong foundation in both hardware and software systems.
              </p>
            </div>

            {/* Academic stats */}
            <div className="grid grid-cols-2 gap-3">
              {academicStats.map((stat, index) => (
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

            {/* Hint */}
            <motion.div
              className="glass-card p-4 rounded-xl border-primary/20 flex items-start gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="mt-0.5 p-1.5 rounded-lg bg-primary/10 shrink-0">
                <ZoomIn className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Click the transcript image to view it in full size. You can also press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-muted text-foreground text-xs font-mono">Esc</kbd>{" "}
                to close the viewer.
              </p>
            </motion.div>
          </motion.div>

          {/* Right column — transcript image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card p-3 rounded-2xl animated-border">
              <motion.button
                className="aspect-[3/4] w-full rounded-xl overflow-hidden border border-white/5 relative group cursor-zoom-in"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(0)}
              >
                <img
                  src={TranscriptImg}
                  alt="Academic Transcript"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />

                {/* Hover overlay — no backdrop-blur so image stays sharp */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-primary/30 border border-primary/40">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.button>

              <p className="text-xs text-center text-muted-foreground mt-3 mb-1">
                Click to view full size
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Lightbox Modal */}
      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage !== null ? transcriptPages[selectedImage].image : ""}
        imageAlt={selectedImage !== null ? transcriptPages[selectedImage].title : ""}
        onPrev={selectedImage !== null && selectedImage > 0 ? handlePrev : undefined}
        onNext={selectedImage !== null && selectedImage < transcriptPages.length - 1 ? handleNext : undefined}
        hasNav={true}
      />
    </section>
  );
};

export default Transcript;
