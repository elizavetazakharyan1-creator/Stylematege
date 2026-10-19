import { Pencil, Trash2, Search, Sparkles, ShoppingBag } from 'lucide-react';
import type { WardrobeItem, ClothingCategory } from '../types';
import { categoryLabel, categoryEmoji, colorName, seasonLabel, SHOP_BRANDS, CATEGORIES } from '../constants';

interface WardrobeCardProps {
  item: WardrobeItem;
  onEdit?: () => void;
  onDelete?: () => void;
  onSelect?: () => void;
  selected?: boolean;
  showShop?: boolean;
}

export function WardrobeCard({
  item,
  onEdit,
  onDelete,
  onSelect,
  selected,
  showShop,
}: WardrobeCardProps) {
  return (
    <div
      className={`card-hover overflow-hidden group relative ${
        selected ? 'ring-2 ring-electric-500 shadow-glow' : ''
      }`}
    >
      {onSelect && (
        <button
          onClick={onSelect}
          className="absolute inset-0 z-10"
          aria-label={`${selected ? 'მოხსენი' : 'აირჩიე'} ${item.name}`}
        />
      )}
      <div className="relative aspect-square overflow-hidden bg-ink-100">
        <img
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-900 backdrop-blur">
          {categoryEmoji(item.category)} {categoryLabel(item.category)}
        </span>
        {selected && (
          <span className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-electric-500 text-white text-xs font-bold z-20">
            ✓
          </span>
        )}
        {(onEdit || onDelete) && !onSelect && (
          <div className="absolute top-2.5 right-2.5 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            {onEdit && (
              <button
                onClick={onEdit}
                className="rounded-full bg-white/95 p-2 text-ink-900 hover:bg-white shadow-soft"
                aria-label="რედაქტირება"
              >
                <Pencil size={13} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="rounded-full bg-white/95 p-2 text-hot-500 hover:bg-white shadow-soft"
                aria-label="წაშლა"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="font-display text-base font-semibold text-ink-900 leading-tight">{item.name}</h3>
        {item.brand && <p className="text-[11px] text-ink-400 mt-0.5">{item.brand}</p>}
        <div className="mt-2.5 flex items-center gap-1.5">
          <span
            className="h-4 w-4 rounded-full border border-ink-200"
            style={{ backgroundColor: item.color }}
            aria-hidden
          />
          <span className="text-[11px] text-ink-500">{colorName(item.color)}</span>
          <span className="text-[11px] text-ink-300">·</span>
          <span className="text-[11px] text-ink-500">{seasonLabel(item.season)}</span>
        </div>
        {showShop && item.shopUrl && (
          <a
            href={item.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-electric-500 hover:underline"
          >
            <ShoppingBag size={12} /> მაღაზიაში
          </a>
        )}
      </div>
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  message,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-16 text-center animate-fade-in">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 text-ink-400">
        {icon}
      </div>
      <h3 className="font-display text-2xl font-bold text-ink-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-ink-500">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'ძიება...',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative flex-1 min-w-[160px] max-w-xs">
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input !pl-10 !py-2.5"
        aria-label="ძიება"
      />
    </div>
  );
}

export function CategoryFilter({
  filter,
  setFilter,
  counts,
}: {
  filter: ClothingCategory | 'all';
  setFilter: (f: ClothingCategory | 'all') => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      <button onClick={() => setFilter('all')} className={filter === 'all' ? 'chip-on' : 'chip-off'}>
        ყველა ({counts.all ?? 0})
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => setFilter(c.id)}
          className={filter === c.id ? 'chip-on' : 'chip-off'}
        >
          {c.emoji} {c.label} ({counts[c.id] ?? 0})
        </button>
      ))}
    </div>
  );
}

export function ShopLinksList({ itemName }: { itemName: string }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {SHOP_BRANDS.map((b) => (
        <a
          key={b.name}
          href={b.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card flex items-center justify-between px-3 py-2.5 text-sm hover:border-electric-500 transition-colors"
        >
          <span className="font-semibold text-ink-900">{b.name}</span>
          <ShoppingBag size={15} className="text-ink-400" />
        </a>
      ))}
      <p className="col-span-2 text-[11px] text-ink-400 mt-1">
        „{itemName}“ — დემო ლინკები, რეალური გადახდის გარეშე.
      </p>
    </div>
  );
}

export function SparklesIcon() {
  return <Sparkles size={28} />;
}
