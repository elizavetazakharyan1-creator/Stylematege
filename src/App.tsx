import { useCallback, useState } from 'react';
import { TopNav, BottomNav, type Page } from './components/Nav';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { OutfitPage } from './pages/OutfitPage';
import { WardrobePage } from './pages/WardrobePage';
import { MatcherPage } from './pages/MatcherPage';
import { SavedPage } from './pages/SavedPage';
import { ProfilePage } from './pages/ProfilePage';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { WardrobeItem, GeneratedOutfit, Gender } from './types';
import { SEED_WARDROBE } from './seed';

const DEFAULT_PREFS = { gender: 'unisex' as Gender, style: 'სტრიტვეარი' };

function App() {
  const [page, setPage] = useState<Page>('home');
  const [wardrobe, setWardrobe] = useLocalStorage<WardrobeItem[]>('sm_wardrobe', SEED_WARDROBE);
  const [saved, setSaved] = useLocalStorage<GeneratedOutfit[]>('sm_saved', []);
  const [prefs, setPrefs] = useLocalStorage<{ gender: Gender; style: string }>('sm_prefs', DEFAULT_PREFS);

  const addWardrobe = useCallback(
    (item: WardrobeItem) => setWardrobe((w) => [item, ...w]),
    [setWardrobe]
  );
  const updateWardrobe = useCallback(
    (item: WardrobeItem) => setWardrobe((w) => w.map((i) => (i.id === item.id ? item : i))),
    [setWardrobe]
  );
  const removeWardrobe = useCallback(
    (id: string) => setWardrobe((w) => w.filter((i) => i.id !== id)),
    [setWardrobe]
  );

  const saveOutfit = useCallback(
    (o: GeneratedOutfit) => setSaved((s) => (s.some((x) => x.id === o.id) ? s : [o, ...s])),
    [setSaved]
  );
  const removeOutfit = useCallback(
    (id: string) => setSaved((s) => s.filter((o) => o.id !== id)),
    [setSaved]
  );

  const setPrefsGender = useCallback(
    (g: Gender) => setPrefs((p) => ({ ...p, gender: g })),
    [setPrefs]
  );

  const resetAll = useCallback(() => {
    setWardrobe(SEED_WARDROBE);
    setSaved([]);
    setPrefs(DEFAULT_PREFS);
    setPage('home');
  }, [setWardrobe, setSaved, setPrefs, setPage]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopNav page={page} setPage={setPage} />
      <main className="flex-1">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'outfit' && (
          <OutfitPage
            wardrobe={wardrobe}
            saved={saved}
            saveOutfit={saveOutfit}
            removeOutfit={removeOutfit}
            prefs={prefs}
            setPrefsGender={setPrefsGender}
            setPage={setPage}
          />
        )}
        {page === 'wardrobe' && (
          <WardrobePage
            wardrobe={wardrobe}
            add={addWardrobe}
            update={updateWardrobe}
            remove={removeWardrobe}
          />
        )}
        {page === 'matcher' && (
          <MatcherPage
            wardrobe={wardrobe}
            saved={saved}
            saveOutfit={saveOutfit}
            removeOutfit={removeOutfit}
            setPage={setPage}
          />
        )}
        {page === 'saved' && (
          <SavedPage
            saved={saved}
            wardrobe={wardrobe}
            removeOutfit={removeOutfit}
            setPage={setPage}
          />
        )}
        {page === 'profile' && (
          <ProfilePage
            prefs={prefs}
            setPrefs={setPrefs}
            wardrobe={wardrobe}
            saved={saved}
            setPage={setPage}
            resetAll={resetAll}
          />
        )}
      </main>
      <Footer setPage={setPage} />
      <BottomNav page={page} setPage={setPage} />
      {/* Bottom spacer for mobile nav */}
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}

export default App;
