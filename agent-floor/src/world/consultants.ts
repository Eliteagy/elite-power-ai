// Key real-estate consultants still in the pipeline (qualified in the CRM, not yet
// clients). Each one gets a villa in the residential street east of the park, with a
// plate showing their most expensive listing still for sale. Edit here, then rebuild.

export interface Consultant {
  name: string;
  agency: string;
  /** Most expensive listing still for sale, e.g. "Moradia T4 · Cascais". */
  listing: string;
  /** Asking price in euros; 0 when the listing could not be confirmed. */
  price: number;
  /** Short verdict from the market check: "alinhado", "acima 12%", ... */
  verdict: string;
  /** Long hair on the villa bust. */
  woman?: boolean;
  /** From consultants.local.json (not in git): phone and Instagram handle or profile link. */
  phone?: string | null;
  instagram?: string | null;
}

export const CONSULTANTS: Consultant[] = [
  // Exemplos. Põe aqui os teus consultores (ou cria consultants.local.json, que não vai para o git).
  { name: 'Consultor Exemplo A', agency: 'Agência A', listing: 'Moradia T4 · Cascais', price: 1500000, verdict: 'Alinhado com o mercado' },
  { name: 'Consultora Exemplo B', agency: 'Agência B', listing: 'T3 · Lisboa', price: 650000, verdict: 'Acima ~10%', woman: true },
  { name: 'Consultor Exemplo C', agency: 'Agência C', listing: 'T2 · Porto', price: 380000, verdict: 'Abaixo do mercado' },
];

// Closed clients (status "cliente" in the CRM on 2026-11-02). Each one gets a house in the
// street east of the consultants' villas, with a FECHADO sign. Edit here, then rebuild.
const closed = (name: string, agency: string): Consultant => ({ name, agency, listing: 'Cliente fechado', price: 0, verdict: 'Fechado' });

export const CLIENTS: Consultant[] = [closed('Cliente Exemplo 1', 'Empresa A'), closed('Cliente Exemplo 2', 'Empresa B')];

/** Everyone with a clickable plate: `userData.villaN` indexes this list. */
export const PLATE_PEOPLE = [...CONSULTANTS, ...CLIENTS];

// Contact details live in consultants.local.json, which is git-ignored (real people's
// phones). Missing file: plates show no contacts.
const local = Object.values(import.meta.glob('./consultants.local.json', { eager: true, import: 'default' }))[0] as
  | Record<string, { phone?: string | null; instagram?: string | null }>
  | undefined;
for (const c of PLATE_PEOPLE) Object.assign(c, local?.[c.name] ?? {});

export function formatPrice(eur: number) {
  if (!eur) return '';
  if (eur >= 1_000_000) return `${(eur / 1_000_000).toFixed(eur % 1_000_000 ? 2 : 0).replace('.', ',')} M€`;
  return `${Math.round(eur / 1000)} k€`;
}
