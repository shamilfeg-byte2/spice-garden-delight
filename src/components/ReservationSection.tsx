import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, type Reservation } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { CalendarDays, Clock, Users, Check } from 'lucide-react';

const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
];

const ReservationSection = () => {
  const { tables, addReservation } = useStore();
  const availableTables = tables.filter(t => t.available);
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '', tableId: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time || !form.guests || !form.tableId) {
      toast.error('Please fill in all fields');
      return;
    }
    const table = tables.find(t => t.id === form.tableId);
    if (!table || !table.available) {
      toast.error('Selected table is no longer available');
      return;
    }
    const reservation: Reservation = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      date: form.date,
      time: form.time,
      guests: parseInt(form.guests),
      tableId: form.tableId,
      tableName: table.name,
      createdAt: new Date().toISOString(),
    };
    addReservation(reservation);
    setSubmitted(true);
    toast.success('Table reserved successfully!');
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', date: '', time: '', guests: '', tableId: '' });
    }, 3000);
  };

  return (
    <section id="reserve" className="py-20 md:py-32 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-body text-warm-orange uppercase tracking-[0.2em] text-sm mb-3">Reservations</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Reserve Your Table</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Available Tables */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-2xl font-semibold mb-6">Available Tables</h3>
            <div className="grid grid-cols-2 gap-3">
              {tables.map(table => (
                <div
                  key={table.id}
                  className={`rounded-lg p-4 text-center transition-all duration-300 ${
                    table.available
                      ? 'bg-accent-foreground/10 border border-accent-foreground/20'
                      : 'bg-accent-foreground/5 border border-accent-foreground/10 opacity-50'
                  }`}
                >
                  <p className="font-display text-lg font-semibold">{table.name}</p>
                  <p className="font-body text-sm opacity-80">
                    <Users className="inline w-3.5 h-3.5 mr-1" />{table.seats} seats
                  </p>
                  <span className={`text-xs font-body mt-1 inline-block ${table.available ? 'text-green-400' : 'text-red-400'}`}>
                    {table.available ? '● Available' : '● Reserved'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-display text-2xl font-semibold">Reservation Confirmed!</h3>
                <p className="font-body text-sm opacity-80">We look forward to seeing you.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="res-name" className="font-body text-accent-foreground/80">Full Name</Label>
                  <Input id="res-name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/40 mt-1" required />
                </div>
                <div>
                  <Label htmlFor="res-phone" className="font-body text-accent-foreground/80">Phone Number</Label>
                  <Input id="res-phone" type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 234 567 890" className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/40 mt-1" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="res-date" className="font-body text-accent-foreground/80"><CalendarDays className="inline w-3.5 h-3.5 mr-1" />Date</Label>
                    <Input id="res-date" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground mt-1" required min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <Label className="font-body text-accent-foreground/80"><Clock className="inline w-3.5 h-3.5 mr-1" />Time</Label>
                    <Select value={form.time} onValueChange={v => setForm(f => ({ ...f, time: v }))}>
                      <SelectTrigger className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground mt-1">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="res-guests" className="font-body text-accent-foreground/80"><Users className="inline w-3.5 h-3.5 mr-1" />Guests</Label>
                    <Input id="res-guests" type="number" min="1" max="10" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} placeholder="2" className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground placeholder:text-accent-foreground/40 mt-1" required />
                  </div>
                  <div>
                    <Label className="font-body text-accent-foreground/80">Table</Label>
                    <Select value={form.tableId} onValueChange={v => setForm(f => ({ ...f, tableId: v }))}>
                      <SelectTrigger className="bg-accent-foreground/10 border-accent-foreground/20 text-accent-foreground mt-1">
                        <SelectValue placeholder="Select table" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTables.map(t => (
                          <SelectItem key={t.id} value={t.id}>{t.name} ({t.seats} seats)</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-warm-orange-light text-base py-6">
                  Book Now
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
