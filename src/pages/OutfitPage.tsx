import { useState } from 'react';
import { Sparkles, Loader2, Dices, ArrowRight, MapPin, Calendar, CloudSun, RefreshCw } from 'lucide-react';
import type { Weather, Occasion, Mood, Gender, GeneratedOutfit, WardrobeItem } from '../types';
import { WEATHERS, OCCASIONS, MOODS, GENDERS } from '../constants';
import { generateOutfits } from '../recommend';
import { OutfitCard } from '../components/OutfitCard';
import { EmptyState } from '../components/WardrobeCard';
import { Modal } from '../components/Modal';
import { ShopLinksList } from '../components/WardrobeCard';
import {
  CITIES,
  CATEGORY_LABEL,
  CATEGORY_TIP,
  fetchWeather,
  toISODate,
  dateLimits,
  type WeatherResult,
} from '../lib/weather';

interface OutfitPageProps {
  wardrobe: WardrobeItem[];
  saved: GeneratedOutfit[];
  saveOutfit: (o: GeneratedOutfit) => void;
  removeOutfit: (id: string) => void;
  prefs: { gender: Gender; style: string };
  setPrefsGender: (g: Gender) => void;
  setPage: (p: 'wardrobe') => void;
}

type Phase = 'idle' | 'loading' | 'done';

// Map the live weather category to the outfit generator's weather values.
function categoryToWeather(cat: WeatherResult['category']): Weather {
  if (cat === 'hot') return 'hot';
  if (cat === 'mild') return 'warm';
  if (cat === 'rainy') return 'rainy';
  return 'cold';
}

function weatherEmojiFor(w: Weather): string {
  return WEATHERS.find((x) => x.id === w)?.emoji ?? '☀️';
}

export function OutfitPage({
  wardrobe,
  saved,
  saveOutfit,
  removeOutfit,
  prefs,
  setPrefsGender,
  setPage,
}: OutfitPageProps) {
  const [weather, setWeather] = useState<Weather>('warm');
  const [occasion, setOccasion] = useState<Occasion>('everyday');
  const [mood, setMood] = useState<Mood>('comfy');
  const [gender, setGender] = useState<Gender>(prefs.gender);
  const [results, setResults] = useState<GeneratedOutfit[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [shopItem, setShopItem] = useState<string | null>(null);

  // Live weather state
  const [city, setCity] = useState<string>(CITIES[0].name);
  const [date, setDate] = useState<string>(toISODate(new Date()));
  const [liveWeather, setLiveWeather] = useState<WeatherResult | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const limits = dateLimits(14);

  const loadWeather = async (selectedCity?: string, selectedDate?: string) => {
    const c = selectedCity ?? city;
    const d = selectedDate ?? date;
    setWeatherLoading(true);
    setWeatherError(null);
    try {
      const result = await fetchWeather(d, c);
      setLiveWeather(result);
      const mapped = categoryToWeather(result.category);
      setWeather(mapped);
    } catch {
      setLiveWeather(null);
      setWeatherError('ამინდის მონაცემები ვერ მოიძებნა. აირჩიე ამინდი ხელით.');
    } finally {
      setWeatherLoading(false);
    }
  };

  const onCityChange = (c: string) => {
    setCity(c);
    loadWeather(c, date);
  };
  const onDateChange = (d: string) => {
    setDate(d);
    loadWeather(city, d);
  };

  const handleGenerate = (surprise = false) => {
    let w = weather;
    let o = occasion;
    let m = mood;
    if (surprise) {
      o = OCCASIONS[Math.floor(Math.random() * OCCASIONS.length)].id;
      m = MOODS[Math.floor(Math.random() * MOODS.length)].id;
      // Weather stays as-is (live or manual) — don't randomize it.
      setOccasion(o);
      setMood(m);
    }
    setPhase('loading');
    setResults([]);
    setTimeout(() => {
      const outfits = generateOutfits(wardrobe, w, o, m, gender, 3);
      setResults(outfits);
      setPhase('done');
    }, 1100);
  };

  const handleSave = (o: GeneratedOutfit) => {
    if (saved.some((s) => s.id === o.id)) {
      removeOutfit(o.id);
    } else {
      saveOutfit(o);
    }
  };

  return (
    <div className="container-app py-8 sm:py-12 animate-fade-in">
      <div className="mb-8">
        <p className="eyebrow">Outfit Generator</p>
        <h1 className="section-title mt-2">კომბინაციის შექმნა</h1>
        <p className="mt-2 text-ink-500">აირჩიე ამინდი, შემთხვევა და განწყობა — მიიღე 3 მზა ლუქი.</p>
      </div>

      {/* Live weather panel */}
      <div className="card p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="flex-1">
            <label className="label" htmlFor="city-select">
              <MapPin size={12} className="inline mr-1" /> ქალაქი
            </label>
            <select
              id="city-select"
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              className="input"
            >
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="label" htmlFor="date-select">
              <Calendar size={12} className="inline mr-1" /> თარიღი
            </label>
            <input
              id="date-select"
              type="date"
              value={date}
              min={limits.min}
              max={limits.max}
              onChange={(e) => onDateChange(e.target.value)}
              className="input"
            />
          </div>
          <button
            onClick={() => loadWeather()}
            disabled={weatherLoading}
            className="btn-outline !py-3 shrink-0"
          >
            {weatherLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <RefreshCw size={16} />
            )}
            ამინდი
          </button>
        </div>

        {/* Live weather display */}
        {liveWeather && (
          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl bg-electric-50/60 border border-electric-500/20 px-4 py-3 animate-pop">
            <CloudSun size={28} className="text-electric-500" />
            <div className="flex-1 min-w-[140px]">
              <p className="text-xs text-ink-500">
                {liveWeather.city} · {liveWeather.date}
              </p>
              <p className="font-display text-xl font-bold text-ink-900">
                {liveWeather.maxTemp}° / {liveWeather.minTemp}° · {CATEGORY_LABEL[liveWeather.category]}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-ink-400">წვიმის ალბათობა</p>
              <p className="font-semibold text-ink-700">{liveWeather.rainProbability}%</p>
            </div>
            <p className="w-full text-sm text-ink-600 italic">{CATEGORY_TIP[liveWeather.category]}</p>
          </div>
        )}

        {weatherError && (
          <p className="mt-3 text-sm text-hot-500 flex items-center gap-2">
            <span>⚠️</span> {weatherError}
          </p>
        )}

        {weatherLoading && !liveWeather && (
          <div className="mt-4 flex items-center gap-3 text-sm text-ink-500">
            <Loader2 size={16} className="animate-spin" /> ამინდის მოძიება...
          </div>
        )}
      </div>

      {/* Form card */}
      <div className="card p-5 sm:p-7 mb-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <FieldGroup label="ამინდი">
            <div className="flex flex-wrap gap-2">
              {WEATHERS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWeather(w.id)}
                  className={weather === w.id ? 'chip-blue' : 'chip-off'}
                >
                  <span>{w.emoji}</span> {w.label}
                </button>
              ))}
            </div>
            {liveWeather && (
              <p className="mt-2 text-[11px] text-ink-400">
                ავტომატურად დაყენდა: {weatherEmojiFor(weather)} {WEATHERS.find((x) => x.id === weather)?.label}
              </p>
            )}
          </FieldGroup>

          <FieldGroup label="სქესი / სტილი">
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setGender(g.id);
                    setPrefsGender(g.id);
                  }}
                  className={gender === g.id ? 'chip-pink' : 'chip-off'}
                >
                  <span>{g.emoji}</span> {g.label}
                </button>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup label="შემთხვევა">
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setOccasion(o.id)}
                  className={occasion === o.id ? 'chip-on' : 'chip-off'}
                >
                  <span>{o.emoji}</span> {o.label}
                </button>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup label="განწყობა">
            <div className="flex flex-wrap gap-2">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  className={mood === m.id ? 'chip-on' : 'chip-off'}
                >
                  <span>{m.emoji}</span> {m.label}
                </button>
              ))}
            </div>
          </FieldGroup>
        </div>

        <div className="mt-7 flex flex-wrap gap-3 pt-5 border-t border-ink-100">
          <button
            onClick={() => handleGenerate(false)}
            disabled={phase === 'loading'}
            className="btn-blue"
          >
            {phase === 'loading' ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Sparkles size={18} />
            )}
            კომბინაციის შექმნა
          </button>
          <button
            onClick={() => handleGenerate(true)}
            disabled={phase === 'loading'}
            className="btn-outline"
          >
            <Dices size={18} /> Surprise Me
          </button>
        </div>
      </div>

      {/* Results */}
      {phase === 'idle' && (
        <div className="card p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-electric-500/10 text-electric-500 mb-4">
            <Sparkles size={28} />
          </div>
          <h3 className="font-display text-2xl font-bold text-ink-900">აირჩიე პარამეტრები ზემოთ</h3>
          <p className="mt-2 text-ink-500 max-w-md mx-auto">
            დააჭირე „კომბინაციის შექმნა“-ს და მიიღებ 3 მზა ლუქს შენი კარადიდან.
          </p>
        </div>
      )}

      {phase === 'loading' && (
        <div className="grid sm:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="aspect-[4/5] bg-ink-100" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-ink-100 rounded w-3/4" />
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((j) => (
                    <div key={j} className="aspect-square bg-ink-100 rounded-xl" />
                  ))}
                </div>
                <div className="h-9 bg-ink-100 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      )}

      {phase === 'done' && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-2xl font-bold text-ink-900">შენი 3 კომბინაცია</h2>
            <button onClick={() => handleGenerate(false)} className="btn-ghost !py-2">
              <Dices size={16} /> თავიდან
            </button>
          </div>
          {results.length === 0 ? (
            <EmptyState
              icon={<Sparkles size={28} />}
              title="ვერ ვიპოვე კომბინაცია"
              message="სცადე სხვა პარამეტრები ან დაამატე მეტი ნივთი კარადაში."
              action={
                <button onClick={() => setPage('wardrobe')} className="btn-outline">
                  <ArrowRight size={16} /> კარადაში გადასვლა
                </button>
              }
            />
          ) : (
            <div className="grid sm:grid-cols-3 gap-5">
              {results.map((o, i) => (
                <OutfitCard
                  key={o.id}
                  outfit={o}
                  items={wardrobe}
                  saved={saved.some((s) => s.id === o.id)}
                  onSave={() => handleSave(o)}
                  onShop={() => setShopItem(o.title)}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Shop modal */}
      <Modal open={Boolean(shopItem)} onClose={() => setShopItem(null)} title="იპოვე მაღაზიაში" size="md">
        {shopItem && (
          <div className="space-y-4">
            <p className="text-sm text-ink-600">
              „<strong className="text-ink-900">{shopItem}</strong>“ — მოძებნე მსგავსი ნივთები ამ მაღაზიებში.
            </p>
            <ShopLinksList itemName={shopItem} />
          </div>
        )}
      </Modal>
    </div>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label">{label}</p>
      {children}
    </div>
  );
}
