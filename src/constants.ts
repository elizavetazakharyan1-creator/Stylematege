import type { Weather, Occasion, Mood, Gender, ClothingCategory, Season } from './types';

export const WEATHERS: { id: Weather; label: string; emoji: string }[] = [
  { id: 'hot', label: 'ცხელი', emoji: '🔥' },
  { id: 'warm', label: 'თბილი', emoji: '☀️' },
  { id: 'rainy', label: 'წვიმიანი', emoji: '🌧️' },
  { id: 'cold', label: 'ცივი', emoji: '🥶' },
  { id: 'snowy', label: 'თოვლიანი', emoji: '❄️' },
];

export const OCCASIONS: { id: Occasion; label: string; emoji: string }[] = [
  { id: 'university', label: 'უნივერსიტეტი', emoji: '🎓' },
  { id: 'work', label: 'სამსახური', emoji: '💼' },
  { id: 'date', label: 'პაემანი', emoji: '💘' },
  { id: 'party', label: 'წვეულება', emoji: '🎉' },
  { id: 'travel', label: 'მოგზაურობა', emoji: '✈️' },
  { id: 'everyday', label: 'ყოველდღიური', emoji: '☕' },
];

export const MOODS: { id: Mood; label: string; emoji: string }[] = [
  { id: 'comfy', label: 'კომფორტული', emoji: '🛋️' },
  { id: 'elegant', label: 'ელეგანტური', emoji: '✨' },
  { id: 'energetic', label: 'ენერგიული', emoji: '⚡' },
  { id: 'minimalist', label: 'მინიმალისტური', emoji: '⚪' },
  { id: 'bold', label: 'ბოლდი', emoji: '💥' },
];

export const GENDERS: { id: Gender; label: string; emoji: string }[] = [
  { id: 'female', label: 'ქალის', emoji: '♀️' },
  { id: 'male', label: 'კაცის', emoji: '♂️' },
  { id: 'unisex', label: 'უნისექსი', emoji: '⚪' },
];

export const CATEGORIES: { id: ClothingCategory; label: string; emoji: string }[] = [
  { id: 'top', label: 'ზედა', emoji: '👕' },
  { id: 'bottom', label: 'ქვედა', emoji: '👖' },
  { id: 'outerwear', label: 'გარე ტანსაცმელი', emoji: '🧥' },
  { id: 'footwear', label: 'ფეხსაცმელი', emoji: '👟' },
  { id: 'accessory', label: 'აქსესუარი', emoji: '👜' },
];

export const SEASONS: { id: Season; label: string }[] = [
  { id: 'spring', label: 'გაზაფხული' },
  { id: 'summer', label: 'ზაფხული' },
  { id: 'autumn', label: 'შემოდგომა' },
  { id: 'winter', label: 'ზამთარი' },
  { id: 'all', label: 'ნებისმიერი' },
];

export const COLOR_SWATCHES: { hex: string; name: string }[] = [
  { hex: '#0A0B0E', name: 'შავი' },
  { hex: '#FFFFFF', name: 'თეთრი' },
  { hex: '#3B82F6', name: 'ლურჯი' },
  { hex: '#EC4899', name: 'ვარდისფერი' },
  { hex: '#6E6D49', name: 'ზეთისხილისფერი' },
  { hex: '#9C6650', name: 'თიხისფერი' },
  { hex: '#D9C9A9', name: 'ბეჟი' },
  { hex: '#5B6E7C', name: 'მუქი ლურჯი' },
  { hex: '#7A3B3B', name: 'ბორდო' },
  { hex: '#8AA37F', name: 'მწვანე' },
  { hex: '#C9A227', name: 'ყვითელი' },
  { hex: '#BDBDBD', name: 'ნაცრისფერი' },
];

export const STYLES = [
  'სტრიტვეარი',
  'კლასიკური',
  'ქეჟუალი',
  'სპორტული',
  'ბოჰემური',
  'მინიმალისტური',
];

export const SHOP_BRANDS = [
  { name: 'Zara', url: 'https://www.zara.com', emoji: '🛍️' },
  { name: 'H&M', url: 'https://www2.hm.com', emoji: '🛍️' },
  { name: 'Shein', url: 'https://www.shein.com', emoji: '🛍️' },
  { name: 'Temu', url: 'https://www.temu.com', emoji: '🛍️' },
];

export const weatherLabel = (id: Weather): string =>
  WEATHERS.find((w) => w.id === id)?.label ?? id;
export const weatherEmoji = (id: Weather): string =>
  WEATHERS.find((w) => w.id === id)?.emoji ?? '';
export const occasionLabel = (id: Occasion): string =>
  OCCASIONS.find((o) => o.id === id)?.label ?? id;
export const occasionEmoji = (id: Occasion): string =>
  OCCASIONS.find((o) => o.id === id)?.emoji ?? '';
export const moodLabel = (id: Mood): string =>
  MOODS.find((m) => m.id === id)?.label ?? id;
export const moodEmoji = (id: Mood): string =>
  MOODS.find((m) => m.id === id)?.emoji ?? '';
export const genderLabel = (id: Gender): string =>
  GENDERS.find((g) => g.id === id)?.label ?? id;
export const categoryLabel = (id: ClothingCategory): string =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;
export const categoryEmoji = (id: ClothingCategory): string =>
  CATEGORIES.find((c) => c.id === id)?.emoji ?? '';
export const seasonLabel = (id: Season): string =>
  SEASONS.find((s) => s.id === id)?.label ?? id;
export const colorName = (hex: string): string =>
  COLOR_SWATCHES.find((c) => c.hex.toUpperCase() === hex.toUpperCase())?.name ?? hex;
