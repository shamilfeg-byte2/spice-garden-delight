import { motion } from 'framer-motion';
import chefImg from '@/assets/chef.jpg';
import interiorImg from '@/assets/restaurant-interior.jpg';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7 },
};

const AboutSection = () => (
  <section id="about" className="py-20 md:py-32 bg-background">
    <div className="container mx-auto px-4">
      <motion.div {...fadeUp} className="text-center mb-16">
        <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Our Story</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">A Passion for Flavor</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div {...fadeUp}>
          <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
            Founded in 2010, Spice Garden began as a small family kitchen with one dream — to bring authentic, soulful cooking to our community. Every dish is a love letter to the traditions we grew up with, reimagined with modern flair.
          </p>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            We source the freshest local ingredients and the finest imported spices to create a dining experience that warms the heart and delights the palate.
          </p>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }}>
          <img src={interiorImg} alt="Spice Garden restaurant interior" className="rounded-lg shadow-xl w-full h-80 object-cover" loading="lazy" />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="order-2 md:order-1">
          <img src={chefImg} alt="Chef at Spice Garden" className="rounded-lg shadow-xl w-full h-96 object-cover" loading="lazy" />
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }} className="order-1 md:order-2">
          <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Meet the Chef</p>
          <h3 className="font-display text-3xl font-bold text-foreground mb-4">Chef Marcus Williams</h3>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            With over 15 years of culinary experience across three continents, Chef Marcus brings a unique fusion of traditional techniques and bold innovation. His philosophy is simple: let the spices speak.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
