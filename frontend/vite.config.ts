/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
  test: {
    setupFiles: ['./vitest-setup.ts'],
    environment: 'jsdom',
  },
})
