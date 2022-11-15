// vite.config.ts
import { join } from 'path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import * as Path from 'path'

export default defineConfig({
  plugins: [
    vue({
      // Quasar UI framework
      template: { transformAssetUrls }
    }),
    // Quasar UI framework
    quasar({
      sassVariables: Path.join(__dirname, 'src/styles/quasar/variables.sass')
    }),
  ],
  root: __dirname,
  base: process.env.IS_DEV !== 'true' ? './' : '/',
  build: {
    sourcemap: true,
    emptyOutDir: true,
    // Build output inside `dist/renderer` at the project root.
    outDir: '../../dist/renderer',
    rollupOptions: {
      input: join(__dirname, 'index.html'),
      // Exclude node internal modules from build output.
      external: [
        ...builtinModules.flatMap((p) => [p, `node:${p}`])
      ],
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: join(__dirname, 'src'),
      },
    ]
  }
})
