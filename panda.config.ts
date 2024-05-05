import { defineConfig, defineGlobalStyles } from '@pandacss/dev';

const globalCss = defineGlobalStyles({
  'html, body': {
    boxSizing: 'border-box',
  },
});

const theme = {
  tokens: {
    fonts: {
      body: { value: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'.split(',  ') },
      heading: { value: ['Roboto Mono', 'sans-serif'] },
    },
  },
};

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: 'styled-system',

  globalCss,
  theme,
});
