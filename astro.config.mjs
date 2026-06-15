// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  // Salida estática: lista para desplegar en Vercel sin adaptador.
  output: 'static',
  integrations: [
    // Expressive Code debe ir ANTES de mdx().
    expressiveCode({
      themes: ['vitesse-dark', 'vitesse-light'],
      // Sincroniza el tema del código con el toggle manual (data-theme en <html>)
      themeCssSelector: (theme) => `[data-theme="${theme.type}"]`,
      styleOverrides: {
        borderRadius: '4px',
        borderWidth: '1px',
        codeFontSize: '0.82rem',
        codeLineHeight: '1.6',
        codeFontFamily:
          "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        uiFontFamily: "'JetBrains Mono Variable', ui-monospace, monospace",
        frames: {
          shadowColor: 'transparent',
        },
      },
      defaultProps: {
        wrap: true,
        overridesByLang: {
          'bash,sh,text': { showLineNumbers: false },
        },
      },
    }),
    mdx(),
  ],
});
