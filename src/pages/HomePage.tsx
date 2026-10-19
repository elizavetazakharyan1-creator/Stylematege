import { Sparkles, Shirt, Wand2, ShoppingBag, Heart, Cloud, Dices, ArrowRight } from 'lucide-react';
import type { Page } from '../components/Nav';
import { HERO_IMAGE, HERO_IMAGE_ALT, OUTFIT_IMAGES } from '../images';
import type { GeneratedOutfit } from '../types';

interface HomePageProps {
  setPage: (p: Page) => void;
}

// 3 example outfits for the hero section.
const EXAMPLE_OUTFITS: GeneratedOutfit[] = [
  {
    id: 'ex-1',
    title: 'სამოცი წუთის ლუქი',
    description: 'სწრაფი, სუფთა და მზადაა ყველაფრისთვის. ჯინსი + მაისური + სნიკერსი.',
    itemIds: [],
    matchScore: 92,
    reason: 'demo',
  },
  {
    id: 'ex-2',
    title: 'ღამის ქალაქი',
    description: 'ბოლდი და დამამახსოვრებელი. სწორედ ის, რაც წვეულებას მოითხოვს.',
    itemIds: [],
    matchScore: 88,
    reason: 'demo',
  },
  {
    id: 'ex-3',
    title: 'კოფი ბრეიკი',
    description: 'რბილი, თბილი და სასიამოვნო. პირველი პაემნის იდეალური ენერგია.',
    itemIds: [],
    matchScore: 85,
    reason: 'demo',
  },
];

const EXAMPLE_ITEM_IMAGES = [OUTFIT_IMAGES.female2, OUTFIT_IMAGES.female3, OUTFIT_IMAGES.male2];

const STEPS = [
  { n: '01', title: 'აირჩიე ამინდი და შემთხვევა', desc: 'რა ამინდია და სად მიდიხარ — ეს განსაზღვრავს ბაზას.', icon: Cloud },
  { n: '02', title: 'დაამატე განწყობა', desc: 'კომფორტული, ელეგანტური, ბოლდი — აირჩიე ენერგია.', icon: Heart },
  { n: '03', title: 'მიიღე შენთვის შესაფერი კომბინაცია', desc: '3 მზა ლუქი, რომელიც შენს კარადას ემთხვევა.', icon: Sparkles },
];

const FEATURES = [
  { icon: Cloud, title: 'ამინდის მიხედვით რეკომენდაცია', desc: 'ცხელი, წვიმიანი თუ თოვლიანი — ლუქი ამინდს მოერგება.' },
  { icon: Shirt, title: 'შემთხვევის მიხედვით რეკომენდაცია', desc: 'უნივერსიტეტიდან წვეულებამდე — ყველა შემთხვევა გააზღვულებული.' },
  { icon: Heart, title: 'განწყობაზე დაყრდნობით არჩევანი', desc: 'კომფორტული, ელეგანტური, ბოლდი — შენი განწყობა წინაპლანში.' },
  { icon: Shirt, title: 'ჩემი ციფრული კარადა', desc: 'ტანსაცმელი ციფრულად — ფოტო, ფერი, სეზონი, სტილი.' },
  { icon: Wand2, title: 'AI Outfit Matcher', desc: 'აირჩიე ნივთები და ნახე რატომ ერთვის ერთმანეთს.' },
  { icon: ShoppingBag, title: 'Shop the Look', desc: 'მოწონებული ნივთები Zara, H&M, Shein, Temu-ში.' },
  { icon: Dices, title: 'Surprise Me', desc: 'არ იცი რა ჩაიცვა? გადასცემ მას გადაწყვეტილება StyleMate-ს.' },
  { icon: Sparkles, title: 'ჭკვიანი რჩევები', desc: 'მატჩის პროცენტი და მოკლე ახსნა თითოეული ლუქისთვის.' },
];

const FAQS = [
  {
    q: 'StyleMate უფასოა?',
    a: 'კი — ეს არის დემო ვერსია, ყველა ფუნქციით. მონაცემები ინახება შენ ბრაუზერში, ლოკალურად.',
  },
  {
    q: 'გამიზიარებს ჩემს ფოტოებს ვინმეს?',
    a: 'არა. ყველაფერი რჩება შენ მოწყობილობაში — არანაირი სერვერი, არანაირი ანგარიში.',
  },
  {
    q: 'როგორ მუშაობს AI Outfit Matcher?',
    a: 'აირჩევ 2–4 ნივთს შენი კარადიდან და StyleMate გითხრა, რატომ ერთვის ისინი ერთმანეთს — ფერი, კატეგორია და სტილის ჰარმონიის მიხედვით.',
  },
  {
    q: 'შემიძლია ნივთის ფოტოს ატვირთვა?',
    a: 'კი, „ჩემი კარადა“ სექციაში შეგიძლია დაამატო ნივთი URL-ით ან აირჩიო მზა ფოტო კატეგორიის მიხედვით.',
  },
  {
    q: 'Shop the Look რეალურ მაღაზიაში მიმიყვანს?',
    a: 'დემო ბმულებია Zara, H&M, Shein და Temu-სთვის. რეალური შესყიდვა ამ ვერსიაში არ ხდება — მხოლოდ ვიზუალური დემო.',
  },
];

export function HomePage({ setPage }: HomePageProps) {
  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-electric-500/10 blur-3xl" aria-hidden />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-hot-500/10 blur-3xl" aria-hidden />

        <div className="container-app relative pt-10 pb-16 sm:pt-16 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                <Sparkles size={14} className="text-electric-400" /> Gen Z სტილისტი
              </span>
              <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-ink-900 leading-[0.95]">
                დღეს
                <br />
                <span className="text-gradient">რა ჩაიცვა?</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-ink-600 leading-relaxed">
                აირჩიე ამინდი, შემთხვევა და განწყობა — <strong className="text-ink-900">StyleMate</strong> დაგეხმარება.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => setPage('outfit')} className="btn-blue">
                  <Sparkles size={18} /> კომბინაციის შექმნა
                </button>
                <button onClick={() => setPage('wardrobe')} className="btn-outline">
                  <Shirt size={18} /> ჩემი კარადა
                </button>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-4xl shadow-card">
                <img src={HERO_IMAGE} alt="Streetwear ლუქი" className="h-full w-full object-cover" />
                <div className="absolute top-4 left-4 rounded-2xl bg-white/90 backdrop-blur px-3 py-2">
                  <p className="text-[10px] uppercase tracking-wider text-ink-400">მატჩი</p>
                  <p className="font-display text-xl font-bold text-electric-500">94%</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden sm:block w-32 h-40 rounded-2xl overflow-hidden shadow-card border-4 border-white animate-float">
                <img src={HERO_IMAGE_ALT} alt="" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>

          {/* 3 example outfit cards */}
          <div className="mt-16 sm:mt-20">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="eyebrow">მაგალითები</p>
                <h2 className="section-title mt-1">3 იდეა დასაწყისად</h2>
              </div>
              <button onClick={() => setPage('outfit')} className="btn-ghost !py-2 hidden sm:inline-flex">
                შექმნა <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {EXAMPLE_OUTFITS.map((o, i) => (
                <div
                  key={o.id}
                  className="card-hover overflow-hidden group animate-pop"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink-100">
                    <img
                      src={EXAMPLE_ITEM_IMAGES[i]}
                      alt={o.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                    <h3 className="absolute bottom-3 left-4 right-4 font-display text-xl font-bold text-white">
                      {o.title}
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-ink-600 line-clamp-2 min-h-[2.5rem]">{o.description}</p>
                    <button onClick={() => setPage('outfit')} className="mt-3 btn-outline w-full !py-2.5 !text-xs">
                      შექმნა <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-ink-900 text-white">
        <div className="container-app py-16 sm:py-20">
          <div className="text-center mb-12">
            <p className="eyebrow !text-electric-400">როგორ მუშაობს</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">3 ნაბიჯი სტილამდე</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="relative rounded-3xl border border-white/10 bg-white/5 p-6 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="font-display text-5xl font-bold text-gradient opacity-90">{s.n}</span>
                <s.icon size={26} className="mt-4 text-electric-400" />
                <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container-app py-16 sm:py-20">
        <div className="text-center mb-12">
          <p className="eyebrow">ფუნქციები</p>
          <h2 className="section-title mt-2">ყველაფერი სტილისთვის</h2>
          <p className="mt-3 max-w-xl mx-auto text-ink-500">
            ამინდიდან კომბინაციამდე, კარადიდან მაღაზიამდე — ერთ აპლიკაციაში.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="card-hover p-5 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-electric-500/10 text-electric-500">
                <f.icon size={22} />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-ink-900">{f.title}</h3>
              <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink-50 border-y border-ink-100">
        <div className="container-app py-16 sm:py-20">
          <div className="text-center mb-12">
            <p className="eyebrow">კითხვები</p>
            <h2 className="section-title mt-2">ხშირი კითხვები</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-app py-16">
        <div className="relative overflow-hidden rounded-4xl bg-ink-900 p-10 sm:p-14 text-center">
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-electric-500/20 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-hot-500/20 blur-3xl" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              მზად ხარ ახალი სტილისთვის?
            </h2>
            <p className="mt-3 text-ink-300 max-w-md mx-auto">
              აირჩიე ამინდი, შემთხვევა და განწყობა — 3 კომბინაცია 60 წამში.
            </p>
            <button onClick={() => setPage('outfit')} className="btn-blue mt-6">
              <Sparkles size={18} /> დაიწყე ახლა
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="card group overflow-hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 list-none">
        <span className="font-display text-base font-semibold text-ink-900">{q}</span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-500 transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="px-5 pb-5 pt-0 text-sm text-ink-600 leading-relaxed">{a}</div>
    </details>
  );
}
