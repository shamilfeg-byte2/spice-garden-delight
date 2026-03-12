import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => (
  <section id="contact" className="py-20 md:py-32 bg-secondary/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="font-body text-primary uppercase tracking-[0.2em] text-sm mb-3">Get in Touch</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Contact Us</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">Location</h3>
              <p className="font-body text-muted-foreground">123 Spice Lane, Downtown, NY 10001</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">Phone</h3>
              <p className="font-body text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">Email</h3>
              <p className="font-body text-muted-foreground">hello@spicegarden.com</p>
            </div>
          </div>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-primary-foreground gap-2 px-8">
            <a href={`https://wa.me/918086373873?text=${encodeURIComponent('Hi! I want a website like this.')}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" /> Order via WhatsApp
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden shadow-lg h-80 lg:h-full min-h-[300px]"
        >
          <iframe
            title="Spice Garden Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default ContactSection;
