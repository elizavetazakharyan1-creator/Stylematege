import { User, Sparkles, Check, Shirt, Heart, ShoppingBag } from 'lucide-react';
import type { Gender, WardrobeItem, GeneratedOutfit } from '../types';
import { GENDERS, STYLES } from '../constants';
import type { Page } from '../components/Nav';

interface ProfilePageProps {
  prefs: { gender: Gender; style: string };
  setPrefs: (p: { gender: Gender; style: string }) => void;
  wardrobe: WardrobeItem[];
  saved: GeneratedOutfit[];
  setPage: (p: Page) => void;
  resetAll: () => void;
}

export function ProfilePage({ prefs, setPrefs, wardrobe, saved, setPage, resetAll }: ProfilePageProps) {
  const stats = [
    { icon: Shirt, label: 'ნივთი კარადაში', value: wardrobe.length, page: 'wardrobe' as Page },
    { icon: Heart, label: 'შენახული ანსამბლი', value: saved.length, page: 'saved' as Page },
  ];

  return (
    <div className="container-app py-8 sm:py-12 pb-28 md:pb-12 animate-fade-in">
      <div className="mb-8">
        <p className="eyebrow">პროფილი</p>
        <h1 className="section-title mt-2">შენი პრეფერენსები</h1>
        <p className="mt-2 text-ink-500">განსაზღვრე შენი სტილი — რჩევები უფრო ზუსტი იქნება.</p>
      </div>

      {/* Avatar header */}
      <div className="card p-6 mb-6 flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500 to-hot-500 text-white">
          <User size={28} />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-ink-900">სტილისტის პროფილი</h2>
          <p className="text-sm text-ink-500">ლოკალური პროფილი · ანგარიში არ არის საჭირო</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((s) => (
          <button key={s.label} onClick={() => setPage(s.page)} className="card-hover p-5 text-left">
            <s.icon size={22} className="text-electric-500 mb-2" />
            <p className="font-display text-3xl font-bold text-ink-900">{s.value}</p>
            <p className="text-xs text-ink-500 mt-0.5">{s.label}</p>
          </button>
        ))}
      </div>

      {/* Gender preference */}
      <div className="card p-5 mb-5">
        <p className="label">სქესი / სტილი</p>
        <div className="flex flex-wrap gap-2">
          {GENDERS.map((g) => (
            <button
              key={g.id}
              onClick={() => setPrefs({ ...prefs, gender: g.id })}
              className={prefs.gender === g.id ? 'chip-pink' : 'chip-off'}
            >
              <span>{g.emoji}</span> {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Style preference */}
      <div className="card p-5 mb-5">
        <p className="label">რჩეული სტილი</p>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setPrefs({ ...prefs, style: s })}
              className={prefs.style === s ? 'chip-blue' : 'chip-off'}
            >
              {prefs.style === s && <Check size={14} />} {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="card p-5 mb-5">
        <p className="label">სწრაფი მოქმედებები</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <button onClick={() => setPage('outfit')} className="btn-outline justify-start">
            <Sparkles size={16} /> ანსამბლის შექმნა
          </button>
          <button onClick={() => setPage('wardrobe')} className="btn-outline justify-start">
            <Shirt size={16} /> კარადის მართვა
          </button>
          <button onClick={() => setPage('matcher')} className="btn-outline justify-start">
            <Sparkles size={16} /> AI Matcher
          </button>
          <button onClick={() => setPage('saved')} className="btn-outline justify-start">
            <ShoppingBag size={16} /> შენახული ლუქები
          </button>
        </div>
      </div>

      {/* Danger zone */}
      <div className="card p-5 border-hot-500/20">
        <p className="label !text-hot-500">მონაცემების გასუფთავება</p>
        <p className="text-sm text-ink-500 mb-4">
          წაშლის კარადას, შენახულ ანსამბლებსა და პრეფერენსებს. მოქმედება შეუქცეველია.
        </p>
        <button
          onClick={() => {
            if (confirm('დარწმუნებული ხარ? ყველა მონაცემი წაიშლება.')) resetAll();
          }}
          className="btn bg-hot-500 text-white hover:bg-hot-600"
        >
          ყველაფრის გასუფთავება
        </button>
      </div>
    </div>
  );
}
