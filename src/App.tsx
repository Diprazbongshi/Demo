/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode, useRef, MouseEvent as ReactMouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ArrowRight, 
  Code2, 
  Palette, 
  Zap, 
  Globe,
  ExternalLink,
  ChevronRight,
  X,
  Link as LinkIcon,
  Menu,
  ChevronUp
} from 'lucide-react';

// --- Types & Data ---

interface ProjectDetail {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: Record<string, ProjectDetail> = {
  'aether': {
    id: 'aether',
    title: 'Aether Dashboard',
    shortDesc: 'Next-generation analytics platform.',
    longDesc: 'Aether is a comprehensive data visualization suite designed for high-performance enterprise teams. It features a custom-built charting engine optimized for streaming data, granular permission controls, and a fully reactive UI that scales from desktop to tablet seamlessly. The project focused on reducing cognitive load for analysts through intelligent information architecture and a minimalist cobalt-themed aesthetic.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'D3.js', 'Framer Motion', 'Node.js'],
    liveUrl: 'https://aether-demo.example.com',
    githubUrl: 'https://github.com/example/aether'
  },
  'lumina': {
    id: 'lumina',
    title: 'Lumina Mobile',
    shortDesc: 'Task management redesigned for focus.',
    longDesc: 'Lumina is a mobile-first task manager that uses behavioral psychology to help users stay productive without burnout. It features a "Focus Mode" that silences non-essential notifications and a "Flow State" timer that rewards deep work sessions. The app utilizes native device capabilities for smooth gesture-based navigation and haptic feedback.',
    tech: ['React Native', 'Expo', 'Redux', 'Spring', 'PostgreSQL'],
  }
};

// --- Sub-components ---

const ProjectModal = ({ project, onClose }: { project: ProjectDetail, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
    >
      <div 
        className="absolute inset-0 bg-base/80 backdrop-blur-xl" 
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface rounded-3xl border border-accent/20 shadow-2xl flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-12">
          <div className="flex items-center gap-3 text-accent mb-4">
            <Code2 size={24} />
            <span className="text-xs font-bold uppercase tracking-widest">Featured Project</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{project.title}</h2>
          
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            {project.longDesc}
          </p>

          <div className="mb-10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-accent py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:shadow-[0_0_20px_rgba(47,47,228,0.3)] transition-all"
              >
                <LinkIcon size={18} />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 frosted-glass py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-surface/50 transition-all"
              >
                <Github size={18} />
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-base overflow-hidden" aria-hidden="true">
      {/* Dynamic Base Hue Shift */}
      <motion.div 
        animate={{ 
          filter: ["hue-rotate(0deg)", "hue-rotate(15deg)", "hue-rotate(0deg)"] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 mesh-gradient opacity-80" />
        
        {/* Floating Blobs with Enhanced Glow & Complex Motion */}
        <motion.div
          animate={{
            x: [0, 200, -100, 0],
            y: [0, -150, 100, 0],
            scale: [1, 1.4, 0.9, 1],
            rotate: [0, 45, -45, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-accent/10 blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, -200, 150, 0],
            y: [0, 120, -100, 0],
            scale: [1, 1.3, 1.1, 1],
            rotate: [0, -90, 45, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] rounded-full bg-secondary/15 blur-[140px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
            x: ["-50%", "-40%", "-60%", "-50%"],
            y: ["-50%", "-60%", "-40%", "-50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full bg-blue-400/10 blur-[180px]"
        />
      </motion.div>

      {/* Animated Grain Texture Overlay */}
      <div className="absolute inset-0 grain-texture opacity-[0.04] mix-blend-overlay pointer-events-none scale-110" />
    </div>
  );
};

const GlowCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
        animate={{
          x: mousePos.x - 300,
          y: mousePos.y - 300,
        }}
        style={{
          background: 'radial-gradient(circle, #162E93 0%, transparent 70%)',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 50, mass: 0.5 }}
      />
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(95%,1200px)]">
      <div className="frosted-glass rounded-2xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="font-display font-medium text-lg tracking-tight">Azure Cobalt</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-white/70">
          {["Work", "Services", "About", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:block bg-accent px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-accent/20">
            Hire Me
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[calc(100%+12px)] left-0 w-full md:hidden"
          >
            <div className="frosted-glass rounded-2xl p-4 flex flex-col gap-2 overflow-hidden">
              {["Work", "Services", "About", "Contact"].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-white/5 text-lg font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
              <hr className="border-white/10 my-2" />
              <button className="w-full bg-accent py-4 rounded-xl text-lg font-bold">
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BentoCard = ({ 
  children, 
  className = "", 
  title, 
  description, 
  icon: Icon,
  onClick
}: { 
  children?: ReactNode; 
  className?: string; 
  title?: string; 
  description?: string;
  icon?: any;
  onClick?: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map mouse position to opposite movement (-10px to 10px)
  const moveX = useTransform(springX, [0, 1], [15, -15]);
  const moveY = useTransform(springY, [0, 1], [15, -15]);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || 'ontouchstart' in window) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div 
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ x: 0, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className={`group relative bg-surface rounded-3xl p-8 border border-accent/0 hover:border-accent transition-all duration-500 overflow-hidden ${className} ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
    >
      <motion.div 
        style={{ x: moveX, y: moveY }}
        className="relative z-10 h-full w-full"
      >
        {Icon && (
          <div className="mb-4 text-accent">
            <Icon size={32} strokeWidth={1.5} />
          </div>
        )}
        {title && <h3 className="font-display text-2xl font-semibold mb-2">{title}</h3>}
        {description && <p className="text-white/60 text-sm leading-relaxed mb-4">{description}</p>}
        {children}
      </motion.div>
    </motion.div>
  );
};

// --- Sections ---

const TechMarquee = () => {
  const techs = [
    "React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", 
    "Framer Motion", "D3.js", "PostgreSQL", "Firebase", "AWS",
    "Docker", "Vite", "Redux", "GraphQL"
  ];
  
  return (
    <section className="py-24 border-y border-white/5 overflow-hidden">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12"
      >
        {[...techs, ...techs].map((tech, i) => (
          <span key={i} className="font-display text-4xl font-bold text-white/10 hover:text-accent transition-colors">
            {tech}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="mb-48 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="font-display text-5xl font-bold mb-8">
        Crafting interactions that <span className="text-accent underline underline-offset-8 decoration-accent/30 italic">matter</span>.
      </h2>
      <div className="space-y-6 text-white/60 text-lg leading-relaxed">
        <p>
          I'm a digital product designer and full-stack developer based in the heart of the tech ecosystem. 
          With a background in both visual arts and computer science, I bridge the gap between 
          complex logic and elegant aesthetics.
        </p>
        <p>
          My philosophy is simple: technology should serve the user, not the other way around. 
          Every pixel I place and Every line of code I write is dedicated to creating seamless, 
          frictionless experiences that solve real problems.
        </p>
      </div>
      <div className="mt-10 flex gap-4">
        {[
          { label: "Location", value: "Remote / Global" },
          { label: "Status", value: "Open for collab" },
        ].map((item, i) => (
          <div key={i} className="bg-surface p-4 rounded-2xl border border-white/5 min-w-[160px]">
            <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">{item.label}</div>
            <div className="text-sm font-semibold">{item.value}</div>
          </div>
        ))}
      </div>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative aspect-square"
    >
      <div className="absolute inset-0 bg-accent rounded-3xl rotate-3 opacity-10" />
      <div className="absolute inset-0 bg-surface rounded-3xl border border-white/5 overflow-hidden group">
        <img 
          src="https://picsum.photos/seed/designer/800/800" 
          alt="Designer at work" 
          className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-6 left-6 frosted-glass p-4 rounded-xl">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-xs font-bold uppercase tracking-widest">Listening to: Synthwave Essentials</span>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const Testimonials = () => (
  <section className="mb-48">
    <div className="text-center mb-16">
      <h2 className="font-display text-4xl font-bold mb-4 italic">Kind Words</h2>
      <p className="text-white/40">Success stories from partners and clients.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { name: "Sarah Chen", role: "CEO @ Visionary", text: "Azure brought a level of detail and polish to our dashboard that we simply couldn't find elsewhere." },
        { name: "Marcus Thorne", role: "CTO @ Nexus", text: "The architectural depth combined with top-tier UI skills makes them a rare find in the industry." },
        { name: "Elena Rossi", role: "Founder @ Bloom", text: "A true partner. They understood our brand vision instantly and translated it into code flawlessly." },
      ].map((t, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-surface p-8 rounded-3xl border border-white/5 relative"
        >
          <div className="text-accent mb-6 italic text-4xl font-serif">"</div>
          <p className="text-white/70 italic leading-relaxed mb-8">{t.text}</p>
          <div>
            <div className="font-bold text-sm tracking-tight">{t.name}</div>
            <div className="text-xs text-white/30 font-medium">{t.role}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="mb-32 relative">
     <div className="bg-accent rounded-[3rem] p-12 md:p-24 overflow-hidden relative group">
        {/* Background glow in contact */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter">
            Ready to start <br /> your next big <span className="italic opacity-60">feature?</span>
          </h2>
          <p className="text-white/80 text-xl mb-12">
            I'm currently taking on new projects and consulting opportunities. 
            Let's build something that stands out.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="mailto:hello@azurecobalt.com" className="bg-white text-accent px-10 py-5 rounded-2xl text-lg font-bold hover:shadow-2xl transition-all flex items-center justify-center gap-3">
               Send an Email
               <Mail size={20} />
            </a>
            <button className="border border-white/30 hover:bg-white/10 px-10 py-5 rounded-2xl text-lg font-bold transition-all">
               Schedule a Call
            </button>
          </div>
        </div>
        
        <ArrowRight size={400} className="absolute -bottom-20 -right-20 text-white/5 -rotate-45" />
     </div>
  </section>
);

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const selectedProject = selectedProjectId ? PROJECTS[selectedProjectId] : null;

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      <AnimatedBackground />
      
      <GlowCursor />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block border border-accent/20 bg-accent/5 px-4 py-2 rounded-full text-accent text-xs font-bold tracking-widest uppercase mb-6">
              Available for new projects
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[1.1] mb-8">
              Designing Digital <br /> 
              <span className="font-serif italic bg-gradient-to-r from-accent via-cyan-400 to-accent bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-flow neon-glow">Experiences</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/50 text-xl font-light mb-10 leading-relaxed">
              Merging bold aesthetics with functional precision to build 
              interfaces that capture attention and drive results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent px-8 py-4 rounded-2xl text-lg font-bold flex items-center gap-3 hover:shadow-[0_0_30px_rgba(47,47,228,0.4)] transition-all group cursor-pointer">
                View Projects 
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="frosted-glass px-8 py-4 rounded-2xl text-lg font-bold hover:bg-surface/50 transition-all cursor-pointer">
                Let's Talk
              </button>
            </div>
          </motion.div>
        </section>

        {/* Bento Grid Section */}
        <section id="work" className="mb-32">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* Main Featured Work */}
            <BentoCard 
              className="md:col-span-8 md:row-span-2 min-h-[300px] md:min-h-[400px] flex flex-col justify-end group"
              title="Aether Dashboard"
              description="A next-generation analytics platform with real-time data visualization and intuitive user workflows."
              onClick={() => setSelectedProjectId('aether')}
            >
              <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:text-accent/20 transition-colors">
                <Code2 size={120} />
              </div>
              <div className="flex gap-2 text-xs font-semibold mt-4">
                <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">UI Design</span>
                <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">React</span>
                <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">Motion</span>
              </div>
            </BentoCard>

            {/* Experience Stats */}
            <BentoCard className="md:col-span-4 bg-accent text-white border-none flex flex-col justify-center items-center text-center py-12">
              <div className="text-6xl font-display font-bold mb-2 tracking-tighter">05+</div>
              <div className="text-sm font-semibold opacity-80 uppercase tracking-widest">Years Experience</div>
            </BentoCard>

            {/* Service 1 */}
            <BentoCard 
              className="md:col-span-4"
              icon={Palette}
              title="Brand Identity"
              description="Crafting unique visual languages that resonate with your target audience."
            />

            {/* Small dynamic piece */}
            <BentoCard className="md:col-span-3 flex items-center justify-center bg-secondary/20">
              <div className="flex flex-col items-center">
                <div className="flex -space-x-4 mb-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-surface overflow-hidden">
                      <img src={`https://picsum.photos/seed/${i+10}/100/100`} alt="Avatar" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-surface bg-accent flex items-center justify-center text-xs font-bold">
                    +12
                  </div>
                </div>
                <span className="text-xs font-medium text-white/40">Happy Clients</span>
              </div>
            </BentoCard>

            {/* Work 2 */}
            <BentoCard 
              className="md:col-span-5 md:row-span-1"
              title="Lumina Mobile"
              description="Minimalist task management redesigned for focus."
              onClick={() => setSelectedProjectId('lumina')}
            >
              <ChevronRight className="absolute bottom-8 right-8 text-white/20 group-hover:text-accent transition-colors" />
            </BentoCard>

            {/* Service 2 */}
            <BentoCard 
              className="md:col-span-4"
              icon={Zap}
              title="Fast Performance"
              description="Optimized code for blazing fast load times and smooth interactions."
            />

            {/* Service 3 */}
            <BentoCard 
              className="md:col-span-4"
              icon={Globe}
              title="Web Scaling"
              description="Architectures built to grow from MVP to global scale."
            />

            {/* CTA Final */}
            <BentoCard className="md:col-span-4 flex flex-col justify-between bg-surface/50 border-dashed border-accent/30 hover:border-accent">
              <h3 className="font-display text-2xl font-bold">Start a project</h3>
              <p className="text-sm text-white/50 mb-6">Let's build something exceptional together.</p>
              <button className="flex items-center gap-2 text-accent font-bold group cursor-pointer">
                Contact Me <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </BentoCard>
          </motion.div>
        </section>

        <TechMarquee />

        <div className="mt-48">
          <AboutSection />
        </div>

        <Testimonials />

        <ContactSection />

        {/* Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-[60] bg-accent p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all text-white cursor-pointer group"
            >
              <ChevronUp size={24} className="group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="pt-24 pb-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold shadow-lg shadow-accent/20">
                A
              </div>
              <span className="font-display font-bold text-xl tracking-tight">Azure Cobalt</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Designing and building high-performance digital products for the next generation of web experiences.
            </p>
            <p className="text-white/20 text-xs mt-4">© 2026 Crafted with precision in AI Studio.</p>
          </div>
          
          <div className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">Follow</span>
            <div className="flex gap-6">
              {[
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Mail, href: "#" }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href} 
                  whileHover={{ y: -5, scale: 1.1 }} 
                  className="text-white/40 hover:text-accent transition-all animate-pulse-slow"
                >
                  <social.icon size={22} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6 md:text-right">
             <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">Contact</span>
             <a href="mailto:contact@azurecobalt.com" className="group flex flex-col items-start md:items-end gap-2">
                <span className="text-xl md:text-2xl font-display font-medium text-white/80 group-hover:text-accent transition-colors flex items-center gap-3">
                   contact@azurecobalt.com
                   <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-white/20 group-hover:text-accent" />
                </span>
                <span className="text-xs text-white/30 font-medium group-hover:text-white/50 transition-colors">Available for worldwide collaboration</span>
             </a>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProjectId(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
