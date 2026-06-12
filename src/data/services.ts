export interface ServiceType {
  name: string;
  desc: string;
  priceFrom: number;
  duration: string;
}

export interface Service {
  slug: string;
  title: string;
  tags: string;            // short tagline (landing card)
  short: string;           // landing card description
  img: string;             // base image name in src/assets/images
  alt: string;
  intro: string;           // page intro paragraph
  types: ServiceType[];
  benefits: string[];
  faq: { q: string; a: string }[];
  priceFrom: number;
  duration: string;
}

export const services: Service[] = [
  {
    slug: 'extensii-gene',
    title: 'Extensii de gene',
    tags: 'Classic · Hybrid · Volume',
    short: 'Gene dese, naturale sau dramatice, adaptate formei ochiului tău.',
    img: 'lash',
    alt: 'Aplicare extensii de gene, fir cu fir, în studio',
    intro:
      'Aplicăm extensiile fir cu fir, adaptate formei ochiului și densității genelor tale naturale. Rezultatul: o privire deschisă, fără mascara, care arată impecabil dimineața la fel ca seara.',
    types: [
      {
        name: 'Classic',
        desc: 'O extensie pe fiecare geană naturală. Efect natural, „gene proprii, dar mai bune”.',
        priceFrom: 180,
        duration: '90–120 min',
      },
      {
        name: 'Hybrid',
        desc: 'Combinație de classic și volume. Densitate medie, textură naturală cu un plus de profunzime.',
        priceFrom: 250,
        duration: '120 min',
      },
      {
        name: 'Volume',
        desc: 'Buchete fine de 2–6 fire pe geană. Efect dramatic, dens, dar ușor și confortabil.',
        priceFrom: 320,
        duration: '120–150 min',
      },
    ],
    benefits: [
      'Fire premium, ușoare, hipoalergenice',
      'Aplicare izolată, fără lipirea genelor naturale',
      'Formă personalizată pe ochiul tău',
      'Retuș recomandat la 3 săptămâni',
    ],
    faq: [
      { q: 'Cât rezistă extensiile?', a: '3–4 săptămâni, cu retuș recomandat la 3 săptămâni.' },
      { q: 'Sunt sigure pentru genele naturale?', a: 'Da, aplicate corect, fir cu fir, fără să afecteze genele tale.' },
      { q: 'Vin machiată la programare?', a: 'Te rugăm fără machiaj în zona ochilor, pentru aderență optimă.' },
    ],
    priceFrom: 180,
    duration: '90–150 min',
  },
  {
    slug: 'sprancene',
    title: 'Sprâncene',
    tags: 'Laminare · henna · stilizare',
    short: 'Sprâncene definite care-ți pun fața în valoare, fără machiaj zilnic.',
    img: 'brow',
    alt: 'Sprâncene definite, stilizate, în prim-plan',
    intro:
      'Conturăm și definim sprâncenele după forma feței tale. De la laminare pentru un look pieptănat și plin, la henna și stilizare pentru o definire de durată — fără machiaj zilnic.',
    types: [
      {
        name: 'Laminare',
        desc: 'Fixează firele în sus pentru un aspect plin, pieptănat și ordonat 4–6 săptămâni.',
        priceFrom: 150,
        duration: '60 min',
      },
      {
        name: 'Henna',
        desc: 'Colorare naturală a firelor și a pielii, pentru contur definit și densitate vizuală.',
        priceFrom: 120,
        duration: '45 min',
      },
      {
        name: 'Stilizare & pensat',
        desc: 'Modelarea formei prin pensat și ajustare, adaptată trăsăturilor tale.',
        priceFrom: 80,
        duration: '30 min',
      },
    ],
    benefits: [
      'Formă calculată după proporțiile feței',
      'Produse blânde, potrivite pentru piele sensibilă',
      'Efect de durată, întreținere minimă',
      'Recomandări de îngrijire acasă',
    ],
    faq: [
      { q: 'Cât rezistă laminarea?', a: 'În medie 4–6 săptămâni, în funcție de tipul firului și de îngrijire.' },
      { q: 'Henna pătează pielea?', a: 'Colorează ușor pielea pentru câteva zile, oferind un contur natural care se estompează treptat.' },
      { q: 'Pot combina serviciile?', a: 'Da — laminare + henna este una dintre cele mai cerute combinații.' },
    ],
    priceFrom: 80,
    duration: '30–60 min',
  },
  {
    slug: 'ingrijire-ten',
    title: 'Îngrijire ten',
    tags: 'Tratamente faciale · curățare profundă',
    short: 'Piele curată, hidratată, luminoasă — protocol personalizat.',
    img: 'skin',
    alt: 'Ten luminos, hidratat, după tratament facial',
    intro:
      'Analizăm tipul tenului și construim un protocol personalizat: curățare profundă, hidratare și luminozitate. Un ritual relaxant cu rezultate vizibile de la prima ședință.',
    types: [
      {
        name: 'Tratament facial',
        desc: 'Protocol complet de curățare, exfoliere, mască și hidratare, adaptat tenului tău.',
        priceFrom: 220,
        duration: '75 min',
      },
      {
        name: 'Curățare profundă',
        desc: 'Deblocarea porilor și eliminarea impurităților, pentru un ten neted și curat.',
        priceFrom: 180,
        duration: '60 min',
      },
      {
        name: 'Hidratare intensă',
        desc: 'Boost de hidratare și luminozitate pentru tenul deshidratat sau obosit.',
        priceFrom: 160,
        duration: '45 min',
      },
    ],
    benefits: [
      'Produse premium, dermatologic testate',
      'Protocol adaptat după analiza tenului',
      'Ritual relaxant, fără grabă',
      'Plan de îngrijire acasă inclus',
    ],
    faq: [
      { q: 'Cât de des se recomandă un tratament?', a: 'Pentru rezultate de durată, o ședință la 3–4 săptămâni.' },
      { q: 'Este potrivit pentru tenul sensibil?', a: 'Da, protocolul și produsele se adaptează inclusiv tenului reactiv.' },
      { q: 'Pot să mă machiez după?', a: 'Recomandăm să lași pielea să respire câteva ore după tratament.' },
    ],
    priceFrom: 160,
    duration: '45–75 min',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
