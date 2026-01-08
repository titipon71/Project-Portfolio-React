import { useState } from "react";
import { ZoomIn, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import ImageModal from "./ImageModal";
import TranscriptImg from "../assets/Transcript.png";

const transcriptPages = [
  { id: 1, title: "", image: TranscriptImg },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

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
            <GraduationCap className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Academic </span>
            <span className="gradient-text">Transcript</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My academic records and achievements. Click on any page to view it in full size.
          </p>
        </motion.div>

        <motion.div 
          className="flex justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {transcriptPages.map((page, index) => (
            <motion.button
              key={page.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="group glass-card-hover p-4 rounded-2xl cursor-pointer text-left max-w-sm"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-[3/4] rounded-xl mb-4 flex items-center justify-center relative overflow-hidden border border-white/5">
                <img 
                  src={page.image} 
                  alt={page.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <div className="p-4 rounded-full bg-primary/30 backdrop-blur-md border border-primary/40">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                Click to view full size
              </p>
            </motion.button>
          ))}
        </motion.div>
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
