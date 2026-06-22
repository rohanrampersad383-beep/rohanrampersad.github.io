import { FiArrowRight, FiCode, FiDownload, FiSend } from 'react-icons/fi';
import GradientText from './reactbits/GradientText/GradientText';
import Magnet from './reactbits/Magnet/Magnet';
import StarBorder from './reactbits/StarBorder/StarBorder';
import HeroCommandCenter from './HeroCommandCenter';
import { links } from '../data/links';

export default function Hero() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="status-pill">
          <span className="pulse-dot" />
          <span>Recent Graduate</span>
          <span className="pill-separator">•</span>
          <span>Trinidad &amp; Tobago <span className="flag-mark">TT</span></span>
        </p>
        <h1 id="hero-title">
          Building digital systems with{' '}
          <GradientText
            className="hero-gradient"
            colors={['#28f4e5', '#40bfff', '#a66bff', '#ff6bd5', '#6aa8ff']}
            animationSpeed={8}
          >
            code, data, and practical AI.
          </GradientText>
        </h1>
        <p className="hero-summary">
          I design and build reliable software systems that solve real problems. From full-stack web apps to data
          workflows and AI prototypes, grounded in clean code and practical thinking.
        </p>
        <div className="hero-actions">
          <Magnet padding={48} magnetStrength={12}>
            <StarBorder as="a" href="#projects" color="#4df7e7" className="primary-cta">
              <FiCode /> View Projects <FiArrowRight />
            </StarBorder>
          </Magnet>
          <a className="secondary-cta" href="#contact">
            <FiSend /> Contact Me
          </a>
          <a className="ghost-cta" href={links.resume}>
            <FiDownload /> Download Resume
          </a>
        </div>
      </div>
      <HeroCommandCenter />
    </section>
  );
}
