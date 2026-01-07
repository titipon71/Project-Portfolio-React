import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";
import ImageModal from "./ImageModal";
import TranscriptImg from "../assets/Transcript.png";

const transcriptPages = [
  { id: 1, title: "Page 1", image: TranscriptImg },
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
    <section id="transcript" className="section-padding">
      <div className="section-container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-white">Academic </span>
            <span className="gradient-text">Transcript</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic records and achievements. Click on any page to view it in full size.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {transcriptPages.map((page, index) => (
            <motion.button
              key={page.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group glass-card p-4 rounded-xl transition-all duration-300 cursor-pointer text-left"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-[3/4] bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden border border-border/50">
                <img 
                  src={page.image} 
                  alt={page.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-primary" />
                </div>
              </div>
              <p className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors text-center">
                {page.title}
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
