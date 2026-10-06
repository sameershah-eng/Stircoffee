export interface CoffeeBean {
  id: string;
  name: string;
  roaster: string;
  roasterLocation: string;
  origin: string;
  process: string;
  variety: string;
  altitude: string;
  tastingNotes: string[];
  roastProfile: 'Light' | 'Medium-Light' | 'Omni-Roast';
  price: number;
  weight: string;
  inStock: boolean;
  featured?: boolean;
  badge?: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: 'espresso' | 'filter' | 'iced' | 'food';
  originOrRoaster?: string;
  dietary?: string;
  tags?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'coffee' | 'food' | 'lates' | 'community' | 'space';
  image: string;
  likes: number;
  date: string;
  caption: string;
  isVideo?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  genre: string;
  description: string;
  spotsLeft: number;
}

export interface BrewMethod {
  id: string;
  name: string;
  ratio: number; // e.g. 1:16
  grind: string;
  temp: string;
  time: string;
  instructions: string[];
}
