import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  image: string;
}

export interface Table {
  id: string;
  name: string;
  seats: number;
  available: boolean;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableId: string;
  tableName: string;
  createdAt: string;
}

interface StoreState {
  menuItems: MenuItem[];
  tables: Table[];
  reservations: Reservation[];
  setMenuItems: (items: MenuItem[]) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  setTables: (tables: Table[]) => void;
  addTable: (table: Table) => void;
  updateTable: (id: string, table: Partial<Table>) => void;
  deleteTable: (id: string) => void;
  addReservation: (reservation: Reservation) => void;
  deleteReservation: (id: string) => void;
}

const defaultMenuItems: MenuItem[] = [
  { id: '1', name: 'Spiced Bruschetta', description: 'Toasted bread topped with spiced tomatoes, fresh herbs, and a drizzle of garlic oil', price: 8.5, category: 'starters', image: 'starter' },
  { id: '2', name: 'Samosa Platter', description: 'Crispy golden pastries filled with seasoned potatoes and peas, served with mint chutney', price: 9.0, category: 'starters', image: 'starter' },
  { id: '3', name: 'Spiced Soup', description: 'Creamy roasted tomato soup infused with cumin and coriander', price: 7.5, category: 'starters', image: 'starter' },
  { id: '4', name: 'Lamb Chops', description: 'Herb-crusted grilled lamb chops with roasted seasonal vegetables and red wine jus', price: 24.0, category: 'mains', image: 'main' },
  { id: '5', name: 'Butter Chicken', description: 'Tender chicken in rich, creamy tomato-butter sauce with aromatic spices', price: 18.5, category: 'mains', image: 'main' },
  { id: '6', name: 'Grilled Salmon', description: 'Pan-seared Atlantic salmon with lemon herb butter and asparagus', price: 22.0, category: 'mains', image: 'main' },
  { id: '7', name: 'Chocolate Lava Cake', description: 'Warm chocolate fondant with a molten center, served with vanilla ice cream', price: 12.0, category: 'desserts', image: 'dessert' },
  { id: '8', name: 'Gulab Jamun', description: 'Soft milk-solid dumplings soaked in rose-scented sugar syrup', price: 9.5, category: 'desserts', image: 'dessert' },
  { id: '9', name: 'Mango Lassi', description: 'Refreshing yogurt smoothie blended with ripe Alphonso mangoes', price: 6.0, category: 'drinks', image: 'drink' },
  { id: '10', name: 'Spiced Cocktail', description: 'House signature cocktail with cardamom-infused vodka and citrus', price: 14.0, category: 'drinks', image: 'drink' },
  { id: '11', name: 'Masala Chai', description: 'Traditional Indian tea brewed with aromatic spices and steamed milk', price: 4.5, category: 'drinks', image: 'drink' },
];

const defaultTables: Table[] = [
  { id: 't1', name: 'Table 1', seats: 2, available: true },
  { id: 't2', name: 'Table 2', seats: 2, available: true },
  { id: 't3', name: 'Table 3', seats: 4, available: true },
  { id: 't4', name: 'Table 4', seats: 4, available: true },
  { id: 't5', name: 'Table 5', seats: 6, available: true },
  { id: 't6', name: 'Table 6', seats: 6, available: true },
  { id: 't7', name: 'Table 7', seats: 8, available: true },
  { id: 't8', name: 'Table 8', seats: 8, available: true },
];

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch { return fallback; }
}

function saveToStorage(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const useStore = create<StoreState>((set, get) => ({
  menuItems: loadFromStorage('spice-garden-menu', defaultMenuItems),
  tables: loadFromStorage('spice-garden-tables', defaultTables),
  reservations: loadFromStorage('spice-garden-reservations', [] as Reservation[]),

  setMenuItems: (items) => { set({ menuItems: items }); saveToStorage('spice-garden-menu', items); },
  addMenuItem: (item) => { const items = [...get().menuItems, item]; set({ menuItems: items }); saveToStorage('spice-garden-menu', items); },
  updateMenuItem: (id, updates) => { const items = get().menuItems.map(i => i.id === id ? { ...i, ...updates } : i); set({ menuItems: items }); saveToStorage('spice-garden-menu', items); },
  deleteMenuItem: (id) => { const items = get().menuItems.filter(i => i.id !== id); set({ menuItems: items }); saveToStorage('spice-garden-menu', items); },

  setTables: (tables) => { set({ tables }); saveToStorage('spice-garden-tables', tables); },
  addTable: (table) => { const tables = [...get().tables, table]; set({ tables }); saveToStorage('spice-garden-tables', tables); },
  updateTable: (id, updates) => { const tables = get().tables.map(t => t.id === id ? { ...t, ...updates } : t); set({ tables }); saveToStorage('spice-garden-tables', tables); },
  deleteTable: (id) => { const tables = get().tables.filter(t => t.id !== id); set({ tables }); saveToStorage('spice-garden-tables', tables); },

  addReservation: (reservation) => {
    const reservations = [...get().reservations, reservation];
    const tables = get().tables.map(t => t.id === reservation.tableId ? { ...t, available: false } : t);
    set({ reservations, tables });
    saveToStorage('spice-garden-reservations', reservations);
    saveToStorage('spice-garden-tables', tables);
  },
  deleteReservation: (id) => {
    const reservation = get().reservations.find(r => r.id === id);
    const reservations = get().reservations.filter(r => r.id !== id);
    let tables = get().tables;
    if (reservation) {
      tables = tables.map(t => t.id === reservation.tableId ? { ...t, available: true } : t);
    }
    set({ reservations, tables });
    saveToStorage('spice-garden-reservations', reservations);
    saveToStorage('spice-garden-tables', tables);
  },
}));
