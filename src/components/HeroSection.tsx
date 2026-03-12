import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-bg.jpg';
import { Button } from '@/components/ui/button';

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroBg} alt="Delicious food at Spice Garden" className="w-full h-full object-cover" loading="eager" />
      <div className="absolute inset-0 bg-accent/70" />
    </div>
    <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-body text-warm-orange-light uppercase tracking-[0.3em] text-sm mb-4"
      >
        Welcome to
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6"
      >
        Spice Garden
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="font-body text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl mx-auto"
      >
        Where tradition meets flavor — experience the finest spices, crafted into unforgettable dishes.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-warm-orange-light text-base px-8 py-6">
          <a href="#menu">View Menu</a>
        </Button>
        <Button asChild size="lg" variant="outline" className="bg-transparent boder-white text-white hover:bg-white/20 hover:text-white">

          <a href="#reserve">Reserve a Table</a>
        </Button>
        

      </motion.div>
    </div>
  </section>
);

export default HeroSection;
