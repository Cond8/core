// vitest.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Use Node environment for server-side code
    include: ['**/test/**/*.spec.ts'], // You can adjust the test folder structure as needed
    coverage: {
      provider: 'v8', // Use c8 for coverage tracking
      reporter: ['text', 'html'], // Generate both text and HTML reports
      all: true, // Tracks coverage for all files, even if not directly tested
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/mocks/**',
        '**/ConduitObserver.ts',
        '.prettierrc.mjs',
        'eslint.config.mjs',
        'vitest.config.ts',
      ], // Exclude unnecessary files
    },
    setupFiles: [resolve(__dirname, 'vitest.setup.ts')], // Global setup path
    watch: true, // Enable test rerun on file changes
  },
});
