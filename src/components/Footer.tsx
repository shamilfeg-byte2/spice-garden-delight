import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => (
  <footer className="bg-accent text-accent-foreground py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-12 mb-12">
        <div>
          <h3 className="font-display text-2xl font-bold text-primary mb-4">Spice Garden</h3>
          <p className="font-body text-accent-foreground/70 text-sm leading-relaxed">
            Where tradition meets flavor. Experience authentic cuisine crafted with passion and the finest spices.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Opening Hours</h4>
          <div className="font-body text-sm text-accent-foreground/70 space-y-2">
            <p>Monday – Friday: 11:00 AM – 10:00 PM</p>
            <p>Saturday: 10:00 AM – 11:00 PM</p>
            <p>Sunday: 10:00 AM – 9:00 PM</p>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-accent-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-accent-foreground/10 pt-6 text-center">
        <p className="font-body text-xs text-accent-foreground/50">© 2024 Spice Garden. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
