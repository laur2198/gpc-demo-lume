import type { APIRoute } from 'astro';
import { generateOpenGraphImage } from 'astro-og-canvas';

// Static OG image at /og.png — brand colours, generated at build via astro-og-canvas.
// Fonts are bundled locally (canvaskit needs ttf/otf; Fraunces ships woff2 only and
// the fontsource default-font fetch is blocked offline). Gloock = high-contrast display
// serif close to Fraunces for the title; Lora carries full Romanian diacritic coverage.
export const GET: APIRoute = async () => {
  const png = await generateOpenGraphImage({
    title: 'LUMÉ Studio',
    description: 'Studio de înfrumusețare · Brașov',
    fonts: ['./src/fonts/Gloock-Regular.ttf', './src/fonts/Lora-Regular.ttf'],
    bgGradient: [
      [74, 44, 58],   // plum
      [42, 36, 34],   // ink
    ],
    font: {
      title: { color: [250, 246, 242], size: 100, lineHeight: 1.1, families: ['Gloock', 'Lora'] },
      description: { color: [201, 167, 124], size: 44, families: ['Lora'] },
    },
    border: { color: [201, 167, 124], width: 20, side: 'inline-start' },
    padding: 90,
    format: 'PNG',
  });

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};

export const prerender = true;
