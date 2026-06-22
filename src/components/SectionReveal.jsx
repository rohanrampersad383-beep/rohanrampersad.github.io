import { motion } from 'framer-motion';

export default function SectionReveal({ children, className = '', id, ...rest }) {
  return (
    <motion.section
      id={id}
      className={className}
      {...rest}
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
