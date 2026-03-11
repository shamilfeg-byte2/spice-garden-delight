import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import starterImg from '@/assets/food-starter.jpg';
import mainImg from '@/assets/food-main.jpg';
import dessertImg from '@/assets/food-dessert.jpg';
import drinkImg from '@/assets/food-drinks.jpg';

const categoryImages: Record<string, string> = {
  starter: starterImg,
  main: mainImg,
  dessert: dessertImg,
  drink: drinkImg,
};

const categories = [
  { key: 'starters', label: 'Starters' },
  { key: 'mains', label: 'Main Course' },
  { key: 'desserts', label: 'Desserts' },
  { key: 'drinks', label: 'Drinks' },
] as const;

const MenuSection = () => {
  const [active, setActive] = useState<string>('starters');
  const menuItems = useStore(s => s.menuItems);
  const filtered = menuItems.filter(i => i.category === active);

  return (
    <section id="menu" className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Our Menu</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Crafted with Love</h2>
        </motion.div>

        <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`font-body text-sm md:text-base px-5 py-2.5 rounded-full transition-all duration-300 ${
                active === c.key
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="overflow-hidden h-48">
                  <img
                    src={categoryImages[item.image] || starterImg}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-semibold text-card-foreground">{item.name}</h3>
                    <span className="font-display text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuSection;
