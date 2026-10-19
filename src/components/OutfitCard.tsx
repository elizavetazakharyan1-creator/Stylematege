import { Heart, ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
import type { GeneratedOutfit, WardrobeItem } from '../types';
import { categoryLabel } from '../constants';
import { outfitImageFor } from '../images';

interface OutfitCardProps {
  outfit: GeneratedOutfit;
  items: WardrobeItem[];
  saved: boolean;
  onSave: () => void;
  onShop: () => void;
  index?: number;
}

export function OutfitCard({ outfit, items, saved, onSave, onShop, index = 0 }: OutfitCardProps) {
  const outfitItems = outfit.itemIds
    .map((id) => items.find((i) => i.id === id))
    .filter((i): i is WardrobeItem => Boolean(i));

  const heroImage = outfitItems[0]?.imageUrl ?? outfitImageFor('unisex', index);

  return (
    <div className="card-hover overflow-hidden group animate-pop" style={{ animationDelay: `${index * 80}ms` }}>
      {/* Hero image with match score */}
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-100">
        <img
          src={heroImage}
          alt={outfit.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-ink-900 backdrop-blur">
          <TrendingUp size={13} className="text-electric-500" />
          {outfit.matchScore}% მატჩი
        </div>
        <h3 className="absolute bottom-3 left-4 right-4 font-display text-xl font-bold text-white">
          {outfit.title}
        </h3>
      </div>

      <div className="p-4">
        <p className="text-sm text-ink-600 leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {outfit.description}
        </p>

        {/* Item thumbnails (4) */}
        <div className="mt-3 grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => {
            const item = outfitItems[i];
            return (
              <div
                key={i}
                className="aspect-square rounded-xl overflow-hidden bg-ink-100 border border-ink-100"
              >
                {item?.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-ink-300">
                    <Sparkles size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Categories list */}
        {outfitItems.length > 0 && (
          <p className="mt-3 text-[11px] uppercase tracking-wider text-ink-400">
            {outfitItems.map((i) => categoryLabel(i.category)).join(' · ')}
          </p>
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={onSave}
            className={`btn flex-1 !py-2.5 !text-xs ${
              saved ? 'bg-hot-500 text-white' : 'btn-outline'
            }`}
          >
            <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
            {saved ? 'შენახულია' : 'ფავორიტად'}
          </button>
          <button onClick={onShop} className="btn-blue flex-1 !py-2.5 !text-xs">
            <ShoppingBag size={15} />
            მაღაზიაში
          </button>
        </div>
      </div>
    </div>
  );
}
