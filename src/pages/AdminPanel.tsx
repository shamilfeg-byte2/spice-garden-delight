import { useState } from 'react';
import { useStore, type MenuItem, type Table } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Trash2, Plus, LogOut, UtensilsCrossed, CalendarDays, LayoutGrid, Edit2, Save, X } from 'lucide-react';

const ADMIN_PASSWORD = 'SPICEGARDEN@123';

const AdminPanel = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'menu' | 'reservations' | 'tables'>('reservations');
  const store = useStore();

  // Menu form
  const [menuForm, setMenuForm] = useState({ name: '', description: '', price: '', category: 'starters' as MenuItem['category'], image: 'starter' });
  const [editingMenu, setEditingMenu] = useState<string | null>(null);

  // Table form
  const [tableForm, setTableForm] = useState({ name: '', seats: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      toast.success('Welcome, Admin!');
    } else {
      toast.error('Incorrect password');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-card rounded-xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="font-body text-sm text-muted-foreground mt-2">Spice Garden Management</p>
          </div>
          <div>
            <Label htmlFor="admin-pw" className="font-body">Password</Label>
            <Input id="admin-pw" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password" className="mt-1" required />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-warm-orange-light">Login</Button>
        </form>
      </div>
    );
  }

  const addMenuItem = () => {
    if (!menuForm.name || !menuForm.price) { toast.error('Name and price are required'); return; }
    store.addMenuItem({
      id: crypto.randomUUID(),
      name: menuForm.name.trim(),
      description: menuForm.description.trim(),
      price: parseFloat(menuForm.price),
      category: menuForm.category,
      image: menuForm.image,
    });
    setMenuForm({ name: '', description: '', price: '', category: 'starters', image: 'starter' });
    toast.success('Menu item added');
  };

  const saveEditMenu = (id: string) => {
    store.updateMenuItem(id, {
      name: menuForm.name.trim(),
      description: menuForm.description.trim(),
      price: parseFloat(menuForm.price),
      category: menuForm.category,
      image: menuForm.image,
    });
    setEditingMenu(null);
    setMenuForm({ name: '', description: '', price: '', category: 'starters', image: 'starter' });
    toast.success('Menu item updated');
  };

  const startEditMenu = (item: MenuItem) => {
    setEditingMenu(item.id);
    setMenuForm({ name: item.name, description: item.description, price: item.price.toString(), category: item.category, image: item.image });
  };

  const addTable = () => {
    if (!tableForm.name || !tableForm.seats) { toast.error('Fill all fields'); return; }
    store.addTable({ id: crypto.randomUUID(), name: tableForm.name.trim(), seats: parseInt(tableForm.seats), available: true });
    setTableForm({ name: '', seats: '' });
    toast.success('Table added');
  };

  const tabs = [
    { key: 'reservations' as const, label: 'Reservations', icon: CalendarDays },
    { key: 'menu' as const, label: 'Menu', icon: UtensilsCrossed },
    { key: 'tables' as const, label: 'Tables', icon: LayoutGrid },
  ];

  const imageOptions = [
    { value: 'starter', label: 'Starter' },
    { value: 'main', label: 'Main Course' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'drink', label: 'Drink' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-xl font-bold text-foreground">Spice Garden Admin</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm"><a href="/">← Back to Site</a></Button>
          <Button variant="ghost" size="sm" onClick={() => setAuthenticated(false)}><LogOut className="w-4 h-4 mr-1" />Logout</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 flex gap-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 font-body text-sm border-b-2 transition-colors ${
                tab === t.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <t.icon className="w-4 h-4" />{t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* RESERVATIONS TAB */}
        {tab === 'reservations' && (
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Reservations ({store.reservations.length})</h2>
            {store.reservations.length === 0 ? (
              <p className="font-body text-muted-foreground text-center py-12">No reservations yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      {['Name', 'Phone', 'Date', 'Time', 'Guests', 'Table', 'Actions'].map(h => (
                        <th key={h} className="font-body text-xs uppercase text-muted-foreground py-3 px-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {store.reservations.map(r => (
                      <tr key={r.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="font-body py-3 px-3 text-sm text-foreground">{r.name}</td>
                        <td className="font-body py-3 px-3 text-sm text-muted-foreground">{r.phone}</td>
                        <td className="font-body py-3 px-3 text-sm text-muted-foreground">{r.date}</td>
                        <td className="font-body py-3 px-3 text-sm text-muted-foreground">{r.time}</td>
                        <td className="font-body py-3 px-3 text-sm text-muted-foreground">{r.guests}</td>
                        <td className="font-body py-3 px-3 text-sm text-muted-foreground">{r.tableName}</td>
                        <td className="py-3 px-3">
                          <Button variant="ghost" size="sm" onClick={() => { store.deleteReservation(r.id); toast.success('Reservation deleted, table freed'); }} className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* MENU TAB */}
        {tab === 'menu' && (
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Menu Items ({store.menuItems.length})</h2>
            {/* Add/Edit form */}
            <div className="bg-card rounded-xl p-6 shadow-sm mb-8 border border-border">
              <h3 className="font-display text-lg font-semibold mb-4">{editingMenu ? 'Edit Item' : 'Add New Item'}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <Label className="font-body text-xs">Name</Label>
                  <Input value={menuForm.name} onChange={e => setMenuForm(f => ({ ...f, name: e.target.value }))} placeholder="Dish name" className="mt-1" />
                </div>
                <div>
                  <Label className="font-body text-xs">Price ($)</Label>
                  <Input type="number" step="0.5" value={menuForm.price} onChange={e => setMenuForm(f => ({ ...f, price: e.target.value }))} placeholder="0.00" className="mt-1" />
                </div>
                <div>
                  <Label className="font-body text-xs">Category</Label>
                  <Select value={menuForm.category} onValueChange={v => setMenuForm(f => ({ ...f, category: v as MenuItem['category'] }))}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starters">Starters</SelectItem>
                      <SelectItem value="mains">Main Course</SelectItem>
                      <SelectItem value="desserts">Desserts</SelectItem>
                      <SelectItem value="drinks">Drinks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-body text-xs">Image Style</Label>
                  <Select value={menuForm.image} onValueChange={v => setMenuForm(f => ({ ...f, image: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {imageOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mb-4">
                <Label className="font-body text-xs">Description</Label>
                <Input value={menuForm.description} onChange={e => setMenuForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description" className="mt-1" />
              </div>
              <div className="flex gap-2">
                {editingMenu ? (
                  <>
                    <Button onClick={() => saveEditMenu(editingMenu)} className="bg-primary text-primary-foreground gap-1"><Save className="w-4 h-4" />Save</Button>
                    <Button variant="ghost" onClick={() => { setEditingMenu(null); setMenuForm({ name: '', description: '', price: '', category: 'starters', image: 'starter' }); }}><X className="w-4 h-4" />Cancel</Button>
                  </>
                ) : (
                  <Button onClick={addMenuItem} className="bg-primary text-primary-foreground gap-1"><Plus className="w-4 h-4" />Add Item</Button>
                )}
              </div>
            </div>

            {/* Items list */}
            <div className="space-y-2">
              {store.menuItems.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-card rounded-lg px-4 py-3 border border-border hover:shadow-sm transition-shadow">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-body text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary capitalize">{item.category}</span>
                      <span className="font-display font-semibold text-foreground truncate">{item.name}</span>
                      <span className="font-display font-bold text-primary">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="font-body text-xs text-muted-foreground mt-1 truncate">{item.description}</p>
                  </div>
                  <div className="flex gap-1 ml-3">
                    <Button variant="ghost" size="sm" onClick={() => startEditMenu(item)}><Edit2 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => { store.deleteMenuItem(item.id); toast.success('Item deleted'); }} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TABLES TAB */}
        {tab === 'tables' && (
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Tables ({store.tables.length})</h2>
            <div className="bg-card rounded-xl p-6 shadow-sm mb-8 border border-border">
              <h3 className="font-display text-lg font-semibold mb-4">Add New Table</h3>
              <div className="flex gap-4 items-end flex-wrap">
                <div>
                  <Label className="font-body text-xs">Table Name</Label>
                  <Input value={tableForm.name} onChange={e => setTableForm(f => ({ ...f, name: e.target.value }))} placeholder="Table 9" className="mt-1 w-40" />
                </div>
                <div>
                  <Label className="font-body text-xs">Seats</Label>
                  <Input type="number" min="1" value={tableForm.seats} onChange={e => setTableForm(f => ({ ...f, seats: e.target.value }))} placeholder="4" className="mt-1 w-24" />
                </div>
                <Button onClick={addTable} className="bg-primary text-primary-foreground gap-1"><Plus className="w-4 h-4" />Add</Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {store.tables.map(table => (
                <div key={table.id} className={`rounded-xl p-5 border transition-all ${table.available ? 'bg-card border-border' : 'bg-muted border-border'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-display text-lg font-semibold text-foreground">{table.name}</h4>
                    <Button variant="ghost" size="sm" onClick={() => { store.deleteTable(table.id); toast.success('Table removed'); }} className="text-destructive hover:text-destructive -mt-1 -mr-2">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="font-body text-sm text-muted-foreground mb-2">{table.seats} seats</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-body font-medium ${table.available ? 'text-green-600' : 'text-destructive'}`}>
                      {table.available ? '● Available' : '● Reserved'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { store.updateTable(table.id, { available: !table.available }); toast.success(`Table ${table.available ? 'marked reserved' : 'freed'}`); }}
                      className="text-xs h-7"
                    >
                      {table.available ? 'Mark Reserved' : 'Free Up'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
