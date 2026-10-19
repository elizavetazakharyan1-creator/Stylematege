import { useState } from 'react';
import { Plus, Shirt, Sparkles, Upload, Link as LinkIcon } from 'lucide-react';
import type { WardrobeItem, ClothingCategory, Season, Gender } from '../types';
import { CATEGORIES, SEASONS, COLOR_SWATCHES, STYLES, GENDERS, categoryLabel } from '../constants';
import { ITEM_IMAGES } from '../images';
import { uid } from '../utils';
import { Modal } from '../components/Modal';
import { WardrobeCard, EmptyState, SearchBar, CategoryFilter } from '../components/WardrobeCard';

interface WardrobePageProps {
  wardrobe: WardrobeItem[];
  add: (item: WardrobeItem) => void;
  update: (item: WardrobeItem) => void;
  remove: (id: string) => void;
}

interface FormState {
  id?: string;
  name: string;
  category: ClothingCategory;
  color: string;
  season: Season;
  style: string;
  gender: Gender;
  imageUrl: string;
  brand: string;
  shopUrl: string;
}

const EMPTY: FormState = {
  name: '',
  category: 'top',
  color: '#0A0B0E',
  season: 'all',
  style: STYLES[0],
  gender: 'unisex',
  imageUrl: '',
  brand: '',
  shopUrl: '',
};

export function WardrobePage({ wardrobe, add, update, remove }: WardrobePageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [filter, setFilter] = useState<ClothingCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const openAdd = () => {
    setForm(EMPTY);
    setModalOpen(true);
  };
  const openEdit = (item: WardrobeItem) => {
    setForm({
      id: item.id,
      name: item.name,
      category: item.category,
      color: item.color,
      season: item.season,
      style: item.style,
      gender: item.gender,
      imageUrl: item.imageUrl,
      brand: item.brand ?? '',
      shopUrl: item.shopUrl ?? '',
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    const imageUrl = form.imageUrl.trim() || ITEM_IMAGES[form.category];
    const colorName = COLOR_SWATCHES.find((c) => c.hex === form.color)?.name ?? form.color;
    const base = {
      name: form.name.trim(),
      category: form.category,
      color: form.color,
      colorName,
      season: form.season,
      style: form.style,
      gender: form.gender,
      imageUrl,
      brand: form.brand.trim() || undefined,
      shopUrl: form.shopUrl.trim() || undefined,
    };
    if (form.id) {
      update({ ...base, id: form.id, createdAt: Date.now() });
    } else {
      add({ ...base, id: uid(), createdAt: Date.now() });
    }
    setModalOpen(false);
  };

  const counts: Record<string, number> = {
    all: wardrobe.length,
  };
  CATEGORIES.forEach((c) => {
    counts[c.id] = wardrobe.filter((i) => i.category === c.id).length;
  });

  const filtered = wardrobe
    .filter((i) => filter === 'all' || i.category === filter)
    .filter(
      (i) =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.brand?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="container-app py-8 sm:py-12 animate-fade-in pb-28 md:pb-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="eyebrow">ჩემი ციფრული კარადა</p>
          <h1 className="section-title mt-2">ჩემი კარადა</h1>
          <p className="mt-2 text-ink-500">დაამატე ნივთები ფოტოთი, ფერითა და სტილით.</p>
        </div>
        <button onClick={openAdd} className="btn-blue">
          <Plus size={18} /> დაამატე ნივთი
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <div className="flex-1">
          <CategoryFilter filter={filter} setFilter={setFilter} counts={counts} />
        </div>
      </div>

      {filtered.length === 0 ? (
        wardrobe.length === 0 ? (
          <EmptyState
            icon={<Shirt size={28} />}
            title="კარადა ცარიელია"
            message="დაიწყე ნივთების დამატებით — სახელი, კატეგორია და ფერი საკმარისია."
            action={
              <button onClick={openAdd} className="btn-blue">
                <Plus size={16} /> დაამატე პირველი ნივთი
              </button>
            }
          />
        ) : (
          <EmptyState
            icon={<Sparkles size={28} />}
            title="ვერ მოიძებნა"
            message="ამ ფილტრით ნივთები არ არის. შეცვალე ძიება ან კატეგორია."
          />
        )
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((item) => (
            <WardrobeCard
              key={item.id}
              item={item}
              onEdit={() => openEdit(item)}
              onDelete={() => {
                if (confirm(`წავშალო „${item.name}“?`)) remove(item.id);
              }}
              showShop
            />
          ))}
        </div>
      )}

      {/* Add/Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? 'ნივთის რედაქტირება' : 'ახალი ნივთი'}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="f-name">სახელი</label>
              <input
                id="f-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="მაგ. თეთრ მაისური"
                className="input"
              />
            </div>
            <div>
              <label className="label" htmlFor="f-brand">ბრენდი</label>
              <input
                id="f-brand"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                placeholder="Zara / H&M / —"
                className="input"
              />
            </div>
          </div>

          <div>
            <p className="label">კატეგორია</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setForm({ ...form, category: c.id })}
                  className={form.category === c.id ? 'chip-blue' : 'chip-off'}
                >
                  <span>{c.emoji}</span> {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="label">ფერი</p>
            <div className="flex flex-wrap gap-2">
              {COLOR_SWATCHES.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setForm({ ...form, color: c.hex })}
                  title={c.name}
                  aria-label={c.name}
                  className={`h-9 w-9 rounded-full border-2 transition-transform ${
                    form.color === c.hex
                      ? 'border-ink-900 scale-110'
                      : 'border-ink-200 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <p className="label">სეზონი</p>
              <div className="flex flex-wrap gap-2">
                {SEASONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setForm({ ...form, season: s.id })}
                    className={form.season === s.id ? 'chip-on' : 'chip-off'}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="label">სქესი</p>
              <div className="flex flex-wrap gap-2">
                {GENDERS.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setForm({ ...form, gender: g.id })}
                    className={form.gender === g.id ? 'chip-pink' : 'chip-off'}
                  >
                    <span>{g.emoji}</span> {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="label">სტილი</p>
            <div className="flex flex-wrap gap-2">
              {STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setForm({ ...form, style: s })}
                  className={form.style === s ? 'chip-on' : 'chip-off'}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label" htmlFor="f-img">ფოტო URL <span className="text-ink-400 normal-case font-normal">(არასავალდებულო)</span></label>
            <input
              id="f-img"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://..."
              className="input"
            />
            <div className="mt-2 flex items-center gap-2 text-xs text-ink-400">
              <Upload size={13} /> ცარიელი დატოვებისას გამოიყენება მზა ფოტო — „{categoryLabel(form.category)}“.
            </div>
            {/* Preview */}
            <div className="mt-3 flex items-center gap-3">
              <div className="h-20 w-20 rounded-2xl overflow-hidden bg-ink-100 border border-ink-100">
                <img
                  src={form.imageUrl.trim() || ITEM_IMAGES[form.category]}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-xs text-ink-400 flex items-center gap-1">
                <LinkIcon size={12} /> ფოტოს წინასწარმოხედვა
              </p>
            </div>
          </div>

          <div>
            <label className="label" htmlFor="f-shop">მაღაზიის ლინკი <span className="text-ink-400 normal-case font-normal">(არასავალდებულო)</span></label>
            <input
              id="f-shop"
              value={form.shopUrl}
              onChange={(e) => setForm({ ...form, shopUrl: e.target.value })}
              placeholder="https://www.zara.com/..."
              className="input"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-ink-100">
            <button onClick={() => setModalOpen(false)} className="btn-outline">
              გაუქმება
            </button>
            <button onClick={handleSave} disabled={!form.name.trim()} className="btn-blue">
              <Plus size={16} /> {form.id ? 'შენახვა' : 'დამატება'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
