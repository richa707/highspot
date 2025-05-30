// filepath: /Users/garvice.eakins/git/Take-Home Assessment/vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Use jsdom for DOM-related tests
  },
});