import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoLoopSection from './components/LogoLoopSection';
import ValueBento from './components/ValueBento';
import FeaturedProjects from './components/FeaturedProjects';
import SkillsShowcase from './components/SkillsShowcase';
import About from './components/About';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <LogoLoopSection />
        <ValueBento />
        <FeaturedProjects />
        <SkillsShowcase />
        <About />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
