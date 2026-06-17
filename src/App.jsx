import Background from "./components/Background.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Snapshot from "./components/Snapshot.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import SplashCursor from "./components/SplashCursor.jsx";
import { useReveal } from "./components/useReveal.js";

export default function App() {
  useReveal();

  return (
    <>
      <Background />
      <SplashCursor />
      <Navbar />
      <main>
        <Hero />
        <Snapshot />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
