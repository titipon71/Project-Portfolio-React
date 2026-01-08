import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Resume from "@/components/Resume";
import Transcript from "@/components/Transcript";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark overflow-x-hidden">
      {/* Global background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      </div>
      
      <Header />
      <main className="relative">
        <Hero />
        <Resume />
        <Transcript />
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
