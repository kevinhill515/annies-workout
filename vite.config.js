import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));

// Builds default to '/annies-workout/' so they work directly on
// kevinhill515.github.io/annies-workout. Local dev still serves at '/'.
export default defineConfig(({ command }) => ({
  root: here,
  base: command === 'build' ? '/annies-workout/' : '/',
  plugins: [react(), tailwindcss()],
}));
