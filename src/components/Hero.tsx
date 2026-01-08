import { ArrowDown, Mail, Sparkles, Code2, Database, Cpu } from "lucide-react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const floatingIcons = [
  { Icon: Code2, delay: 0, x: "10%", y: "20%" },
  { Icon: Database, delay: 0.5, x: "85%", y: "30%" },
  { Icon: Cpu, delay: 1, x: "15%", y: "70%" },
  { Icon: Sparkles, delay: 1.5, x: "80%", y: "75%" },
];

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="home" ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Animated orbs */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
        {/* Primary glow orb */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-blob" />
        {/* Secondary glow orb */}
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-blob-delayed" />
        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, delay, x, y: posY }, index) => (
        <motion.div
          key={index}
          className="absolute hidden md:block"
          style={{ left: x, top: posY }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-8 h-8 text-primary/40" />
          </motion.div>
        </motion.div>
      ))}

      <motion.div 
        className="section-container relative z-10 text-center py-20 pt-32"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-sm font-medium mb-8 border border-primary/30 text-primary backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Welcome to my portfolio
            <Sparkles className="w-4 h-4" />
          </span>
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="text-foreground">Hi, I'm{" "}</span>
          <span className="text-gradient-shine">Titipon Kaorobtham</span>
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <span className="text-xl sm:text-2xl font-medium gradient-text">Backend Developer</span>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        <motion.p 
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Currently studying at{" "}
          <span className="text-foreground font-medium">King Mongkut's University of Technology North Bangkok</span>
          <br />
          Bachelor of Engineering in Electronic Technology (Computer Specialization)
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button variant="hero" size="lg" className="group relative overflow-hidden" asChild>
            <a href="#contact">
              <span className="relative z-10 flex items-center">
                <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Contact Me
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[size:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </Button>
          <Button variant="heroOutline" size="lg" className="group" asChild>
            <a href="#projects" className="flex items-center">
              <span>View My Work</span>
              <motion.span 
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.a 
            href="#resume" 
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">Scroll</span>
            <ArrowDown size={20} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
