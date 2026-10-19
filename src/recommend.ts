import type {
  WardrobeItem,
  Weather,
  Occasion,
  Mood,
  Gender,
  GeneratedOutfit,
} from './types';
import { uid } from './utils';
import { weatherLabel, occasionLabel, moodLabel } from './constants';

// Demo outfit templates — shown when wardrobe is sparse or as examples.
// Each references demo item ids that map to seeded wardrobe items.

interface OutfitTemplate {
  title: string;
  description: string;
  weather: Weather;
  occasion: Occasion;
  mood: Mood;
  gender: Gender;
  itemCategories: { category: WardrobeItem['category']; colorHint?: string }[];
}

const TEMPLATES: OutfitTemplate[] = [
  {
    title: 'სამოცი წუთის ლუქი',
    description: 'სწრაფი, სუფთა და მზადაა ყველაფრისთვის. ჯინსი + მაისური + სნიკერსი.',
    weather: 'warm',
    occasion: 'everyday',
    mood: 'comfy',
    gender: 'unisex',
    itemCategories: [
      { category: 'top', colorHint: '#FFFFFF' },
      { category: 'bottom', colorHint: '#5B6E7C' },
      { category: 'footwear' },
    ],
  },
  {
    title: 'ლექტორის ბლეიზერი',
    description: 'ჭკვიანი, მაგრამ არაძუნწი. ბლეიზერი მაისურზე, მზადაა პრეზენტაციისთვის.',
    weather: 'cold',
    occasion: 'university',
    mood: 'minimalist',
    gender: 'unisex',
    itemCategories: [
      { category: 'outerwear', colorHint: '#D9C9A9' },
      { category: 'top', colorHint: '#FFFFFF' },
      { category: 'bottom', colorHint: '#0A0B0E' },
      { category: 'footwear' },
    ],
  },
  {
    title: 'ღამის ქალაქი',
    description: 'ბოლდი და დამამახსოვრებელი. სწორედ ის, რაც წვეულებას მოითხოვს.',
    weather: 'warm',
    occasion: 'party',
    mood: 'bold',
    gender: 'female',
    itemCategories: [
      { category: 'top', colorHint: '#EC4899' },
      { category: 'bottom', colorHint: '#0A0B0E' },
      { category: 'footwear' },
      { category: 'accessory' },
    ],
  },
  {
    title: 'კოფი ბრეიკი',
    description: 'რბილი, თბილი და სასიამოვნო. პირველი პაემნის იდეალური ენერგია.',
    weather: 'cold',
    occasion: 'date',
    mood: 'comfy',
    gender: 'unisex',
    itemCategories: [
      { category: 'outerwear', colorHint: '#9C6650' },
      { category: 'top', colorHint: '#FFFFFF' },
      { category: 'bottom', colorHint: '#5B6E7C' },
    ],
  },
  {
    title: 'ოფისი 2.0',
    description: 'სმარტ ქეჟუალი — სერიოზული, მაგრამ არამოწყვეტილი. დასამახსოვრებელი პირველი შთაბეჭდილებისთვის.',
    weather: 'warm',
    occasion: 'work',
    mood: 'elegant',
    gender: 'unisex',
    itemCategories: [
      { category: 'outerwear', colorHint: '#0A0B0E' },
      { category: 'top', colorHint: '#FFFFFF' },
      { category: 'bottom', colorHint: '#5B6E7C' },
      { category: 'footwear' },
    ],
  },
  {
    title: 'აეროპორტის ფლოუ',
    description: 'კომფორტი პირველ ადგილას. ფენები, რომ ადვილად მოერგო ტემპერატურას.',
    weather: 'cold',
    occasion: 'travel',
    mood: 'comfy',
    gender: 'unisex',
    itemCategories: [
      { category: 'outerwear' },
      { category: 'top', colorHint: '#0A0B0E' },
      { category: 'bottom', colorHint: '#0A0B0E' },
      { category: 'footwear' },
    ],
  },
  {
    title: 'ზაფხულის ბრიზი',
    description: 'მსუბუქი, სასუნთქი და ფერადი. სწორედ ცხელ დღესთან ერთად.',
    weather: 'hot',
    occasion: 'everyday',
    mood: 'energetic',
    gender: 'female',
    itemCategories: [
      { category: 'top', colorHint: '#EC4899' },
      { category: 'bottom', colorHint: '#FFFFFF' },
      { category: 'footwear' },
    ],
  },
  {
    title: 'წვიმის დღე',
    description: 'ჭკვიანი ფენები და ჭკვიანი ფეხსაცმელი. სტილი წვიმაშიც შენარჩუნებული.',
    weather: 'rainy',
    occasion: 'everyday',
    mood: 'minimalist',
    gender: 'unisex',
    itemCategories: [
      { category: 'outerwear', colorHint: '#0A0B0E' },
      { category: 'top', colorHint: '#FFFFFF' },
      { category: 'bottom', colorHint: '#0A0B0E' },
      { category: 'footwear' },
    ],
  },
];

function seasonForWeather(w: Weather): string {
  if (w === 'hot') return 'summer';
  if (w === 'snowy' || w === 'cold') return 'winter';
  return 'all';
}

function pickItem(
  wardrobe: WardrobeItem[],
  category: WardrobeItem['category'],
  colorHint?: string,
  gender?: Gender,
  usedIds?: Set<string>
): WardrobeItem | undefined {
  let pool = wardrobe.filter((i) => i.category === category && (!usedIds || !usedIds.has(i.id)));
  if (gender && gender !== 'unisex') {
    const g = pool.filter((i) => i.gender === gender || i.gender === 'unisex');
    if (g.length) pool = g;
  }
  if (colorHint) {
    const byColor = pool.filter((i) => i.color.toUpperCase() === colorHint.toUpperCase());
    if (byColor.length) return byColor[0];
  }
  return pool[0];
}

export function generateOutfits(
  wardrobe: WardrobeItem[],
  weather: Weather,
  occasion: Occasion,
  mood: Mood,
  gender: Gender,
  count = 3
): GeneratedOutfit[] {
  const matching = TEMPLATES.filter(
    (t) => t.weather === weather && t.occasion === occasion && t.mood === mood
  );
  const fallback = TEMPLATES.filter(
    (t) => t.weather === weather && t.occasion === occasion
  );
  const weatherOnly = TEMPLATES.filter((t) => t.weather === weather);
  const pool = matching.length ? matching : fallback.length ? fallback : weatherOnly.length ? weatherOnly : TEMPLATES;

  const results: GeneratedOutfit[] = [];
  const usedTemplateTitles = new Set<string>();

  for (let i = 0; i < count && i < pool.length; i++) {
    const template = pool[i] ?? pool[i % pool.length];
    if (usedTemplateTitles.has(template.title)) continue;
    usedTemplateTitles.add(template.title);

    const usedIds = new Set<string>();
    const itemIds: string[] = [];
    template.itemCategories.forEach((spec) => {
      const item = pickItem(wardrobe, spec.category, spec.colorHint, gender, usedIds);
      if (item) {
        itemIds.push(item.id);
        usedIds.add(item.id);
      }
    });

    const matchScore = Math.min(
      98,
      72 + itemIds.length * 6 + Math.floor(Math.random() * 8)
    );

    const reason = buildReason(weather, occasion, mood, itemIds.length);

    results.push({
      id: uid(),
      title: template.title,
      description: template.description,
      itemIds,
      matchScore,
      reason,
    });
  }

  // Pad to count with shuffled variants if needed
  while (results.length < count && results.length < TEMPLATES.length) {
    const template = TEMPLATES[results.length % TEMPLATES.length];
    if (usedTemplateTitles.has(template.title)) {
      usedTemplateTitles.add(template.title + '_x');
      continue;
    }
    usedTemplateTitles.add(template.title);
    const usedIds = new Set<string>();
    const itemIds: string[] = [];
    template.itemCategories.forEach((spec) => {
      const item = pickItem(wardrobe, spec.category, spec.colorHint, gender, usedIds);
      if (item) {
        itemIds.push(item.id);
        usedIds.add(item.id);
      }
    });
    results.push({
      id: uid(),
      title: template.title,
      description: template.description,
      itemIds,
      matchScore: 70 + Math.floor(Math.random() * 15),
      reason: buildReason(weather, occasion, mood, itemIds.length),
    });
  }

  return results.slice(0, count);
}

function buildReason(weather: Weather, occasion: Occasion, mood: Mood, itemCount: number): string {
  const parts: string[] = [];
  parts.push(`${weatherLabel(weather)} ამინდისთვის შერჩეული ფენები`);
  parts.push(`${occasionLabel(occasion)} — ${moodLabel(mood)} განწყობა`);
  if (itemCount >= 4) parts.push('სრული ლუქი აქსესუარით');
  else if (itemCount >= 3) parts.push('ბალანსირებული ფენები');
  return parts.join(' · ');
}

// AI Matcher: create an outfit from selected items with explanation.
export function matchItems(items: WardrobeItem[]): GeneratedOutfit {
  const cats = new Set(items.map((i) => i.category));
  const hasTopOrOuter = cats.has('top') || cats.has('outerwear');
  const hasBottom = cats.has('bottom');
  const hasShoes = cats.has('footwear');

  const reasons: string[] = [];
  if (hasTopOrOuter && hasBottom) reasons.push('ზედა და ქვედა ნაწილი ერთმანეთს ეხმიანება');
  if (hasShoes) reasons.push('ფეხსაცმელი ავსებს სილუეტს');
  if (cats.has('accessory')) reasons.push('აქსესუარი დეტალს ამატებს');

  // Color harmony check
  const colors = items.map((i) => i.color.toUpperCase());
  const uniqueColors = new Set(colors);
  if (uniqueColors.size <= 2) reasons.push('ფერთა ჰარმონიული პალიტრა');
  else if (uniqueColors.size >= 4) reasons.push('ბოლდი ფერადი კონტრასტი');

  const score = Math.min(99, 60 + items.length * 8 + (reasons.length > 2 ? 8 : 0));

  return {
    id: uid(),
    title: 'შენი ანსამბლი',
    description: reasons.join(' · ') || 'კარგი კომბინაცია შენი კარადიდან',
    itemIds: items.map((i) => i.id),
    matchScore: score,
    reason: reasons.join(' · '),
  };
}
