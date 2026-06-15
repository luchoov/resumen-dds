# Resumen DDS — Unidades 13 a 24

Web de estudio (teórica) para **Desarrollo de Software (UTN)**, construida con **Astro + MDX**.
Pensada para repasar **visualmente y desde el celular**.

Diseño propio con estética **editorial / "manual técnico"**: tipografía serif de display
(Fraunces) + grotesca (Inter) + monoespaciada para etiquetas (JetBrains Mono), paleta terrosa
sobria, numeración de secciones (§), tema claro ("papel") y oscuro ("tinta"), diagramas SVG que
se adaptan al tema, código resaltado y notas al margen (tips, analogías, errores frecuentes y
puntos de parcial). **Sin emojis**: todos los iconos son de línea, propios (`src/components/Icon.astro`).

## Contenido

| # | Unidad | Bloque |
|---|--------|--------|
| 13 | Express | Backend con Express |
| 14 | Router, estáticos y CORS | Backend con Express |
| 15 | Middlewares y manejo de errores | Backend con Express |
| 16 | Testing de software | Calidad y Seguridad |
| 17 | Seguridad web y OWASP | Calidad y Seguridad |
| 18 | Autenticación y autorización (JWT) | Calidad y Seguridad |
| 19 | React: introducción y Vite | React: fundamentos |
| 20 | Componentes, Hooks y Context | React: fundamentos |
| 21 | React Router | React: navegación y datos |
| 22 | Comunicación y formularios | React: navegación y datos |
| 23 | Axios, Fetch e interceptores | React: navegación y datos |
| 24 | React Hook Form | React: navegación y datos |

## Desarrollo local

Requiere **Node 18+** y **pnpm**.

```bash
pnpm install      # instalar dependencias
pnpm dev          # servidor de desarrollo → http://localhost:4321
pnpm build        # generar el sitio estático en dist/
pnpm preview      # previsualizar el build
```

## Desplegar en Vercel

El sitio es **100% estático** (no necesita adaptador). Dos opciones:

### Opción A — desde la web (la más simple)

1. Subí el proyecto a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importá el repo.
3. Vercel detecta Astro solo. Confirmá:
   - **Framework Preset:** Astro
   - **Build Command:** `pnpm build`
   - **Output Directory:** `dist`
4. **Deploy**. Listo: te da una URL pública para estudiar desde el celu.

### Opción B — desde la terminal

```bash
npm i -g vercel
vercel        # primera vez (configura el proyecto)
vercel --prod # despliegue de producción
```

## Estructura

```text
src/
├── content/
│   ├── unidades/        # las 12 unidades en .mdx (el contenido)
│   └── (content.config.ts en la raíz de src/)
├── components/          # Callout (notas), Figura (diagramas), Icon (iconos de línea)
├── layouts/             # BaseLayout (topbar, drawer, tema)
├── pages/
│   ├── index.astro      # home con las 12 unidades por bloque
│   └── unidades/[slug].astro  # render de cada unidad
└── styles/global.css    # sistema de diseño (tema oscuro/claro)
```

### ¿Cómo edito o agrego una unidad?

Cada unidad es un archivo `.mdx` en `src/content/unidades/`. El frontmatter define los
metadatos (número, título, bloque, color, tags…) y el cuerpo es el contenido. Dentro del
`.mdx` podés usar:

- **`<Callout type="tip|warn|danger|info|analogia|parcial">…</Callout>`** → cajas destacadas.
- **`<Figura caption="…"><svg>…</svg></Figura>`** → diagramas (los colores usan variables del tema).
- Bloques de código con ```` ```js ````, tablas Markdown y los helpers de CSS
  (`conceptos`, `proscons`, `deflist`, `pasos`).

---

> Fuente: apuntes de la cátedra (carpeta `apuntes_organizados/`, apuntes 13 a 24).
> Resumen teórico para estudio personal.
