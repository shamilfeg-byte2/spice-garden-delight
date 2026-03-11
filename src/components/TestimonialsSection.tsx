import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Sarah M.', rating: 5, text: "Absolutely divine! The Butter Chicken is the best I've ever had. Warm atmosphere and incredible service.", avatar: 'S' },
  { name: 'David R.', rating: 5, text: 'We celebrated our anniversary here and it was perfect. The lamb chops are a masterpiece. Highly recommend!', avatar: 'D' },
  { name: 'Priya K.', rating: 4, text: 'Authentic flavors that remind me of home cooking. The Masala Chai is a must-try. Will definitely return!', avatar: 'P' },
  { name: 'James L.', rating: 5, text: 'From appetizers to dessert, every dish was a work of art. Chef Marcus truly knows his craft.', avatar: 'J' },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-32 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Testimonials</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">What Our Guests Say</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star key={si} className={`w-4 h-4 ${si < t.rating ? 'fill-warm-gold text-warm-gold' : 'text-muted'}`} />
              ))}
            </div>
            <p className="font-body text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary">
                {t.avatar}
              </div>
              <span className="font-body font-semibold text-card-foreground">{t.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
