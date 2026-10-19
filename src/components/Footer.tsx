import { Instagram, Music2, Twitter, Sparkles, Heart } from 'lucide-react';
import { Logo, type Page } from './Nav';

export function Footer({ setPage }: { setPage: (p: Page) => void }) {
  const links: { label: string; page: Page }[] = [
    { label: 'მთავარი', page: 'home' },
    { label: 'Outfit Generator', page: 'outfit' },
    { label: 'ჩემი კარადა', page: 'wardrobe' },
    { label: 'AI Matcher', page: 'matcher' },
    { label: 'შენახული', page: 'saved' },
  ];

  return (
    <footer className="border-t border-ink-100 bg-ink-50 mt-20">
      <div className="container-app py-12">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-ink-500 leading-relaxed">
              StyleMate GE — შენი პერსონალური სტილისტი. ამინდი, შემთხვევა, განწყობა —
              ჩაიცვი სწორად, გააოცე.
            </p>
          </div>
          <div>
            <p className="label">ნავიგაცია</p>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => setPage(l.page)}
                    className="text-sm text-ink-600 hover:text-electric-500 transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label">სოციალური</p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Music2, label: 'TikTok' },
                { Icon: Twitter, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-ink-200 text-ink-600 hover:border-electric-500 hover:text-electric-500 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-ink-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-400">© 2026 StyleMate GE · ყველა უფლება დაცულია</p>
          <p className="flex items-center gap-1.5 text-xs text-ink-400">
            შექმნილია <Sparkles size={12} className="text-electric-500" /> და <Heart size={12} className="text-hot-500" />-ით
          </p>
        </div>
      </div>
    </footer>
  );
}
