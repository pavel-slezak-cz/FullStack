/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // ✅ nezbytné pro testování React komponent
    globals: true,         // umožní používat describe, it, expect bez importu
    setupFiles: './src/setupTests.ts', // volitelný soubor pro globální nastavení
  },
});
