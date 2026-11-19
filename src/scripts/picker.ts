// Floor + unit picker over the real plan drawings.
export type UnitPick = { floor: number; area: string; id: string };

export function initPicker() {
  const root = document.querySelector<HTMLElement>('[data-picker]');
  if (!root) return;
  const meta = JSON.parse(document.querySelector('[data-plan-meta]')?.textContent || '{}') as Record<string, { ceiling: string; finish: string }>;
  const floors = [...root.querySelectorAll<HTMLButtonElement>('[data-floor]')];
  const views = [...root.querySelectorAll<HTMLElement>('[data-plan-view]')];
  const card = root.querySelector<HTMLElement>('[data-unit-card]')!;
  const cardEmpty = card.querySelector<HTMLElement>('[data-card-empty]')!;
  const cardFull = card.querySelector<HTMLElement>('[data-card-full]')!;
  const emptyFloor = root.querySelector<HTMLElement>('[data-empty-floor]');
  let floor = Number(root.dataset.initial || 1);
  let selected: SVGGElement | null = null;

  const fmt = (n: number) => n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function showFloor(n: number, focus = false) {
    floor = n;
    const btn = floors.find((b) => Number(b.dataset.floor) === n);
    floors.forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
    const key = btn?.dataset.plan || 'none';
    views.forEach((v) => (v.hidden = v.dataset.planView !== key));
    if (emptyFloor) emptyFloor.textContent = String(n);
    clearUnit();
    if (focus) btn?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  const syncChips = (id: string | null) =>
    root.querySelectorAll<HTMLButtonElement>('[data-unit-btn]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.unitBtn === id)));

  function clearUnit() {
    syncChips(null);
    selected?.setAttribute('aria-pressed', 'false');
    selected = null;
    cardEmpty.hidden = false;
    cardFull.hidden = true;
  }

  function selectUnit(g: SVGGElement) {
    if (g.dataset.status === 'sold') return;
    selected?.setAttribute('aria-pressed', 'false');
    selected = g;
    g.setAttribute('aria-pressed', 'true');
    syncChips(g.dataset.unit!);
    const view = g.closest<HTMLElement>('[data-plan-view]')!;
    const m = meta[view.dataset.planView!] || { ceiling: '', finish: '' };
    const area = Number(g.dataset.area);
    card.querySelector('[data-card-area]')!.textContent = fmt(area);
    card.querySelector('[data-card-floor]')!.textContent = String(floor);
    card.querySelector('[data-card-ceiling]')!.textContent = m.ceiling;
    card.querySelector('[data-card-finish]')!.textContent = m.finish;
    cardEmpty.hidden = true;
    cardFull.hidden = false;
  }

  floors.forEach((b) => b.addEventListener('click', () => showFloor(Number(b.dataset.floor))));
  // arrow keys move between floors, like a lift panel
  root.querySelector('.floors__list')?.addEventListener('keydown', (e) => {
    const k = (e as KeyboardEvent).key;
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(k)) return;
    e.preventDefault();
    const delta = k === 'ArrowUp' || k === 'ArrowRight' ? 1 : -1;
    const next = Math.min(floors.length, Math.max(1, floor + delta));
    showFloor(next, true);
    floors.find((b) => Number(b.dataset.floor) === next)?.focus();
  });

  root.querySelectorAll<SVGGElement>('.unit').forEach((g) => {
    g.addEventListener('click', () => selectUnit(g));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectUnit(g);
      }
    });
  });

  root.querySelectorAll<HTMLButtonElement>('[data-unit-btn]').forEach((b) =>
    b.addEventListener('click', () => {
      const g = root.querySelector<SVGGElement>(`.unit[data-unit="${b.dataset.unitBtn}"]`);
      if (g) selectUnit(g);
    }),
  );

  card.querySelector('[data-card-cta]')?.addEventListener('click', () => {
    if (!selected) return;
    const pick: UnitPick = { floor, area: fmt(Number(selected.dataset.area)), id: selected.dataset.unit! };
    document.dispatchEvent(new CustomEvent<UnitPick>('unit:request', { detail: pick }));
  });
  root.querySelector('[data-request-floor]')?.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('floor:request', { detail: { floor } }));
  });

  showFloor(floor);
}
