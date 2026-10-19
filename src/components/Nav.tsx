import { Home, Shirt, Sparkles, Heart, User } from 'lucide-react';

export type Page = 'home' | 'outfit' | 'wardrobe' | 'matcher' | 'saved' | 'profile';

const NAV: { id: Page; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'wardrobe', label: 'კარადა', icon: Shirt },
  { id: 'outfit', label: 'Outfit', icon: Sparkles },
  { id: 'saved', label: 'Saved', icon: Heart },
  { id: 'profile', label: 'Profile', icon: User },
];

interface NavProps {
  page: Page;
  setPage: (p: Page) => void;
}

export function TopNav({ page, setPage }: NavProps) {
  return (
    <header className="hidden md:block sticky top-0 z-40 border-b border-ink-100 glass">
      <div className="container-app flex h-16 items-center justify-between">
        <button onClick={() => setPage('home')} className="flex items-center gap-2" aria-label="StyleMate — მთავარი">
          <Logo />
        </button>
        <nav className="flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                page === n.id ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
              }`}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function BottomNav({ page, setPage }: NavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-ink-100 glass pb-safe">
      <div className="flex items-stretch justify-around">
        {NAV.map((n) => {
          const active = page === n.id;
          const isCenter = n.id === 'outfit';
          const Icon = n.icon;
          if (isCenter) {
            return (
              <button
                key={n.id}
                onClick={() => setPage(n.id)}
                className="flex flex-col items-center justify-center -mt-4"
                aria-label={n.label}
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-glow transition-all ${
                    active ? 'bg-electric-500 text-white' : 'bg-ink-900 text-white'
                  }`}
                >
                  <Icon size={24} />
                </span>
                <span className="mt-1 text-[10px] font-semibold text-ink-600">{n.label}</span>
              </button>
            );
          }
          return (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5"
              aria-label={n.label}
            >
              <Icon
                size={22}
                className={active ? 'text-electric-500' : 'text-ink-400'}
              />
              <span
                className={`text-[10px] font-semibold ${
                  active ? 'text-electric-500' : 'text-ink-400'
                }`}
              >
                {n.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-900 text-white">
        <Sparkles size={18} className="text-electric-400" />
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-ink-900">
        StyleMate<span className="text-electric-500"> GE</span>
      </span>
    </span>
  );
}
