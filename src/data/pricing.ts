export interface Plan {
  name: string;
  price: string;
  detail: string;
  note: string;
  featured: boolean;
}

export const plans: Plan[] = [
  {
    name: 'Esențial',
    price: '180 lei',
    detail: 'extensii classic / stilizare sprâncene',
    note: 'Ideal pentru prima vizită.',
    featured: false,
  },
  {
    name: 'Signature',
    price: '320 lei',
    detail: 'extensii hybrid + laminare sprâncene',
    note: 'Cel mai ales',
    featured: true,
  },
  {
    name: 'Lux',
    price: '480 lei',
    detail: 'volume + tratament ten complet',
    note: 'Experiența completă LUMÉ.',
    featured: false,
  },
];
