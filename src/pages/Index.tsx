import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Resume from "@/components/Resume";
import Transcript from "@/components/Transcript";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <main>
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
