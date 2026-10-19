import { useState } from 'react';
import { Heart, Sparkles, ShoppingBag, Trash2 } from 'lucide-react';
import type { GeneratedOutfit, WardrobeItem } from '../types';
import { OutfitCard } from '../components/OutfitCard';
import { EmptyState } from '../components/WardrobeCard';
import { Modal } from '../components/Modal';
import { ShopLinksList } from '../components/WardrobeCard';
import type { Page } from '../components/Nav';

interface SavedPageProps {
  saved: GeneratedOutfit[];
  wardrobe: WardrobeItem[];
  removeOutfit: (id: string) => void;
  setPage: (p: Page) => void;
}

export function SavedPage({ saved, wardrobe, removeOutfit, setPage }: SavedPageProps) {
  const [shopItem, setShopItem] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <div className="container-app py-8 sm:py-12 pb-28 md:pb-12 animate-fade-in">
      <div className="mb-8">
        <p className="eyebrow">შენახული</p>
        <h1 className="section-title mt-2">ფავორიტი კომბინაციები</h1>
        <p className="mt-2 text-ink-500">{saved.length} შენახული ლუქი — ნახე კვლავ ან იპოვე მაღაზიაში.</p>
      </div>

      {saved.length === 0 ? (
        <EmptyState
          icon={<Heart size={28} />}
          title="ჯერ არაფერი შენახული"
          message="კომბინაციის შექმნისას დააჭირე გულს, რომ აქ შეინახო."
          action={
            <button onClick={() => setPage('outfit')} className="btn-blue">
              <Sparkles size={16} /> კომბინაციის შექმნა
            </button>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {saved.map((o, i) => (
            <div key={o.id} className="relative">
              <OutfitCard
                outfit={o}
                items={wardrobe}
                saved
                onSave={() => setConfirmDelete(o.id)}
                onShop={() => setShopItem(o.title)}
                index={i}
              />
              <button
                onClick={() => setConfirmDelete(o.id)}
                className="absolute top-3 right-3 z-20 rounded-full bg-white/95 p-2 text-hot-500 hover:bg-white shadow-soft"
                aria-label="წაშლა"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Shop modal */}
      <Modal open={Boolean(shopItem)} onClose={() => setShopItem(null)} title="Shop the Look" size="md">
        {shopItem && (
          <div className="space-y-4">
            <p className="text-sm text-ink-600">
              „<strong className="text-ink-900">{shopItem}</strong>“ — მოძებნე მსგავსი ნივთები ამ მაღაზიებში.
            </p>
            <ShopLinksList itemName={shopItem} />
          </div>
        )}
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={Boolean(confirmDelete)}
        onClose={() => setConfirmDelete(null)}
        title="წავშალო?"
        size="sm"
      >
        <p className="text-sm text-ink-600 mb-5">
          ეს კომბინაცია წაიშლება შენახულებიდან. მოქმედება შეუქცეველია.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirmDelete(null)} className="btn-outline">
            გაუქმება
          </button>
          <button
            onClick={() => {
              if (confirmDelete) removeOutfit(confirmDelete);
              setConfirmDelete(null);
            }}
            className="btn bg-hot-500 text-white hover:bg-hot-600"
          >
            <Trash2 size={15} /> წაშლა
          </button>
        </div>
      </Modal>
    </div>
  );
}
