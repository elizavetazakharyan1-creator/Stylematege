import { useState } from 'react';
import { Wand2, RefreshCw, Check, Heart, Sparkles, TrendingUp } from 'lucide-react';
import type { WardrobeItem, GeneratedOutfit } from '../types';
import { matchItems } from '../recommend';
import { EmptyState, WardrobeCard, SearchBar, CategoryFilter } from '../components/WardrobeCard';
import { categoryLabel } from '../constants';
import type { ClothingCategory } from '../types';

interface MatcherPageProps {
  wardrobe: WardrobeItem[];
  saved: GeneratedOutfit[];
  saveOutfit: (o: GeneratedOutfit) => void;
  removeOutfit: (id: string) => void;
  setPage: (p: 'wardrobe') => void;
}

export function MatcherPage({ wardrobe, saved, saveOutfit, removeOutfit, setPage }: MatcherPageProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [result, setResult] = useState<GeneratedOutfit | null>(null);
  const [filter, setFilter] = useState<ClothingCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) return prev; // max 4
      return [...prev, id];
    });
  };

  const handleMatch = () => {
    const items = selectedIds
      .map((id) => wardrobe.find((i) => i.id === id))
      .filter((i): i is WardrobeItem => Boolean(i));
    if (items.length < 2) return;
    setResult(matchItems(items));
  };

  const reset = () => {
    setSelectedIds([]);
    setResult(null);
  };

  const selectedItems = selectedIds
    .map((id) => wardrobe.find((i) => i.id === id))
    .filter((i): i is WardrobeItem => Boolean(i));

  const filtered = wardrobe
    .filter((i) => filter === 'all' || i.category === filter)
    .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  const counts: Record<string, number> = { all: wardrobe.length };
  ['top', 'bottom', 'outerwear', 'footwear', 'accessory'].forEach((c) => {
    counts[c] = wardrobe.filter((i) => i.category === c).length;
  });

  const isSaved = result ? saved.some((s) => s.id === result.id) : false;

  return (
    <div className="container-app py-8 sm:py-12 pb-28 md:pb-12 animate-fade-in">
      <div className="mb-8">
        <p className="eyebrow">AI Outfit Matcher</p>
        <h1 className="section-title mt-2">აირჩიე ნივთები, მიიღე კომბინაცია</h1>
        <p className="mt-2 text-ink-500">მონიშნე 2–4 ნივთი კარადიდან — StyleMate გითხრა რატომ ერთვის ერთმანეთს.</p>
      </div>

      {wardrobe.length === 0 ? (
        <EmptyState
          icon={<Wand2 size={28} />}
          title="კარადა ცარიელია"
          message="ჯერ დაამატე ნივთები კარადაში, რომ Matcher-ით ისარგებლო."
          action={
            <button onClick={() => setPage('wardrobe')} className="btn-blue">
              <Sparkles size={16} /> კარადაში გადასვლა
            </button>
          }
        />
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Picker */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-display text-lg font-bold text-ink-900">
                არჩეული: <span className="text-electric-500">{selectedIds.length}</span>/4
              </p>
              {selectedIds.length > 0 && (
                <button onClick={reset} className="btn-ghost !py-1.5 !text-xs">
                  გასუფთავება
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <SearchBar value={search} onChange={setSearch} />
              <CategoryFilter filter={filter} setFilter={setFilter} counts={counts} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <WardrobeCard
                  key={item.id}
                  item={item}
                  onSelect={() => toggle(item.id)}
                  selected={selectedIds.includes(item.id)}
                />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-sm text-ink-400 py-8">ვერ მოიძებნა ნივთი.</p>
            )}
          </div>

          {/* Result panel */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Wand2 size={18} className="text-electric-500" />
                <h2 className="font-display text-lg font-bold text-ink-900">შენი კომბინაცია</h2>
              </div>

              {selectedItems.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-ink-200 p-8 text-center">
                  <Sparkles size={26} className="mx-auto text-ink-300 mb-2" />
                  <p className="text-sm text-ink-400">
                    აირჩიე მინიმუმ 2 ნივთი კარადიდან კომბინაციის შესაქმნელად.
                  </p>
                </div>
              )}

              {selectedItems.length > 0 && (
                <div className="space-y-3 mb-4">
                  <p className="label !mb-1">არჩეული ნივთები</p>
                  {selectedItems.map((i) => (
                    <div key={i.id} className="flex items-center gap-3 rounded-2xl bg-ink-50 p-2.5">
                      <div className="h-12 w-12 rounded-xl overflow-hidden bg-ink-100 shrink-0">
                        <img src={i.imageUrl} alt={i.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-ink-900 truncate">{i.name}</p>
                        <p className="text-[11px] text-ink-400">{categoryLabel(i.category)}</p>
                      </div>
                      <button
                        onClick={() => toggle(i.id)}
                        className="text-ink-400 hover:text-hot-500 p-1"
                        aria-label="მოხსნა"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleMatch}
                disabled={selectedItems.length < 2}
                className="btn-blue w-full"
              >
                <Wand2 size={18} /> კომბინაციის შექმნა
              </button>

              {result && (
                <div className="mt-5 animate-pop">
                  <div className="rounded-2xl border border-electric-500/30 bg-electric-50/50 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display text-lg font-bold text-ink-900">{result.title}</h3>
                      <span className="flex items-center gap-1 rounded-full bg-electric-500 px-2.5 py-1 text-xs font-bold text-white">
                        <TrendingUp size={12} /> {result.matchScore}%
                      </span>
                    </div>
                    <p className="text-sm text-ink-600 leading-relaxed">{result.description}</p>

                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {selectedItems.map((i) => (
                        <div key={i.id} className="aspect-square rounded-xl overflow-hidden bg-ink-100">
                          <img src={i.imageUrl} alt={i.name} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => (isSaved ? removeOutfit(result.id) : saveOutfit(result))}
                        className={`btn flex-1 !py-2.5 !text-xs ${
                          isSaved ? 'bg-hot-500 text-white' : 'btn-outline'
                        }`}
                      >
                        <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
                        {isSaved ? 'შენახულია' : 'შენახვა'}
                      </button>
                      <button onClick={handleMatch} className="btn-outline !py-2.5 !text-xs">
                        <RefreshCw size={14} /> ცდი სხვა
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
