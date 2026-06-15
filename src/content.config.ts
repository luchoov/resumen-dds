import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const unidades = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/unidades' }),
  schema: z.object({
    numero: z.number(),
    titulo: z.string(),
    subtitulo: z.string(),
    bloque: z.string(),
    semana: z.string(),
    /** clave de color para el acento visual del bloque */
    color: z.enum(['express', 'testing', 'security', 'react', 'router', 'data']),
    /** nombre del ícono de línea (ver Icon.astro) */
    icon: z.string(),
    resumen: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { unidades };
