import type { WardrobeItem, ClothingCategory, Season, Gender } from './types';
import { ITEM_IMAGES } from './images';

// Seed wardrobe — 40 items derived from the provided catalog.
// Colors are mapped from item names; seasons and styles assigned to match
// sensible styling rules for the recommendation engine.

interface SeedSpec {
  id: string;
  name: string;
  category: ClothingCategory;
  color: string;
  colorName: string;
  season: Season;
  style: string;
  gender: Gender;
  image: string;
  brand: string;
}

const SPECS: SeedSpec[] = [
  // T-shirts
  { id: 'tee-1', name: 'თეთრი ბამბის მაისური', category: 'top', color: '#FFFFFF', colorName: 'თეთრი', season: 'summer', style: 'მინიმალისტური', gender: 'unisex', image: ITEM_IMAGES.teeWhite, brand: 'Uniqlo' },
  { id: 'tee-2', name: 'შავი ბამბის მაისური', category: 'top', color: '#0A0B0E', colorName: 'შავი', season: 'all', style: 'მინიმალისტური', gender: 'unisex', image: ITEM_IMAGES.teeBlack, brand: 'H&M' },
  { id: 'tee-3', name: 'ზოლიანი ბამბის მაისური', category: 'top', color: '#3B82F6', colorName: 'ლურჯი', season: 'summer', style: 'ქეჟუალი', gender: 'unisex', image: ITEM_IMAGES.teeStripe, brand: 'Zara' },
  // Shirts
  { id: 'shirt-1', name: 'თეთრი პერანგი', category: 'top', color: '#FFFFFF', colorName: 'თეთრი', season: 'all', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.shirtWhite, brand: 'Zara' },
  { id: 'shirt-2', name: 'ლურჯი პერანგი', category: 'top', color: '#5B6E7C', colorName: 'მუქი ლურჯი', season: 'all', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.shirtBlue, brand: 'COS' },
  { id: 'shirt-3', name: 'ბეჟი პერანგი', category: 'top', color: '#D9C9A9', colorName: 'ბეჟი', season: 'summer', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.shirtBeige, brand: 'Massimo Dutti' },
  // Knits
  { id: 'knit-1', name: 'ბეჟი სვიტერი', category: 'top', color: '#D9C9A9', colorName: 'ბეჟი', season: 'winter', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.knitBeige, brand: 'COS' },
  { id: 'knit-2', name: 'ნაცრისფერი სვიტერი', category: 'top', color: '#BDBDBD', colorName: 'ნაცრისფერი', season: 'winter', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.knitGray, brand: 'Uniqlo' },
  { id: 'knit-3', name: 'შავი სვიტერი', category: 'top', color: '#0A0B0E', colorName: 'შავი', season: 'winter', style: 'მინიმალისტური', gender: 'unisex', image: ITEM_IMAGES.knitBlack, brand: 'H&M' },
  // Hoodies
  { id: 'hood-1', name: 'ნაცრისფერი ჰუდი', category: 'top', color: '#BDBDBD', colorName: 'ნაცრისფერი', season: 'all', style: 'სტრიტვეარი', gender: 'unisex', image: ITEM_IMAGES.hoodGray, brand: 'Carhartt' },
  { id: 'hood-2', name: 'შავი ჰუდი', category: 'top', color: '#0A0B0E', colorName: 'შავი', season: 'all', style: 'სტრიტვეარი', gender: 'unisex', image: ITEM_IMAGES.hoodBlack, brand: 'Nike' },
  { id: 'hood-3', name: 'ლურჯი ჰუდი', category: 'top', color: '#3B82F6', colorName: 'ლურჯი', season: 'all', style: 'სპორტული', gender: 'unisex', image: ITEM_IMAGES.hoodBlue, brand: 'Adidas' },
  // Jeans
  { id: 'jeans-1', name: 'ლურჯი ჯინსი', category: 'bottom', color: '#3B82F6', colorName: 'ლურჯი', season: 'all', style: 'ქეჟუალი', gender: 'unisex', image: ITEM_IMAGES.jeansBlue, brand: "Levi's" },
  { id: 'jeans-2', name: 'შავი ჯინსი', category: 'bottom', color: '#0A0B0E', colorName: 'შავი', season: 'all', style: 'სტრიტვეარი', gender: 'unisex', image: ITEM_IMAGES.jeansBlack, brand: "Levi's" },
  { id: 'jeans-3', name: 'ნაცრისფერი ჯინსი', category: 'bottom', color: '#BDBDBD', colorName: 'ნაცრისფერი', season: 'all', style: 'ქეჟუალი', gender: 'unisex', image: ITEM_IMAGES.jeansGray, brand: 'Zara' },
  // Trousers
  { id: 'pants-1', name: 'შავი კლასიკური შარვალი', category: 'bottom', color: '#0A0B0E', colorName: 'შავი', season: 'all', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.pantsBlack, brand: 'H&M' },
  { id: 'pants-2', name: 'ნაცრისფერი კლასიკური შარვალი', category: 'bottom', color: '#BDBDBD', colorName: 'ნაცრისფერი', season: 'all', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.pantsGray, brand: 'COS' },
  { id: 'pants-3', name: 'ბეჟი კლასიკური შარვალი', category: 'bottom', color: '#D9C9A9', colorName: 'ბეჟი', season: 'summer', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.pantsBeige, brand: 'Massimo Dutti' },
  // Shorts
  { id: 'shorts-1', name: 'ლურჯი შორტი', category: 'bottom', color: '#3B82F6', colorName: 'ლურჯი', season: 'summer', style: 'ქეჟუალი', gender: 'unisex', image: ITEM_IMAGES.shortsBlue, brand: 'H&M' },
  { id: 'shorts-2', name: 'ბეჟი შორტი', category: 'bottom', color: '#D9C9A9', colorName: 'ბეჟი', season: 'summer', style: 'ქეჟუალი', gender: 'unisex', image: ITEM_IMAGES.shortsBeige, brand: 'Zara' },
  { id: 'shorts-3', name: 'თეთრი შორტი', category: 'bottom', color: '#FFFFFF', colorName: 'თეთრი', season: 'summer', style: 'მინიმალისტური', gender: 'unisex', image: ITEM_IMAGES.shortsWhite, brand: 'Uniqlo' },
  // Sneakers
  { id: 'sneak-1', name: 'თეთრი სპორტული ფეხსაცმელი', category: 'footwear', color: '#FFFFFF', colorName: 'თეთრი', season: 'all', style: 'სტრიტვეარი', gender: 'unisex', image: ITEM_IMAGES.sneakWhite, brand: 'Nike' },
  { id: 'sneak-2', name: 'შავი სპორტული ფეხსაცმელი', category: 'footwear', color: '#0A0B0E', colorName: 'შავი', season: 'all', style: 'სტრიტვეარი', gender: 'unisex', image: ITEM_IMAGES.sneakBlack, brand: 'Adidas' },
  { id: 'sneak-3', name: 'ნაცრისფერი სპორტული ფეხსაცმელი', category: 'footwear', color: '#BDBDBD', colorName: 'ნაცრისფერი', season: 'all', style: 'სპორტული', gender: 'unisex', image: ITEM_IMAGES.sneakGray, brand: 'New Balance' },
  // Boots
  { id: 'boots-1', name: 'შავი ბოტინკები', category: 'footwear', color: '#0A0B0E', colorName: 'შავი', season: 'winter', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.bootsBlack, brand: 'Dr. Martens' },
  { id: 'boots-2', name: 'ბეჟი ბოტინკები', category: 'footwear', color: '#D9C9A9', colorName: 'ბეჟი', season: 'autumn', style: 'კლასიკური', gender: 'female', image: ITEM_IMAGES.bootsBeige, brand: 'Zara' },
  { id: 'boots-3', name: 'ლურჯი ბოტინკები', category: 'footwear', color: '#5B6E7C', colorName: 'მუქი ლურჯი', season: 'autumn', style: 'ქეჟუალი', gender: 'unisex', image: ITEM_IMAGES.bootsBlue, brand: 'Clarks' },
  // Loafers
  { id: 'loaf-1', name: 'შავი ლოფერები', category: 'footwear', color: '#0A0B0E', colorName: 'შავი', season: 'all', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.loafBlack, brand: 'Gucci' },
  { id: 'loaf-2', name: 'ბეჟი ლოფერები', category: 'footwear', color: '#D9C9A9', colorName: 'ბეჟი', season: 'summer', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.loafBeige, brand: 'Massimo Dutti' },
  { id: 'loaf-3', name: 'ლურჯი ლოფერები', category: 'footwear', color: '#3B82F6', colorName: 'ლურჯი', season: 'all', style: 'კლასიკური', gender: 'male', image: ITEM_IMAGES.loafBlue, brand: 'Tod\'s' },
  // Light jackets
  { id: 'jack-1', name: 'ლურჯი მსუბუქი ქურთუკი', category: 'outerwear', color: '#3B82F6', colorName: 'ლურჯი', season: 'spring', style: 'ქეჟუალი', gender: 'unisex', image: ITEM_IMAGES.jackBlue, brand: 'Zara' },
  { id: 'jack-2', name: 'მწვანე მსუბუქი ქურთუკი', category: 'outerwear', color: '#8AA37F', colorName: 'მწვანე', season: 'spring', style: 'სტრიტვეარი', gender: 'unisex', image: ITEM_IMAGES.jackGreen, brand: 'Carhartt' },
  { id: 'jack-3', name: 'შავი მსუბუქი ქურთუკი', category: 'outerwear', color: '#0A0B0E', colorName: 'შავი', season: 'all', style: 'სტრიტვეარი', gender: 'unisex', image: ITEM_IMAGES.jackBlack, brand: 'H&M' },
  // Coats
  { id: 'coat-1', name: 'ბეჟი პალტო', category: 'outerwear', color: '#D9C9A9', colorName: 'ბეჟი', season: 'winter', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.coatBeige, brand: 'Massimo Dutti' },
  { id: 'coat-2', name: 'შავი პალტო', category: 'outerwear', color: '#0A0B0E', colorName: 'შავი', season: 'winter', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.coatBlack, brand: 'COS' },
  { id: 'coat-3', name: 'ნაცრისფერი პალტო', category: 'outerwear', color: '#BDBDBD', colorName: 'ნაცრისფერი', season: 'winter', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.coatGray, brand: 'H&M' },
  // Raincoats
  { id: 'rain-1', name: 'მწვანე წვიმის ქურთუკი', category: 'outerwear', color: '#8AA37F', colorName: 'მწვანე', season: 'autumn', style: 'ქეჟუალი', gender: 'unisex', image: ITEM_IMAGES.rainGreen, brand: 'Stutterheim' },
  { id: 'rain-2', name: 'ლურჯი წვიმის ქურთუკი', category: 'outerwear', color: '#3B82F6', colorName: 'ლურჯი', season: 'autumn', style: 'ქეჟუალი', gender: 'unisex', image: ITEM_IMAGES.rainBlue, brand: 'Rains' },
  { id: 'rain-3', name: 'შავი წვიმის ქურთუკი', category: 'outerwear', color: '#0A0B0E', colorName: 'შავი', season: 'autumn', style: 'მინიმალისტური', gender: 'unisex', image: ITEM_IMAGES.rainBlack, brand: 'Uniqlo' },
  // Extra tops — more colors
  { id: 'tee-4', name: 'წითელი მაისური', category: 'top', color: '#DC2626', colorName: 'წითელი', season: 'summer', style: 'ქეჟუალი', gender: 'unisex', image: ITEM_IMAGES.teeRed, brand: 'H&M' },
  { id: 'tee-5', name: 'თეთრი პოლო მაისური', category: 'top', color: '#FFFFFF', colorName: 'თეთრი', season: 'summer', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.teeWhite, brand: 'Lacoste' },
  // Extra outerwear
  { id: 'jack-4', name: 'ყავისფერი ტყავის ქურთუკი', category: 'outerwear', color: '#6B4226', colorName: 'ყავისფერი', season: 'autumn', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.leatherJacket, brand: 'AllSaints' },
  // Extra footwear
  { id: 'sneak-4', name: 'თეთრი სპორტული ფეხსაცმელი 2', category: 'footwear', color: '#FFFFFF', colorName: 'თეთრი', season: 'summer', style: 'სპორტული', gender: 'unisex', image: ITEM_IMAGES.sneakWhite2, brand: 'Adidas' },
  // Accessories — bags
  { id: 'bag-1', name: 'შავი ტყავის ჩანთა', category: 'accessory', color: '#0A0B0E', colorName: 'შავი', season: 'all', style: 'კლასიკური', gender: 'female', image: ITEM_IMAGES.bagBlack, brand: 'Zara' },
  { id: 'bag-2', name: 'ყავისფერი ტყავის ჩანთა', category: 'accessory', color: '#6B4226', colorName: 'ყავისფერი', season: 'all', style: 'კლასიკური', gender: 'female', image: ITEM_IMAGES.bagBrown, brand: 'Massimo Dutti' },
  { id: 'bag-3', name: 'ბეჟი ჩანთა', category: 'accessory', color: '#D9C9A9', colorName: 'ბეჟი', season: 'summer', style: 'მინიმალისტური', gender: 'female', image: ITEM_IMAGES.bagBeige, brand: 'COS' },
  { id: 'bag-4', name: 'შავი ტოტე ჩანთა', category: 'accessory', color: '#0A0B0E', colorName: 'შავი', season: 'all', style: 'მინიმალისტური', gender: 'unisex', image: ITEM_IMAGES.bagTote, brand: 'Baggu' },
  { id: 'bag-5', name: 'შავი ბექფექი', category: 'accessory', color: '#0A0B0E', colorName: 'შავი', season: 'all', style: 'სტრიტვეარი', gender: 'unisex', image: ITEM_IMAGES.backpack, brand: 'Nike' },
  // Accessories — belts
  { id: 'belt-1', name: 'ყავისფერი ტყავის სარტყელი', category: 'accessory', color: '#6B4226', colorName: 'ყავისფერი', season: 'all', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.belt, brand: 'H&M' },
  // Accessories — watches
  { id: 'watch-1', name: 'შავი საათი', category: 'accessory', color: '#0A0B0E', colorName: 'შავი', season: 'all', style: 'მინიმალისტური', gender: 'unisex', image: ITEM_IMAGES.watchBlack, brand: 'Daniel Wellington' },
  { id: 'watch-2', name: 'ყავისფერი საათი', category: 'accessory', color: '#6B4226', colorName: 'ყავისფერი', season: 'all', style: 'კლასიკური', gender: 'male', image: ITEM_IMAGES.watchBrown, brand: 'Omega' },
  { id: 'watch-3', name: 'ლურჯი საათი', category: 'accessory', color: '#3B82F6', colorName: 'ლურჯი', season: 'all', style: 'სპორტული', gender: 'male', image: ITEM_IMAGES.watchBlue, brand: 'Omega' },
  // Accessories — sunglasses
  { id: 'sun-1', name: 'შავი მზის სათვალე', category: 'accessory', color: '#0A0B0E', colorName: 'შავი', season: 'summer', style: 'სტრიტვეარი', gender: 'unisex', image: ITEM_IMAGES.sunglasses, brand: 'Ray-Ban' },
  { id: 'sun-2', name: 'ყავისფერი მზის სათვალე', category: 'accessory', color: '#6B4226', colorName: 'ყავისფერი', season: 'summer', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.sunglassesBrown, brand: 'Persol' },
  // Accessories — winter
  { id: 'scarf-1', name: 'ნაცრისფერი შარფი', category: 'accessory', color: '#BDBDBD', colorName: 'ნაცრისფერი', season: 'winter', style: 'კლასიკური', gender: 'unisex', image: ITEM_IMAGES.scarf, brand: 'COS' },
  { id: 'beanie-1', name: 'შავი ბენი', category: 'accessory', color: '#0A0B0E', colorName: 'შავი', season: 'winter', style: 'სტრიტვეარი', gender: 'unisex', image: ITEM_IMAGES.beanie, brand: 'Carhartt' },
  { id: 'cap-1', name: 'შავი ბეისბოლური ქუდი', category: 'accessory', color: '#0A0B0E', colorName: 'შავი', season: 'summer', style: 'სტრიტვეარი', gender: 'unisex', image: ITEM_IMAGES.cap, brand: 'New Era' },
];

export const SEED_WARDROBE: WardrobeItem[] = SPECS.map((s, i) => ({
  id: s.id,
  name: s.name,
  category: s.category,
  color: s.color,
  colorName: s.colorName,
  season: s.season,
  style: s.style,
  gender: s.gender,
  imageUrl: s.image,
  brand: s.brand,
  createdAt: Date.now() - (SPECS.length - i) * 1000,
}));
