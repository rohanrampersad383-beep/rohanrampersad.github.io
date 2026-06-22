import { lazy, Suspense, useEffect, useState } from 'react';
import {
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone
} from 'react-icons/fi';
import GradientText from './reactbits/GradientText/GradientText';
import Magnet from './reactbits/Magnet/Magnet';
import StarBorder from './reactbits/StarBorder/StarBorder';
import SectionReveal from './SectionReveal';
import { links } from '../data/links';

const Lightfall = lazy(() => import('./reactbits/Lightfall/Lightfall'));

const contactItems = [
  {
    label: 'Email',
    value: 'rohanrampersad383@gmail.com',
    href: links.email,
    ariaLabel: 'Email Rohan',
    Icon: FiMail
  },
  {
    label: 'Phone',
    value: links.phoneLabel,
    href: links.phone,
    ariaLabel: 'Call Rohan',
    Icon: FiPhone
  },
  {
    label: 'Location',
    value: links.location,
    Icon: FiMapPin
  },
  {
    label: 'GitHub',
    value: 'rohanrampersad383-beep',
    href: links.github,
    ariaLabel: 'GitHub profile',
    Icon: FiGithub
  },
  {
    label: 'LinkedIn',
    value: 'Rohan Rampersad',
    href: links.linkedin,
    ariaLabel: 'LinkedIn profile',
    Icon: FiLinkedin
  },
  {
    label: 'Portfolio',
    value: 'rohanrampersad.vercel.app',
    href: links.portfolio,
    ariaLabel: 'View portfolio',
    Icon: FiGlobe
  }
];

function useContactLightfall() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileViewport = window.matchMedia('(max-width: 760px)');
    const canvas = document.createElement('canvas');
    const canUseWebGL = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    const update = () => setEnabled(canUseWebGL && !reducedMotion.matches && !mobileViewport.matches);

    update();
    reducedMotion.addEventListener('change', update);
    mobileViewport.addEventListener('change', update);

    return () => {
      reducedMotion.removeEventListener('change', update);
      mobileViewport.removeEventListener('change', update);
    };
  }, []);

  return enabled;
}

export default function ContactCTA() {
  const lightfallEnabled = useContactLightfall();

  return (
    <SectionReveal className="section contact-section" id="contact" aria-labelledby="contact-title">
      <StarBorder as="div" className="contact-card" color="#42f5e9" thickness={1} speed="8s">
        <div className="contact-hub">
          <div className="contact-lightfall" aria-hidden="true">
            {lightfallEnabled ? (
              <Suspense fallback={<div className="contact-lightfall-fallback" />}>
                <Lightfall
                  colors={['#43f6e8', '#6f7cff', '#ff5fd2']}
                  backgroundColor="#08152b"
                  speed={0.3}
                  streakCount={3}
                  streakWidth={0.72}
                  streakLength={1.25}
                  glow={0.72}
                  density={0.55}
                  twinkle={0.35}
                  zoom={3.5}
                  backgroundGlow={0.28}
                  opacity={0.78}
                  mouseInteraction
                  mouseStrength={0.28}
                  mouseRadius={0.85}
                  mouseDampening={0.22}
                  dpr={1}
                  mixBlendMode="screen"
                />
              </Suspense>
            ) : (
              <div className="contact-lightfall-fallback" />
            )}
          </div>
          <div className="contact-copy">
            <p className="contact-status">
              <span className="pulse-dot" />
              Available for opportunities
            </p>
            <h2 id="contact-title">
              <GradientText
                className="contact-gradient"
                colors={['#43f6e8', '#58a6ff', '#d66cff', '#ff5fd2']}
                animationSpeed={10}
              >
                Let&apos;s build something useful.
              </GradientText>
            </h2>
            <p>
              I&apos;m open to software development, IT support, data and reporting, technical support, admin,
              operations, and other entry-level opportunities where clear thinking and practical delivery matter.
            </p>
            <div className="contact-primary-actions">
              <Magnet padding={36} magnetStrength={14}>
                <a className="contact-primary" href={links.email} aria-label="Start email conversation">
                  <FiMail /> Start a conversation <FiArrowUpRight />
                </a>
              </Magnet>
              <a className="contact-resume" href={links.resume}>
                <FiDownload /> View Resume
              </a>
            </div>
            <div className="contact-terminal" aria-label="Contact status">
              <span>rr@portfolio:~$</span>
              <code>open --to=opportunities</code>
              <i>ready</i>
            </div>
          </div>

          <div className="contact-directory" aria-label="Contact directory">
            {contactItems.map(({ label, value, href, ariaLabel, Icon }) => {
              const content = (
                <>
                  <span className="contact-icon"><Icon /></span>
                  <span className="contact-detail">
                    <small>{label}</small>
                    <strong>{value}</strong>
                  </span>
                  {href ? <FiArrowUpRight className="contact-arrow" /> : null}
                </>
              );

              return href ? (
                <a
                  className={`contact-channel contact-channel-${label.toLowerCase()}`}
                  href={href}
                  aria-label={ariaLabel}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  key={label}
                >
                  {content}
                </a>
              ) : (
                <div className="contact-channel" key={label}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </StarBorder>
    </SectionReveal>
  );
}
