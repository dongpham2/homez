/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [react(), tsconfigPaths()],
  test: {
    setupFiles: ['./vitest-setup.ts'],
    environment: 'jsdom',
  },
})
