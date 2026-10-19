export type Weather = 'hot' | 'warm' | 'rainy' | 'cold' | 'snowy';

export type Occasion = 'university' | 'work' | 'date' | 'party' | 'travel' | 'everyday';

export type Mood = 'comfy' | 'elegant' | 'energetic' | 'minimalist' | 'bold';

export type Gender = 'female' | 'male' | 'unisex';

export type ClothingCategory = 'top' | 'bottom' | 'outerwear' | 'footwear' | 'accessory';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'all';

export interface WardrobeItem {
  id: string;
  name: string;
  category: ClothingCategory;
  color: string;
  colorName: string;
  season: Season;
  style: string;
  gender: Gender;
  imageUrl: string;
  brand?: string;
  shopUrl?: string;
  createdAt: number;
}

export interface Outfit {
  id: string;
  title: string;
  description: string;
  weather: Weather;
  occasion: Occasion;
  mood: Mood;
  gender: Gender;
  itemIds: string[];
  createdAt: number;
}

export interface Prefs {
  gender: Gender;
  style: string;
}

export interface GeneratedOutfit {
  id: string;
  title: string;
  description: string;
  itemIds: string[];
  matchScore: number;
  reason: string;
}
