import type { UnitPick } from './picker';

// Kazakhstan numbers: +7 (7XX) XXX-XX-XX
function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, '');
  if (d.startsWith('8')) d = '7' + d.slice(1);
  if (!d.startsWith('7')) d = '7' + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = '+7';
  if (p.length) out += ' (' + p.slice(0, 3);
  if (p.length >= 3) out += ')';
  if (p.length > 3) out += ' ' + p.slice(3, 6);
  if (p.length > 6) out += '-' + p.slice(6, 8);
  if (p.length > 8) out += '-' + p.slice(8, 10);
  return out;
}

export function initForm() {
  const form = document.querySelector<HTMLFormElement>('[data-form]');
  if (!form) return;
  const phone = form.querySelector<HTMLInputElement>('[data-phone]')!;
  const status = form.querySelector<HTMLElement>('[data-form-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-form-submit]')!;
  const label = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const unitInput = form.querySelector<HTMLInputElement>('[data-form-unit]')!;
  const chip = form.querySelector<HTMLElement>('[data-form-unit-chip]')!;
  const chipText = form.querySelector<HTMLElement>('[data-form-unit-text]')!;
  const area = form.querySelector<HTMLSelectElement>('[name="area"]')!;

  phone.addEventListener('focus', () => {
    if (!phone.value) phone.value = '+7 (';
  });
  phone.addEventListener('blur', () => {
    if (phone.value.replace(/\D/g, '').length <= 1) phone.value = '';
  });
  phone.addEventListener('input', () => {
    const atEnd = phone.selectionStart === phone.value.length;
    phone.value = formatPhone(phone.value);
    if (atEnd) phone.setSelectionRange(phone.value.length, phone.value.length);
  });

  const rules: Record<string, (v: string) => string> = {
    name: (v) => (v.trim().length < 2 ? 'Укажите имя — хотя бы две буквы.' : ''),
    phone: (v) => (v.replace(/\D/g, '').length !== 11 ? 'Нужен номер из 11 цифр, например +7 (701) 234-56-78.' : ''),
    area: (v) => (!v ? 'Выберите площадь — так мы подберём подходящие варианты.' : ''),
  };

  function check(name: string) {
    const el = form!.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement;
    const msg = rules[name](el.value);
    const field = el.closest('.field') as HTMLElement;
    const err = form!.querySelector<HTMLElement>(`[data-err-for="${name}"]`)!;
    err.textContent = msg;
    if (msg) {
      field.setAttribute('data-invalid', '');
      el.setAttribute('aria-invalid', 'true');
    } else {
      field.removeAttribute('data-invalid');
      el.removeAttribute('aria-invalid');
    }
    return !msg;
  }
  Object.keys(rules).forEach((n) => {
    const el = form.elements.namedItem(n) as HTMLElement;
    el.addEventListener('blur', () => (el as HTMLInputElement).value && check(n));
    el.addEventListener('change', () => el.closest('[data-invalid]') && check(n));
    el.addEventListener('input', () => el.closest('[data-invalid]') && check(n));
  });

  function setUnit(text: string) {
    unitInput.value = text;
    chipText.textContent = text;
    chip.hidden = !text;
  }
  form.querySelector('[data-form-unit-clear]')?.addEventListener('click', () => setUnit(''));

  document.addEventListener('unit:request', (e) => {
    const d = (e as CustomEvent<UnitPick>).detail;
    setUnit(`этаж ${d.floor}, ${d.area} м²`);
    const a = parseFloat(d.area.replace(',', '.'));
    area.value = d.floor === 1 ? 'Коммерция на 1 этаже' : a < 30 ? 'до 30 м²' : a <= 60 ? '30–60 м²' : a <= 120 ? '60–120 м²' : 'более 120 м²';
    check('area');
  });
  document.addEventListener('floor:request', (e) => {
    setUnit(`планировка ${(e as CustomEvent<{ floor: number }>).detail.floor} этажа`);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) {
      const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      status.dataset.state = 'error';
      status.textContent = 'Проверьте поля, отмеченные ниже.';
      return;
    }
    submit.disabled = true;
    label.textContent = 'Отправляем…';
    status.textContent = '';
    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch(form.getAttribute('action') || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setUnit('');
      status.dataset.state = 'ok';
      status.textContent = 'Заявка отправлена. Менеджер перезвонит в рабочее время.';
    } catch {
      status.dataset.state = 'error';
      status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз через минуту или позвоните в офис продаж.';
    } finally {
      submit.disabled = false;
      label.textContent = 'Отправить заявку';
    }
  });
}
