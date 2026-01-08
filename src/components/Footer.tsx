import { Facebook, Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Github, href: "https://github.com/titipon71", label: "GitHub", color: "hover:text-white hover:bg-white/10" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10" },
  { icon: Facebook, href: "https://www.facebook.com/YodTitipon/", label: "Facebook", color: "hover:text-[#1877F2] hover:bg-[#1877F2]/10" },
  { icon: Mail, href: "mailto:titipon.kaorobtham@gmail.com", label: "Email", color: "hover:text-primary hover:bg-primary/10" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative py-20 border-t border-white/5 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="section-container relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 mb-6"
          >
            <Mail className="w-8 h-8 text-primary" />
          </motion.div>

          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-foreground">Let's </span>
            <span className="gradient-text">Connect</span>
          </h3>
          <p className="text-muted-foreground max-w-md mb-10 text-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 mb-12">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-xl bg-white/5 border border-white/5 text-muted-foreground transition-all duration-300 ${link.color}`}
                aria-label={link.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon size={22} />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Copyright */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span>© {new Date().getFullYear()} Titipon Kaorobtham</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> using React
            </span>
          </motion.div>
        </motion.div>

        {/* Scroll to top button */}
        <motion.button
          onClick={scrollToTop}
          className="absolute right-4 bottom-4 md:right-8 md:bottom-8 p-3 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all duration-300"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
