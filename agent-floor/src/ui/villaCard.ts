import { formatPrice, type Consultant } from '../world/consultants';

// Clicking a villa name plate in the building overview opens this card: the same
// details as the plate, large, with links to call, WhatsApp and Instagram.

let open: HTMLElement | null = null;

function close() {
  open?.remove();
  open = null;
  removeEventListener('keydown', onKey, true);
}

function onKey(e: KeyboardEvent) {
  if (e.key !== 'Escape') return;
  // Escape closes the card only; it must not also leave the building view.
  e.stopPropagation();
  close();
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function instagramUrl(v: string) {
  if (v.startsWith('@')) return `https://www.instagram.com/${encodeURIComponent(v.slice(1))}/`;
  return /^https?:\/\//.test(v) ? v : `https://${v}`;
}

export function showVillaCard(c: Consultant) {
  close();
  const digits = (c.phone || '').replace(/\D/g, '');
  const wa = digits ? (digits.length === 9 ? '351' + digits : digits) : '';
  const root = document.createElement('div');
  root.className = 'villa-card-backdrop';
  root.innerHTML = `
    <div class="villa-card" role="dialog" aria-modal="true" aria-label="${esc(c.name)}">
      <button class="villa-card-close" type="button" aria-label="Fechar">×</button>
      <div class="villa-card-name">${esc(c.name)}</div>
      <div class="villa-card-agency">${esc(c.agency)}</div>
      <div class="villa-card-contacts">
        ${c.phone ? `<a class="villa-card-phone" href="tel:+${wa}">${esc(c.phone)}</a>` : '<span class="villa-card-muted">Sem telefone</span>'}
        ${wa ? `<a class="villa-card-btn" href="https://wa.me/${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
        ${c.instagram ? `<a class="villa-card-btn" href="${esc(instagramUrl(c.instagram))}" target="_blank" rel="noopener">${esc(c.instagram.startsWith('@') ? c.instagram : 'Perfil')}</a>` : '<span class="villa-card-muted">Sem Instagram</span>'}
      </div>
      <div class="villa-card-listing">${esc(c.listing)}</div>
      ${c.price ? `<div class="villa-card-price">${esc(formatPrice(c.price))}</div>` : ''}
      <div class="villa-card-verdict">${esc(c.verdict)}</div>
    </div>`;
  root.addEventListener('click', (e) => {
    if (e.target === root || (e.target as HTMLElement).closest('.villa-card-close')) close();
  });
  document.body.append(root);
  open = root;
  addEventListener('keydown', onKey, true);
}
