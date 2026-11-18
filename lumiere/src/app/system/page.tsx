import Image from "next/image";

export const metadata = { title: "LUMIÈRE — дизайн-система" };

const COLORS = [
  { name: "Ivory", token: "--ivory", hex: "#F6F2EC", use: "Основной фон", dark: false },
  { name: "Pearl", token: "--pearl", hex: "#ECE6DD", use: "Вторичный фон, карточки", dark: false },
  { name: "Graphite", token: "--graphite", hex: "#1E1E1C", use: "Текст · 14.97:1 на ivory", dark: true },
  { name: "Graphite soft", token: "--graphite-soft", hex: "#5E5B55", use: "Вторичный текст · 6.07:1", dark: true },
  { name: "Champagne", token: "--champagne", hex: "#B89B72", use: "Линии, рамки, свечение (не для текста)", dark: false },
  { name: "Champagne ink", token: "--champagne-ink", hex: "#7A6243", use: "Акцентный текст · 5.15:1", dark: true },
  { name: "Sage", token: "--sage", hex: "#8A9A8B", use: "Декор · текст: #5F6E60 (4.85:1)", dark: false },
  { name: "Night", token: "--night", hex: "#141413", use: "Тёмная секция · текст #EDE8E0 15.1:1", dark: true },
];

const MOOD = ["hero-bg.jpg", "suite.jpg", "craft.jpg", "smile.jpg", "porcelain.jpg", "light.jpg", "aligner.jpg", "scanner.jpg"];

export default function System() {
  return (
    <main className="mx-auto max-w-[1440px] px-5 py-20 md:px-12">
      <p className="eyebrow text-champagne-ink">LUMIÈRE Dental Atelier · v1</p>
      <h1 className="display mt-6 text-[clamp(48px,7vw,120px)]">
        Дизайн-<em className="text-champagne-ink">система</em>
      </h1>

      <section className="mt-20">
        <h2 className="eyebrow mb-6 text-graphite-soft">Moodboard — Krea AI</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {MOOD.map((m, i) => (
            <div key={m} className={`relative overflow-hidden rounded-[var(--radius-card)] ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/5]"}`}>
              <Image src={`/img/${m}`} alt="" fill sizes="25vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <h2 className="eyebrow mb-6 text-graphite-soft">Палитра · WCAG AA</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {COLORS.map((c) => (
            <div key={c.token} className="overflow-hidden rounded-[var(--radius-card)] border border-graphite/10 bg-ivory">
              <div className="flex h-36 items-end p-5" style={{ background: c.hex, color: c.dark ? "#F6F2EC" : "#1E1E1C" }}>
                <span className="display text-[34px]">Aa</span>
              </div>
              <div className="p-5 text-[14px]">
                <p className="font-medium">{c.name}</p>
                <p className="text-graphite-soft">{c.hex} · {c.token}</p>
                <p className="mt-2 text-graphite-soft">{c.use}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="eyebrow mb-6 text-graphite-soft">Заголовки — Cormorant Garamond</h2>
          <p className="display text-[clamp(56px,8vw,140px)]">Улыбка</p>
          <p className="display text-[72px] italic text-champagne-ink">в деталях</p>
          <p className="mt-4 text-[14px] text-graphite-soft">
            H1 clamp(56px, 8vw, 140px) · ls −0.02em · lh 0.95 · курсив для 1–2 слов. Премиум-замена при покупке лицензии:
            PP Editorial New / Canela (обе с кириллицей по запросу).
          </p>
        </div>
        <div>
          <h2 className="eyebrow mb-6 text-graphite-soft">Текст — Manrope</h2>
          <p className="measure text-[18px]">
            Мы создаём улыбки, которые выглядят естественно и живут долго. Body 17–18px, межстрочный 1.6, ширина строки
            60–70 символов.
          </p>
          <p className="eyebrow mt-8 text-champagne-ink">Подпись · 12px · uppercase · 0.14em</p>
          <p className="mt-4 text-[14px] text-graphite-soft">Премиум-замена: Neue Montreal / Suisse Int&apos;l.</p>
        </div>
      </section>

      <section className="mt-24 grid gap-12 md:grid-cols-3">
        <div>
          <h2 className="eyebrow mb-6 text-graphite-soft">Радиусы</h2>
          <div className="flex gap-3">
            {[24, 28, 32].map((r) => (
              <div key={r} className="flex h-24 w-24 items-end bg-pearl p-3 text-[13px]" style={{ borderRadius: r }}>{r}px</div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="eyebrow mb-6 text-graphite-soft">Отступы</h2>
          <p className="text-[14px] text-graphite-soft">Шаг 4px · секции 112–160px · гаттер 20px (моб.) / 48px · сетка 12 колонок, max 1440px</p>
        </div>
        <div>
          <h2 className="eyebrow mb-6 text-graphite-soft">Движение</h2>
          <p className="text-[14px] text-graphite-soft">
            cubic-bezier(0.22, 1, 0.36, 1) · 0.8–1.2s · только transform/opacity · Lenis 1.2s · grain 3.5% ·
            prefers-reduced-motion отключает параллакс
          </p>
        </div>
      </section>
    </main>
  );
}
